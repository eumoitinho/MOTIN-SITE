/**
 * Tracking Events - Definicoes centralizadas de eventos GA4/GTM
 *
 * Este arquivo define todos os eventos de tracking permitidos,
 * garantindo tipagem estrita e prevenindo typos.
 */

// ============================================================================
// ENUMS DE EVENTOS
// ============================================================================

/**
 * Eventos GA4 principais
 */
export enum Ga4Event {
  // Lead & Conversao
  GenerateLead = 'generate_lead',
  LeadSubmit = 'lead_submit',

  // WhatsApp
  InitiateWhatsapp = 'initiate_whatsapp',
  CompleteWhatsapp = 'complete_whatsapp',
  WhatsappFloatingButtonOpen = 'whatsapp_floating_button_open',
  WhatsappLeadSubmit = 'whatsapp_lead_submit',

  // Carreiras
  CareerApplicationSubmit = 'career_application_submit',

  // Sistema
  ConsentUpdate = 'consent_update',
  Diagnostic = 'diagnostic',

  // GTM interno
  SendEvent = 'sendEvent',
}

/**
 * Aliases de eventos para compatibilidade com GTM legado
 * Mapeamento: evento principal -> aliases
 * IMPORTANTE: O GTM dispara tags baseado no campo `event`, entao incluimos
 * os nomes exatos que o GTM espera.
 */
export const EVENT_ALIASES: Partial<Record<Ga4Event, string[]>> = {
  // WhatsApp - clique no botao
  [Ga4Event.WhatsappFloatingButtonOpen]: ['Initiate WhatsApp', 'initiate_whatsapp'],
  [Ga4Event.InitiateWhatsapp]: ['Initiate WhatsApp', 'whatsapp_floating_button_open', 'whatsapp_click'],

  // WhatsApp - envio do formulario
  [Ga4Event.WhatsappLeadSubmit]: ['Complete WhatsApp', 'complete_whatsapp'],
  [Ga4Event.CompleteWhatsapp]: ['Complete WhatsApp', 'whatsapp_lead_submit', 'completewhatsapp'],

  // Lead generation
  [Ga4Event.GenerateLead]: ['generate_lead'],

  // Carreiras
  [Ga4Event.CareerApplicationSubmit]: ['join_our_team'],
}

// ============================================================================
// ENUMS DE CATEGORIAS E LABELS
// ============================================================================

/**
 * Categorias de eventos (dominio do evento)
 */
export enum EventCategory {
  Contato = 'contato',
  Whatsapp = 'whatsapp',
  Form = 'form',
  Careers = 'careers',
  System = 'system',
}

/**
 * Tipos de conteudo
 */
export enum ContentType {
  Formulario = 'formulario',
  Button = 'button',
  Link = 'link',
  Popup = 'popup',
}

/**
 * Status de submissao
 */
export enum SubmissionStatus {
  Success = 'success',
  Error = 'error',
  Submitted = 'submitted',
  Pending = 'pending',
}

/**
 * Fontes de lead
 */
export enum LeadSource {
  RdstationPopup = 'rdstation_popup',
  RdstationPopupButton = 'rdstation_popup_button',
  RdstationPopupForm = 'rdstation_popup_form',
  FloatingWhatsappForm = 'floating_whatsapp_form',
  ContatoPagina = 'contato_pagina',
  CareersPage = 'careers_page',
  Site = 'site',
}

// ============================================================================
// INTERFACES DE PAYLOAD
// ============================================================================

/**
 * Campos permitidos no payload de tracking
 * Lista branca para evitar atributos soltos
 */
export interface TrackingPayload {
  // Evento GA4 (obrigatorio)
  event: Ga4Event | string

  // Mapeamento para GA4 (quando diferente do event)
  eventGA4?: Ga4Event

  // Categorização
  category?: EventCategory | string
  content_type?: ContentType | string
  label?: string

  // Status
  status?: SubmissionStatus | string

  // Identificadores de formulario
  form_id?: string
  submission_type?: string
  channel?: string

  // Lead data
  rdLeadEmail?: string
  rdLeadName?: string
  rdLeadSource?: string
  source?: string

  // Carreiras
  area?: string

  // Ads IDs (injetados automaticamente)
  gclid?: string
  wbraid?: string
  gbraid?: string

  // Metadados
  timestamp?: number

  // Extensao para campos customizados (uso restrito)
  [key: string]: string | number | boolean | undefined
}

/**
 * Payload para eventos de lead RD Station
 */
export interface RdLeadPayload {
  email?: string
  name?: string
  source?: LeadSource | string
}

/**
 * Payload simplificado para pushEvent
 */
export interface PushEventPayload {
  eventGA4: Ga4Event
  category?: EventCategory | string
  label?: string
  content_type?: ContentType | string
  status?: SubmissionStatus | string
  form_id?: string
  source?: LeadSource | string
  area?: string
  [key: string]: string | number | boolean | undefined
}

// ============================================================================
// VALIDACAO
// ============================================================================

/**
 * Lista de eventos que nao requerem consentimento
 */
export const CONSENT_FREE_EVENTS: Ga4Event[] = [
  Ga4Event.ConsentUpdate,
  Ga4Event.Diagnostic,
]

/**
 * Verifica se um evento e valido
 */
export function isValidEvent(event: string): event is Ga4Event {
  return Object.values(Ga4Event).includes(event as Ga4Event)
}

/**
 * Obtem aliases para um evento
 */
export function getEventAliases(event: Ga4Event): string[] {
  return EVENT_ALIASES[event] || []
}
