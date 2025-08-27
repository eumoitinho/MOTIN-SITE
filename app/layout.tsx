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
          <script
            dangerouslySetInnerHTML={{
              __html: `
    (function() {
      const TRACKING_API = 'https://api.tracking.ninetwo.com.br';
      const CLIENT_ID = '92motin'; // ID único do cliente
  
      // Função para enviar eventos
      function track(eventName, eventData = {}) {
        fetch(\`\${TRACKING_API}/track\`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Client-Id': CLIENT_ID
          },
          body: JSON.stringify({
            event_name: eventName,
            page_url: window.location.href,
            page_title: document.title,
            timestamp: new Date().toISOString(),
            ...eventData
          })
        });
      }
  
      // Tracking automático de pageviews
      track('page_view');
  
      // Tracking de compras (exemplo)
      window.trackPurchase = function(value, currency = 'BRL') {
        track('purchase', {
          event_value: value,
          currency: currency
        });
      };
    })();
  `,
            }}
          />
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
