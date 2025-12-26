"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  X,
  ArrowRight,
  Users,
  Video,
  Globe,
  Target,
  Lightbulb,
  Camera,
  Edit,
  Film,
  Briefcase,
  BookOpen,
  Shield,
  Clock,
  TrendingUp,
  Star,
  Rocket,
  Heart,
  Eye,
  CheckCircle2,
  Sparkles,
  Newspaper,
} from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { BrandCarousel } from "@/components/brand-carousel"
import { VideoBackground } from "@/components/video-background"
import { CustomVideoPlayer } from "@/components/custom-video-player"
import { RDStationButton } from "@/components/rd-station-button"
import { portfolioVideos } from "@/lib/portfolio-data"
import Footer from "@/components/footer"
import { openRdStationPopup } from "@/lib/rd-lead-tracking"

// Counter component for animated numbers
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(countRef, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, end, duration])

  return (
    <div ref={countRef} className="text-4xl md:text-5xl font-bold">
      {count}
      {suffix}
    </div>
  )
}

const handleRdStationPopup = (e: { preventDefault: () => void }) => {
  openRdStationPopup(e, "rdstation_popup")
}

export default function MotinFilms() {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailItem, setDetailItem] = useState<null | (typeof portfolioItems)[0]>(null)
  const [activeCategory, setActiveCategory] = useState("todos")

  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100])

  const testimonials = [
    {
      text: "Ficamos super satisfeitos com a produção. Vídeo principal, vídeos de performance bônus, show. Atendimento, suporte, grupo com profissionais pré, durante e pós evento.",
      author: "ENAF",
      image: "/testimonials/enaf.webp",
    },
    {
      text: "Excelente experiência, conseguimos terminar nosso projeto com bastante tempo hábil e entregar pros gestores da empresa, antes da nossa feira.",
      author: "Marco Paulo Jr.",
      image: "/testimonials/marco.webp",
    },
    {
      text: 'A nossa minisérie "Escolar pelo Brasil" contou a história de 10 papelarias de norte a sul do Brasil e foi inspirador conhecer a jornada empreendedora de cada um.',
      author: "Escolar Office Brasil",
      image: "/brands/escolar-office-brasil.jpeg",
    },
  ]

  const portfolioItems = [
    {
    title: "Unifateb",
    category: "Institucional",
    description: "Filme institucional produzido para a Unifateb e o Colégio Dom Bosco, instituições que há mais de duas décadas impulsionam o desenvolvimento educacional de Telêmaco Borba e região.",
    image: "https://i.ytimg.com/vi/Wyg3UPuf5Ec/maxresdefault.jpg",
    videoId: "Wyg3UPuf5Ec",
  },
    {
    title: "LJ Santos | Linha de Cromagem",
    category: "Produto",
    description: "Filme produzido para a LJ Santos, destacando sua linha de cromagem, projetada para garantir o acabamento impecável de peças plásticas para o setor automobilístico.",
    image: "https://i.ytimg.com/vi/hELpTXBl798/maxresdefault.jpg",
    videoId: "hELpTXBl798",
  },
    {
      title: "BioBio Cosméticos - Only One | Filme Produto",
      category: "Produto",
      description: "Lançamento do produto Only One da BioBio Cosméticos, destacando sua fórmula inovadora e benefícios para a pele.",
      image: "https://i.ytimg.com/vi/RuZy13ZDmeQ/maxresdefault.jpg",
      videoId: "RuZy13ZDmeQ",
    },
{
    title: "Ditrator",
    category: "Institucional",
    description: "Filme institucional produzido para a Ditrator, distribuidora de peças para tratores agrícolas e motores a diesel com mais de 30 anos de história.",
    image: "https://i.ytimg.com/vi/AO4UycrhPMM/maxresdefault.jpg",
    videoId: "AO4UycrhPMM",
  },
{
    title: "AWA Comercial",
    category: "Institucional",
    description: "Filme institucional para a AWA Comercial, referência nacional na fabricação e distribuição de produtos em aço para o setor da construção civil.",
    image: "https://i.ytimg.com/vi/6bseD2wgI6A/maxresdefault.jpg",
    videoId: "6bseD2wgI6A",
  },
  {
    title: "E.Mix",
    category: "Case",
    description: "Filme case com depoimentos do Grupo Positivo sobre a implementação dos softwares de automação para comércio exterior e logística da e.Mix.",
    image: "https://i.ytimg.com/vi/VBOcex5L9-Y/maxresdefault.jpg",
    videoId: "VBOcex5L9-Y",
  },

  ]

  const services = [
    {
      icon: Film,
      title: "Filmes Institucionais",
      description: "Conte a história da sua empresa de forma envolvente e profissional",
      link: "/filmes-institucionais",
      gradient: "from-[#00b2b2]/20 to-[#008080]/20",
    },
    {
      icon: Briefcase,
      title: "Eventos Corporativos",
      description: "Capture os momentos mais importantes dos seus eventos empresariais",
      link: "/eventos-corporativos",
      gradient: "from-[#00b2b2]/20 to-[#008080]/20",
    },
    {
      icon: BookOpen,
      title: "Filmes de Conteúdo",
      description: "Crie conteúdo estratégico para suas redes sociais e marketing digital",
      link: "/filmes-conteudo",
      gradient: "from-[#00b2b2]/20 to-[#008080]/20",
    },
  ]

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Processo transparente",
      description: "Acompanhe cada etapa do projeto com total controle sobre o resultado final",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Users,
      title: "Equipe especializada",
      description: "Profissionais especializados em marketing e produções audiovisuais de alta qualidade",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Rocket,
      title: "Tecnologia de ponta",
      description: "Equipamentos de última geração para capturas dinâmicas e inovadoras",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Star,
      title: "Edição profissional",
      description: "Técnicas avançadas de sonoplastia, color grading e edição cinematográfica",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Globe,
      title: "Cobertura nacional",
      description: "Atendemos todo o Brasil com a mesma qualidade e excelência comprovada",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: TrendingUp,
      title: "Resultados comprovados",
      description: "Mais de 10 anos no mercado com centenas de clientes satisfeitos",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
  ]

  const methodology = [
    {
      icon: Target,
      title: "Planejamento estratégico",
      description: "Entendemos suas necessidades e criamos vídeos que atendam aos seus objetivos específicos",
      step: "01",
    },
    {
      icon: Lightbulb,
      title: "Roteiro inteligente",
      description: "Desenvolvemos roteiros que tornam sua mensagem clara, impactante e capaz de gerar conversões",
      step: "02",
    },
    {
      icon: Camera,
      title: "Captação profissional",
      description: "Utilizamos movimentos de câmera inovadores e drones para capturas cinematográficas",
      step: "03",
    },
    {
      icon: Edit,
      title: "Edição e finalização",
      description: "Aplicamos técnicas avançadas que elevam a qualidade e prendem a atenção do público",
      step: "04",
    },
  ]

  const stats = [
    { number: 10, label: "Anos de mercado", icon: Clock, color: "text-[#00b2b2]", suffix: "+" },
    { number: 300, label: "Clientes satisfeitos", icon: Heart, color: "text-[#00b2b2]", suffix: "+" },
    { number: 500, label: "Filmes realizados", icon: Video, color: "text-[#00b2b2]", suffix: "+" },
    { number: 2000, label: "Projetos desenvolvidos", icon: Eye, color: "text-[#00b2b2]", suffix: "+" },
  ]

  const renderGrid = (items: typeof portfolioItems) => (
    <div className="modern-grid">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -6, scale: 1.02 }}
          className="group cursor-pointer"
          onClick={() => openDetail(item)}
        >
          <div className="modern-card">
            <div className="relative overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                width={400}
                height={225}
                className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <div className="bg-primary/90 backdrop-blur-sm h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Play size={24} fill="white" />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-3">
              <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-medium px-3 py-1">
                {item.category}
              </Badge>
              <h3 className="text-lg font-semibold text-white group-hover:text-primary/30 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
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

  const openDetail = (item: (typeof portfolioItems)[0]) => {
    setDetailItem(item)
    setIsDetailOpen(true)
  }

  const closeDetail = () => setIsDetailOpen(false)

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

      const sections = document.querySelectorAll(".section-slide-up")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          section.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const filteredItems = (() => {
    switch (activeCategory) {
      case "todos":
        return portfolioItems
      case "institucional":
        return portfolioItems.filter((item) => item.category === "Institucional")
      case "evento":
        return portfolioItems.filter((item) => item.category === "Evento Corporativo")
      case "produto":
        return portfolioItems.filter((item) => item.category === "Produto")
      case "case":
        return portfolioItems.filter((item) => item.category === "Case")
      case "conteudo":
        return portfolioItems.filter((item) => item.category === "Conteúdo")
      case "marketing":
        return portfolioItems.filter((item) => item.category === "Ação de Marketing")
      case "artistas":
        return portfolioItems.filter((item) => item.category === "Artistas")
      case "treinamento":
        return portfolioItems.filter((item) => item.category === "Treinamento")
      default:
        return portfolioItems
    }
  })()

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Link href="/" className="text-2xl font-bold">
                <Image src="/motin-logo-white.webp" alt="Motin Films" width={120} height={36} priority />
              </Link>
            </motion.div>

            <motion.nav
              className="hidden md:flex space-x-8"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link
                href="#inicio"
                className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "inicio" ? "text-primary" : "text-gray-300"}`}
              >
                Início
              </Link>
              <Link
                href="#portfolio"
                className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "portfolio" ? "text-primary" : "text-gray-300"}`}
              >
                Portfólio
              </Link>
              <Link
                href="#servicos"
                className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "servicos" ? "text-primary" : "text-gray-300"}`}
              >
                Serviços
              </Link>
              <Link
                href="#sobre"
                className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "sobre" ? "text-primary" : "text-gray-300"}`}
              >
                Sobre
              </Link>
              <Link
                href="#contato"
                className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "contato" ? "text-primary" : "text-gray-300"}`}
              >
                Contato
              </Link>
            </motion.nav>

            <motion.button
              className="md:hidden text-white"
              onClick={toggleMenu}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </motion.button>
          </div>

          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-md shadow-lg absolute w-full border-b border-white/10"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="container mx-auto px-6 py-6 flex flex-col space-y-4">
                {["inicio", "portfolio", "servicos", "sobre", "contato"].map((section) => (
                  <Link
                    key={section}
                    href={`#${section}`}
                    className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === section ? "text-primary" : "text-gray-300"}`}
                    onClick={() => scrollToSection(section)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </header>

        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          id="inicio"
        >
          <VideoBackground videoId="ewm0U5C3nAo" fallbackImage="bg-black" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60"></div>

          <div className="container mx-auto px-6 z-20 relative text-center">
            <div className="max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight tracking-tight"
              >
                Filmes de alto impacto
                <br />
                <span className="font-semibold">com qualidade cinematográfica</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl mb-12 text-gray-300 font-light leading-relaxed"
              >
                Criamos conteúdos que conectam marcas e pessoas através de histórias memoráveis
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Button asChild className="modern-button text-white px-8 py-4 text-lg font-medium flex items-center gap-3 mx-auto mb-4">
                  <a href="#portfolio">
                    Conheça nossas soluções
                    <ArrowRight size={20} />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
            </div>
          </motion.div>
        </motion.section>

        {/* Brands Section */}
        <section className="section-slide-up bg-black py-16 border-t border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-center text-lg font-light mb-12 text-gray-400">Marcas que confiam</h3>
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
            </motion.div>
          </div>
        </section>

        {/* Video Promo Section */}
        <section className="section-slide-up relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image src="/images/cameraman-bg.webp" alt="Cameraman" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-light mb-8 leading-tight">
                  Crie seu filme com a produtora
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-[#00b2b2] to-[#008080] bg-clip-text text-transparent">
                
                das grandes marcas</span>
                </h2>
                <ul className="mb-10 space-y-4">
                  {[
                    "Gere mais contatos interessados e mais vendas",
                    "Crie conexão com sua audiência",
                    "Exponha seu produto de maneira única no mercado",
                    "Reforce a lembrança da sua marca",
                  ].map((item, index) => ( 
                    <li key={index} className="flex items-center gap-4">
                      <span className="bg-gradient-to-r from-[#00b2b2] to-[#008080] bg-clip-text text-transparent text-xl">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
  className="modern-button text-white px-8 py-4 flex items-center gap-3"
  onClick={handleRdStationPopup}
>
  Fale com um consultor
  <ArrowRight size={20} />
</Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="modern-card overflow-hidden shadow-2xl">
                  <CustomVideoPlayer videoId="1AVEH6OtbeY" className="aspect-video w-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Produtora Licenciada Section */}
        <section className="section-slide-up bg-gradient-to-r from-gray-900/50 to-black py-12 border-y border-white/10">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-0">Produtora Licenciada</h2>
            <Image src="/brands/ancine.png" alt="Ancine" width={150} height={75} className="opacity-80" />
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="section-slide-up bg-black py-20" id="portfolio">
          <div className="container mx-auto px-6 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 bg-[#00b2b2]/10 border border-[#00b2b2]/20 rounded-full px-4 py-2 mb-6">
                <Newspaper className="w-4 h-4 text-[#00b2b2]" />
                <span className="text-[#00b2b2] text-sm font-medium">Portfólio</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Nossos {" "}
                
                <span className="font-semibold bg-gradient-to-r from-[#00b2b2] to-[#008080] bg-clip-text text-transparent">
                 Trabalhos
                </span>
              </h2>
              <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
               Confira alguns dos nossos projetos
              </p>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
            >
              {renderGrid(portfolioItems)}
            </motion.div>

            <div className="flex justify-center mt-16">
              <Link href="/portfolio">
                <Button className="modern-button text-white px-8 py-4 flex items-center gap-3">
                  Ver portfólio completo
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section-slide-up bg-black py-20 border-t border-white/10" id="servicos">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 bg-[#00b2b2]/10 border border-[#00b2b2]/20 rounded-full px-4 py-2 mb-6">
                <Camera className="w-4 h-4 text-[#00b2b2]" />
                <span className="text-[#00b2b2] text-sm font-medium">Audiovisual completo</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Nossos
                <br />
                <span className="font-semibold bg-gradient-to-r from-[#00b2b2] to-[#008080] bg-clip-text text-transparent">
                 Serviços
                </span>
              </h2>
              <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
               Soluções completas em produção audiovisual 
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/10 p-8 h-full transition-all duration-300 hover:border-[#00b2b2]/50 hover:shadow-2xl hover:shadow-[#00b2b2]/10`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/80"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 bg-[#00b2b2]/20 rounded-full flex items-center justify-center group-hover:bg-[#00b2b2]/30 transition-colors">
                        <service.icon className="w-8 h-8 text-[#00b2b2]" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 group-hover:text-[#00b2b2] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
                      <Link href={service.link}>
                        <Button className="bg-[#00b2b2]/20 text-[#00b2b2] border border-[#00b2b2]/30 hover:bg-[#00b2b2] hover:text-white transition-all duration-300 px-6 py-2 text-sm">
                          Saiba mais
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section - Simplified */}
        <section className="section-slide-up bg-black py-24 border-t border-white/10 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00b2b2] rounded-full filter blur-[120px]"></div>
            <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#00b2b2] rounded-full filter blur-[120px]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 bg-[#00b2b2]/10 border border-[#00b2b2]/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#00b2b2]" />
                <span className="text-[#00b2b2] text-sm font-medium">Por que nos escolher</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 leading-tight">
                Diferenciais que fazem
                <br />
                <span className="font-semibold bg-gradient-to-r from-[#00b2b2] to-[#008080] bg-clip-text text-transparent">
                  toda a diferença
                </span>
              </h2>
              <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                Descubra por que somos a escolha preferida de grandes marcas para suas produções audiovisuais
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {whyChooseUs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} border border-white/10 p-8 h-full transition-all duration-300 hover:border-[#00b2b2]/30 hover:shadow-xl hover:shadow-[#00b2b2]/10 hover:-translate-y-2`}
                  >
                    {/* Icon Container */}
                    <div
                      className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold bg-gradient-to-r from-[#00b2b2] to-[#008080] bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00b2b2]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <Button onClick={handleRdStationPopup} className="modern-button text-white px-8 py-4 text-lg font-medium flex items-center gap-3 mx-auto">
                <CheckCircle2 className="w-5 h-5" />
                Comece seu projeto agora
                <ArrowRight size={20} />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats Section - Enhanced */}
        {/* <section className="section-slide-up bg-black py-24 border-t border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">Nossos números falam por si</h2>
              <p className="text-gray-400 text-lg font-light">Resultados que comprovam nossa excelência</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black border border-white/10 p-8 text-center transition-all duration-300 hover:border-[#00b2b2]/30 hover:shadow-xl hover:shadow-[#00b2b2]/10 hover:-translate-y-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className={`w-12 h-12 ${stat.color} mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="w-full h-full" />
                    </motion.div>

                    <div className="mb-4">
                      <AnimatedCounter end={stat.number} suffix={stat.suffix} duration={2500} />
                    </div>

                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Methodology Section */}
        <section className="section-slide-up bg-black py-20 border-t border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">Nossa Metodologia</h2>
              <p className="text-gray-400 text-lg font-light">Processo estruturado para resultados excepcionais</p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {methodology.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black border border-white/10 p-8 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                          <span className="text-primary font-bold text-lg">{step.step}</span>
                        </div>
                        <step.icon className="w-8 h-8 text-primary mt-2 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-slide-up bg-black py-20 border-t border-white/10">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h6 className="text-sm uppercase tracking-wider mb-4 text-primary font-medium">DEPOIMENTOS</h6>
              <h2 className="text-2xl md:text-3xl font-light">Resultados comprovados por quem mais entende</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-black border border-white/10 p-8 h-full transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2">
                    <p className="italic text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.author}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">- {testimonial.author}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          ref={sectionRefs.sobre}
          className="section-slide-up bg-black py-20 border-t border-white/10"
          id="sobre"
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h6 className="text-sm uppercase tracking-wider mb-4 text-primary font-medium">QUEM SOMOS?</h6>
              <h2 className="text-2xl md:text-3xl font-light">Conheça a Motin Films</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="md:col-span-2 space-y-6"
              >
                <p className="text-gray-300 leading-relaxed">
                  Somos a Motin Films, uma produtora especializada em produções audiovisuais de alto impacto e
                  certificada pela Ancine. Com mais de 10 anos de atuação no mercado, produzimos filmes com a missão de
                  criar conexões entre marcas e consumidores.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Com técnicas inovadoras de edição e captação dinâmica, nossos projetos são personalizados e planejados
                  de acordo com as necessidades específicas de cada cliente. Com qualidade excepcional de imagem e som,
                  produzimos filmes para produtos, eventos corporativos, institucionais, promocionais, entre outros.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Acreditamos que o audiovisual é uma ferramenta poderosa para a construção de imagem da sua empresa.
                  Através de técnicas de storytelling, contamos histórias que inspiram e agregam valor à sua marca e
                  seus produtos.
                </p>
                <Button onClick={handleRdStationPopup} className="modern-button text-white px-8 py-4 flex items-center gap-3">
                  Fale conosco agora!
                  <ArrowRight size={20} />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="modern-card p-8 text-center">
                  <Image
                    src="/about/catalisti-grupo.png"
                    alt="Grupo Catalisti"
                    width={300}
                    height={150}
                    className="mb-4"
                  />
                  <p className="text-gray-400 text-sm font-light">Uma empresa Catalisti Holding</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Modal de Detalhes */}
        {isDetailOpen && detailItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="modern-card overflow-hidden max-w-6xl w-full shadow-2xl"
            >
              <button
                onClick={closeDetail}
                className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-10 bg-black/50 backdrop-blur-md rounded-full p-3"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 gap-8 p-8">
                <div className="relative">
                  <div className="modern-card overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${detailItem.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-[60vh] rounded-2xl"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white">{detailItem.title}</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs font-medium px-3 py-1">
                    {detailItem.category}
                  </Badge>
                  <p className="text-gray-300 text-base leading-relaxed">{detailItem.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
      <Footer />
    </>
  )
}
