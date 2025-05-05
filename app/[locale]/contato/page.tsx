import type { Metadata } from "next"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"
import { ContactForm } from "@/components/contact-form"
import { MapLocation } from "@/components/map-location"

export const metadata: Metadata = {
  title: "Contato | Motin Films",
  description: "Entre em contato com a Motin Films para saber mais sobre nossos serviços de produção audiovisual.",
}

export default async function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)

  return (
    <main className="pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{dict.contact.title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-lg mb-6 text-gray-300">{dict.contact.subtitle}</p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Motin Films</h3>
              <p className="mb-2">Rua Exemplo, 123 - Bairro</p>
              <p className="mb-2">Curitiba - PR, 80000-000</p>
              <p className="mb-2">+55 (41) 3333-3333</p>
              <p className="mb-4">contato@motinfilms.com.br</p>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com/motinfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00B2B2] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://facebook.com/motinfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00B2B2] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/company/motinfilms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00B2B2] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>

            <MapLocation />
          </div>

          <ContactForm dictionary={dict} />
        </div>
      </div>
    </main>
  )
}
