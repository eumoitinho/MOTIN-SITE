"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
    RdstationPopup?: {
      open: () => void
    }
    g_ECObj?: {
      email?: string
      phone_number?: string
    }
  }
}

export function GTMEvents() {
  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || []

      // Enhanced Conversions - User Data Capture
      const setupEnhancedConversions = () => {
        const g_EC = {
          email: 'input[type="email"]',
          phone_number: 'input[type="tel"], input[placeholder*="Telefone"], input[placeholder*="telefone"]',
        }

        window.g_ECObj = window.g_ECObj || {}
        const g_setupEC: any = {}

        const g_countryCode = "55"

        const g_setup_ECObj = (e: Event) => {
          const input = e.target as HTMLInputElement
          for (const key in g_EC) {
            if (input.matches(g_EC[key as keyof typeof g_EC])) {
              g_setupEC["g_" + key] = input.value
            }
          }
          g_save_toECObj()
        }

        const g_save_toECObj = () => {
          for (const key in g_EC) {
            if (g_setupEC["g_" + key] && key === "email" && g_validateMail(g_setupEC["g_" + key])) {
              window.g_ECObj![key] = g_setupEC["g_" + key]
            }
            if (g_setupEC["g_" + key] && key === "phone_number") {
              const cleanedPhone = g_validatePhone(g_setupEC["g_" + key])
              const finalPhone = cleanedPhone.includes("+")
                ? cleanedPhone
                : cleanedPhone.startsWith(g_countryCode)
                  ? "+" + cleanedPhone
                  : "+" + g_countryCode + cleanedPhone
              if (finalPhone.length >= 11 && finalPhone.length <= 15) {
                window.g_ECObj![key] = finalPhone
              } else {
                delete window.g_ECObj![key]
              }
            }
          }
        }

        const g_validateMail = (email: string) => {
          return /\S+@\S+\.\S+/.test(email)
        }

        const g_validatePhone = (tel: string) => {
          return tel.replace(/\D/g, "")
        }

        document.addEventListener("input", g_setup_ECObj)
        g_save_toECObj()
      }

      // UTM Capture and Storage
      const setupUTMCapture = () => {
        const setCookie = (name: string, value: string) => {
          document.cookie = name + "=" + (value || "") + "; path=/"
        }

        const getCookie = (name: string) => {
          const nameEQ = name + "="
          const ca = document.cookie.split(";")
          for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === " ") c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
          }
          return null
        }

        // Capture UTMs from URL
        const urlParams = new URLSearchParams(window.location.search)
        const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"]

        utmParams.forEach((param) => {
          const value = urlParams.get(param)
          if (value) {
            setCookie(param, value)
          }
        })

        // Restore UTMs from cookies
        const utm_source = getCookie("utm_source")
        const utm_medium = getCookie("utm_medium")
        const utm_campaign = getCookie("utm_campaign")
        const utm_content = getCookie("utm_content")
        const utm_term = getCookie("utm_term")
        const utm_id = getCookie("utm_id")

        if (utm_source || utm_medium || utm_campaign || utm_content || utm_term || utm_id) {
          window.dataLayer.push({
            event: "UTMParametersRestored",
            utm_source: utm_source,
            utm_medium: utm_medium,
            utm_campaign: utm_campaign,
            utm_content: utm_content,
            utm_term: utm_term,
            utm_id: utm_id,
          })
        }
      }

      // Initialize all tracking
      setupEnhancedConversions()
      setupUTMCapture()
    }
  }, [])

  return null
}

// Helper functions for form submissions
export const trackFormSubmission = (formType: "contact" | "careers") => {
  if (typeof window !== "undefined") {
    if (formType === "contact") {
      window.dataLayer.push({
        event: "sendEvent",
        category: "contato",
        eventGA4: "generate_lead",
        content_type: "formulario",
      })
    } else if (formType === "careers") {
      window.dataLayer.push({
        event: "join_our_team",
      })
    }
  }
}

export const trackWhatsAppInitiate = () => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "initiatewhatsapp",
    })
  }
}

export const trackWhatsAppComplete = () => {
  if (typeof window !== "undefined") {
    window.dataLayer.push({
      event: "completewhatsapp",
    })
  }
}
