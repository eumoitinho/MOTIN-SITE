"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { track, trackWithAliases } from "@/lib/tracking"

export function RDStationButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const { toast } = useToast()

  // Hide RD Station's default button
  useEffect(() => {
    const hideRDButton = () => {
      const rdButtons = document.querySelectorAll(
        '.bricks--floating--button, [id^="rd-floating_button"], .rdstation-popup-js-floating-button, [data-rd-popup-id], .rdstation-popup-button',
      )
      rdButtons.forEach((button) => {
        if (button instanceof HTMLElement) {
          button.style.display = "none"
        }
      })
    }

    // Show our button after a delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    // Hide RD Station button initially and periodically
    hideRDButton()
    const interval = setInterval(hideRDButton, 1000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Get UTM parameters from URL or localStorage
      const utmParams = getUtmParams()

      // Prepare data for RD Station
      const rdData = {
        name: formData.name,
        email: formData.email,
        personal_phone: formData.phone,
        cf_message: formData.message,
        identificador: "contato-whatsapp",
        ...utmParams,
      }

      // Send data to RD Station via our API
      const response = await fetch("/api/rd-station", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rdData),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar o formulário")
      }

      trackWithAliases('whatsapp_lead_submit', ['Complete WhatsApp'], {
        source: 'floating_whatsapp_form',
        status: 'success'
      })

      // Show success message
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      })

      // Reset form and close it
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
      setIsFormOpen(false)

      // Track conversion with Google Analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
          event_category: "form",
          event_label: "whatsapp_contact",
          value: 1,
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      track('whatsapp_lead_submit', {
        source: 'floating_whatsapp_form',
        status: 'error'
      })
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get UTM parameters from URL or localStorage
  const getUtmParams = () => {
    const params: Record<string, string> = {}

    // Try to get UTMs from localStorage first
    const storedParams = localStorage.getItem("utmParams")
    if (storedParams) {
      try {
        return JSON.parse(storedParams)
      } catch (e) {
        console.error("Error parsing UTM params from localStorage:", e)
      }
    }

    // If not in localStorage, try to get from URL
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href)
      const utmSource = url.searchParams.get("utm_source")
      const utmMedium = url.searchParams.get("utm_medium")
      const utmCampaign = url.searchParams.get("utm_campaign")
      const utmTerm = url.searchParams.get("utm_term")
      const utmContent = url.searchParams.get("utm_content")

      if (utmSource) params.traffic_source = utmSource
      if (utmMedium) params.traffic_medium = utmMedium
      if (utmCampaign) params.traffic_campaign = utmCampaign
      if (utmTerm) params.traffic_value = utmTerm
      if (utmContent) params.traffic_content = utmContent

      // Store UTMs in localStorage for future use
      if (Object.keys(params).length > 0) {
        localStorage.setItem("utmParams", JSON.stringify(params))
      }
    }

    return params
  }

  return (
    <>
      {/* WhatsApp Button */}
      <AnimatePresence>
        {isVisible && !isFormOpen && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#00B2B2] shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-[#009999]"
            onClick={() => {
              setIsFormOpen(true)
              // Evento principal + alias para compatibilidade com gatilhos antigos
              trackWithAliases('whatsapp_floating_button_open', ['Initiate WhatsApp'], { source: 'floating_whatsapp_form' })
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <MessageCircle size={24} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Custom Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsFormOpen(false)
            }}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl w-full max-w-md overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">Fale Conosco</h2>
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsFormOpen(false)}>
                  <X size={18} />
                  <span className="sr-only">Fechar</span>
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="(00) 00000-0000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    required
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </Button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
