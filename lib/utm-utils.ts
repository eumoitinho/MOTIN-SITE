export function captureUtmParams() {
  if (typeof window === "undefined") return

  try {
    const url = new URL(window.location.href)
    const utmParams: Record<string, string> = {}

    // Get UTM parameters from URL
    const utmSource = url.searchParams.get("utm_source")
    const utmMedium = url.searchParams.get("utm_medium")
    const utmCampaign = url.searchParams.get("utm_campaign")
    const utmTerm = url.searchParams.get("utm_term")
    const utmContent = url.searchParams.get("utm_content")

    // Add parameters to object if they exist
    if (utmSource) utmParams.traffic_source = utmSource
    if (utmMedium) utmParams.traffic_medium = utmMedium
    if (utmCampaign) utmParams.traffic_campaign = utmCampaign
    if (utmTerm) utmParams.traffic_value = utmTerm
    if (utmContent) utmParams.traffic_content = utmContent

    // Store in localStorage if we have any UTM parameters
    if (Object.keys(utmParams).length > 0) {
      localStorage.setItem("utmParams", JSON.stringify(utmParams))
    }

    return utmParams
  } catch (error) {
    console.error("Error capturing UTM parameters:", error)
    return {}
  }
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {}

  try {
    // Try to get from localStorage first
    const storedParams = localStorage.getItem("utmParams")
    if (storedParams) {
      return JSON.parse(storedParams)
    }

    // If not in localStorage, capture from URL
    return captureUtmParams() || {}
  } catch (error) {
    console.error("Error getting UTM parameters:", error)
    return {}
  }
}

export function appendUtmToUrl(url: string): string {
  if (typeof window === "undefined") return url

  const utmParams = getUtmParams()
  if (!Object.keys(utmParams).length) return url

  const urlObj = new URL(url, window.location.origin)

  // Add UTM parameters to URL
  Object.entries(utmParams).forEach(([key, value]) => {
    urlObj.searchParams.set(key, value)
  })

  return urlObj.toString()
}
