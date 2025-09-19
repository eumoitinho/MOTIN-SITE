"use client"

import { useEffect } from "react"

/**
 * Listener mínimo para capturar a conversão do popup (script RD Station) sem custom UI.
 * Estratégia:
 *  1. Observa mutações no DOM procurando elementos de sucesso (mensagens de agradecimento) ou remoção do popup após submit.
 *  2. Debounce para evitar disparo múltiplo.
 *  3. Empurra apenas 1 evento padronizado: complete_whatsapp (GA4) via dataLayer.
 *     (GTM deve ter um trigger de Custom Event "complete_whatsapp" mapeando para tag GA4/Ads conforme necessidade.)
 */
export function RDPopupConversionListener() {
  useEffect(() => {
    let fired = false
    let lastTs = 0
    const DEBUG = typeof window !== 'undefined' && (localStorage.getItem('debug:tracking') || process.env.NODE_ENV !== 'production')

    const log = (...args: any[]) => { if (DEBUG) console.debug('[rd-popup-listener]', ...args) }

    function pushAllVariants(base: Record<string, any>) {
      if (typeof window === 'undefined') return
      const dl = (window as any).dataLayer = (window as any).dataLayer || []

      // 1. Novo evento canônico (usado pelo nosso código)
      dl.push({ event: 'complete_whatsapp', ...base })
      // 2. Evento legado sem underscore (GTM trigger "Complete WhatsApp" -> event: completewhatsapp)
      dl.push({ event: 'completewhatsapp', ...base })
      // 3. Estrutura antiga sendEvent + eventGA4 (mantém Tag "GA4 - Event - 00. Send Event")
      dl.push({
        event: 'sendEvent',
        category: 'contato',
        eventGA4: 'complete_whatsapp',
        content_type: 'whatsapp',
        ...base
      })
    }

    const pushConversion = (details: Record<string, any> = {}) => {
      if (fired) { return }
      const now = Date.now()
      if (now - lastTs < 800) return // debounce
      lastTs = now
      fired = true
      log('Firing conversion', details)
      pushAllVariants({ source: 'rdstation_popup', detection: details })
    }

    // ============== DOM HEURISTICS ==============
    const successKeywords = [
      'obrigado', 'sucesso', 'mensagem enviada', 'entraremos em contato', 'thank you', 'success'
    ]

    const isSuccessNode = (node: Node): boolean => {
      if (!(node instanceof HTMLElement)) return false
      const text = node.textContent?.toLowerCase() || ''
      return !!text && successKeywords.some(k => text.includes(k))
    }

    const scan = () => {
      if (fired) return
      const popupRoots = document.querySelectorAll('[id*="rdstation"], .bricks-popup, .rdstation-popup')
      popupRoots.forEach(root => {
        if (isSuccessNode(root)) pushConversion({ mode: 'root_match' })
        if (fired) return
        root.querySelectorAll('*').forEach(child => {
          if (!fired && isSuccessNode(child)) pushConversion({ mode: 'descendant_match' })
        })
      })
    }

    // MutationObserver para mudanças pós-submit
    const observer = new MutationObserver((mutations) => {
      if (fired) return
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(n => { if (!fired && isSuccessNode(n)) pushConversion({ mode: 'added_node' }) })
        }
        if (!fired && m.target && isSuccessNode(m.target)) pushConversion({ mode: 'mutated_target' })
        if (fired) break
      }
      if (!fired) scan()
    })

    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true })
    } else {
      // fallback se body ainda não existe
      const readyInterval = setInterval(() => {
        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true })
          clearInterval(readyInterval)
        }
      }, 100)
    }

    // Scans escalonados para load tardio
    const timeouts = [400, 1200, 2500, 5000, 8000, 12000].map(t => setTimeout(() => { if (!fired) scan() }, t))

    // ============== NETWORK INTERCEPTION ==============
    // Intercepta fetch e XHR para detectar resposta de sucesso do backend RD
    const RD_URL_REGEX = /rdstation|rdstation-static|rdservices|resultadosdigitais/i

    // Wrap fetch
    const originalFetch = typeof window !== 'undefined' ? window.fetch : undefined
    if (originalFetch) {
      ;(window as any).fetch = async function patchedFetch(input: RequestInfo | URL, init?: RequestInit) {
        try {
          const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase()
          const url = typeof input === 'string' ? input : (input as any).url
          const body = init?.body || (input instanceof Request ? (input as any)._bodyInit || input.body : undefined)
          const shouldWatch = method === 'POST' && RD_URL_REGEX.test(url || '')
          const res = await originalFetch(input as any, init as any)
          if (shouldWatch && !fired) {
            const clone = res.clone()
            let ok = res.ok
            let json: any = null
            try {
              json = await clone.json()
              // Tentativas de estruturas de sucesso
              if (json && typeof json === 'object') {
                if (json.status === 'success' || json.success === true) ok = true
              }
            } catch (_) { /* ignore json parse */ }
            if (ok) {
              pushConversion({ mode: 'network_fetch', url })
            }
          }
          return res
        } catch (e) {
          return (originalFetch as any)(input as any, init as any) // fallback
        }
      }
    }

    // Wrap XHR
    const OriginalXHR = (typeof window !== 'undefined') ? window.XMLHttpRequest : undefined
    let xhrPatched = false
    if (OriginalXHR) {
      const Proto = OriginalXHR.prototype
      if (!(Proto as any)._rdPatched) {
        const originalOpen = Proto.open
        const originalSend = Proto.send
        let currentUrl = ''
        Proto.open = function(method: string, url: string, async?: boolean, user?: string, password?: string) {
          currentUrl = url
          const a: boolean = (typeof async === 'undefined') ? true : !!async
          return originalOpen.apply(this, [method, url, a, user, password])
        }
        Proto.send = function(body?: Document | BodyInit | null) {
          if (RD_URL_REGEX.test(currentUrl)) {
            this.addEventListener('load', function() {
              if (!fired && (this.status >= 200 && this.status < 300)) {
                try {
                  const txt = (this as any).responseText || ''
                  if (txt.includes('success') || txt.includes('Obrigado') || txt.includes('thank')) {
                    pushConversion({ mode: 'network_xhr', url: currentUrl })
                  }
                } catch (_) { /* noop */ }
              }
            })
          }
          return originalSend.apply(this, [body as any])
        }
        ;(Proto as any)._rdPatched = true
        xhrPatched = true
      }
    }

    log('Listener initialized', { xhrPatched, fetchPatched: !!originalFetch })

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
      // Não restauramos fetch/XHR para evitar race conditions com outros módulos que possam depender do wrapper até sair da página.
    }
  }, [])

  return null
}
