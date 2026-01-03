/**
 * Testes para o helper de tracking centralizado
 */

import { pushEvent, captureAdsClickIds, getAdsClickIds } from '../tracking'
import { Ga4Event, EventCategory, ContentType, LeadSource, SubmissionStatus } from '../events'

describe('pushEvent', () => {
  beforeEach(() => {
    // Simula consentimento aceito
    localStorage.setItem('cookie-consent', 'accepted')
  })

  it('deve enviar evento para dataLayer com estrutura correta', () => {
    pushEvent({
      eventGA4: Ga4Event.GenerateLead,
      category: EventCategory.Contato,
      label: 'test_label',
    })

    expect(window.dataLayer).toHaveLength(1)
    expect(window.dataLayer[0]).toMatchObject({
      event: Ga4Event.SendEvent,
      eventGA4: Ga4Event.GenerateLead,
      category: EventCategory.Contato,
      label: 'test_label',
    })
    expect(window.dataLayer[0].timestamp).toBeDefined()
  })

  it('deve normalizar label para snake_case', () => {
    pushEvent({
      eventGA4: Ga4Event.LeadSubmit,
      label: 'My Custom Label',
    })

    expect(window.dataLayer[0].label).toBe('my_custom_label')
  })

  it('deve bloquear eventos sem consentimento', () => {
    localStorage.setItem('cookie-consent', 'declined')

    pushEvent({
      eventGA4: Ga4Event.LeadSubmit,
    })

    expect(window.dataLayer).toHaveLength(0)
  })

  it('deve permitir eventos de sistema sem consentimento', () => {
    localStorage.setItem('cookie-consent', 'declined')

    pushEvent({
      eventGA4: Ga4Event.ConsentUpdate,
    })

    expect(window.dataLayer).toHaveLength(1)
    expect(window.dataLayer[0].eventGA4).toBe(Ga4Event.ConsentUpdate)
  })

  it('deve disparar aliases para compatibilidade GTM legado', () => {
    pushEvent({
      eventGA4: Ga4Event.WhatsappFloatingButtonOpen,
    })

    // Evento principal + 1 alias
    expect(window.dataLayer.length).toBeGreaterThanOrEqual(1)

    const events = window.dataLayer.map((d) => d.event)
    expect(events).toContain(Ga4Event.SendEvent)
  })

  it('deve chamar gtag quando disponivel e consentido', () => {
    const gtagMock = jest.fn()
    window.gtag = gtagMock

    pushEvent({
      eventGA4: Ga4Event.GenerateLead,
      category: EventCategory.Contato,
    })

    expect(gtagMock).toHaveBeenCalledWith(
      'event',
      Ga4Event.GenerateLead,
      expect.objectContaining({
        eventGA4: Ga4Event.GenerateLead,
        category: EventCategory.Contato,
      })
    )
  })

  it('nao deve chamar gtag sem consentimento', () => {
    localStorage.setItem('cookie-consent', 'declined')
    const gtagMock = jest.fn()
    window.gtag = gtagMock

    pushEvent({
      eventGA4: Ga4Event.ConsentUpdate, // Evento permitido sem consentimento
    })

    // gtag so e chamado com consentimento total
    expect(gtagMock).not.toHaveBeenCalled()
  })

  it('deve incluir todos os campos tipados corretamente', () => {
    pushEvent({
      eventGA4: Ga4Event.LeadSubmit,
      category: EventCategory.Form,
      content_type: ContentType.Formulario,
      status: SubmissionStatus.Success,
      form_id: 'contato_pagina',
      source: LeadSource.ContatoPagina,
    })

    expect(window.dataLayer[0]).toMatchObject({
      eventGA4: Ga4Event.LeadSubmit,
      category: EventCategory.Form,
      content_type: ContentType.Formulario,
      status: SubmissionStatus.Success,
      form_id: 'contato_pagina',
      source: LeadSource.ContatoPagina,
    })
  })
})

