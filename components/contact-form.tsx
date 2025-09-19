"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { track } from "@/lib/tracking"

interface ContactFormProps {
  dictionary?: any
}

export function ContactForm({ dictionary }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  })
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})
  const { toast } = useToast()

  // Extract UTM parameters from localStorage
  useEffect(() => {
    const storedUtmParams = localStorage.getItem("utmParams")
    if (storedUtmParams) {
      setUtmParams(JSON.parse(storedUtmParams))
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for RD Station
      const rdStationData = {
        ...formData,
        ...utmParams,
        identificador: "contato-pagina",
        token_rdstation: process.env.NEXT_PUBLIC_RD_STATION_TOKEN || "",
      }

      // Send to RD Station
      const response = await fetch("/api/rd-station", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rdStationData),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar formulário")
      }

      track('lead_submit', {
        form_id: 'contato_pagina',
        status: 'success',
        channel: 'site',
        submission_type: 'rdstation_api'
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      })

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      })
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      track('lead_submit', {
        form_id: 'contato_pagina',
        status: 'error',
        channel: 'site'
      })
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const labels = dictionary?.contact?.form || {
    name: "Seu Nome*:",
    email: "Email Corporativo*:",
    phone: "Telefone com DDD*:",
    company: "Nome da Empresa:",
    message: "Mensagem:",
    sending: "Enviando...",
    submit: "Enviar",
  }

  return (
    <div className="bg-[#001a1a] p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4" data-form-id="contato-pagina">
        <div>
          <Label htmlFor="name" className="block text-sm mb-1">
            {labels.name}
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <Label htmlFor="email" className="block text-sm mb-1">
            {labels.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="block text-sm mb-1">
            {labels.phone}
          </Label>
          <Input
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <Label htmlFor="company" className="block text-sm mb-1">
            {labels.company}
          </Label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <Label htmlFor="message" className="block text-sm mb-1">
            {labels.message}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>

        {/* Add hidden UTM fields */}
        {Object.entries(utmParams).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              {labels.sending}
            </>
          ) : (
            labels.submit
          )}
        </Button>
      </form>
    </div>
  )
}
