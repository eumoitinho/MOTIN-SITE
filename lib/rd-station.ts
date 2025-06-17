// Utilitário para integração com RD Station
export class RDStationAPI {
  private static readonly CONVERSION_ID = 'wpp-motinfilms'
  private static readonly TOKEN = 'f7d2e974709ae92ccf12d7ffc58929fc'

  static async sendConversion(data: {
    email: string
    name: string
    mobile_phone?: string
    company?: string
    custom_fields?: Record<string, any>
  }) {
    try {
      // Simular o comportamento do script original do RD Station
      // O script usa FormData e XMLHttpRequest, não fetch com JSON
      const formData = new FormData()
      
      // Campos obrigatórios do RD Station
      formData.append('token_rdstation', this.TOKEN)
      formData.append('conversion_identifier', this.CONVERSION_ID)
      formData.append('email', data.email)
      formData.append('name', data.name)
      
      if (data.mobile_phone) {
        formData.append('mobile_phone', data.mobile_phone)
      }
      
      if (data.company) {
        formData.append('company', data.company)
      }

      // Adicionar campos personalizados
      if (data.custom_fields) {
        Object.entries(data.custom_fields).forEach(([key, value]) => {
          if (value) {
            formData.append(key, String(value))
          }
        })
      }

      // Dados de conversão (como no script original)
      formData.append('conversion_url', window.location.href.split('?')[0])
      formData.append('conversion_domain', window.location.hostname)
      
      // Capturar Google Analytics Client ID se disponível
      const gaClientId = this.getGoogleAnalyticsClientId()
      if (gaClientId) {
        formData.append('google_analytics_client_id', gaClientId)
      }

      // Usar XMLHttpRequest como no script original
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        
        xhr.open('POST', 'https://cta-redirect.rdstation.com/v2/conversions', true)
        
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              resolve(xhr.responseText)
            } else {
              reject(new Error(`RD Station API error: ${xhr.status} ${xhr.statusText}`))
            }
          }
        }
        
        xhr.onerror = function() {
          reject(new Error('Network error'))
        }
        
        xhr.send(formData)
      })
    } catch (error) {
      console.error('Erro ao enviar dados para RD Station:', error)
      throw error
    }
  }

  static captureUTMParams(): Record<string, string> {
    if (typeof window === 'undefined') return {}
    
    const urlParams = new URLSearchParams(window.location.search)
    return {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || ''
    }
  }

  private static getGoogleAnalyticsClientId(): string | null {
    try {
      // Tentar capturar Google Analytics Client ID
      if (typeof window !== 'undefined' && (window as any).gtag) {
        return (window as any).gtag('get', 'GA_MEASUREMENT_ID', 'client_id') || null
      }
      
      // Fallback para GA4
      if (typeof window !== 'undefined' && (window as any).ga) {
        const tracker = (window as any).ga.getAll()[0]
        return tracker ? tracker.get('clientId') : null
      }
      
      return null
    } catch (error) {
      console.warn('Não foi possível capturar Google Analytics Client ID:', error)
      return null
    }
  }
}

