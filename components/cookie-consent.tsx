"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 border-t border-gray-800 p-4 md:p-6"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm md:text-base">
              <p>
                Utilizamos cookies para melhorar sua experiência em nosso site. Ao continuar navegando, você concorda
                com nossa{" "}
                <Link href="/politica-de-privacidade" className="text-[#00B2B2] hover:underline">
                  Política de Privacidade
                </Link>{" "}
                e{" "}
                <Link href="/termos-de-uso" className="text-[#00B2B2] hover:underline">
                  Termos de Uso
                </Link>
                .
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="border-[#00B2B2] text-[#00B2B2] hover:bg-[#00B2B2] hover:text-white"
                onClick={acceptCookies}
              >
                Aceitar
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
