"use client"

import { useEffect } from "react"

export function RDStationScript() {
  useEffect(() => {
    // Check if RD Station script is already loaded
    if (document.querySelector('script[src*="rdstation-popup.min.js"]')) {
      console.log("RD Station script already loaded")
      return
    }

    // Create and add the RD Station script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://d335luupugsy2.cloudfront.net/js/rdstation-popups/bricks/rdstation-popup.min.js?v=1"
    script.async = true
    script.onload = () => {
      console.log("RD Station popup script loaded successfully")
    }
    script.onerror = (error) => {
      console.error("Error loading RD Station popup script:", error)
    }

    document.body.appendChild(script)

    return () => {
      // Don't remove the script on cleanup to avoid issues
    }
  }, [])

  return null
}
