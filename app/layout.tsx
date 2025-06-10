import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { UtmCapture } from "@/components/utm-capture"
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
        {/* Google Tag Manager */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MMXG7WK');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-M6SZWS4P');`,
          }}
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GT-MJSZMWPW"
          id="google_gtagjs-js"
          defer
          data-deferred="1"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-62E37T448N" defer data-deferred="1" />
        <script
          type="text/javascript"
          async
          src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/11c7dc74-1a5c-4f2e-a40a-b5824fed51b0-loader.js"
        />
     
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MMXG7WK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M6SZWS4P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJSZMWPW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=G-62E37T448N"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript> */}
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