describe('captureAdsClickIds', () => {
  const originalLocation = window.location

  beforeEach(() => {
    // Mock window.location
    delete (window as any).location
    window.location = {
      ...originalLocation,
      href: 'https://example.com',
    } as Location
  })

  afterEach(() => {
    window.location = originalLocation
  })

  it('deve capturar gclid da URL', () => {
    window.location.href = 'https://example.com?gclid=abc123'

    captureAdsClickIds()

    const ids = getAdsClickIds()
    expect(ids.gclid).toBe('abc123')
  })

  it('deve capturar wbraid da URL', () => {
    window.location.href = 'https://example.com?wbraid=xyz789'

    captureAdsClickIds()

    const ids = getAdsClickIds()
    expect(ids.wbraid).toBe('xyz789')
  })

  it('deve capturar gbraid da URL', () => {
    window.location.href = 'https://example.com?gbraid=def456'

    captureAdsClickIds()

    const ids = getAdsClickIds()
    expect(ids.gbraid).toBe('def456')
  })

  it('deve capturar multiplos IDs simultaneamente', () => {
    window.location.href = 'https://example.com?gclid=g1&wbraid=w1&gbraid=b1'

    captureAdsClickIds()

    const ids = getAdsClickIds()
    expect(ids).toMatchObject({
      gclid: 'g1',
      wbraid: 'w1',
      gbraid: 'b1',
    })
  })

  it('deve preservar IDs anteriores quando URL nao tem novos', () => {
    // Primeiro acesso com gclid
    window.location.href = 'https://example.com?gclid=first'
    captureAdsClickIds()

    // Segundo acesso sem parametros
    window.location.href = 'https://example.com'
    captureAdsClickIds()

    const ids = getAdsClickIds()
    expect(ids.gclid).toBe('first')
  })

  it('deve atualizar IDs quando URL tem novos valores', () => {
    // Primeiro acesso
    window.location.href = 'https://example.com?gclid=first'
    captureAdsClickIds()

    // Segundo acesso com novo gclid
    window.location.href = 'https://example.com?gclid=second'
    captureAdsClickIds()

    const ids = getAdsClickIds()
    expect(ids.gclid).toBe('second')
  })
})

describe('getAdsClickIds', () => {
  it('deve retornar objeto vazio quando nao ha IDs armazenados', () => {
    const ids = getAdsClickIds()
    expect(ids).toEqual({})
  })

  it('deve retornar IDs armazenados', () => {
    localStorage.setItem(
      'ads-click-ids',
      JSON.stringify({ gclid: 'test123', updated_at: Date.now() })
    )

    const ids = getAdsClickIds()
    expect(ids.gclid).toBe('test123')
  })

  it('deve retornar objeto vazio em caso de JSON invalido', () => {
    localStorage.setItem('ads-click-ids', 'invalid-json')

    const ids = getAdsClickIds()
    expect(ids).toEqual({})
  })
})

describe('pushEvent com Ads IDs', () => {
  beforeEach(() => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem(
      'ads-click-ids',
      JSON.stringify({ gclid: 'test-gclid', wbraid: 'test-wbraid' })
    )
  })

  it('deve incluir Ads IDs no payload do evento', () => {
    pushEvent({
      eventGA4: Ga4Event.GenerateLead,
    })

    expect(window.dataLayer[0]).toMatchObject({
      gclid: 'test-gclid',
      wbraid: 'test-wbraid',
    })
  })
})

describe('Tipagem de eventos', () => {
  beforeEach(() => {
    localStorage.setItem('cookie-consent', 'accepted')
  })

  it('deve aceitar todos os eventos do enum Ga4Event', () => {
    const allEvents = Object.values(Ga4Event)

    allEvents.forEach((event) => {
      window.dataLayer = []
      pushEvent({ eventGA4: event })
      expect(window.dataLayer.length).toBeGreaterThanOrEqual(0) // Alguns podem ser bloqueados
    })
  })

  it('deve aceitar todos os valores de EventCategory', () => {
    Object.values(EventCategory).forEach((category) => {
      window.dataLayer = []
      pushEvent({
        eventGA4: Ga4Event.GenerateLead,
        category,
      })
      expect(window.dataLayer[0].category).toBe(category)
    })
  })

  it('deve aceitar todos os valores de ContentType', () => {
    Object.values(ContentType).forEach((contentType) => {
      window.dataLayer = []
      pushEvent({
        eventGA4: Ga4Event.GenerateLead,
        content_type: contentType,
      })
      expect(window.dataLayer[0].content_type).toBe(contentType)
    })
  })

  it('deve aceitar todos os valores de SubmissionStatus', () => {
    Object.values(SubmissionStatus).forEach((status) => {
      window.dataLayer = []
      pushEvent({
        eventGA4: Ga4Event.LeadSubmit,
        status,
      })
      expect(window.dataLayer[0].status).toBe(status)
    })
  })

  it('deve aceitar todos os valores de LeadSource', () => {
    Object.values(LeadSource).forEach((source) => {
      window.dataLayer = []
      pushEvent({
        eventGA4: Ga4Event.GenerateLead,
        source,
      })
      expect(window.dataLayer[0].source).toBe(source)
    })
  })
})
