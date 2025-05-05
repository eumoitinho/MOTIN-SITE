"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Film, Video, Users, FileText, Camera, Monitor, Truck, Zap } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  buttonText: string
  color: string
}

export function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services: Service[] = [
    {
      icon: <Film className="h-12 w-12" />,
      title: "Filmes institucionais",
      description:
        "Apresentamos seus produtos, serviços, valores e missão de maneira clara, fortalecendo a identidade da sua empresa e despertando uma conexão genuína com o público.",
      buttonText: "Saiba mais",
      color: "#00B2B2",
    },
    {
      icon: <Video className="h-12 w-12" />,
      title: "Filmes de produto",
      description:
        "Destacamos as características e diferenciais de seus produtos, gerando interesse e impulsionando suas vendas.",
      buttonText: "Saiba mais",
      color: "#00A3A3",
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Filmes eventos corporativos",
      description:
        "Registramos cada detalhe de seus eventos corporativos e transformamos em vídeos cativantes. A solução também inclui versões compactas entregues no mesmo dia do evento.",
      buttonText: "Saiba mais",
      color: "#009494",
    },
    {
      icon: <FileText className="h-12 w-12" />,
      title: "Filmes conteúdo",
      description:
        "Criamos vídeos informativos e relevantes sobre o seu nicho, posicionando sua marca como uma referência no mercado.",
      buttonText: "Saiba mais",
      color: "#008585",
    },
    {
      icon: <Camera className="h-12 w-12" />,
      title: "Filmes case",
      description:
        "Apresentamos projetos de destaque e cases de sucesso, evidenciando o impacto positivo das suas soluções no mercado.",
      buttonText: "Saiba mais",
      color: "#007676",
    },
    {
      icon: <Monitor className="h-12 w-12" />,
      title: "Filmes em 3D",
      description:
        "Criamos filmes em 3D que proporcionam experiências visuais imersivas e diferenciadas, colocando sua empresa à frente da concorrência.",
      buttonText: "Saiba mais",
      color: "#006767",
    },
    {
      icon: <Truck className="h-12 w-12" />,
      title: "Cobertura fotográfica",
      description: "Registramos os momentos mais marcantes do seu evento com uma cobertura fotográfica completa.",
      buttonText: "Saiba mais",
      color: "#005858",
    },
    {
      icon: <Zap className="h-12 w-12" />,
      title: "Transmissão ao vivo",
      description:
        "Transmitimos seu evento ao vivo para que seus seguidores possam acompanhá-lo em tempo real nas redes sociais.",
      buttonText: "Saiba mais",
      color: "#004949",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#001a1a]" id="servicos">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h6 className="text-sm uppercase tracking-wider mb-2 text-[#00B2B2]">nossos serviços</h6>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Conheça nossas soluções personalizadas</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Oferecemos uma ampla gama de serviços audiovisuais para atender às necessidades específicas da sua
              empresa.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={0.1 * index}>
              <motion.div
                className="relative h-full rounded-xl overflow-hidden group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.color} 0%, rgba(0,0,0,0.8) 100%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black group-hover:opacity-0 transition-opacity duration-500" />

                <div className="relative z-10 p-8 h-full flex flex-col">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500"
                    style={{
                      backgroundColor: hoveredIndex === index ? "white" : "rgba(0, 178, 178, 0.2)",
                      color: hoveredIndex === index ? service.color : "#00B2B2",
                    }}
                  >
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>

                  <p className="text-gray-300 mb-6 flex-grow">{service.description}</p>

                  <Button
                    className="mt-auto w-full transition-colors duration-300"
                    style={{
                      backgroundColor: hoveredIndex === index ? "white" : "#00B2B2",
                      color: hoveredIndex === index ? service.color : "white",
                    }}
                  >
                    {service.buttonText}
                  </Button>
                </div>

                <div
                  className="absolute inset-0 -z-10 opacity-20 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    backgroundImage: `url('/services/${index + 1}.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
