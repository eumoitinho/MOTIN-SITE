"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronLeft, X, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { portfolioVideos } from "@/lib/portfolio-data"

export default function PortfolioPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")
  const [activeCategory, setActiveCategory] = useState("todos")
  const [visibleItems, setVisibleItems] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailItem, setDetailItem] = useState<typeof portfolioVideos[0] | null>(null)

  const openDetail = (item: typeof portfolioVideos[0]) => {
    setDetailItem(item)
    setIsDetailOpen(true)
  }

  const closeDetail = () => setIsDetailOpen(false)

const openVideoModal = (videoId: string) => {
  const item = portfolioVideos.find((item) => item.videoId === videoId) || null
  if (item) {
    setDetailItem(item)
    setIsDetailOpen(true)
  }
}

const renderGrid = (items: typeof portfolioVideos) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
  const loadMoreItems = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 6, portfolioVideos.length))
      setIsLoading(false)
    }, 800)
  }



  // Ajuste a lógica de filtro para corresponder às categorias exatas
  const filteredItems = (() => {
    switch (activeCategory) {
      case "todos":
        return portfolioVideos.slice(0, visibleItems)
      case "institucional":
        return portfolioVideos.filter((item) => item.category === "Institucional").slice(0, visibleItems)
      case "evento":
        return portfolioVideos.filter((item) => item.category === "Evento Corporativo").slice(0, visibleItems)
      case "produto":
        return portfolioVideos.filter((item) => item.category === "Produto").slice(0, visibleItems)
      case "case":
        return portfolioVideos.filter((item) => item.category === "Case").slice(0, visibleItems)
      case "conteudo":
        return portfolioVideos.filter((item) => item.category === "Conteúdo").slice(0, visibleItems)
      case "marketing":
        return portfolioVideos.filter((item) => item.category === "Ação de Marketing").slice(0, visibleItems)
      case "artistas":
        return portfolioVideos.filter((item) => item.category === "Artistas").slice(0, visibleItems)
      case "treinamento":
        return portfolioVideos.filter((item) => item.category === "Treinamento").slice(0, visibleItems)
      default:
        return portfolioVideos.slice(0, visibleItems)
    }
  })()

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
      <section className="bg-black pt-40 py-16" id="portfolio">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nosso portfólio</h2>
            <p className="text-gray-400 text-center mb-12">Explore nossa coleção de trabalhos mais recentes</p>
          </motion.div>

          <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveCategory}>
              <TabsList className="flex justify-center mb-16 bg-transparent gap-2 md:gap-3 flex-wrap max-w-full">
  {[
    "todos",
    "institucional",
    "evento",
    "produto",
    "case",
    "conteudo",
    "marketing",
    "artistas",
    "treinamento",
  ].map((category) => (
    <TabsTrigger
      key={category}
      value={category}
      className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-full px-3 sm:px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-primary/20 border border-white/10 mb-2"
    >
      {category === "todos"
        ? "TODOS"
        : category === "institucional"
          ? "INSTITUCIONAL"
          : category === "evento"
            ? "EVENTO CORP."
            : category === "produto"
              ? "PRODUTO"
              : category === "case"
                ? "CASE"
                : category === "conteudo"
                  ? "CONTEÚDO"
                  : category === "marketing"
                    ? "MARKETING"
                    : category === "artistas"
                      ? "ARTISTAS"
                      : "TREINAMENTO"}
    </TabsTrigger>
  ))}
</TabsList>

              <TabsContent value="todos">{renderGrid(portfolioVideos)}</TabsContent>

              {["institucional", "evento", "produto", "case", "conteudo", "marketing", "artistas", "treinamento"].map(
                (cat) => (
                  <TabsContent key={cat} value={cat}>
                    {renderGrid(filteredItems)}
                  </TabsContent>
                ),
              )}
            </Tabs>
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
      <Footer />
    </div>
  )
}
