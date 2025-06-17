"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, AnimatePresence } from "framer-motion"
import { RDStationAPI } from "@/lib/rd-station"

interface WhatsAppData {
  name: string
  email: string
  phone: string
  company: string
  message: string
}

export function CustomWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<WhatsAppData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<WhatsAppData>>({})

  // Validação de email corporativo (similar ao RD Station)
  const validateCorporateEmail = (email: string): boolean => {
    const personalDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'icloud.com', 'aol.com']
    const domain = email.split('@')[1]?.toLowerCase()
    return domain ? !personalDomains.includes(domain) : false
  }

  // Validação de telefone brasileiro
  const validateBrazilianPhone = (phone: string): boolean => {
    const cleanPhone = phone.replace(/\D/g, '')
    return cleanPhone.length >= 10 && cleanPhone.length <= 11
  }

  // Validação do formulário
  const validateForm = (): boolean => {
    const newErrors: Partial<WhatsAppData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    } else if (!validateCorporateEmail(formData.email)) {
      newErrors.email = "Insira um endereço de email corporativo"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    } else if (!validateBrazilianPhone(formData.phone)) {
      newErrors.phone = "Telefone inválido"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Empresa é obrigatória"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Formatação de telefone brasileiro
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Capturar UTMs e dados da página
      const utmParams = RDStationAPI.captureUTMParams()
      const pageData = {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer
      }

      // Enviar dados para RD Station
      await RDStationAPI.sendConversion({
        email: formData.email,
        name: formData.name,
        mobile_phone: formData.phone.replace(/\D/g, ''), // Apenas números
        company: formData.company,
        custom_fields: {
          message: formData.message,
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_content: utmParams.utm_content,
          utm_term: utmParams.utm_term,
          page_url: pageData.url,
          page_title: pageData.title,
          referrer: pageData.referrer,
          source: 'WhatsApp Personalizado'
        }
      })

      // Criar mensagem para WhatsApp
      const whatsappMessage = `Olá! Meu nome é ${formData.name}.

🏢 Empresa: ${formData.company}
📧 Email: ${formData.email}
📱 Telefone: ${formData.phone}

💬 Mensagem: ${formData.message}

Gostaria de saber mais sobre os serviços da Motin Films!`

      // Número do WhatsApp da empresa
      const whatsappNumber = "554191425126" // Número real da Motin Films
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

      // Abrir WhatsApp
      window.open(whatsappURL, '_blank')

      // Limpar formulário e fechar modal
      setFormData({ name: "", email: "", phone: "", company: "", message: "" })
      setErrors({})
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao processar envio:', error)
      // Mesmo com erro no RD Station, ainda abre o WhatsApp
      const whatsappMessage = `Olá! Meu nome é ${formData.name}. Gostaria de saber mais sobre os serviços da Motin Films!`
      const whatsappNumber = "554191425126"
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
      window.open(whatsappURL, '_blank')
      
      setFormData({ name: "", email: "", phone: "", company: "", message: "" })
      setErrors({})
      setIsOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof WhatsAppData, value: string) => {
    let formattedValue = value

    // Formatação especial para telefone
    if (field === 'phone') {
      formattedValue = formatPhone(value)
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }))
    
    // Limpar erro do campo quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  // Esconder completamente o botão e modal do RD Station
  useEffect(() => {
    const hideRDStation = () => {
      // Esconder todos os elementos relacionados ao RD Station
      const rdElements = document.querySelectorAll(`
        [data-rd-button], 
        .rd-button, 
        #rd-button,
        [class*="rd-"], 
        [id*="rd-"],
        [class*="RD"],
        [id*="RD"],
        iframe[src*="rdstation"],
        div[class*="modal"][style*="display: block"],
        .rd-modal,
        .rd-overlay,
        [data-rd-modal],
        [data-rd-overlay],
        [class*="popup"],
        [id*="popup"]
      `)
      
      rdElements.forEach(element => {
        if (element instanceof HTMLElement) {
          element.style.display = 'none !important'
          element.style.visibility = 'hidden !important'
          element.style.opacity = '0 !important'
          element.style.zIndex = '-9999 !important'
          element.style.position = 'absolute !important'
          element.style.left = '-9999px !important'
          element.style.top = '-9999px !important'
        }
      })

      // Adicionar CSS para esconder elementos do RD Station
      if (!document.getElementById('hide-rd-station-style')) {
        const style = document.createElement('style')
        style.id = 'hide-rd-station-style'
        style.textContent = `
          [data-rd-button],
          .rd-button,
          #rd-button,
          [class*="rd-"],
          [id*="rd-"],
          [class*="RD"],
          [id*="RD"],
          iframe[src*="rdstation"],
          .rd-modal,
          .rd-overlay,
          [data-rd-modal],
          [data-rd-overlay],
          [class*="popup"],
          [id*="popup"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            z-index: -9999 !important;
            position: absolute !important;
            left: -9999px !important;
            top: -9999px !important;
          }
        `
        document.head.appendChild(style)
      }
    }

    // Executar imediatamente
    hideRDStation()
    
    // Executar após delays para garantir que elementos dinâmicos sejam escondidos
    const timers = [500, 1000, 2000, 5000].map(delay => 
      setTimeout(hideRDStation, delay)
    )
    
    // Executar periodicamente
    const interval = setInterval(hideRDStation, 3000)

    // Observer para detectar novos elementos do RD Station
    const observer = new MutationObserver(() => {
      hideRDStation()
    })
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'style']
    })

    return () => {
      timers.forEach(clearTimeout)
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Botão Flutuante do WhatsApp */}
      <div className="fixed bottom-6 right-6 z-[9999]">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group relative cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
          aria-label="Abrir WhatsApp"
        >
          <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
          
          {/* Pulse animation */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Fale conosco via WhatsApp
          </div>
        </motion.button>
      </div>

      {/* Modal do Formulário */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <MessageCircle size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Fale Conosco</h3>
                    <p className="text-sm text-gray-400">Envie sua mensagem via WhatsApp</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <Input
                    type="text"
                    placeholder="Sua empresa"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    required
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.company ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.company && <p className="text-red-400 text-xs mt-1">{errors.company}</p>}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Seu email corporativo"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <Input
                    type="tel"
                    placeholder="Seu telefone/WhatsApp"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    maxLength={15}
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary ${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <Textarea
                    placeholder="Como podemos ajudar você?"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    required
                    rows={3}
                    className={`bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary resize-none ${
                      errors.message ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Enviar via WhatsApp</span>
                    </>
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Seus dados são protegidos e não serão compartilhados.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

