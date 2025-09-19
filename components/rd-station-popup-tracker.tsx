"use client"

import { useEffect } from "react"
import { trackWithAliases } from "@/lib/tracking"

/**
 * Observa o botão flutuante padrão do RD Station (injetado pelo script) e adiciona tracking.
 * Dispara evento principal + alias para compatibilidade com GTM legado:
 *  - Evento principal: whatsapp_floating_button_open
 *  - Alias: Initiate WhatsApp
 */
export function RDStationPopupTracker() {
  useEffect(() => {
    let lastClickTs = 0

    const identifyAndBind = () => {
      const candidates: HTMLElement[] = Array.from(document.querySelectorAll(
        '.bricks--floating--button, [id^="rd-floating_button"], .rdstation-popup-js-floating-button, [data-rd-popup-id], .rdstation-popup-button'
      )) as HTMLElement[]

      candidates.forEach(btn => {
        if (!btn.getAttribute('data-motin-tracked')) {
          btn.setAttribute('data-motin-tracked', 'true')
          btn.addEventListener('click', () => {
            const now = Date.now()
            // Debounce rápido para evitar múltiplos eventos caso animações disparem cliques duplicados
            if (now - lastClickTs < 500) return
            lastClickTs = now
            trackWithAliases('whatsapp_floating_button_open', ['Initiate WhatsApp'], { source: 'rdstation_popup_button' })
          })
        }
      })
    }

    // Primeira tentativa imediata e várias tentativas posteriores (script pode carregar async)
    const timeouts = [0, 500, 1000, 2000, 4000, 8000].map(delay => setTimeout(identifyAndBind, delay))

    // Observer para capturar reinserções
    const observer = new MutationObserver(() => identifyAndBind())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      timeouts.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  return null
}
