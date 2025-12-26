"use client"

import { useEffect } from "react"
import { pushLeadFromForm } from "@/lib/rd-lead-tracking"

/**
 * Listener único para conversões de lead do popup RD Station.
 * - Encontra formulários RD (popup, CTA padrão, fallback floating button).
 * - Amarra um único submit handler e empurra dataLayer:
 *   { event: "rdLeadConversion", rdLeadEmail, rdLeadName, rdLeadSource }
 * - Idempotente por email+fonte (sessão) via helper.
 */
export function RDPopupConversionListener() {
  useEffect(() => {
    const seen = new WeakSet<HTMLFormElement>()

    const isRdForm = (form: HTMLFormElement) => {
      return (
        form.hasAttribute("data-rd-popup-id") ||
        /rdstation/i.test(form.id) ||
        /rdstation/i.test(form.className) ||
        /rd\.services|rdstation/i.test(form.action) ||
        !!form.querySelector('input[name="token_rdstation"], input[name="conversion_identifier"], input[id*="rdstation"]')
      )
    }

    const bindForms = () => {
      const forms = Array.from(document.querySelectorAll("form")) as HTMLFormElement[]
      forms.forEach((form) => {
        if (seen.has(form)) return
        if (!isRdForm(form)) return
        seen.add(form)
        form.addEventListener(
          "submit",
          () => {
            pushLeadFromForm(form)
          },
          { passive: true },
        )
      })
    }

    bindForms()
    const observer = new MutationObserver(bindForms)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}
