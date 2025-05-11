"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { BrandCarousel } from "@/components/brand-carousel"
import { AnimatedSection } from "@/components/animated-section"
import { VideoBackground } from "@/components/video-background"
import { ServicesSection } from "@/components/services-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { MethodologySection } from "@/components/methodology-section"
import { CustomVideoPlayer } from "@/components/custom-video-player"
import { PortfolioVideoModal } from "@/components/portfolio-video-modal"
import { BeamsBackground } from "@/components/beams-background"
import { RDStationButton } from "@/components/rd-station-button"
import Footer from "@/components/footer"
import { RDStationForm } from "@/components/rd-station-form"

export default function MotinFilms() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")
  const [visibleItems, setVisibleItems] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const sectionRefs = {
    inicio: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    servicos: useRef<HTMLElement>(null),
    sobre: useRef<HTMLElement>(null),
    contato: useRef<HTMLElement>(null),
    equipe: useRef<HTMLElement>(null),
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = sectionRefs[sectionId as keyof typeof sectionRefs]?.current
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const openVideoModal = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoModalOpen(true)
  }

  const loadMoreItems = () => {
    setIsLoading(true)
    // Simular um carregamento
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 6, portfolioItems.length))
      setIsLoading(false)
    }, 800)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      Object.entries(sectionRefs).forEach(([sectionId, ref]) => {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop
          const sectionBottom = sectionTop + ref.current.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lista de itens do portfólio em destaque
  const portfolioItems = [
    {
      title: "BLANC DE ROUGE",
      category: "EVENTO",
      image: "/portfolio/blanc-de-rouge.jpeg",
      videoId: "UiqL2gycjo8",
    },
    {
      title: "LIQUEXPRESS",
      category: "INSTITUCIONAL",
      image: "/portfolio/liquexpress.jpeg",
      videoId: "hG86fjjkpx4",
    },
    {
      title: "LUMICENTER",
      category: "EVENTO CORPORATIVO",
      image: "/portfolio/lumicenter.jpeg",
      videoId: "Dvj_JDpJPTU",
    },
    {
      title: "SS&C BLUE PRISM",
      category: "EVENTO CORPORATIVO",
      image: "/portfolio/ssc-blue-prism.jpeg",
      videoId: "3YNyHv8jH60",
    },
    {
      title: "DITRATOR",
      category: "INSTITUCIONAL",
      image: "/portfolio/ditrator.jpeg",
      videoId: "ond_kR7F_7s",
    },
    {
      title: "ESCOLAR OFFICE BRASIL",
      category: "INSTITUCIONAL",
      image: "/portfolio/escolar-office-brasil-1.jpeg",
      videoId: "ipRxXf7od5E",
    },
    {
      title: "BIOBIO COSMÉTICOS",
      category: "PRODUTO",
      image: "/portfolio/biobio-cosmeticos.jpeg",
      videoId: "rGk75VaxOHA",
    },
    {
      title: "UNIFATEB E DOM BOSCO",
      category: "INSTITUCIONAL",
      image: "/portfolio/unifateb-dom-bosco.jpeg",
      videoId: "YjST4vR4hfY",
    },
    {
      title: "LJ SANTOS",
      category: "PRODUTO",
      image: "/portfolio/lj-santos.jpeg",
      videoId: "RuZy13ZDmeQ",
    },
  ]

  const methodology = [
    {
      number: "1",
      title: "Planejamento estratégico",
      description:
        "Cada projeto começa com um planejamento minucioso para entender suas necessidades e criar vídeos que atendam aos seus objetivos.",
    },
    {
      number: "2",
      title: "Roteiro",
      description:
        "Nosso time especializado em marketing cria roteiros que não apenas contam sua história, mas tornam sua mensagem clara, impactante e capaz de gerar conversões.",
    },
    {
      number: "3",
      title: "Captação",
      description:
        "Durante a captação, utilizamos movimentos de câmera inovadores e drones para capturas aéreas impressionantes, garantindo que cada cena seja cativante e dinâmica.",
    },
    {
      number: "4",
      title: "Edição e finalização",
      description:
        "Nossas técnicas de edição e recursos de pós-produção levam ritmo e linguagem para as produções, elevando a qualidade de cada projeto e prendendo a atenção do público.",
    },
  ]

  const testimonials = [
    {
      text: "Ficamos super satisfeitos com a produção. Vídeo principal, vídeos de performance bônus, show. Atendimento, suporte, grupo com profissionais pré, durante e pós evento. Já os temos como prioridade para continuar com nossa parceria de cobertura.",
      author: "ENAF",
      image: "/testimonials/enaf.webp",
    },
    {
      text: "Excelente experiência, conseguimos terminar nosso projeto com bastante tempo hábil e entregar pros gestores da empresa, antes da nossa feira.",
      author: "Marco Paulo Jr.",
      image: "/testimonials/marco.webp",
    },
    {
      text: 'A nossa minisérie "Escolar pelo Brasil" contou a história de 10 papelarias de norte a sul do Brasil e foi inspirador conhecer a jornada empreendedora de cada um. Agradecemos imensamente ao excelente trabalho da Motin Films e todo o cuidado que tiveram com esse projeto tão especial.',
      author: "Escolar Office Brasil",
      image: "/brands/escolar-office-brasil.jpeg",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed w-full z-50 bg-black/90 border-b border-gray-800 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/" className="text-2xl font-bold">
                <Image src="/motin-logo-white.webp" alt="Motin Films" width={120} height={36} priority />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <motion.nav
              className="hidden md:flex space-x-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link
                href="#inicio"
                className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "inicio" ? "text-[#00B2B2]" : ""}`}
              >
                Início
              </Link>
              <Link
                href="#portfolio"
                className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "portfolio" ? "text-[#00B2B2]" : ""}`}
              >
                Portfólio
              </Link>
              <Link
                href="#servicos"
                className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "servicos" ? "text-[#00B2B2]" : ""}`}
              >
                Serviços
              </Link>
              <Link
                href="#sobre"
                className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "sobre" ? "text-[#00B2B2]" : ""}`}
              >
                Sobre
              </Link>
              <Link
                href="#contato"
                className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "contato" ? "text-[#00B2B2]" : ""}`}
              >
                Contato
              </Link>
            </motion.nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden text-white"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {isMenuOpen ? (
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
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
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black shadow-lg absolute w-full border-b border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                <Link
                  href="#inicio"
                  className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "inicio" ? "text-[#00B2B2]" : ""}`}
                  onClick={() => scrollToSection("inicio")}
                >
                  Início
                </Link>
                <Link
                  href="#portfolio"
                  className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "portfolio" ? "text-[#00B2B2]" : ""}`}
                  onClick={() => scrollToSection("portfolio")}
                >
                  Portfólio
                </Link>
                <Link
                  href="#servicos"
                  className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "servicos" ? "text-[#00B2B2]" : ""}`}
                  onClick={() => scrollToSection("servicos")}
                >
                  Serviços
                </Link>
                <Link
                  href="#sobre"
                  className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "sobre" ? "text-[#00B2B2]" : ""}`}
                  onClick={() => scrollToSection("sobre")}
                >
                  Sobre
                </Link>
                <Link
                  href="#contato"
                  className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${activeSection === "contato" ? "text-[#00B2B2]" : ""}`}
                  onClick={() => scrollToSection("contato")}
                >
                  Contato
                </Link>
              </nav>
            </motion.div>
          )}
        </header>

        {/* Hero Section */}
        <section ref={sectionRefs.inicio} className="relative pt-24 pb-16" id="inicio">
          {/* Video Background */}
          <VideoBackground videoId="ewm0U5C3nAo" fallbackImage="bg-black" />

          <div className="container mx-auto px-4 z-20 relative">
            <div className="max-w-2xl py-16 md:py-24">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
              >
                Filmes de alto impacto com qualidade cinematográfica
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-xl mb-8 text-gray-300"
              >
                Somos uma produtora audiovisual especializada em criar conteúdos que conectam marcas e pessoas através
                de histórias memoráveis.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Button className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 flex items-center gap-2">
                  CONHEÇA NOSSAS SOLUÇÕES
                  <ChevronRight size={16} />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="bg-black py-12">
          <div className="container mx-auto px-4">
            <AnimatedSection delay={0.2}>
              <h3 className="text-center text-lg mb-8">Marcas que confiam:</h3>
              <BrandCarousel
                brands={[
                  { src: "/brands/electrolux-logo.png", alt: "Electrolux", width: 140 },
                  { src: "/brands/wb-logo.png", alt: "Warner Bros", width: 120 },
                  { src: "/brands/lumicenter-logo.png", alt: "Lumicenter", width: 150 },
                  { src: "/brands/dentaluni-logo.png", alt: "DentalUni", width: 180 },
                  { src: "/brands/escolar-office-brasil.jpeg", alt: "Escolar Office Brasil", width: 120 },
                  { src: "/brands/paris-filmes-logo.png", alt: "Paris Filmes", width: 180 },
                  { src: "/brands/sony-logo.png", alt: "Sony", width: 180 },
                  { src: "/brands/ancine.png", alt: "Ancine", width: 120 },
                  { src: "/brands/itaipu-logo.png", alt: "Itaipu Binacional", width: 150 },
                  { src: "/brands/favretto-logo.png", alt: "Favretto Mídia Exterior", width: 140 },
                  { src: "/brands/compwire-logo.png", alt: "Compwire", width: 150 },
                  { src: "/brands/unimed-logo.png", alt: "Unimed", width: 130 },
                  { src: "/brands/actioncoach-logo.png", alt: "ActionCOACH", width: 140 },
                  { src: "/brands/naport-logo.png", alt: "Naport", width: 120 },
                  { src: "/brands/ssc-blueprism-logo.png", alt: "SS&C Blue Prism", width: 160 },
                  { src: "/brands/santos-logo.png", alt: "Santos", width: 140 },
                ]}
              />
            </AnimatedSection>
          </div>
        </section>

        {/* Video Promo Section - Updated with custom player */}
        <section className="relative py-16 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image src="/images/cameraman-bg.webp" alt="Cameraman" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <AnimatedSection>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Crie seu filme com a produtora das grandes marcas
                </h2>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-[#00B2B2]">✓</span>
                    <span>
                      Gere <b>mais contatos</b> interessados e <b>mais vendas</b>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00B2B2]">✓</span>
                    <span>
                      Crie <b>conexão</b> com sua <b>audiência</b>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00B2B2]">✓</span>
                    <span>
                      <b>Exponha</b> seu produto de maneira <b>única no mercado</b>
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#00B2B2]">✓</span>
                    <span>
                      Reforce a <b>lembrança</b> da sua <b>marca</b>
                    </span>
                  </li>
                </ul>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Button className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 flex items-center gap-2">
                    FALE COM UM CONSULTOR
                    <ChevronRight size={16} />
                  </Button>
                </motion.div>
              </AnimatedSection>

              <AnimatedSection delay={0.3}>
                <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-[#00B2B2]/20">
                  <CustomVideoPlayer videoId="1AVEH6OtbeY" className="aspect-video w-full" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Produtora Licenciada Section */}
        <section className="bg-gradient-to-r from-[#001a1a] to-black py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Produtora Licenciada</h2>
            <Image src="/brands/ancine.png" alt="Ancine" width={150} height={75} />
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={sectionRefs.portfolio} className="bg-black py-16" id="portfolio">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Nosso portfólio</h2>
              <p className="text-gray-300 text-center mb-8">Veja alguns dos nossos trabalhos mais recentes</p>
            </AnimatedSection>

            <Tabs defaultValue="todos" className="w-full">
              <AnimatedSection delay={0.2}>
                <TabsList className="flex justify-center mb-8 bg-transparent">
                  <TabsTrigger
                    value="todos"
                    className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md mx-1"
                  >
                    TODOS
                  </TabsTrigger>
                  <TabsTrigger
                    value="institucional"
                    className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md mx-1"
                  >
                    INSTITUCIONAL
                  </TabsTrigger>
                  <TabsTrigger
                    value="evento"
                    className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md mx-1"
                  >
                    EVENTOS
                  </TabsTrigger>
                  <TabsTrigger
                    value="produto"
                    className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md mx-1"
                  >
                    PRODUTOS
                  </TabsTrigger>
                </TabsList>
              </AnimatedSection>

              <TabsContent value="todos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioItems.slice(0, visibleItems).map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative group overflow-hidden rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                      whileHover={{ y: -5 }}
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={225}
                        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button
                          className="bg-[#00B2B2]/80 hover:bg-[#00B2B2] h-12 w-12 rounded-full flex items-center justify-center"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            openVideoModal(item.videoId)
                          }}
                        >
                          <Play size={20} fill="white" />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="text-xs text-[#00B2B2]">{item.category}</p>
                        <h3 className="font-bold">{item.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="institucional" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioItems
                    .filter((item) => item.category === "INSTITUCIONAL")
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={225}
                          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            className="bg-[#00B2B2]/80 hover:bg-[#00B2B2] h-12 w-12 rounded-full flex items-center justify-center"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              openVideoModal(item.videoId)
                            }}
                          >
                            <Play size={20} fill="white" />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                          <p className="text-xs text-[#00B2B2]">{item.category}</p>
                          <h3 className="font-bold">{item.title}</h3>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="evento" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioItems
                    .filter((item) => item.category === "EVENTO" || item.category === "EVENTO CORPORATIVO")
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={225}
                          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            className="bg-[#00B2B2]/80 hover:bg-[#00B2B2] h-12 w-12 rounded-full flex items-center justify-center"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              openVideoModal(item.videoId)
                            }}
                          >
                            <Play size={20} fill="white" />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                          <p className="text-xs text-[#00B2B2]">{item.category}</p>
                          <h3 className="font-bold">{item.title}</h3>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="produto" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {portfolioItems
                    .filter((item) => item.category === "PRODUTO")
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={400}
                          height={225}
                          className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button
                            className="bg-[#00B2B2]/80 hover:bg-[#00B2B2] h-12 w-12 rounded-full flex items-center justify-center"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              openVideoModal(item.videoId)
                            }}
                          >
                            <Play size={20} fill="white" />
                          </Button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                          <p className="text-xs text-[#00B2B2]">{item.category}</p>
                          <h3 className="font-bold">{item.title}</h3>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>

            <AnimatedSection delay={0.4}>
              <div className="flex justify-center mt-10">
                <Link href="/portfolio">
                  <Button className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 flex items-center gap-2">
                    VER PORTFÓLIO COMPLETO
                    <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Why Choose Us Section - Updated */}
        <WhyChooseUs />

        {/* Services Section - Updated */}
        <ServicesSection />

        {/* Stats Section */}
        <section className="bg-black py-16 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Nossos números</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#00B2B2]">+10</p>
                <p className="text-gray-400">anos de mercado</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#00B2B2]">+300</p>
                <p className="text-gray-400">clientes satisfeitos</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#00B2B2]">+500</p>
                <p className="text-gray-400">filmes realizados</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-[#00B2B2]">+2,000</p>
                <p className="text-gray-400">projetos desenvolvidos</p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <MethodologySection />

        {/* Testimonials Section */}
        <section className="bg-black py-16">
          <div className="container mx-auto px-4">
            <h6 className="text-center text-sm uppercase tracking-wider mb-2 text-[#00B2B2]">DEPOIMENTOS</h6>
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
              Resultados comprovados por quem mais entende
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-black border border-gray-800 text-white">
                  <CardContent className="p-6">
                    <p className="italic text-gray-300 mb-4">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold">- {testimonial.author}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section ref={sectionRefs.sobre} className="bg-black py-16 border-t border-gray-800" id="sobre">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h6 className="text-sm uppercase tracking-wider mb-2">QUEM SOMOS?</h6>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Conheça a Motin Films</h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <AnimatedSection delay={0.2} className="md:col-span-2">
                <p className="text-gray-300 mb-4">
                  Somos a Motin Films, uma produtora especializada em produções audiovisuais de alto impacto e
                  certificada pela Ancine. Com mais de 10 anos de atuação no mercado, produzimos filmes com a missão de
                  criar conexões entre marcas e consumidores.
                </p>
                <p className="text-gray-300 mb-4">
                  Com técnicas inovadoras de edição e captação dinâmica, nossos projetos são personalizados e planejados
                  de acordo com as necessidades específicas de cada cliente. Com qualidade excepcional de imagem e som,
                  produzimos filmes para produtos, eventos corporativos, institucionais, promocionais, entre outros.
                </p>
                <p className="text-gray-300 mb-6">
                  Acreditamos que o audiovisual é uma ferramenta poderosa para a construção de imagem da sua empresa.
                  Através de técnicas de storytelling, contamos histórias que inspiram e agregam valor à sua marca e
                  seus produtos.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Button className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3">
                    FALE CONOSCO AGORA!
                  </Button>
                </motion.div>
              </AnimatedSection>
              <AnimatedSection delay={0.4} className="flex flex-col items-center">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Image
                    src="/about/catalisti-grupo.png"
                    alt="Grupo Catalisti"
                    width={300}
                    height={150}
                    className="mb-4"
                  />
                </motion.div>
                <p className="text-gray-400 text-sm mt-2">Uma empresa Catalisti Holding</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sectionRefs.contato} className="relative" id="contato">
          <BeamsBackground intensity="medium" className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatedSection>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Transforme sua comunicação!</h2>
                  <p className="text-gray-300 mb-6">
                    Preencha seus dados agora e nosso time entrará em contato para entender melhor seus desafios!
                  </p>
                </AnimatedSection>
                <AnimatedSection delay={0.3}>
                  <motion.div
                    className="bg-black/40 backdrop-blur-md p-6 rounded-lg border border-gray-800/50"
                    initial={{ boxShadow: "0 0 0 rgba(0, 178, 178, 0)" }}
                    whileHover={{ boxShadow: "0 0 20px rgba(0, 178, 178, 0.3)" }}
                    transition={{ duration: 0.5 }}
                  >
                    <RDStationForm formId="contato-home" buttonText="Enviar" redirectUrl="/obrigado" />
                  </motion.div>
                </AnimatedSection>
              </div>
            </div>
          </BeamsBackground>
        </section>

        {/* RD Station Button (replacing WhatsApp Button) */}
        <RDStationButton />

        {/* Video Modal */}
        <PortfolioVideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoId={currentVideoId}
        />
      </div>
      <Footer />
    </>
  )
}
