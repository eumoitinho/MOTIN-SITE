"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronLeft, X, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer";
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
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
    {items.map((item, i) => {
      const shortDesc = item.description.slice(0, 100)
      const isLong = item.description.length > 100
      // Bento Grid Logic:
      // First item is huge (2x2)
      // Every 7th item after that is wide (2x1)
      const isFeatured = i === 0
      const isWide = i > 0 && i % 6 === 0
      
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          viewport={{ once: true }}
          whileHover={{ y: -8, scale: 1.02 }}
          className={`group cursor-pointer ${isFeatured ? "md:col-span-2 md:row-span-2" : isWide ? "md:col-span-2" : "col-span-1"}`}
        >
          <div
            className="relative overflow-hidden bg-secondary/30 border border-white/5 shadow-2xl hover:shadow-primary/20 transition-all duration-500 h-full flex flex-col"
            onClick={() => openVideoModal(item.videoId)}
          >
            <div className={`relative overflow-hidden ${isFeatured ? "aspect-video md:aspect-auto md:h-full md:flex-1" : "aspect-video"}`}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                <div className={`bg-primary/70 rounded-full flex items-center justify-center border border-primary/30 transform scale-90 group-hover:scale-100 transition-transform duration-300 ${isFeatured ? "h-24 w-24" : "h-16 w-16"}`}>
                  <Play size={isFeatured ? 48 : 24} className="text-white" />
                </div>
              </div>
            </div>
            <div className={`${isFeatured ? "p-8" : "p-6"} space-y-4 bg-secondary/10 flex-shrink-0`}>
              <Badge
                variant="outline"
                className={getBadgeColor(item.category)}
              >
                {item.category}
              </Badge>
              <h3 className={`${isFeatured ? "text-3xl md:text-4xl" : "text-xl"} font-heading font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors`}>
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-light">
                {isLong ? shortDesc + "…" : item.description}
                {isLong && (
                  <button
                    className="ml-1 text-primary underline hover:text-primary/80 transition-colors"
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
    const baseStyle = "text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-none border-primary/30 bg-primary/10 text-primary";
    return baseStyle;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}


      {/* Portfolio Section */}
      <section className="min-h-screen pt-32 pb-16 px-6 md:px-12 lg:px-24 bg-transparent" id="portfolio">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Nosso Portfólio</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none mb-6">Trabalhos Recentes</h3>
            <p className="text-muted-foreground font-light max-w-2xl mx-auto text-lg">Explore nossa coleção de trabalhos mais recentes</p>
          </motion.div>

          <Tabs defaultValue="todos" className="w-full" onValueChange={setActiveCategory}>
              <TabsList className="flex justify-center mb-16 bg-transparent gap-2 md:gap-3 flex-wrap max-w-full h-auto">
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
      className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-none px-6 py-3 text-xs md:text-sm font-heading font-bold uppercase tracking-widest transition-all duration-300 hover:bg-primary/20 border border-white/10 mb-2"
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
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeDetail}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-secondary/10 backdrop-blur-md border border-white/10 overflow-hidden max-w-6xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeDetail}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70"
            >
              <X size={24} />
            </button>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-8 p-8">
              {/* Video */}
              <div className="relative">
                <div className="relative overflow-hidden bg-black border border-white/10 shadow-lg aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${detailItem.videoId}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-3xl font-heading font-bold uppercase tracking-wide text-white">{detailItem.title}</h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-none border-primary/30 bg-primary/10 text-primary"
                  >
                    {detailItem.category}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">{detailItem.description}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      <Footer />
    </div>
  )
}

