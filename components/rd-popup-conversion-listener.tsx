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
  // (Fallback removido a pedido do usuário para evitar conversões forçadas)
    const DEBUG = typeof window !== 'undefined' && !!(localStorage.getItem('debug:tracking') || process.env.NODE_ENV !== 'production')

    const log = (...args: any[]) => { if (DEBUG) console.debug('[rd-popup-listener]', ...args) }

    const LEGACY_DISABLED = process.env.NEXT_PUBLIC_DISABLE_LEGACY_TRACKING === 'true'
    const FLOATING_ID = 'rd-floating_button-lfvfzlpr'
    let unbindFloating: (() => void) | null = null
    let floatingBindTries = 0

    function pushAllVariants(base: Record<string, any>) {
      if (typeof window === 'undefined') return
      const dl = (window as any).dataLayer = (window as any).dataLayer || []

      // Sempre empurra o evento canônico (underscore)
      dl.push({ event: 'complete_whatsapp', ...base })
      // Também empurra variante com espaço e capitalização (gatilho existente no container: "Complete WhatsApp")
      dl.push({ event: 'Complete WhatsApp', ...base })

      if (LEGACY_DISABLED) {
        log('Legacy variants disabled (NEXT_PUBLIC_DISABLE_LEGACY_TRACKING=true)')
        return
      }

  // 1. Evento legado sem underscore (GTM trigger antigo -> event: completewhatsapp)
      dl.push({ event: 'completewhatsapp', ...base })
      // 2. Estrutura antiga sendEvent + eventGA4 (mantém Tag "GA4 - Event - 00. Send Event")
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
      // Português
      'obrigado', 'obrigada', 'valeu', 'sucesso', 'enviado com sucesso', 'mensagem enviada', 'mensagem recebida',
      'recebemos', 'recebida', 'cadastro realizado', 'contato enviado', 'contato recebido', 'proposta enviada',
      'solicitação recebida', 'pedido recebido', 'sua mensagem foi enviada', 'em breve entraremos em contato',
      'agradecemos o contato', 'agradecemos',
      // Inglês / Espanhol comuns em libs
      'thank you', 'thanks', 'success', 'submitted', 'submission successful', 'message sent', 'we will contact you',
      'gracias', 'enviado', 'enviada'
    ]

    const isSuccessNode = (node: Node): boolean => {
      if (!(node instanceof HTMLElement)) return false
      const text = node.textContent?.toLowerCase() || ''
      const match = !!text && successKeywords.some(k => text.includes(k))
      if (DEBUG && match) {
        const snippet = text.trim().slice(0, 120)
        log('Success text matched', { snippet })
      }
      return match
    }

    const scan = () => {
      if (fired) return
      const popupRoots = document.querySelectorAll('[id*="rdstation"], .bricks-popup, .rdstation-popup')
      if (DEBUG) log('Scan DOM', { roots: popupRoots.length, keywords: successKeywords.length })
      popupRoots.forEach(root => {
        if (isSuccessNode(root)) pushConversion({ mode: 'root_match' })
        if (fired) return
        root.querySelectorAll('*').forEach(child => {
          if (!fired && isSuccessNode(child)) pushConversion({ mode: 'descendant_match' })
        })
      })
      if (DEBUG && !fired) log('Scan finished without match')
    }

    // === Floating button debug binding ===
    const tryBindFloatingButton = () => {
      if (typeof window === 'undefined') return
      const el = document.getElementById(FLOATING_ID)
      if (!el) {
        if (DEBUG && floatingBindTries % 5 === 0) log('Floating button not found yet', { id: FLOATING_ID, tries: floatingBindTries })
        floatingBindTries++
        return
      }
      if ((el as any)._rdFloatingBound) return
      const onClick = () => {
        log('RD floating button clicked', { id: FLOATING_ID })
      }
      el.addEventListener('click', onClick)
      ;(el as any)._rdFloatingBound = true
      unbindFloating = () => {
        try { el.removeEventListener('click', onClick) } catch {}
        try { delete (el as any)._rdFloatingBound } catch {}
      }
      log('Floating button bound for debug', { id: FLOATING_ID })
    }

    // Attempt immediate bind, and keep trying a few times for late insertion
    tryBindFloatingButton()

    // (Removido listener de clique para fallback forçado)

    // MutationObserver para mudanças pós-submit
    const observer = new MutationObserver((mutations) => {
      if (fired) return
      for (const m of mutations) {
        if (m.type === 'childList') {
          if (DEBUG) log('Mutation childList', { added: m.addedNodes.length, removed: m.removedNodes.length })
          m.addedNodes.forEach(n => { if (!fired && isSuccessNode(n)) pushConversion({ mode: 'added_node' }) })
          // Try to bind floating button when nodes are added
          tryBindFloatingButton()
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
          if (DEBUG && shouldWatch) log('Watching RD fetch', { method, url, hasBody: !!body })
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
              if (DEBUG) log('RD fetch json parsed', { keys: Object.keys(json || {}) })
            } catch (e) {
              if (DEBUG) log('RD fetch json parse failed', { error: (e as Error).message })
            }
            if (DEBUG) log('RD fetch response', { status: res.status, ok })
            if (ok) {
              pushConversion({ mode: 'network_fetch', url })
            }
          }
          return res
        } catch (e) {
          if (DEBUG) log('Patched fetch error, forwarding to original', { error: (e as Error).message })
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
          if (DEBUG && RD_URL_REGEX.test(currentUrl)) log('Watching RD XHR open', { method, url: currentUrl })
          return originalOpen.apply(this, [method, url, a, user, password])
        }
        Proto.send = function(body?: Document | BodyInit | null) {
          if (RD_URL_REGEX.test(currentUrl)) {
            this.addEventListener('load', function() {
              if (!fired && (this.status >= 200 && this.status < 300)) {
                try {
                  const txt = (this as any).responseText || ''
                  if (DEBUG) log('RD XHR load', { status: (this as any).status, snippet: (txt || '').slice(0, 120) })
                  if (txt.toLowerCase().includes('success') || txt.toLowerCase().includes('obrigado') || txt.toLowerCase().includes('thank')) {
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

    log('Listener initialized', { xhrPatched, fetchPatched: !!originalFetch, keywordCount: successKeywords.length, floatingId: FLOATING_ID })
    if (DEBUG) setTimeout(() => scan(), 0) // dispara um scan inicial com log

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
      if (unbindFloating) unbindFloating()
  // Nada adicional para limpar (fallback removido)
      // Não restauramos fetch/XHR para evitar race conditions com outros módulos que possam depender do wrapper até sair da página.
    }
  }, [])

  return null
}
