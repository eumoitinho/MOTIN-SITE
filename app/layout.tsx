// EXEMPLO PARA O CLIENTE MOTIN FILMS - layout.tsx

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { RDPopupConversionListener } from "@/components/rd-popup-conversion-listener"
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
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-MMXG7WK"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            ></iframe>
          </noscript>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {/* Listener de conversão RD Popup: estava importado mas não montado */}
            <RDPopupConversionListener />
            <Analytics />
            {children}
            <ScrollToTop />
          </ThemeProvider>
        </body>
      </html>
    )
}

