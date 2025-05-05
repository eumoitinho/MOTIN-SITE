"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Check, Award, Users, Zap, Clock, MapPin } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

interface Reason {
  icon: React.ReactNode
  title: string
  description: string
}

export function WhyChooseUs() {
  const reasons: Reason[] = [
    {
      icon: <Check className="h-8 w-8" />,
      title: "Processo prático, eficiente e transparente",
      description:
        "Do briefing à entrega final, você estará sempre ciente de cada etapa do projeto e terá total controle sobre o resultado.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Equipe multidisciplinar",
      description:
        "Nossa equipe é formada por profissionais especializados em marketing, eventos, filmagem corporativa e fotografia. Essa sinergia única nos permite oferecer soluções completas e personalizadas para nossos clientes.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Metodologia inovadora de captura",
      description:
        "Utilizamos equipamentos de última geração e empregamos técnicas inovadoras de captura com foco em movimento, para trazer mais ação e dinamismo aos seus filmes.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Técnicas modernas de edição",
      description:
        "Aplicamos técnicas de sonoplastia, color grading e edição moderna para prender a atenção da sua audiência e garantir um resultado profissional.",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Agilidade no processo",
      description:
        "Com processos otimizados, garantimos a entrega do filme em tempo recorde, e em alguns casos, no mesmo dia do evento, sem comprometer a qualidade do projeto.",
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Cobertura nacional 🇧🇷",
      description:
        "Não importa onde você esteja, nossa equipe interna percorre todo o Brasil para garantir que sua produção seja realizada com a mais alta qualidade.",
    },
  ]

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#00B2B2] rounded-full filter blur-[150px] -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00B2B2] rounded-full filter blur-[150px] translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a Motin Films?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Nossa abordagem única e nossa equipe especializada garantem resultados excepcionais para o seu projeto.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <AnimatedSection key={index} delay={0.1 * index}>
              <motion.div
                className="bg-gradient-to-br from-[#001a1a] to-black p-8 rounded-xl border border-gray-800 h-full"
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 40px -20px rgba(0, 178, 178, 0.3)",
                  borderColor: "#00B2B2",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-[#00B2B2]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-[#00B2B2]">
                  {reason.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
                <p className="text-gray-400">{reason.description}</p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
