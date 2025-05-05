import type { Metadata } from "next"
import { getDictionary } from "@/i18n/dictionaries"
import type { Locale } from "@/i18n/config"
import { CareersForm } from "@/components/careers-form"

export const metadata: Metadata = {
  title: "Trabalhe Conosco | Motin Films",
  description: "Junte-se à equipe da Motin Films e faça parte de uma produtora audiovisual de alto impacto.",
}

export default async function CareersPage({ params }: { params: { locale: Locale } }) {
  const dict = await getDictionary(params.locale)

  return (
    <main className="pt-24 pb-16 bg-black">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{dict.careers.title}</h1>
        <p className="text-xl text-center text-gray-300 mb-12">{dict.careers.subtitle}</p>

        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg mb-8">{dict.careers.description}</p>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{dict.careers.positions.title}</h2>
            <div className="bg-[#001a1a] p-6 rounded-lg">
              <p>{dict.careers.positions.noPositions}</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">{dict.careers.talent.title}</h2>
            <p className="mb-6">{dict.careers.talent.description}</p>

            <CareersForm dictionary={dict} />
          </div>
        </div>
      </div>
    </main>
  )
}
