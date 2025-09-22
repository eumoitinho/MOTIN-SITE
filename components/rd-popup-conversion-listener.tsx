"use client"

// Listener simplificado: SOMENTE rastreia cliques em links / botões de WhatsApp.
// Removeu toda a lógica de RD Station (DOM, network, hashing). Mantém compatibilidade
// com eventos antigos empurrando múltiplas variantes apenas para COMPLETE (opcional).

import { useEffect } from "react"

/**
 * Como funciona:
 * - Intercepta cliques em <a> ou elementos com atributo data-whatsapp
 *   cujo href contenha wa.me ou api.whatsapp.com/send.
 * - Dispara 1 evento de iniciação (initiate_whatsapp).
 * - Opcionalmente (modo simples) considera o próprio clique como conversão final
 *   e dispara também complete_whatsapp (configurável via NEXT_PUBLIC_WHATSAPP_CLICK_IS_COMPLETE).
 * - Mantém variantes legadas (Complete WhatsApp / completewhatsapp / sendEvent) para não quebrar GTM atual.
 */
export function RDPopupConversionListener() {
  useEffect(() => {
    const CLICK_IS_COMPLETE = process.env.NEXT_PUBLIC_WHATSAPP_CLICK_IS_COMPLETE === 'true'
    const LEGACY_DISABLED = process.env.NEXT_PUBLIC_DISABLE_LEGACY_TRACKING === 'true'
    const DEBUG = typeof window !== 'undefined' && !!localStorage.getItem('debug:tracking')
    const log = (...args: any[]) => { if (DEBUG) console.debug('[whatsapp-listener]', ...args) }

    const dl = (window as any).dataLayer = (window as any).dataLayer || []
    const recentIds = new Set<string>()
    const RECENT_WINDOW_MS = 4000

    function prune() {
      // Nada sofisticado aqui; Set pequeno dado baixo volume de cliques.
      if (recentIds.size > 50) recentIds.clear()
    }

    function pushInitiate(base: Record<string, any>) {
      const payload = { event: 'sendEvent', eventGA4: 'initiate_whatsapp', content_type: 'whatsapp', ts: Date.now(), ...base }
      dl.push(payload)
      // Custom event direto (caso exista trigger específico)
      dl.push({ event: 'initiate_whatsapp', ...base })
      log('initiate_whatsapp pushed', base)
    }

    function pushComplete(base: Record<string, any>) {
      const eventBase = { content_type: 'whatsapp', ts: Date.now(), ...base }
      // Canônico / variantes (seguro para não quebrar container atual)
      dl.push({ event: 'complete_whatsapp', ...eventBase })
      dl.push({ event: 'Complete WhatsApp', ...eventBase })
      if (!LEGACY_DISABLED) {
        dl.push({ event: 'completewhatsapp', ...eventBase })
        dl.push({ event: 'sendEvent', eventGA4: 'complete_whatsapp', ...eventBase })
      }
      log('complete_whatsapp pushed', eventBase)
    }

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      const link = target.closest('a, button, [data-whatsapp]') as HTMLElement | null
      if (!link) return

      const href = (link.getAttribute('href') || '').toLowerCase()
      const dataAttr = link.getAttribute('data-whatsapp') || ''
      const isWhatsApp = /wa\.me\//.test(href) || /api\.whatsapp\.com\/send/.test(href) || dataAttr === 'true'
      if (!isWhatsApp) return

      const linkUrl = href || dataAttr || 'whatsapp_click'
      const eventId = `wa-${Date.now()}-${Math.random().toString(36).slice(2,8)}`
      if (recentIds.has(eventId)) return
      recentIds.add(eventId); prune()

      pushInitiate({ link_url: linkUrl, event_id: eventId })
      if (CLICK_IS_COMPLETE) {
        // Pequeno atraso opcional para garantir ordem no GA4 (iniciar -> completar)
        setTimeout(() => pushComplete({ link_url: linkUrl, event_id: eventId, mode: 'click_is_complete' }), 150)
      }
    }

    document.addEventListener('click', handleClick, true)
    log('WhatsApp listener simplificado ativo', { CLICK_IS_COMPLETE, LEGACY_DISABLED })

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return null
}

// Notas:
// - Se quiser apenas COMPLETE (sem INITIATE), defina NEXT_PUBLIC_WHATSAPP_CLICK_IS_COMPLETE=true
//   e ignore os triggers de initiate no GTM.
// - Para reduzir ainda mais: remova pushInitiate ou pushComplete conforme necessidade.
// - O nome do export foi mantido (RDPopupConversionListener) para não precisar alterar o layout existente.
