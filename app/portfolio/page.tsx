"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, ChevronLeft, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { PortfolioVideoModal } from "@/components/portfolio-video-modal"
import { BeamsBackground } from "@/components/beams-background"
import Footer from "@/components/footer"

export default function PortfolioPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")
  const [visibleItems, setVisibleItems] = useState(12)
  const [isLoading, setIsLoading] = useState(false)

  const openVideoModal = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoModalOpen(true)
  }

  const loadMoreItems = () => {
    setIsLoading(true)
    // Simular um carregamento
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + 12, portfolioItems.length))
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
    {
      title: "CASE DE SUCESSO",
      category: "CASE",
      image: "https://i.ytimg.com/vi/8ge3hdMAa8s/maxresdefault.jpg",
      videoId: "8ge3hdMAa8s",
    },
    {
      title: "PERFIL EMPRESARIAL EXECUTIVO",
      category: "EMPRESARIAL",
      image: "https://i.ytimg.com/vi/zH3rERJkmRI/maxresdefault.jpg",
      videoId: "zH3rERJkmRI",
    },
    {
      title: "PRODUTO INOVADOR",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/eBuo2rlB9mo/maxresdefault.jpg",
      videoId: "eBuo2rlB9mo",
    },
    {
      title: "LANÇAMENTO TECNOLÓGICO",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/oD1ITLt8SP4/maxresdefault.jpg",
      videoId: "oD1ITLt8SP4",
    },
    {
      title: "PERFIL CORPORATIVO",
      category: "EMPRESARIAL",
      image: "https://i.ytimg.com/vi/Pr_IcGYSxBM/maxresdefault.jpg",
      videoId: "Pr_IcGYSxBM",
    },
    {
      title: "HISTÓRIA EMPRESARIAL",
      category: "EMPRESARIAL",
      image: "https://i.ytimg.com/vi/h6pFhFZzmsk/maxresdefault.jpg",
      videoId: "h6pFhFZzmsk",
    },
    {
      title: "CAMPANHA DE MARKETING",
      category: "AÇÃO DE MARKETING",
      image: "https://i.ytimg.com/vi/3VHmQY5Ak90/maxresdefault.jpg",
      videoId: "3VHmQY5Ak90",
    },
    {
      title: "PRODUTO EXCLUSIVO",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/-afHOczVR38/maxresdefault.jpg",
      videoId: "-afHOczVR38",
    },
    {
      title: "HISTÓRIA DE MARCA",
      category: "EMPRESARIAL",
      image: "https://i.ytimg.com/vi/jaBbTGKz21k/maxresdefault.jpg",
      videoId: "jaBbTGKz21k",
    },
    {
      title: "PRODUTO PREMIUM",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/WhoDsDLhxW0/maxresdefault.jpg",
      videoId: "WhoDsDLhxW0",
    },
    {
      title: "PERFIL DE EMPRESA",
      category: "EMPRESARIAL",
      image: "https://i.ytimg.com/vi/g_2LCHqdJWg/maxresdefault.jpg",
      videoId: "g_2LCHqdJWg",
    },
    {
      title: "LANÇAMENTO ESPECIAL",
      category: "PRODUTO",
      image: "https://i.ytimg.com/vi/pUB0spMZVZk/maxresdefault.jpg",
      videoId: "pUB0spMZVZk",
    },
    {
      title: "HISTÓRIA CORPORATIVA",
      category: "EMPRESARIAL",
      image: "https://i.ytimg.com/vi/4QJTpvUi6V0/maxresdefault.jpg",
      videoId: "4QJTpvUi6V0",
    },
  ]

  return (
    <>
      <div className="min-h-screen bg-black text-white pt-24">
        {/* Header da página */}
        <BeamsBackground intensity="low" className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center mb-8">
              <Link href="/" className="flex items-center text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={16} className="mr-1" />
                Voltar para Home
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Nosso Portfólio Completo</h1>
            <p className="text-lg text-gray-300 max-w-2xl">
              Explore nossa coleção completa de projetos audiovisuais, desde vídeos institucionais até coberturas de
              eventos e campanhas de produtos.
            </p>
          </div>
        </BeamsBackground>

        {/* Portfolio Section */}
        <section className="bg-black py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="todos" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-transparent">
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
              </div>

              <TabsContent value="todos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {portfolioItems.slice(0, visibleItems).map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative group overflow-hidden rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {portfolioItems
                    .filter((item) => item.category === "INSTITUCIONAL")
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {portfolioItems
                    .filter(
                      (item) =>
                        item.category === "EVENTO" ||
                        item.category === "EVENTO CORPORATIVO" ||
                        item.category === "EVENTO DE ENTRETENIMENTO",
                    )
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {portfolioItems
                    .filter((item) => item.category === "PRODUTO")
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
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

              <TabsContent value="empresarial" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {portfolioItems
                    .filter((item) => item.category === "EMPRESARIAL")
                    .slice(0, visibleItems)
                    .map((item, index) => (
                      <motion.div
                        key={index}
                        className="relative group overflow-hidden rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
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

            <div className="flex justify-center mt-10">
              {visibleItems < portfolioItems.length ? (
                <Button
                  className="bg-[#00B2B2] hover:bg-[#009999] text-white rounded-md px-6 py-3 flex items-center gap-2"
                  onClick={loadMoreItems}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      CARREGANDO...
                    </>
                  ) : (
                    "CARREGAR MAIS PROJETOS"
                  )}
                </Button>
              ) : (
                <p className="text-gray-400 text-sm">Todos os projetos foram carregados</p>
              )}
            </div>
          </div>
        </section>

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
