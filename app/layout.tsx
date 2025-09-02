// EXEMPLO PARA O CLIENTE MOTIN FILMS - layout.tsx

import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
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
            {/* NineTwo Tracking - Versão Avançada com Heatmap */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function() {
                    var script = document.createElement('script');
                    script.src = 'https://api.tracking.ninetwo.com.br/script/motinfilms/tracking-advanced.js';
                    script.async = true;
                    document.head.appendChild(script);
                  })();
                `
              }}
            />
          {/* 
            NineTwo Secure Tracking Script
            - Automatically captures pageviews
            - Cleans and encrypts UTM parameters from URL
            - Generates secure session and user IDs
            - Provides conversion tracking functions
          */}
          {/* Umami - Analytics Básico */}
          <script
            src="https://umami.ninetwo.com.br/script.js"
            data-website-id="8e53dc96-26d2-4b1b-81f4-bd10cc122a3b"
            data-domains="motinfilms.com.br"
            async
          ></script>

          {/* NineTwo - Tracking Detalhado */}
          <script
            src="https://api.tracking.ninetwo.com.br/script/motin-films"
            async
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  var script = document.createElement('script');
                  script.src = 'https://api.tracking.ninetwo.com.br/track.js?client=motinfilms';
                  script.async = true;
                  script.onload = function() {
                    console.log('✅ NineTwo tracking initialized - UTM parameters secured');
                    
                    // Track custom events after script loads
                    document.addEventListener('click', function(e) {
                      // Track CTA button clicks
                      if (e.target.matches('.cta-button, .btn-primary')) {
                        window.NineTwo && window.NineTwo.event('cta_click', 'conversion', 'click', e.target.textContent);
                      }
                      
                      // Track service buttons
                      if (e.target.matches('.service-button')) {
                        window.NineTwo && window.NineTwo.event('service_interest', 'engagement', 'click', e.target.textContent);
                      }
                    });
                    
                    // Track form submissions
                    document.addEventListener('submit', function(e) {
                      if (e.target.matches('form')) {
                        window.NineTwo && window.NineTwo.event('form_submit', 'conversion', 'submit', e.target.id || 'contact_form');
                      }
                    });
                  };
                  script.onerror = function() {
                    console.warn('NineTwo tracking script failed to load');
                  };
                  document.head.appendChild(script);
                })();
                
                // Function to track video interactions
                function trackVideoPlay(videoTitle) {
                  if (window.NineTwo) {
                    window.NineTwo.event('video_play', 'engagement', 'play', videoTitle);
                  }
                }
                
                // Function to track quote requests
                function trackQuoteRequest(serviceType, estimatedBudget) {
                  if (window.NineTwo) {
                    window.NineTwo.event('quote_request', 'conversion', 'request', serviceType, estimatedBudget, {
                      service_type: serviceType,
                      budget_range: estimatedBudget,
                      timestamp: new Date().toISOString()
                    });
                  }
                }
              `
            }}
          />
          
          {/* Keep existing Google services */}
          <GoogleTagManager gtmId="GTM-MMXG7WK" /> 
          <script
            type="text/javascript"
            async
            src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/11c7dc74-1a5c-4f2e-a40a-b5824fed51b0-loader.js"
          />
        </head>
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <Analytics />
            {children}
            <ScrollToTop />
            <CustomWhatsAppButton />
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