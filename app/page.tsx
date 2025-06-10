"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronRight, X } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { BrandCarousel } from "@/components/brand-carousel"
import { AnimatedSection } from "@/components/animated-section"
import { VideoBackground } from "@/components/video-background"
import { ServicesSection } from "@/components/services-section"
import { WhyChooseUs } from "@/components/why-choose-us"
import { MethodologySection } from "@/components/methodology-section"
import { CustomVideoPlayer } from "@/components/custom-video-player"
import { PortfolioVideoModal } from "@/components/portfolio-video-modal"
import { RDStationButton } from "@/components/rd-station-button"
import Footer from "@/components/footer"

export default function MotinFilms() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>("")
  const [visibleItems, setVisibleItems] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailItem, setDetailItem] = useState<null | typeof portfolioItems[0]>(null)
  const [activeCategory, setActiveCategory] = useState("todos")


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

  const portfolioItems = [
    {
      title: "UNIFATEB e Colégio Dom Bosco | Filme Institucional",
      category: "Institucional",
      description: "Apresentação institucional que exibe a infraestrutura, cursos e valores das instituições UNIFATEB e Colégio Dom Bosco, destacando sua importância na educação.",
      image: "https://i.ytimg.com/vi/Wyg3UPuf5Ec/maxresdefault.jpg",
      videoId: "Wyg3UPuf5Ec",
    },
    {
      title: "Mercedes-Benz | Filme Institucional",
      category: "Institucional",
      description: "Vídeo institucional da Mercedes-Benz, showcasing sua história, inovação tecnológica e compromisso com a excelência no setor automotivo, com imagens de veículos premium.",
      image: "https://i.ytimg.com/vi/kKpIG1XKbS0/maxresdefault.jpg",
      videoId: "kKpIG1XKbS0",
    },
    {
      title: "LJ Santos - Linha de Cromagem | Filme Produto",
      category: "Produto",
      description: "Lançamento da linha de cromagem da LJ Santos, apresentando o processo de produção e os benefícios do produto com foco em qualidade e durabilidade.",
      image: "https://i.ytimg.com/vi/hELpTXBl798/maxresdefault.jpg",
      videoId: "hELpTXBl798",
    },
    {
      title: "Liquexpress | Filme Institucional",
      category: "Institucional",
      description: "Vídeo institucional da Liquexpress, destacando seus serviços logísticos e a infraestrutura que garante eficiência e confiabilidade no transporte.",
      image: "https://i.ytimg.com/vi/Dvj_JDpJPTU/maxresdefault.jpg",
      videoId: "Dvj_JDpJPTU",
    },
    {
      title: "SS&C Blue Prism Live - Live São Paulo | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Cobertura ao vivo do evento SS&C Blue Prism em São Paulo, com destaque para apresentações e interações ao vivo com edição em tempo real.",
      image: "https://i.ytimg.com/vi/3YNyHv8jH60/maxresdefault.jpg",
      videoId: "3YNyHv8jH60",
    },
    {
      title: "Lumicenter Lighting - Essência Lumicenter 2024 | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Registro do evento Essência Lumicenter 2024, destacando lançamentos de produtos e tendências em iluminação com edição sofisticada.",
      image: "https://i.ytimg.com/vi/ond_kR7F_7s/maxresdefault.jpg",
      videoId: "ond_kR7F_7s",
    },
    {
      title: "Händz - Headphone EcoSound | Filme Produto",
      category: "Produto",
      description: "Lançamento do headphone EcoSound da Händz, destacando design sustentável e qualidade de som com demonstrações práticas.",
      image: "https://i.ytimg.com/vi/oC-T7m3JU8E/maxresdefault.jpg",
      videoId: "oC-T7m3JU8E",
    },
    {
      title: "BioBio Cosméticos - Only One | Filme Produto",
      category: "Produto",
      description: "Lançamento do produto Only One da BioBio Cosméticos, destacando sua fórmula inovadora e benefícios para a pele.",
      image: "https://i.ytimg.com/vi/RuZy13ZDmeQ/maxresdefault.jpg",
      videoId: "RuZy13ZDmeQ",
    },
  ]



  const renderGrid = (items: typeof portfolioItems) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {items.map((item, i) => {
        const shortDesc = item.description.slice(0, 100)
        const isLong = item.description.length > 100
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group cursor-pointer"
          >
            <div
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-2xl hover:shadow-primary/20 transition-all duration-500"
              onClick={() => openVideoModal(item.videoId)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={225}
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-primary/90 backdrop-blur-sm h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300 border border-white/20">
                  <Play size={24} fill="white" />
                </div>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <Badge
                variant="outline"
                className={getBadgeColor(item.category)}
              >
                {item.category}
              </Badge>
              <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {isLong ? shortDesc + "…" : item.description}
                {isLong && (
                  <button
                    className="ml-1 text-primary underline"
                    onClick={(e) => {
                      e.stopPropagation()
                      openDetail(item)
                    }}
                  >
                    ler mais
                  </button>
                )}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )


 const sectionRefs = {
    inicio: useRef<HTMLElement>(null),
    portfolio: useRef<HTMLElement>(null),
    servicos: useRef<HTMLElement>(null),
    sobre: useRef<HTMLElement>(null),
    contato: useRef<HTMLElement>(null),
    equipe: useRef<HTMLElement>(null),
  }

    // Função para obter a cor do badge baseada na categoria
  

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


  const openDetail = (item: typeof portfolioItems[0]) => {
    setDetailItem(item)
    setIsDetailOpen(true)
  }

  const closeDetail = () => setIsDetailOpen(false)

const openVideoModal = (videoId: string) => {
  const item = portfolioItems.find((item) => item.videoId === videoId) || null
  if (item) {
    setDetailItem(item)
    setIsDetailOpen(true)
  }
}

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
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


  // Função para obter a cor do badge baseada na categoria
  const getBadgeColor = (category: string) => {
    const colors = {
      Institucional: "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
      "Evento Corporativo": "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
      Produto: "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
      Case: "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
      Conteúdo: "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
      "Ação de Marketing": "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
      Artistas: "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
      Treinamento: "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg",
    }
    return colors[category as keyof typeof colors] || "text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg"
  }

  // Ajuste a lógica de filtro para corresponder às categorias exatas
  const filteredItems = (() => {
    switch (activeCategory) {
      case "todos":
        return portfolioItems.slice(0, visibleItems)
      case "institucional":
        return portfolioItems.filter((item) => item.category === "Institucional").slice(0, visibleItems)
      case "evento":
        return portfolioItems.filter((item) => item.category === "Evento Corporativo").slice(0, visibleItems)
      case "produto":
        return portfolioItems.filter((item) => item.category === "Produto").slice(0, visibleItems)
      case "case":
        return portfolioItems.filter((item) => item.category === "Case").slice(0, visibleItems)
      case "conteudo":
        return portfolioItems.filter((item) => item.category === "Conteúdo").slice(0, visibleItems)
      case "marketing":
        return portfolioItems.filter((item) => item.category === "Ação de Marketing").slice(0, visibleItems)
      case "artistas":
        return portfolioItems.filter((item) => item.category === "Artistas").slice(0, visibleItems)
      case "treinamento":
        return portfolioItems.filter((item) => item.category === "Treinamento").slice(0, visibleItems)
      default:
        return portfolioItems.slice(0, visibleItems)
    }
  })()
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
// (removed unused 'methodology' variable)
    },
  ]

    function loadMoreItems(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
      event.preventDefault();
      setIsLoading(true);
      setTimeout(() => {
        setVisibleItems((prev) => prev + 6);
        setIsLoading(false);
      }, 500);
    }
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
                className="text-3xl md:text-5xl lg:text-5xl font-bold mb-4 leading-tight"
              >
                Filmes de alto impacto com qualidade cinematográfica
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-lg md:text-2xl mb-8 text-gray-300"
              >
                Somos uma produtora de filmes especializada em criar conteúdos que conectam marcas e pessoas através
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
                  { src: "/brands/paris-filmes-logo.png", alt: "Paris Filmes", width: 130 },
                  { src: "/brands/sony-logo.png", alt: "Sony", width: 120 },
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
      <section className="bg-black py-16" id="portfolio">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nossos Trabalhos</h2>
            <p className="text-gray-400 text-center mb-12">Confira alguns dos nossos projetos mais recentes</p>
          </motion.div>

          <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="flex justify-center mb-12 bg-transparent gap-2">
              <TabsTrigger
                value="todos"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                TODOS
              </TabsTrigger>
              <TabsTrigger
                value="institucional"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                INSTITUCIONAL
              </TabsTrigger>
              <TabsTrigger
                value="evento"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                EVENTO CORPORATIVO
              </TabsTrigger>
              <TabsTrigger
                value="produto"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                PRODUTO
              </TabsTrigger>
              <TabsTrigger
                value="case"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                CASE
              </TabsTrigger>
              <TabsTrigger
                value="conteudo"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                CONTEÚDO
              </TabsTrigger>
              <TabsTrigger
                value="marketing"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                AÇÃO DE MARKETING
              </TabsTrigger>
              <TabsTrigger
                value="artistas"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                ARTISTAS
              </TabsTrigger>
              <TabsTrigger
                value="treinamento"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md px-4 py-2 text-sm transition-all duration-300 hover:bg-[#00B2B2]/50"
              >
                TREINAMENTO
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todos">
              {renderGrid(portfolioItems.slice(0, visibleItems))}
              {visibleItems < portfolioItems.length && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={loadMoreItems}
                    disabled={isLoading}
                    className="bg-[#00B2B2] hover:bg-[#00B2B2]/90 text-white rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition-all duration-300"
                  >
                    {isLoading ? "Carregando..." : "Carregar Mais"}
                    <ChevronRight size={20} />
                  </Button>
                </div>
              )}
            </TabsContent>

            {["institucional", "evento", "produto", "case", "conteudo", "marketing", "artistas", "treinamento"].map((cat) => (
              <TabsContent key={cat} value={cat}>
                {renderGrid(filteredItems)}
                {filteredItems.length > visibleItems && (
                  <div className="flex justify-center mt-12">
                    <Button
                      onClick={loadMoreItems}
                      disabled={isLoading}
                      className="bg-[#00B2B2] hover:bg-[#00B2B2]/90 text-white rounded-full px-8 py-3 flex items-center gap-2 shadow-lg transition-all duration-300"
                    >
                      {isLoading ? "Carregando..." : "Carregar Mais"}
                      <ChevronRight size={20} />
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
          <div className="flex justify-center mt-12">
  <Link href="/portfolio">
    <Button className="bg-primary hover:bg-primary/90 text-white rounded-md px-8 py-4 flex items-center gap-2 shadow-lg hover:shadow-primary/20 transition-all duration-300">
      VER PORTFÓLIO COMPLETO
      <ChevronRight size={20} />
    </Button>
  </Link>
</div>
        </div>
      </section>

      {/* Modal de Detalhes com Liquid Glass Design */}
      {isDetailOpen && detailItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative bg-gradient-to-br from-black/50 via-black/70 to-transparent backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden max-w-6xl w-full shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={closeDetail}
              className="absolute top-4 right-4 text-white hover:text-[#00B2B2] transition-colors z-10 bg-primary/20 backdrop-blur-md rounded-full p-2"
            >
              <X size={24} />
            </button>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 p-6">
        {/* Video */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${detailItem.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[60vh] rounded-lg shadow-inner"
            />
           
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">{detailItem.title}</h3>
          <Badge
            variant="outline"
            className="text-xs font-medium px-3 py-1.5 backdrop-blur-md bg-primary/20 text-primary border-primary/30 shadow-lg"
          >
            {detailItem.category}
          </Badge>
          <p className="text-gray-300 text-base leading-relaxed">{detailItem.description}</p>
        </div>
      </div>

          {/* Liquid Glass Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00B2B2]/10 via-transparent to-[#00B2B2]/5 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            </motion.div>
          )}


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

        

        {/* RD Station Button (replacing WhatsApp Button) */}
        <RDStationButton />

        
      </div>
      <Footer />
    </>
  )
}
     