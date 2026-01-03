"use client"

import { useEffect } from "react"
import { pushEvent } from "@/lib/tracking"
import {
  Ga4Event,
  LeadSource,
  SubmissionStatus,
} from "@/lib/events"

/**
 * Observa o botao flutuante padrao do RD Station (injetado pelo script) e adiciona tracking.
 * Dispara eventos tipados via pushEvent centralizado.
 */
export function RDStationPopupTracker() {
  useEffect(() => {
    let lastClickTs = 0

    const identifyAndBind = () => {
      const candidates: HTMLElement[] = Array.from(
        document.querySelectorAll(
          '.bricks--floating--button, [id^="rd-floating_button"], .rdstation-popup-js-floating-button, [data-rd-popup-id], .rdstation-popup-button'
        )
      ) as HTMLElement[]

      candidates.forEach((btn) => {
        if (!btn.getAttribute("data-motin-tracked")) {
          btn.setAttribute("data-motin-tracked", "true")
          btn.addEventListener("click", () => {
            const now = Date.now()
            // Debounce rapido para evitar multiplos eventos
            if (now - lastClickTs < 500) return
            lastClickTs = now

            // Usa InitiateWhatsapp para compatibilidade com GTM
            pushEvent({
              eventGA4: Ga4Event.InitiateWhatsapp,
              source: LeadSource.RdstationPopupButton,
            })
          })
        }
      })
    }

    // Detectar submissao do formulario do popup RD Station
    const bindFormSubmit = () => {
      const forms = Array.from(document.querySelectorAll("form")) as HTMLFormElement[]
      forms.forEach((f) => {
        if (f.getAttribute("data-motin-rd-form")) return

        // Heuristica: formularios RD tem inputs ocultos com nomes padronizados
        const isRD =
          !!f.querySelector('input[name*="rdstation"]') ||
          !!f.querySelector('[name="conversion_identifier"]') ||
          !!f.querySelector('[id*="rdstation"]')

        if (!isRD) return

        f.setAttribute("data-motin-rd-form", "true")
        f.addEventListener("submit", () => {
          // Usa CompleteWhatsapp para compatibilidade com GTM/GAds
          pushEvent({
            eventGA4: Ga4Event.CompleteWhatsapp,
            source: LeadSource.RdstationPopupForm,
            status: SubmissionStatus.Success,
          })
        })
      })
    }

    // Primeira tentativa imediata e varias tentativas posteriores (script pode carregar async)
    const timeouts = [0, 500, 1000, 2000, 4000, 8000].map((delay) =>
      setTimeout(identifyAndBind, delay)
    )

    // Observer para capturar reinsercoes
    const observer = new MutationObserver(() => {
      identifyAndBind()
      bindFormSubmit()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      timeouts.forEach(clearTimeout)
      observer.disconnect()
    }
  }, [])

  return null
}
