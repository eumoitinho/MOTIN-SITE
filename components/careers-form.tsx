"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { pushEvent } from "@/lib/tracking"
import { Ga4Event, SubmissionStatus, LeadSource } from "@/lib/events"

interface CareersFormProps {
  dictionary: any
}

export function CareersForm({ dictionary }: CareersFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    area: "",
    portfolio: "",
    message: "",
  })
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, area: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Criar um FormData para enviar o arquivo
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("area", formData.area)
      formDataToSend.append("portfolio", formData.portfolio)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("conversion_identifier", "careers-form")
      formDataToSend.append("source", "careers-page")

      if (resumeFile) {
        formDataToSend.append("resume", resumeFile)
      }

      // Enviar dados para o RDStation
      const response = await fetch("/api/careers", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Falha ao enviar formulário")
      }

      pushEvent({
        eventGA4: Ga4Event.CareerApplicationSubmit,
        status: SubmissionStatus.Success,
        area: formData.area || undefined,
        source: LeadSource.CareersPage,
      })

      // Resetar o formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
        area: "",
        portfolio: "",
        message: "",
      })
      setResumeFile(null)

      toast({
        title: "Currículo enviado!",
        description: "Agradecemos seu interesse. Entraremos em contato se houver uma vaga compatível com seu perfil.",
      })
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      pushEvent({
        eventGA4: Ga4Event.CareerApplicationSubmit,
        status: SubmissionStatus.Error,
        area: formData.area || undefined,
        source: LeadSource.CareersPage,
      })
      toast({
        title: "Erro ao enviar currículo",
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
            {dictionary.careers.talent.form.name}
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
            {dictionary.careers.talent.form.email}
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
            {dictionary.careers.talent.form.phone}
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
          <Label htmlFor="area" className="block text-sm mb-1">
            {dictionary.careers.talent.form.area}
          </Label>
          <Select value={formData.area} onValueChange={handleSelectChange} required>
            <SelectTrigger className="w-full bg-black/50 border border-gray-700 focus:border-[#00B2B2] focus:outline-none transition-colors">
              <SelectValue placeholder="Selecione uma área" />
            </SelectTrigger>
            <SelectContent className="bg-black border border-gray-700">
              <SelectItem value="producao">Produção</SelectItem>
              <SelectItem value="direcao">Direção</SelectItem>
              <SelectItem value="fotografia">Fotografia</SelectItem>
              <SelectItem value="edicao">Edição</SelectItem>
              <SelectItem value="motion">Motion Graphics</SelectItem>
              <SelectItem value="audio">Áudio</SelectItem>
              <SelectItem value="administrativo">Administrativo</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="outro">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="resume" className="block text-sm mb-1">
            {dictionary.careers.talent.form.resume}
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
            />
            <div className="bg-[#00B2B2] p-2 rounded-md">
              <Upload size={20} className="text-white" />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-1">Apenas arquivos PDF (máx. 5MB)</p>
        </div>

        <div>
          <Label htmlFor="portfolio" className="block text-sm mb-1">
            {dictionary.careers.talent.form.portfolio}
          </Label>
          <Input
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="https://"
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <Label htmlFor="message" className="block text-sm mb-1">
            {dictionary.careers.talent.form.message}
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
              {dictionary.careers.talent.form.sending}
            </>
          ) : (
            dictionary.careers.talent.form.submit
          )}
        </Button>
      </form>
    </div>
  )
}
