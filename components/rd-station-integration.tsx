"use client"

import { useEffect } from "react"

export function RDStationIntegration() {
  useEffect(() => {
    // Function to extract and store UTM parameters
    const storeUtmParams = () => {
      const params = new URLSearchParams(window.location.search)
      const utmFields = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

      const extractedParams: Record<string, string> = {}
      utmFields.forEach((field) => {
        const value = params.get(field)
        if (value) {
          extractedParams[field] = value
        }
      })

      if (Object.keys(extractedParams).length) {
        localStorage.setItem("utmParams", JSON.stringify(extractedParams))
        console.log("UTM parameters stored:", extractedParams)
      }
    }

    // Store UTM parameters
    storeUtmParams()

    // Function to add UTM parameters to RD Station forms
    const addUtmToRdForms = () => {
      const storedUtmParams = localStorage.getItem("utmParams")
      if (!storedUtmParams) return

      const utmParams = JSON.parse(storedUtmParams)

      // Find all RD Station forms
      const forms = document.querySelectorAll('form[action*="rdstation"], form[action*="rd.services"]')

      forms.forEach((form) => {
        // Check if UTM fields already exist
        Object.entries(utmParams).forEach(([key, value]) => {
          let input = form.querySelector(`input[name="${key}"]`) as HTMLInputElement

          // Create input if it doesn't exist
          if (!input) {
            input = document.createElement("input")
            input.type = "hidden"
            input.name = key
            form.appendChild(input)
          }

          // Set value
          input.value = value
        })
      })
    }

    // Run initially and set interval to keep checking (RD might load forms dynamically)
    addUtmToRdForms()
    const interval = setInterval(addUtmToRdForms, 2000)

    return () => clearInterval(interval)
  }, [])

  return null
}
