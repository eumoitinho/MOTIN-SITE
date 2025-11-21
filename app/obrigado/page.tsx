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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full filter blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full filter blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full bg-secondary/10 backdrop-blur-md p-12 border border-white/5 text-center relative z-10 shadow-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto mb-8 w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20"
        >
          <CheckCircle size={48} className="text-primary" />
        </motion.div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6 uppercase tracking-wide">Obrigado pelo contato!</h1>
        <p className="text-muted-foreground mb-10 text-lg font-light leading-relaxed">
          Recebemos sua mensagem e entraremos em contato em breve. Nossa equipe está ansiosa para ajudar com seu
          projeto.
        </p>

        <Link href="/">
          <Button className="rounded-none px-8 py-6 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest w-full md:w-auto">
            <ArrowLeft size={20} className="mr-2" />
            Voltar para a página inicial
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
