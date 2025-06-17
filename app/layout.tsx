import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { UtmCapture } from "@/components/utm-capture"
import { CustomWhatsAppButton } from "@/components/custom-whatsapp-button"
import { GoogleTagManager } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "Motin Films - Produção Audiovisual de Alta Qualidade",
  description:
    "Produtora audiovisual especializada em vídeos institucionais, motion graphics, cobertura de eventos e edição de vídeo.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
         <GoogleTagManager gtmId="GTM-MMXG7WK" /> 
         <script
          type="text/javascript"
          async
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/11c7dc74-1a5c-4f2e-a40a-b5824fed51b0-loader.js"
        />
         </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <UtmCapture />
          <Analytics />
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
