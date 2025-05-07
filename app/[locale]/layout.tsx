import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollToTop } from "@/components/scroll-to-top"
import { RDStationButton } from "@/components/rd-station-button"
import { CookieConsent } from "@/components/cookie-consent"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"

export const metadata = {
  title: "Motin Films ",
  description:
    "A Produtora de filmes das grandes marcas.",
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const dict = await getDictionary(params.locale)

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body>
      <script type="text/javascript" async src="https://d335luupugsy2.cloudfront.net/js/loader-scripts/11c7dc74-1a5c-4f2e-a40a-b5824fed51b0-loader.js" ></script>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header dictionary={dict} locale={params.locale} />
          {children}
          <ScrollToTop />
          <RDStationButton />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  )
}
