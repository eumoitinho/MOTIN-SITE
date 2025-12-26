"use client"

type LeadPayload = {
  email?: string
  name?: string
  source?: string
}

const SESSION_KEY = "rdLeadConversion:fired"
const DEFAULT_SOURCE = "rdstation_popup"
const CATEGORY = "contato"
const CONTENT_TYPE = "formulario"

function ensureDataLayer() {
  if (typeof window === "undefined") return
  window.dataLayer = window.dataLayer || []
}

function normalizeEmail(email?: string) {
  return (email || "").trim().toLowerCase()
}

function getLeadSource(explicitSource?: string) {
  if (explicitSource) return explicitSource
  if (typeof window !== "undefined" && (window as any).__rdLeadLastSource) {
    return (window as any).__rdLeadLastSource as string
  }
  return DEFAULT_SOURCE
}

function toSnake(input?: string) {
  if (!input) return ""
  return input.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "")
}

function rememberLead(key: string) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    const list = raw ? raw.split(",").filter(Boolean) : []
    list.push(key)
    sessionStorage.setItem(SESSION_KEY, list.slice(-50).join(","))
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

function hasLead(key: string) {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return false
    return raw.split(",").includes(key)
  } catch {
    return false
  }
}

/**
 * Empurra um único evento de conversão para o dataLayer.
 * Idempotente por email+fonte dentro da sessão.
 */
export function pushRdLeadConversionOnce(payload: LeadPayload) {
  if (typeof window === "undefined") return
  const email = normalizeEmail(payload.email)
  const name = (payload.name || "").trim()
  const source = getLeadSource(payload.source)
  const label = toSnake(source)
  if (!email) {
    if (localStorage.getItem("debug:tracking")) {
      console.debug("[rdLeadConversion] ignorado sem email", { source })
    }
    return
  }

  const dedupeKey = email
  if (hasLead(dedupeKey)) {
    return
  }

  rememberLead(dedupeKey)
  ensureDataLayer()

  const dlPayload = {
    event: "sendEvent",
    eventGA4: "generate_lead",
    category: CATEGORY,
    content_type: CONTENT_TYPE,
    label,
    rdLeadEmail: email,
    rdLeadName: name,
    rdLeadSource: source,
  }

  ;(window as any).dataLayer.push(dlPayload)

  if (localStorage.getItem("debug:tracking")) {
    console.debug("[rdLeadConversion] pushed", dlPayload)
  }
}

/**
 * Abre o popup do RD Station de forma consistente e registra a última fonte.
 */
export function openRdStationPopup(e?: { preventDefault?: () => void }, source?: string) {
  if (e?.preventDefault) e.preventDefault()
  if (typeof window === "undefined") return

  ;(window as any).__rdLeadLastSource = getLeadSource(source)

  if ((window as any).RdstationPopup && typeof (window as any).RdstationPopup.open === "function") {
    ;(window as any).RdstationPopup.open()
    return
  }

  // Fallback: tenta acionar o botão flutuante padrão do RD Station
  const rdFloatingButton = document.getElementById("rd-floating_button-lfvfzlpr")
  if (rdFloatingButton) {
    rdFloatingButton.click()
    return
  }

  console.error("Popup do RD Station não disponível ou não inicializado.")
}

/**
 * Lê dados básicos de um formulário RD (email/nome) e dispara a conversão.
 */
export function pushLeadFromForm(form: HTMLFormElement, source?: string) {
  const emailField = form.querySelector<HTMLInputElement>('input[type="email"], input[name*="email" i], input[id*="email" i]')
  const nameField = form.querySelector<HTMLInputElement>('input[name*="name" i], input[name*="nome" i], input[id*="name" i], input[id*="nome" i]')

  const email = emailField?.value
  const name = nameField?.value

  pushRdLeadConversionOnce({ email, name, source })
}
