"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ClipboardList, FileText, Camera, Film } from "lucide-react"
import { BackgroundPattern } from "./background-pattern"

interface MethodologyStep {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}

export function MethodologySection() {
  const methodologySteps: MethodologyStep[] = [
    {
      number: "1",
      title: "Planejamento estratégico",
      description:
        "Cada projeto começa com um planejamento minucioso para entender suas necessidades e criar vídeos que atendam aos seus objetivos.",
      icon: <ClipboardList className="h-10 w-10" />,
    },
    {
      number: "2",
      title: "Roteiro",
      description:
        "Nosso time especializado em marketing cria roteiros que não apenas contam sua história, mas tornam sua mensagem clara, impactante e capaz de gerar conversões.",
      icon: <FileText className="h-10 w-10" />,
    },
    {
      number: "3",
      title: "Captação",
      description:
        "Durante a captação, utilizamos movimentos de câmera inovadores e drones para capturas aéreas impressionantes, garantindo que cada cena seja cativante e dinâmica.",
      icon: <Camera className="h-10 w-10" />,
    },
    {
      number: "4",
      title: "Edição e finalização",
      description:
        "Nossas técnicas de edição e recursos de pós-produção levam ritmo e linguagem para as produções, elevando a qualidade de cada projeto e prendendo a atenção do público.",
      icon: <Film className="h-10 w-10" />,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden" id="metodologia">
      {/* Background Pattern */}
      <BackgroundPattern />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h6 className="text-sm uppercase tracking-wider mb-2 font-bold">NOSSA METODOLOGIA</h6>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Compartilhe sua ideia e deixe o resto conosco!</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Nossa abordagem estruturada garante resultados excepcionais em cada etapa do processo de produção
            audiovisual.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {methodologySteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.2)",
                scale: 1.02,
              }}
              className="border border-gray-800 rounded-xl p-8 bg-gray-900/50 backdrop-blur-sm flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                <div className="relative w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-white mb-2">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/90">{step.description}</p>

              {/* Connecting line for desktop */}
              {index < methodologySteps.length - 1 && (
                <div className="hidden lg:block absolute right-0 top-1/2 w-1/2 h-0.5 bg-gray-700 transform translate-y-[-50%]"></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Animated arrow */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="bg-gray-800 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            COMECE SEU PROJETO AGORA
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </motion.svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  )
}
