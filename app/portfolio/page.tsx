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

export default function PortfolioPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")
  const [activeCategory, setActiveCategory] = useState("todos")
  const [visibleItems, setVisibleItems] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [detailItem, setDetailItem] = useState<typeof portfolioItems[0] | null>(null)

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

const renderGrid = (items: typeof portfolioItems) => (
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
      setVisibleItems((prev) => Math.min(prev + 6, portfolioItems.length))
      setIsLoading(false)
    }, 800)
  }

  const portfolioItems = [
    {
      title: "AWA Comercial | Filme Institucional",
      category: "Institucional",
      description: "Vídeo institucional que apresenta a AWA Comercial, destacando sua missão, valores e os serviços oferecidos, com imagens de alta qualidade que refletem sua identidade corporativa.",
      image: "https://i.ytimg.com/vi/ws6GMw_wtxU/maxresdefault.jpg",
      videoId: "ws6GMw_wtxU",
    },
    {
      title: "Minha Biblioteca Católica - Esqueça um Livro | Filme Ação de Marketing",
      category: "Ação de Marketing",
      description: "Campanha criativa promovendo a iniciativa 'Esqueça um Livro' da Minha Biblioteca Católica, incentivando a troca de livros em espaços públicos com uma narrativa envolvente e emocional.",
      image: "https://i.ytimg.com/vi/RRp3Kqn9dcw/maxresdefault.jpg",
      videoId: "RRp3Kqn9dcw",
    },
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
      title: "SS&C Blue Prism - Buenos Aires | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Cobertura profissional do evento corporativo da SS&C Blue Prism em Buenos Aires, capturando palestras, networking e momentos-chave com edição dinâmica.",
      image: "https://i.ytimg.com/vi/carUjyho6cc/maxresdefault.jpg",
      videoId: "carUjyho6cc",
    },
    {
      title: "Favretto Mídia Exterior - Mídia Elevadores | Filme Produto",
      category: "Produto",
      description: "Lançamento do serviço de mídia em elevadores da Favretto Mídia Exterior, destacando sua eficácia em publicidade com exemplos visuais e depoimentos.",
      image: "https://i.ytimg.com/vi/YU1VTsr-h-Q/maxresdefault.jpg",
      videoId: "YU1VTsr-h-Q",
    },
    {
      title: "Ditrator | Filme Institucional",
      category: "Institucional",
      description: "Vídeo institucional que apresenta a Ditrator, enfatizando sua expertise em soluções industriais e sua presença no mercado com imagens de produção.",
      image: "https://i.ytimg.com/vi/AO4UycrhPMM/maxresdefault.jpg",
      videoId: "AO4UycrhPMM",
    },
    {
      title: "Paraná Clínicas | Filme Institucional",
      category: "Institucional",
      description: "Apresentação institucional das Paraná Clínicas, destacando seus serviços médicos, instalações modernas e compromisso com a saúde da comunidade.",
      image: "https://i.ytimg.com/vi/odE0fqvvWa8/maxresdefault.jpg",
      videoId: "odE0fqvvWa8",
    },
    {
      title: "NineTwo Performance - KPIs | Filme Conteúdo",
      category: "Conteúdo",
      description: "Vídeo educativo da NineTwo Performance sobre KPIs (Indicadores-Chave de Performance), oferecendo insights práticos para otimização de resultados empresariais.",
      image: "https://i.ytimg.com/vi/vcCr_Kbn8Nw/maxresdefault.jpg",
      videoId: "vcCr_Kbn8Nw",
    },
    {
      title: "LJ Santos - Linha de Cromagem | Filme Produto",
      category: "Produto",
      description: "Lançamento da linha de cromagem da LJ Santos, apresentando o processo de produção e os benefícios do produto com foco em qualidade e durabilidade.",
      image: "https://i.ytimg.com/vi/hELpTXBl798/maxresdefault.jpg",
      videoId: "hELpTXBl798",
    },
    {
      title: "Dental Uni - Connect Week Summit | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Cobertura do Connect Week Summit da Dental Uni, destacando palestras, workshops e networking no setor odontológico com edição profissional.",
      image: "https://i.ytimg.com/vi/0dVNlYTni_o/maxresdefault.jpg",
      videoId: "0dVNlYTni_o",
    },
    {
      title: "Biofarm - Lançamento EPREMIUM 5% | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Registro do lançamento do EPREMIUM 5% pela Biofarm, capturando a cerimônia, apresentações e o impacto do novo produto no mercado farmacêutico.",
      image: "https://i.ytimg.com/vi/evVJT-S8DnA/maxresdefault.jpg",
      videoId: "evVJT-S8DnA",
    },
    {
      title: "Liquexpress | Filme Institucional",
      category: "Institucional",
      description: "Vídeo institucional da Liquexpress, destacando seus serviços logísticos e a infraestrutura que garante eficiência e confiabilidade no transporte.",
      image: "https://i.ytimg.com/vi/Dvj_JDpJPTU/maxresdefault.jpg",
      videoId: "Dvj_JDpJPTU",
    },
    {
      title: "Hogrefe Construtora - Beach World Residences | Filme Produto",
      category: "Produto",
      description: "Lançamento do empreendimento Beach World Residences pela Hogrefe Construtora, com imagens aéreas e detalhes dos diferenciais do projeto residencial.",
      image: "https://i.ytimg.com/vi/C4V_BwMlKE0/maxresdefault.jpg",
      videoId: "C4V_BwMlKE0",
    },
    {
      title: "SS&C Blue Prism Live - Live São Paulo | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Cobertura ao vivo do evento SS&C Blue Prism em São Paulo, com destaque para apresentações e interações ao vivo com edição em tempo real.",
      image: "https://i.ytimg.com/vi/3YNyHv8jH60/maxresdefault.jpg",
      videoId: "3YNyHv8jH60",
    },
    {
      title: "Francal - Rebranding | Filme Ação de Marketing",
      category: "Ação de Marketing",
      description: "Campanha de rebranding da Francal, apresentando a nova identidade visual e valores da marca com um vídeo impactante e moderno.",
      image: "https://i.ytimg.com/vi/WMFSuFo6iAA/maxresdefault.jpg",
      videoId: "WMFSuFo6iAA",
    },
    {
      title: "Escolar Office Brasil - Lepok Papelaria | Filme Case",
      category: "Case",
      description: "Case de sucesso da Escolar Office Brasil com a Lepok Papelaria, mostrando como a parceria impulsionou vendas e visibilidade no mercado.",
      image: "https://i.ytimg.com/vi/rGk75VaxOHA/maxresdefault.jpg",
      videoId: "rGk75VaxOHA",
    },
    {
      title: "The Batman - Warner Bros. Pictures | Filme Ação de Marketing",
      category: "Ação de Marketing",
      description: "Campanha promocional do filme The Batman pela Warner Bros., com cenas exclusivas e teasers que geram expectativa para o lançamento.",
      image: "https://i.ytimg.com/vi/muv4EAlVR5M/maxresdefault.jpg",
      videoId: "muv4EAlVR5M",
    },
    {
      title: "Flash Construtora - Casa em Santa Felicidade | Filme Produto",
      category: "Produto",
      description: "Lançamento de uma casa em Santa Felicidade pela Flash Construtora, destacando design, localização e características do imóvel.",
      image: "https://i.ytimg.com/vi/67FQ4Isw2tM/maxresdefault.jpg",
      videoId: "67FQ4Isw2tM",
    },
    {
      title: "Circuito Oliveira de Rodeio | Filme Evento",
      category: "Evento Corporativo",
      description: "Cobertura do Circuito Oliveira de Rodeio, capturando competições, cultura e momentos marcantes do evento com edição vibrante.",
      image: "https://i.ytimg.com/vi/hx_lx1saEiQ/maxresdefault.jpg",
      videoId: "hx_lx1saEiQ",
    },
    {
      title: "Naport - Pintura Eletrostática | Filme Produto",
      category: "Produto",
      description: "Apresentação do serviço de pintura eletrostática da Naport, destacando a tecnologia e os benefícios para a indústria.",
      image: "https://i.ytimg.com/vi/2baqnywIK5w/maxresdefault.jpg",
      videoId: "2baqnywIK5w",
    },
    {
      title: "Construtora Equilíbrio - Blanc de Rouge | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Cobertura do evento de lançamento do empreendimento Blanc de Rouge pela Construtora Equilíbrio, com foco em arquitetura e inovação.",
      image: "https://i.ytimg.com/vi/ipRxXf7od5E/maxresdefault.jpg",
      videoId: "ipRxXf7od5E",
    },
    {
      title: "Lumicenter Lighting - Essência Lumicenter 2024 | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Registro do evento Essência Lumicenter 2024, destacando lançamentos de produtos e tendências em iluminação com edição sofisticada.",
      image: "https://i.ytimg.com/vi/ond_kR7F_7s/maxresdefault.jpg",
      videoId: "ond_kR7F_7s",
    },
    {
      title: "ENAF - Congresso Brasileiro de Musculação | Filme Evento Corporativo",
      category: "Evento Corporativo",
      description: "Cobertura do Congresso Brasileiro de Musculação da ENAF, com palestras, demonstrações e networking no setor fitness.",
      image: "https://i.ytimg.com/vi/NSaibgM86dY/maxresdefault.jpg",
      videoId: "NSaibgM86dY",
    },
    {
      title: "Händz - Headphone EcoSound | Filme Produto",
      category: "Produto",
      description: "Lançamento do headphone EcoSound da Händz, destacando design sustentável e qualidade de som com demonstrações práticas.",
      image: "https://i.ytimg.com/vi/oC-T7m3JU8E/maxresdefault.jpg",
      videoId: "oC-T7m3JU8E",
    },
    {
      title: "Gards Drinks & Cocktails | Filme Institucional",
      category: "Institucional",
      description: "Vídeo institucional da Gards, apresentando sua linha de drinks e cocktails com foco em qualidade e experiência sensorial.",
      image: "https://i.ytimg.com/vi/Zkt_QW_i7LE/maxresdefault.jpg",
      videoId: "Zkt_QW_i7LE",
    },
    {
      title: "BioBio Cosméticos - Only One | Filme Produto",
      category: "Produto",
      description: "Lançamento do produto Only One da BioBio Cosméticos, destacando sua fórmula inovadora e benefícios para a pele.",
      image: "https://i.ytimg.com/vi/RuZy13ZDmeQ/maxresdefault.jpg",
      videoId: "RuZy13ZDmeQ",
    },
    {
      title: "CWTrends Suplementos | Filme Institucional",
      category: "Institucional",
      description: "Apresentação institucional da CWTrends Suplementos, destacando sua linha de produtos e compromisso com a saúde e performance.",
      image: "https://i.ytimg.com/vi/XHPNutOOTQo/maxresdefault.jpg",
      videoId: "XHPNutOOTQo",
    },
  ]

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