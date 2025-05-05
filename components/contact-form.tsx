"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ContactFormProps {
  dictionary: any
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
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Enviar dados para o RDStation
      const response = await fetch("/api/rd-station", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          conversion_identifier: "contact-form",
          source: "contact-page",
        }),
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar formulário")
      }

      // Resetar o formulário
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
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#001a1a] p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="block text-sm mb-1">
            {dictionary.contact.form.name}
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
            {dictionary.contact.form.email}
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
            {dictionary.contact.form.phone}
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
            {dictionary.contact.form.company}
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
            Mensagem:
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              {dictionary.contact.form.sending}
            </>
          ) : (
            dictionary.contact.form.submit
          )}
        </Button>
      </form>
    </div>
  )
}
