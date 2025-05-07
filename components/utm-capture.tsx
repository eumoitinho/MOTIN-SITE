"use client"

import { useEffect } from "react"
import { captureUtmParams } from "@/lib/utm-utils"

export function UtmCapture() {
  useEffect(() => {
    captureUtmParams()
  }, [])

  return null
}
