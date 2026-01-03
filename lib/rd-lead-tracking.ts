"use client"

/**
 * RD Station Lead Tracking
 *
 * Responsavel por rastrear conversoes de leads do RD Station
 * com deduplicacao por sessao.
 */

import { pushEvent } from './tracking'
import {
  Ga4Event,
  EventCategory,
  ContentType,
  LeadSource,
  type RdLeadPayload,
} from './events'

// ============================================================================
// CONSTANTES
// ============================================================================

const SESSION_KEY = 'rdLeadConversion:fired'
const DEFAULT_SOURCE = LeadSource.RdstationPopup

// ============================================================================
// HELPERS INTERNOS
// ============================================================================

function normalizeEmail(email?: string): string {
  return (email || '').trim().toLowerCase()
}

function getLeadSource(explicitSource?: string): string {
  if (explicitSource) return explicitSource
  if (typeof window !== 'undefined' && (window as any).__rdLeadLastSource) {
    return (window as any).__rdLeadLastSource as string
  }
  return DEFAULT_SOURCE
}

function toSnakeCase(input?: string): string {
  if (!input) return ''
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function rememberLead(key: string): void {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    const list = raw ? raw.split(',').filter(Boolean) : []
    list.push(key)
    sessionStorage.setItem(SESSION_KEY, list.slice(-50).join(','))
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

function hasLead(key: string): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return false
    return raw.split(',').includes(key)
  } catch {
    return false
  }
}

// ============================================================================
// FUNCOES PUBLICAS
// ============================================================================

/**
 * Empurra um evento de conversao de lead para o dataLayer.
 * Idempotente por email dentro da sessao.
 *
 * @param payload - Dados do lead (email, name, source)
 *
 * @example
 * pushRdLeadConversionOnce({
 *   email: 'user@example.com',
 *   name: 'John Doe',
 *   source: LeadSource.FloatingWhatsappForm,
 * })
 */
export function pushRdLeadConversionOnce(payload: RdLeadPayload): void {
  if (typeof window === 'undefined') return

  const email = normalizeEmail(payload.email)
  const name = (payload.name || '').trim()
  const source = getLeadSource(payload.source)
  const label = toSnakeCase(source)

  if (!email) {
    if (localStorage.getItem('debug:tracking')) {
      console.debug('[rdLeadConversion] ignorado sem email', { source })
    }
    return
  }

  // Deduplicacao por email na sessao
  if (hasLead(email)) {
    return
  }

  rememberLead(email)

  // Usa pushEvent centralizado
  pushEvent({
    eventGA4: Ga4Event.GenerateLead,
    category: EventCategory.Contato,
    content_type: ContentType.Formulario,
    label,
    rdLeadEmail: email,
    rdLeadName: name,
    rdLeadSource: source,
  })
}

/**
 * Abre o popup do RD Station de forma consistente e registra a ultima fonte.
 *
 * @param e - Evento do click (opcional, para preventDefault)
 * @param source - Fonte do lead para tracking
 */
export function openRdStationPopup(
  e?: { preventDefault?: () => void },
  source?: string
): void {
  if (e?.preventDefault) e.preventDefault()
  if (typeof window === 'undefined') return

  ;(window as any).__rdLeadLastSource = getLeadSource(source)

  if (
    (window as any).RdstationPopup &&
    typeof (window as any).RdstationPopup.open === 'function'
  ) {
    ;(window as any).RdstationPopup.open()
    return
  }

  // Fallback: tenta acionar o botao flutuante padrao do RD Station
  const rdFloatingButton = document.getElementById('rd-floating_button-lfvfzlpr')
  if (rdFloatingButton) {
    rdFloatingButton.click()
    return
  }

  console.error('Popup do RD Station nao disponivel ou nao inicializado.')
}

/**
 * Le dados basicos de um formulario RD (email/nome) e dispara a conversao.
 *
 * @param form - Elemento do formulario
 * @param source - Fonte do lead
 */
export function pushLeadFromForm(form: HTMLFormElement, source?: string): void {
  const emailField = form.querySelector<HTMLInputElement>(
    'input[type="email"], input[name*="email" i], input[id*="email" i]'
  )
  const nameField = form.querySelector<HTMLInputElement>(
    'input[name*="name" i], input[name*="nome" i], input[id*="name" i], input[id*="nome" i]'
  )

  const email = emailField?.value
  const name = nameField?.value

  pushRdLeadConversionOnce({ email, name, source })
}
