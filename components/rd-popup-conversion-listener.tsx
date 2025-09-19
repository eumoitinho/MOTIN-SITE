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

    const pushConversion = (details: Record<string, any> = {}) => {
      if (fired) return
      const now = Date.now()
      if (now - lastTs < 800) return
      lastTs = now
      fired = true
      if (typeof window !== 'undefined') {
        ;(window as any).dataLayer = (window as any).dataLayer || []
        ;(window as any).dataLayer.push({
          event: 'complete_whatsapp',
          source: 'rdstation_popup',
          ...details
        })
      }
    }

    // Heurísticas de detecção de conversão
    const successKeywords = [
      'obrigado', 'sucesso', 'mensagem enviada', 'entraremos em contato', 'thank you', 'success'
    ]

    const isSuccessNode = (node: Node): boolean => {
      if (!(node instanceof HTMLElement)) return false
      const text = node.textContent?.toLowerCase() || ''
      return successKeywords.some(k => text.includes(k))
    }

    const scan = () => {
      // Procura contêineres conhecidos de popup RD
      const popupRoots = document.querySelectorAll('[id*="rdstation"], .bricks-popup, .rdstation-popup')
      popupRoots.forEach(root => {
        if (isSuccessNode(root)) pushConversion({ mode: 'root_match' })
        root.querySelectorAll('*').forEach(child => {
          if (isSuccessNode(child)) pushConversion({ mode: 'descendant_match' })
        })
      })
    }

    // MutationObserver para mudanças pós-submit
    const observer = new MutationObserver((mutations) => {
      if (fired) return
      for (const m of mutations) {
        if (m.type === 'childList') {
          m.addedNodes.forEach(n => { if (isSuccessNode(n)) pushConversion({ mode: 'added_node' }) })
        }
        if (m.target && isSuccessNode(m.target)) pushConversion({ mode: 'mutated_target' })
      }
      scan()
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Scans escalonados para casos de load tardio
    const timeouts = [500, 1500, 3000, 6000, 10000].map(t => setTimeout(() => { if (!fired) scan() }, t))

    return () => {
      observer.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [])

  return null
}
