import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"

export const metadata = {
  title: "Motin Films - Produção Audiovisual de Alta Qualidade",
  description:
    "Produtora audiovisual especializada em vídeos institucionais, motion graphics, cobertura de eventos e edição de vídeo.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
