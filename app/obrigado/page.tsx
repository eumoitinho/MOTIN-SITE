"use client"

import { useEffect } from "react"
import { trackWithAliases } from "@/lib/tracking"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { CheckCircle, ArrowLeft } from "lucide-react"

export default function ThankYouPage() {
  // Track conversion (padronizado + alias caso existisse no GTM anterior)
  useEffect(() => {
    trackWithAliases('lead_submit_thank_you', ['contact_form_conversion'], {
      source: 'thank_you_page'
    })
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-black/40 backdrop-blur-md p-8 rounded-lg border border-gray-800/50 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 w-20 h-20 rounded-full bg-[#00B2B2]/20 flex items-center justify-center"
        >
          <CheckCircle size={40} className="text-[#00B2B2]" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">Obrigado pelo contato!</h1>
        <p className="text-gray-300 mb-8">
          Recebemos sua mensagem e entraremos em contato em breve. Nossa equipe está ansiosa para ajudar com seu
          projeto.
        </p>

        <Link href="/">
          <Button className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 flex items-center gap-2 mx-auto">
            <ArrowLeft size={16} />
            Voltar para a página inicial
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
