// Central tracking helper
// Responsável por padronizar push no dataLayer e gtag (quando consentido)
// Inclui captura de identificadores de Ads (gclid, wbraid, gbraid)

interface TrackParams {
  [key: string]: any
}

const CONSENT_KEY = 'cookie-consent'
const ADS_IDS_KEY = 'ads-click-ids'

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CONSENT_KEY) === 'accepted'
}

function ensureDataLayer() {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
}

export function captureAdsClickIds() {
  if (typeof window === 'undefined') return
  try {
    const url = new URL(window.location.href)
    const gclid = url.searchParams.get('gclid')
    const wbraid = url.searchParams.get('wbraid')
    const gbraid = url.searchParams.get('gbraid')

    if (!gclid && !wbraid && !gbraid) return

    const storedRaw = localStorage.getItem(ADS_IDS_KEY)
    const stored = storedRaw ? JSON.parse(storedRaw) : {}

    const updated = {
      ...stored,
      gclid: gclid || stored.gclid,
      wbraid: wbraid || stored.wbraid,
      gbraid: gbraid || stored.gbraid,
      updated_at: Date.now()
    }
    localStorage.setItem(ADS_IDS_KEY, JSON.stringify(updated))
  } catch (e) {
    console.warn('[tracking] erro ao capturar ids de ads', e)
  }
}

export function getAdsClickIds() {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(ADS_IDS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

export function track(event: string, params: TrackParams = {}) {
  if (typeof window === 'undefined') return
  ensureDataLayer()

  // Permitimos sempre eventos de consentimento ou diagnóstico
  const allow = hasConsent() || ['consent_update', 'diagnostic'].includes(event)
  if (!allow) return

  const adsIds = getAdsClickIds()

  const payload = {
    event,
    ...params,
    ...adsIds,
    timestamp: Date.now()
  }

  window.dataLayer.push(payload)

  if ((window as any).gtag && hasConsent()) {
    // Mapeamento simples para eventos GA4 (não enviar payload completo para evitar ruído)
    const { timestamp, ...gtagParams } = payload
  ;(window as any).gtag('event', event, gtagParams)
  }

  if (localStorage.getItem('debug:tracking')) {
    console.debug('[tracking] push', payload)
  }
}

// Auto-capture na carga
if (typeof window !== 'undefined') {
  captureAdsClickIds()
}

// Dispara o evento principal e uma lista de aliases (nomes extras) para compatibilidade com triggers antigos do GTM
export function trackWithAliases(event: string, aliases: string[], params: TrackParams = {}) {
  track(event, params)
  aliases.forEach(a => track(a, params))
}
