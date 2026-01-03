/**
 * Central Tracking Helper
 *
 * Responsavel por padronizar push no dataLayer e gtag (quando consentido).
 * Inclui captura de identificadores de Ads (gclid, wbraid, gbraid).
 *
 * USO:
 *   import { pushEvent } from '@/lib/tracking'
 *   import { Ga4Event, EventCategory } from '@/lib/events'
 *
 *   pushEvent({
 *     eventGA4: Ga4Event.GenerateLead,
 *     category: EventCategory.Contato,
 *     label: 'contato_pagina',
 *   })
 */

import {
  type PushEventPayload,
  type TrackingPayload,
  Ga4Event,
  CONSENT_FREE_EVENTS,
  getEventAliases,
} from './events'

// ============================================================================
// CONSTANTES
// ============================================================================

const CONSENT_KEY = 'cookie-consent'
const ADS_IDS_KEY = 'ads-click-ids'
const DEBUG_KEY = 'debug:tracking'
const DISABLE_LEGACY = process.env.NEXT_PUBLIC_DISABLE_LEGACY_TRACKING === 'true'

// ============================================================================
// TIPOS INTERNOS
// ============================================================================

interface AdsClickIds {
  gclid?: string
  wbraid?: string
  gbraid?: string
  updated_at?: number
}

// ============================================================================
// HELPERS INTERNOS
// ============================================================================

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function hasConsent(): boolean {
  if (!isBrowser()) return false
  return localStorage.getItem(CONSENT_KEY) === 'accepted'
}

function isDebugMode(): boolean {
  if (!isBrowser()) return false
  return localStorage.getItem(DEBUG_KEY) === 'true'
}

function ensureDataLayer(): void {
  if (!isBrowser()) return
  window.dataLayer = window.dataLayer || []
}

function toSnakeCase(input: string | undefined): string {
  if (!input) return ''
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

// ============================================================================
// ADS CLICK IDS
// ============================================================================

/**
 * Captura IDs de cliques de anuncios da URL (gclid, wbraid, gbraid)
 * e armazena em localStorage para atribuicao posterior.
 */
export function captureAdsClickIds(): void {
  if (!isBrowser()) return

  try {
    const url = new URL(window.location.href)
    const gclid = url.searchParams.get('gclid')
    const wbraid = url.searchParams.get('wbraid')
    const gbraid = url.searchParams.get('gbraid')

    if (!gclid && !wbraid && !gbraid) return

    const storedRaw = localStorage.getItem(ADS_IDS_KEY)
    const stored: AdsClickIds = storedRaw ? JSON.parse(storedRaw) : {}

    const updated: AdsClickIds = {
      ...stored,
      gclid: gclid || stored.gclid,
      wbraid: wbraid || stored.wbraid,
      gbraid: gbraid || stored.gbraid,
      updated_at: Date.now(),
    }

    localStorage.setItem(ADS_IDS_KEY, JSON.stringify(updated))
  } catch (e) {
    console.warn('[tracking] erro ao capturar ids de ads', e)
  }
}

/**
 * Recupera IDs de cliques de anuncios armazenados
 */
export function getAdsClickIds(): AdsClickIds {
  if (!isBrowser()) return {}

  try {
    const raw = localStorage.getItem(ADS_IDS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// ============================================================================
// FUNCAO PRINCIPAL: pushEvent
// ============================================================================

/**
 * Envia evento para dataLayer e gtag de forma centralizada.
 *
 * @param payload - Dados do evento com tipagem estrita
 *
 * @example
 * pushEvent({
 *   eventGA4: Ga4Event.GenerateLead,
 *   category: EventCategory.Contato,
 *   label: 'floating_whatsapp',
 * })
 */
export function pushEvent(payload: PushEventPayload): void {
  if (!isBrowser()) return

  ensureDataLayer()

  const eventName = payload.eventGA4
  const isConsentFree = CONSENT_FREE_EVENTS.includes(eventName as Ga4Event)
  const hasUserConsent = hasConsent()

  // Bloqueia eventos que requerem consentimento
  if (!hasUserConsent && !isConsentFree) {
    if (isDebugMode()) {
      console.debug('[tracking] bloqueado sem consentimento:', eventName)
    }
    return
  }

  // Injeta ads IDs e timestamp
  const adsIds = getAdsClickIds()
  const label = payload.label ? toSnakeCase(payload.label) : undefined

  // Desestrutura para evitar duplicacao de eventGA4
  const { eventGA4: _, ...restPayload } = payload

  const dlPayload: TrackingPayload = {
    event: eventName, // Evento principal = eventGA4 para GTM disparar tags corretamente
    eventGA4: eventName,
    ...restPayload,
    ...(label && { label }),
    ...adsIds,
    timestamp: Date.now(),
  }

  // Push para dataLayer com evento principal (ex: complete_whatsapp, initiate_whatsapp)
  window.dataLayer.push(dlPayload)

  // Tambem dispara sendEvent para triggers que usam esse padrao no GTM
  window.dataLayer.push({
    ...dlPayload,
    event: Ga4Event.SendEvent,
  })

  // Push para gtag se disponivel e consentido
  if (window.gtag && hasUserConsent) {
    const { timestamp, event, ...gtagParams } = dlPayload
    window.gtag('event', eventName, gtagParams)
  }

  // Dispara aliases para compatibilidade GTM legado
  if (!DISABLE_LEGACY) {
    const aliases = getEventAliases(eventName as Ga4Event)
    aliases.forEach((alias) => {
      window.dataLayer.push({
        ...dlPayload,
        event: alias,
        eventGA4: eventName,
      })
    })
  }

  if (isDebugMode()) {
    console.debug('[tracking] pushEvent:', dlPayload)
  }
}

// ============================================================================
// FUNCOES LEGADAS (para compatibilidade durante migracao)
// ============================================================================

/**
 * @deprecated Use pushEvent() com Ga4Event tipado
 */
export function track(event: string, params: Record<string, unknown> = {}): void {
  if (!isBrowser()) return

  ensureDataLayer()

  const isConsentFree = ['consent_update', 'diagnostic'].includes(event)
  if (!hasConsent() && !isConsentFree) return

  const adsIds = getAdsClickIds()

  const payload: TrackingPayload = {
    event,
    ...params,
    ...adsIds,
    timestamp: Date.now(),
  }

  window.dataLayer.push(payload)

  if (window.gtag && hasConsent()) {
    const { timestamp, ...gtagParams } = payload
    window.gtag('event', event, gtagParams)
  }

  if (isDebugMode()) {
    console.debug('[tracking] track (legado):', payload)
  }
}

/**
 * @deprecated Use pushEvent() - aliases sao disparados automaticamente
 */
export function trackWithAliases(
  event: string,
  aliases: string[],
  params: Record<string, unknown> = {}
): void {
  track(event, params)
  if (DISABLE_LEGACY) return
  aliases.forEach((alias) => track(alias, params))
}

// ============================================================================
// AUTO-INIT
// ============================================================================

// Captura IDs de anuncios na carga inicial
if (isBrowser()) {
  captureAdsClickIds()
}
