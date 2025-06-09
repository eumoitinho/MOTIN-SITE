"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronLeft, X } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { PortfolioVideoModal } from "@/components/portfolio-video-modal"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PortfolioPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")
  const [activeCategory, setActiveCategory] = useState("todos")
  const [visibleItems, setVisibleItems] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const openVideoModal = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoModalOpen(true)
  }

  const loadMoreItems = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 6, portfolioItems.length))
      setIsLoading(false)
    }, 800)
  }

  // Substitua o array portfolioItems completo
  const portfolioItems = [
    {
      title: "AWA COMERCIAL",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/ws6GMw_wtxU/maxresdefault.jpg",
      videoId: "ws6GMw_wtxU",
    },
    {
      title: "ECOPARQUE",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/RRp3Kqn9dcw/maxresdefault.jpg",
      videoId: "RRp3Kqn9dcw",
    },
    {
      title: "UNIFATEB",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/Wyg3UPuf5Ec/maxresdefault.jpg",
      videoId: "Wyg3UPuf5Ec",
    },
    {
      title: "BLUEPRISM",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/kKpIG1XKbS0/maxresdefault.jpg",
      videoId: "kKpIG1XKbS0",
    },
    {
      title: "FAVRETTO MÍDIA EXTERIOR - ELEVADOR",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/carUjyho6cc/maxresdefault.jpg",
      videoId: "carUjyho6cc",
    },
    {
      title: "DITRATOR",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/YU1VTsr-h-Q/maxresdefault.jpg",
      videoId: "YU1VTsr-h-Q",
    },
    {
      title: "FAVRETTO MÍDIA EXTERIOR - CIRCUITO DIGITAL",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/AO4UycrhPMM/maxresdefault.jpg",
      videoId: "AO4UycrhPMM",
    },
    {
      title: "FAVRETTO MÍDIA EXTERIOR - PEDÁGIO",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/odE0fqvvWa8/maxresdefault.jpg",
      videoId: "odE0fqvvWa8",
    },
    {
      title: "SPATEN",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/vcCr_Kbn8Nw/maxresdefault.jpg",
      videoId: "vcCr_Kbn8Nw",
    },
    {
      title: "E.MIX",
      category: "CASE",
      image: "https://i.ytimg.com/vi/hELpTXBl798/maxresdefault.jpg",
      videoId: "hELpTXBl798",
    },
    {
      title: "CW TRENDS",
      category: "CONTEÚDO",
      image: "https://i.ytimg.com/vi/0dVNlYTni_o/maxresdefault.jpg",
      videoId: "0dVNlYTni_o",
    },
    {
      title: "MINHA BIBLIOTECA CATÓLICA",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/evVJT-S8DnA/maxresdefault.jpg",
      videoId: "evVJT-S8DnA",
    },
    {
      title: "DENTALUNI",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/Dvj_JDpJPTU/maxresdefault.jpg",
      videoId: "Dvj_JDpJPTU",
    },
    {
      title: "MERCEDES-BENZ",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/C4V_BwMlKE0/maxresdefault.jpg",
      videoId: "C4V_BwMlKE0",
    },
    {
      title: "LIQUEXPRESS",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/3YNyHv8jH60/maxresdefault.jpg",
      videoId: "3YNyHv8jH60",
    },
    {
      title: "NINETWO PERFORMANCE",
      category: "CONTEÚDO",
      image: "https://i.ytimg.com/vi/WMFSuFo6iAA/maxresdefault.jpg",
      videoId: "WMFSuFo6iAA",
    },
    {
      title: "BIOFARM",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/rGk75VaxOHA/maxresdefault.jpg",
      videoId: "rGk75VaxOHA",
    },
    {
      title: "FAVRETTO MÍDIA EXTERIOR - TOP FRONT",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/muv4EAlVR5M/maxresdefault.jpg",
      videoId: "muv4EAlVR5M",
    },
    {
      title: "PARANÁ CLÍNICAS",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/67FQ4Isw2tM/maxresdefault.jpg",
      videoId: "67FQ4Isw2tM",
    },
    {
      title: "ESCOLAR OFFICE BRASIL",
      category: "CASE",
      image: "https://i.ytimg.com/vi/hx_lx1saEiQ/maxresdefault.jpg",
      videoId: "hx_lx1saEiQ",
    },
    {
      title: "PASA",
      category: "TREINAMENTO",
      image: "https://i.ytimg.com/vi/2baqnywIK5w/maxresdefault.jpg",
      videoId: "2baqnywIK5w",
    },
    {
      title: "NOVARTIS",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/ipRxXf7od5E/maxresdefault.jpg",
      videoId: "ipRxXf7od5E",
    },
    {
      title: "LJ SANTOS - LINHA DE CROMAGEM",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/ond_kR7F_7s/maxresdefault.jpg",
      videoId: "ond_kR7F_7s",
    },
    {
      title: "DENTALUNI",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/NSaibgM86dY/maxresdefault.jpg",
      videoId: "NSaibgM86dY",
    },
    {
      title: "BIOBIO",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/oC-T7m3JU8E/maxresdefault.jpg",
      videoId: "oC-T7m3JU8E",
    },
    {
      title: "BLUEPRISM",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/Zkt_QW_i7LE/maxresdefault.jpg",
      videoId: "Zkt_QW_i7LE",
    },
    {
      title: "ESCOLAR OFFICE BRASIL",
      category: "CASE",
      image: "https://i.ytimg.com/vi/RuZy13ZDmeQ/maxresdefault.jpg",
      videoId: "RuZy13ZDmeQ",
    },
    {
      title: "CONSTRUTORA EQUILÍBRIO",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/XHPNutOOTQo/maxresdefault.jpg",
      videoId: "XHPNutOOTQo",
    },
    {
      title: "ENAF",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/8qlfNTCOGyw/maxresdefault.jpg",
      videoId: "8qlfNTCOGyw",
    },
    {
      title: "LUMICENTER",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/4LE6PpXeUnQ/maxresdefault.jpg",
      videoId: "4LE6PpXeUnQ",
    },
    {
      title: "LJ SANTOS",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/EKEG87eFI9Y/maxresdefault.jpg",
      videoId: "EKEG87eFI9Y",
    },
    {
      title: "CONGEMAS",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/wy-LetubHSk/maxresdefault.jpg",
      videoId: "wy-LetubHSk",
    },
    {
      title: "DUFRIO",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/LgXxgTIMjmY/maxresdefault.jpg",
      videoId: "LgXxgTIMjmY",
    },
    {
      title: "LJ SANTOS - FEIRA",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/rQci5PHwSAA/maxresdefault.jpg",
      videoId: "rQci5PHwSAA",
    },
    {
      title: "ACTION COACH",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/JjBw2zdNuek/maxresdefault.jpg",
      videoId: "JjBw2zdNuek",
    },
    {
      title: "MOTIN FILMS",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/Dm7kuEJ-McY/maxresdefault.jpg",
      videoId: "Dm7kuEJ-McY",
    },
    {
      title: "COMPWIRE",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/eGiFbkpiH0Q/maxresdefault.jpg",
      videoId: "eGiFbkpiH0Q",
    },
    {
      title: "HOGREFE CONSTRUTORA",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/7VhISXacg84/maxresdefault.jpg",
      videoId: "7VhISXacg84",
    },
    {
      title: "FRANCAL FEIRAS",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/foKTC-e29w8/maxresdefault.jpg",
      videoId: "foKTC-e29w8",
    },
    {
      title: "FLASH CONSTRUTORA",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/Roo1OWxkCZM/maxresdefault.jpg",
      videoId: "Roo1OWxkCZM",
    },
    // Continuando com mais vídeos...
    {
      title: "HÄNDZ",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/1Wwb_SWsw7Y/maxresdefault.jpg",
      videoId: "1Wwb_SWsw7Y",
    },
    {
      title: "LJ SANTOS",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/Yziu0LkG_jU/maxresdefault.jpg",
      videoId: "Yziu0LkG_jU",
    },
    {
      title: "CW TRENDS",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/C54Sd59MybM/maxresdefault.jpg",
      videoId: "C54Sd59MybM",
    },
    {
      title: "NAPORT",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/zHZ1DFHkR5E/maxresdefault.jpg",
      videoId: "zHZ1DFHkR5E",
    },
    {
      title: "COMPWIRE",
      category: "CASE",
      image: "https://i.ytimg.com/vi/iVTp2jQn7S0/maxresdefault.jpg",
      videoId: "iVTp2jQn7S0",
    },
    {
      title: "PESADOSWEB",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/Cy0uQBKBCVc/maxresdefault.jpg",
      videoId: "Cy0uQBKBCVc",
    },
    {
      title: "VILA YAMON",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/KnghOm7hUM0/maxresdefault.jpg",
      videoId: "KnghOm7hUM0",
    },
    {
      title: "THIAGO CASTELLI",
      category: "ARTISTAS",
      image: "https://i.ytimg.com/vi/bv-cVU3opAI/maxresdefault.jpg",
      videoId: "bv-cVU3opAI",
    },
    {
      title: "CW TRENDS",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/zkT1PeQJ1oY/maxresdefault.jpg",
      videoId: "zkT1PeQJ1oY",
    },
    {
      title: "RUAN MANSUR",
      category: "ARTISTAS",
      image: "https://i.ytimg.com/vi/wskIIrvk6D4/maxresdefault.jpg",
      videoId: "wskIIrvk6D4",
    },
    {
      title: "THIAGO CASTELLI",
      category: "ARTISTAS",
      image: "https://i.ytimg.com/vi/TISLGrpQ74Y/maxresdefault.jpg",
      videoId: "TISLGrpQ74Y",
    },
    {
      title: "FRESNO",
      category: "ARTISTAS",
      image: "https://i.ytimg.com/vi/Qjciy6xLVsk/maxresdefault.jpg",
      videoId: "Qjciy6xLVsk",
    },
    {
      title: "ACTION COACH",
      category: "CONTEÚDO",
      image: "https://i.ytimg.com/vi/cUatyp4eyhw/maxresdefault.jpg",
      videoId: "cUatyp4eyhw",
    },
    {
      title: "DJ CZ",
      category: "ARTISTAS",
      image: "https://i.ytimg.com/vi/bv-cVU3opAI/maxresdefault.jpg",
      videoId: "bv-cVU3opAI",
    },
    {
      title: "THE BATMAN",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/zkT1PeQJ1oY/maxresdefault.jpg",
      videoId: "zkT1PeQJ1oY",
    },
    {
      title: "SHOT TIME",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/wskIIrvk6D4/maxresdefault.jpg",
      videoId: "wskIIrvk6D4",
    },
    {
      title: "RUAN MANSUR",
      category: "ARTISTAS",
      image: "https://i.ytimg.com/vi/TISLGrpQ74Y/maxresdefault.jpg",
      videoId: "TISLGrpQ74Y",
    },
    {
      title: "CW TRENDS",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/Qjciy6xLVsk/maxresdefault.jpg",
      videoId: "Qjciy6xLVsk",
    },
    {
      title: "CW TRENDS",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/cUatyp4eyhw/maxresdefault.jpg",
      videoId: "cUatyp4eyhw",
    },
    {
      title: "GHOSTBUSTERS",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/bv-cVU3opAI/maxresdefault.jpg",
      videoId: "bv-cVU3opAI",
    },
    {
      title: "FAVRETTO MÍDIA EXTERIOR",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/zkT1PeQJ1oY/maxresdefault.jpg",
      videoId: "zkT1PeQJ1oY",
    },
    {
      title: "GARDS",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/wskIIrvk6D4/maxresdefault.jpg",
      videoId: "wskIIrvk6D4",
    },
    {
      title: "MOTIN FILMS",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/TISLGrpQ74Y/maxresdefault.jpg",
      videoId: "TISLGrpQ74Y",
    },
  ]

  // Atualize a lógica de filtro para incluir as novas categorias
  const filteredItems = (() => {
    switch (activeCategory) {
      case "todos":
        return portfolioItems
      case "institucional":
        return portfolioItems.filter((item) => item.category === "INSTITUCIONAL")
      case "evento":
        return portfolioItems.filter((item) => item.category === "EVENTO CORPORATIVO")
      case "produto":
        return portfolioItems.filter((item) => item.category === "PRODUTO")
      case "case":
        return portfolioItems.filter((item) => item.category === "CASE")
      case "conteudo":
        return portfolioItems.filter((item) => item.category === "CONTEÚDO")
      case "marketing":
        return portfolioItems.filter((item) => item.category === "AÇÃO DE MARKETING")
      case "artistas":
        return portfolioItems.filter((item) => item.category === "ARTISTAS")
      case "treinamento":
        return portfolioItems.filter((item) => item.category === "TREINAMENTO")
      default:
        return portfolioItems
    }
  })()

  
  // Função para obter a cor do badge baseada na categoria
  const getBadgeColor = (category: string) => {
    const colors = {
      INSTITUCIONAL: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "EVENTO CORPORATIVO": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      PRODUTO: "bg-green-500/20 text-green-400 border-green-500/30",
      CASE: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      CONTEÚDO: "bg-pink-500/20 text-pink-400 border-pink-500/30",
      "AÇÃO DE MARKETING": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      ARTISTAS: "bg-red-500/20 text-red-400 border-red-500/30",
      TREINAMENTO: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-black/90 border-b border-gray-800 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <Image src="/motin-logo-white.webp" alt="Motin Films" width={120} height={36} priority />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-[#00B2B2] transition-colors">
              Início
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-[#00B2B2] transition-colors">
              Portfólio
            </Link>
            <Link href="/#servicos" className="text-sm font-medium hover:text-[#00B2B2] transition-colors">
              Serviços
            </Link>
            <Link href="/#sobre" className="text-sm font-medium hover:text-[#00B2B2] transition-colors">
              Sobre
            </Link>
            <Link href="/#contato" className="text-sm font-medium hover:text-[#00B2B2] transition-colors">
              Contato
            </Link>
          </nav>
        </div>
      </header>

 {/* Portfolio Section */}
      <section className="bg-black pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-8">
            <Link href="/" className="flex items-center text-gray-400 hover:text-white mr-4">
              <ChevronLeft size={16} className="mr-1" />
              Voltar
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold">Portfólio Completo</h1>
          </div>

          <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap justify-center mb-8 bg-transparent gap-2">
              <TabsTrigger
                value="todos"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                TODOS
              </TabsTrigger>
              <TabsTrigger
                value="institucional"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                INSTITUCIONAL
              </TabsTrigger>
              <TabsTrigger
                value="evento"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                EVENTOS
              </TabsTrigger>
              <TabsTrigger
                value="produto"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                PRODUTOS
              </TabsTrigger>
              <TabsTrigger
                value="case"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                CASES
              </TabsTrigger>
              <TabsTrigger
                value="conteúdo"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                CONTEÚDO
              </TabsTrigger>
              <TabsTrigger
                value="ação"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                AÇÃO DE MARKETING
              </TabsTrigger>
              <TabsTrigger
                value="artistas"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                ARTISTAS
              </TabsTrigger>
              <TabsTrigger
                value="treinamento"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md"
              >
                TREINAMENTO
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.slice(0, visibleItems).map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
                    whileHover={{ y: -8 }}
                  >
                    <Card className="bg-gray-900/50 border-gray-800 overflow-hidden group hover:border-[#00B2B2]/50 transition-all duration-300">
                      <CardContent className="p-0">
                        {/* Video Thumbnail */}
                        <div
                          className="relative overflow-hidden cursor-pointer"
                          onClick={() => openVideoModal(item.videoId)}
                        >
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={225}
                            className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                            loading={index < 6 ? "eager" : "lazy"}
                          />

                          {/* Play Button Overlay */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                            <Button className="bg-[#00B2B2]/90 hover:bg-[#00B2B2] h-16 w-16 rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                              <Play size={24} fill="white" className="ml-1" />
                            </Button>
                          </div>
                        </div>

                        {/* Card Content - Apenas Badge e Título */}
                        <div className="p-4 space-y-2">
                          {/* Badge */}
                          <Badge
                            variant="outline"
                            className={`text-xs font-medium px-3 py-1 ${getBadgeColor(item.category)}`}
                          >
                            {item.category}
                          </Badge>

                          {/* Title */}
                          <h3 className="font-bold text-lg text-white group-hover:text-[#00B2B2] transition-colors duration-300">
                            {item.title}
                          </h3>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {visibleItems < filteredItems.length && (
            <div className="flex justify-center mt-12">
              <Button
                className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-8 py-4 font-semibold"
                onClick={loadMoreItems}
                disabled={isLoading}
              >
                {isLoading ? "CARREGANDO..." : "CARREGAR MAIS"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal - Limpo sem informações */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-[#00B2B2] transition-colors z-10"
            >
              <X size={32} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}


      <Footer />
    </div>
  )
}
