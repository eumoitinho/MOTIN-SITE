"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { PortfolioVideoModal } from "@/components/portfolio-video-modal"
import Footer from "@/components/footer"

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

  // Lista completa de itens do portfólio
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
    {
      title: "ESCOLAR OFFICE BRASIL",
      category: "INSTITUCIONAL",
      image: "/portfolio/escolar-office-brasil-2.jpeg",
      videoId: "hELpTXBl798",
    },
    {
      title: "FAVRETTO MÍDIA EXTERIOR",
      category: "PRODUTO",
      image: "/portfolio/favretto-midia-1.jpeg",
      videoId: "ijhaceaSY94",
    },
    {
      title: "FAVRETTO MÍDIA EXTERIOR",
      category: "PRODUTO",
      image: "/portfolio/favretto-midia-2.jpeg",
      videoId: "HyK3vy4dgaI",
    },
    // Novos vídeos adicionados com thumbnails do YouTube
    {
      title: "PRODUTO ESPECIAL",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/cUatyp4eyhw/maxresdefault.jpg",
      videoId: "cUatyp4eyhw",
    },
    {
      title: "INSTITUCIONAL CORPORATIVO",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/Qjciy6xLVsk/maxresdefault.jpg",
      videoId: "Qjciy6xLVsk",
    },
    {
      title: "APRESENTAÇÃO INSTITUCIONAL",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/odE0fqvvWa8/maxresdefault.jpg",
      videoId: "odE0fqvvWa8",
    },
    {
      title: "EVENTO CORPORATIVO ANUAL",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/bv-cVU3opAI/maxresdefault.jpg",
      videoId: "bv-cVU3opAI",
    },
    {
      title: "CONFERÊNCIA EMPRESARIAL",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/zkT1PeQJ1oY/maxresdefault.jpg",
      videoId: "zkT1PeQJ1oY",
    },
    {
      title: "WORKSHOP CORPORATIVO",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/wskIIrvk6D4/maxresdefault.jpg",
      videoId: "wskIIrvk6D4",
    },
    {
      title: "LANÇAMENTO DE PRODUTO",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/TISLGrpQ74Y/maxresdefault.jpg",
      videoId: "TISLGrpQ74Y",
    },
    {
      title: "PERFIL EMPRESARIAL",
      category: "EMPRESARIAL",
      image: "https://i.ytimg.com/vi/eGiFbkpiH0Q/maxresdefault.jpg",
      videoId: "eGiFbkpiH0Q",
    },
    {
      title: "EVENTO ESPECIAL",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/foKTC-e29w8/maxresdefault.jpg",
      videoId: "foKTC-e29w8",
    },
    {
      title: "CONFERÊNCIA ANUAL",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/Dm7kuEJ-McY/maxresdefault.jpg",
      videoId: "Dm7kuEJ-McY",
    },
    {
      title: "REUNIÃO EXECUTIVA",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/1Wwb_SWsw7Y/maxresdefault.jpg",
      videoId: "1Wwb_SWsw7Y",
    },
    {
      title: "PALESTRA CORPORATIVA",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/Yziu0LkG_jU/maxresdefault.jpg",
      videoId: "Yziu0LkG_jU",
    },
    {
      title: "EVENTO TECNOLÓGICO",
      category: "EVENTO CORPORATIVO",
      image: "https://i.ytimg.com/vi/C54Sd59MybM/maxresdefault.jpg",
      videoId: "C54Sd59MybM",
    },
    {
      title: "VÍDEO INSTITUCIONAL",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/zHZ1DFHkR5E/maxresdefault.jpg",
      videoId: "zHZ1DFHkR5E",
    },
    {
      title: "APRESENTAÇÃO CORPORATIVA",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/Roo1OWxkCZM/maxresdefault.jpg",
      videoId: "Roo1OWxkCZM",
    },
    {
      title: "FESTIVAL DE MÚSICA",
      category: "EVENTO DE ENTRETENIMENTO",
      image: "https://i.ytimg.com/vi/7VhISXacg84/maxresdefault.jpg",
      videoId: "7VhISXacg84",
    },
    {
      title: "LANÇAMENTO DE PRODUTO PREMIUM",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/KnghOm7hUM0/maxresdefault.jpg",
      videoId: "KnghOm7hUM0",
    },
    {
      title: "VÍDEO INSTITUCIONAL CORPORATIVO",
      category: "INSTITUCIONAL",
      image: "https://i.ytimg.com/vi/iVTp2jQn7S0/maxresdefault.jpg",
      videoId: "iVTp2jQn7S0",
    },
    {
      title: "CAMPANHA DE PRODUTO",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/Cy0uQBKBCVc/maxresdefault.jpg",
      videoId: "Cy0uQBKBCVc",
    },
  ]

  // Filtrar itens com base na categoria selecionada
  const filteredItems =
    activeCategory === "todos"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category.toLowerCase().includes(activeCategory.toLowerCase()))

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
            <h1 className="text-2xl md:text-3xl font-bold">Portfólio Completo</h1>
          </div>

          <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveCategory}>
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
              <TabsTrigger
                value="empresarial"
                className="data-[state=active]:bg-[#00B2B2] data-[state=active]:text-white rounded-md mx-1"
              >
                EMPRESARIAL
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredItems.slice(0, visibleItems).map((item, index) => (
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
                      loading={index < 6 ? "eager" : "lazy"}
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

          {visibleItems < filteredItems.length && (
            <div className="flex justify-center mt-10">
              <Button
                className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3"
                onClick={loadMoreItems}
                disabled={isLoading}
              >
                {isLoading ? "CARREGANDO..." : "CARREGAR MAIS"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      <PortfolioVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoId={currentVideoId}
      />

      <Footer />
    </div>
  )
}
