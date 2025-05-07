"use client"

import type React from "react"

import { useEffect, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

interface RDStationFormProps {
  formId: string
  buttonText: string
  buttonClassName?: string
  className?: string
  redirectUrl?: string
  isFloatingButton?: boolean
}

export function RDStationForm({
  formId,
  buttonText,
  buttonClassName,
  className,
  redirectUrl,
  isFloatingButton = false,
}: RDStationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  })
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  // Extract UTM parameters from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const utmFields = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"]

    const extractedParams: Record<string, string> = {}
    utmFields.forEach((field) => {
      const value = params.get(field)
      if (value) {
        extractedParams[field] = value
      }
    })

    setUtmParams(extractedParams)

    // Check if UTM parameters exist in localStorage
    const storedUtmParams = localStorage.getItem("utmParams")
    if (!Object.keys(extractedParams).length && storedUtmParams) {
      setUtmParams(JSON.parse(storedUtmParams))
    } else if (Object.keys(extractedParams).length) {
      // Store UTM parameters in localStorage
      localStorage.setItem("utmParams", JSON.stringify(extractedParams))
    }
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare form data for RD Station
      const rdStationData = {
        ...formData,
        ...utmParams,
        identificador: formId,
        token_rdstation: process.env.NEXT_PUBLIC_RD_STATION_TOKEN || "",
        redirect_to: redirectUrl || "",
      }

      // Submit to RD Station API
      const response = await fetch("https://api.rd.services/platform/conversions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rdStationData),
      })

      if (response.ok) {
        // Clear form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
        })

        // Redirect if URL provided
        if (redirectUrl) {
          window.location.href = redirectUrl
        }
      } else {
        console.error("Error submitting form to RD Station")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Add a data attribute that RD Station can identify
  const buttonProps = isFloatingButton
    ? {
        "data-rd-floating-button": formId,
        className:
          buttonClassName || "bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 flex items-center gap-2",
      }
    : {
        className: buttonClassName || "bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 w-full",
      }

  return (
    <form onSubmit={handleSubmit} className={className} data-form-id={formId}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Seu Nome*:</label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Email Corporativo*:</label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Telefone com DDD*:</label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Nome da Empresa:</label>
          <Input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 bg-black/50 border border-gray-700 rounded-md focus:border-[#00B2B2] focus:outline-none transition-colors"
          />
        </div>
        <Button type="submit" disabled={isSubmitting} {...buttonProps}>
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Enviando...
            </>
          ) : (
            buttonText
          )}
        </Button>
      </div>
    </form>
  )
}
