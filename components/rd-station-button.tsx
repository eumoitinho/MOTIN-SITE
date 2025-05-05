"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

// SVG do WhatsApp
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="white"
    stroke="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

interface RDStationButtonProps {
  position?: "left" | "right"
  className?: string
}

// Função para simular um clique em um elemento
function simulateClick(element: HTMLElement) {
  try {
    // Tenta usar o método click() nativo
    element.click()
  } catch (e) {
    // Se falhar, cria um evento de clique e o dispara
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    element.dispatchEvent(event)
  }
}

export function RDStationButton({ position = "left", className = "" }: RDStationButtonProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Função para carregar o script do RD Station
  useEffect(() => {
    // Verificar se o script já existe
    const existingScript = document.querySelector('script[src*="rdstation-popup.min.js"]')

    if (existingScript) {
      console.log("RD Station script already exists")
      setScriptLoaded(true)
      return
    }

    // Criar e adicionar o script
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://d335luupugsy2.cloudfront.net/js/rdstation-popups/bricks/rdstation-popup.min.js?v=1"
    script.async = true
    script.onload = () => {
      console.log("RD Station script loaded successfully")
      setScriptLoaded(true)
    }
    script.onerror = (error) => {
      console.error("Error loading RD Station script:", error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar o script do RD Station.",
        variant: "destructive",
      })
    }

    document.body.appendChild(script)

    // Cleanup - não remover o script para evitar problemas
    return () => {}
  }, [toast])

  // Função para abrir o WhatsApp diretamente
  const openWhatsApp = () => {
    // Número de telefone com código do país (substitua pelo número correto)
    const phoneNumber = "5541999999999" // Substitua pelo número correto

    // Mensagem pré-definida (opcional)
    const message = "Olá! Gostaria de saber mais sobre os serviços da Motin Films."

    // Criar URL do WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

    // Abrir em uma nova aba
    window.open(whatsappUrl, "_blank")
  }

  // Função para tentar encontrar e clicar no botão do RD Station
  const findAndClickRDButton = () => {
    setIsLoading(true)

    // Lista de possíveis seletores para o botão do RD Station
    const selectors = [
      '[id^="rd-floating_button"]',
      ".bricks--floating--button",
      '[id^="bricks-component-"] button',
      ".rdstation-popup-js-floating-button",
    ]

    let buttonFound = false

    // Tenta cada seletor
    for (const selector of selectors) {
      const buttons = document.querySelectorAll(selector)

      if (buttons.length > 0) {
        console.log(`Found ${buttons.length} buttons with selector: ${selector}`)

        // Tenta clicar em cada botão encontrado
        buttons.forEach((button, index) => {
          try {
            console.log(`Clicking button ${index + 1} with selector: ${selector}`)
            simulateClick(button as HTMLElement)
            buttonFound = true
          } catch (error) {
            console.error(`Error clicking button ${index + 1}:`, error)
          }
        })

        if (buttonFound) break
      }
    }

    // Se não encontrou nenhum botão, abre o WhatsApp diretamente
    if (!buttonFound) {
      console.log("No RD Station buttons found, opening WhatsApp directly")
      openWhatsApp()
    }

    setIsLoading(false)
  }

  return (
    <motion.button
      className={`fixed ${position === "left" ? "left-6" : "right-6"} bottom-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${className}`}
      onClick={findAndClickRDButton}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      }}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="h-6 w-6 animate-spin text-white" /> : <WhatsAppIcon />}
    </motion.button>
  )
}

// Adicione esta declaração para o TypeScript
declare global {
  interface Window {
    RDStationForms?: {
      open: () => void
    }
  }
}
