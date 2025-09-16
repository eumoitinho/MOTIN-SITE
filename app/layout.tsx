// EXEMPLO PARA O CLIENTE MOTIN FILMS - layout.tsx

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CustomWhatsAppButton } from "@/components/custom-whatsapp-button"
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

export const metadata = {
  title: "Motin Films - Produção Audiovisual de Alta Qualidade",
  description:
    "Produtora audiovisual especializada em vídeos institucionais, motion graphics, cobertura de eventos e edição de vídeo.",
  generator: "M2Z",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="pt-BR" suppressHydrationWarning>
        <head>
           <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;
          f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MMXG7WK');`}
        </Script>
        <Script
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/11c7dc74-1a5c-4f2e-a40a-b5824fed51b0-loader.js"
          strategy="afterInteractive"
          async
        />
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Analytics />
            {children}
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    )
}

/* 
  REMOVIDO DO CÓDIGO ANTERIOR:
  - ❌ UtmCapture component (substituído pelo script NineTwo)
  - ❌ client-script.js duplicado
  - ❌ Script inline duplicado
  
  NOVO COMPORTAMENTO:
  - ✅ UTM parameters são automaticamente capturados e criptografados
  - ✅ URL fica limpa (sem ?utm_source=facebook etc.)
  - ✅ Dados UTM ficam seguros em hash criptografado
  - ✅ Tracking automático de pageviews, clicks, forms
  - ✅ Funções customizadas para vídeos e orçamentos
  - ✅ Integração com Google Analytics mantida
*/