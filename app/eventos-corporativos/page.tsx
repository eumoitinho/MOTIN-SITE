"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Play,
  ArrowRight,
  CheckCircle,
  Users,
  Video,
  Zap,
  Globe,
  Award,
  X,
  Target,
  Lightbulb,
  Camera,
  Edit,
  Sparkles,
} from "lucide-react"
import { motion } from "framer-motion"
import Footer from "@/components/footer"

export default function EventosCorporativos() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>("")

  const portfolioVideos = [
    {
      title: "ENAF 2023",
      videoId: "Roo1OWxkCZM",
      image: "https://i.ytimg.com/vi/Roo1OWxkCZM/maxresdefault.jpg",
    },
    {
      title: "Evento Corporativo",
      videoId: "jaBbTGKz21k",
      image: "https://i.ytimg.com/vi/jaBbTGKz21k/maxresdefault.jpg",
    },
    {
      title: "Convenção de Vendas",
      videoId: "Qjciy6xLVsk",
      image: "https://i.ytimg.com/vi/Qjciy6xLVsk/maxresdefault.jpg",
    },
    {
      title: "Lançamento de Produto",
      videoId: "Zkt_QW_i7LE",
      image: "https://i.ytimg.com/vi/Zkt_QW_i7LE/maxresdefault.jpg",
    },
  ]

  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: "Processo transparente",
      description: "Do briefing à entrega final, você estará sempre ciente de cada etapa do projeto",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Users,
      title: "Equipe multidisciplinar",
      description: "Profissionais especializados em marketing, eventos, filmagem corporativa e fotografia",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Video,
      title: "Metodologia inovadora",
      description: "Equipamentos de última geração com técnicas inovadoras de captura",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Award,
      title: "Edição profissional",
      description: "Técnicas avançadas de sonoplastia, color grading e edição dinâmica",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Zap,
      title: "Agilidade no processo",
      description: "Entrega do filme em tempo recorde, sem comprometer a qualidade",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
    {
      icon: Globe,
      title: "Cobertura nacional",
      description: "Nossa equipe percorre todo o Brasil com a mesma qualidade",
      gradient: "from-[#00b2b2]/10 to-[#008080]/5",
      iconBg: "bg-[#00b2b2]/20",
      iconColor: "text-[#00b2b2]",
    },
  ]

const handleRdStationPopup = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (window.RdstationPopup && typeof window.RdstationPopup.open === 'function') {
      window.RdstationPopup.open();
    } else {
      console.error('Popup do RD Station não disponível ou não inicializado.');
      // Fallback: Simulate click on RD Station floating button
      const rdFloatingButton = document.getElementById('rd-floating_button-lfvfzlpr');
      if (rdFloatingButton) {
        rdFloatingButton.click();
      } else {
        console.error('Botão flutuante do RD Station (rd-floating_button-lfvfzlpr) não encontrado.');
      }
    }
  };

  const methodology = [
    {
      icon: Target,
      title: "Planejamento estratégico",
      description:
        "Planejamento minucioso para entender suas necessidades e criar vídeos que atendam aos seus objetivos",
    },
    {
      icon: Lightbulb,
      title: "Roteiro",
      description:
        "Time especializado em marketing cria roteiros que tornam sua mensagem clara, impactante e capaz de gerar conversões",
    },
    {
      icon: Camera,
      title: "Captação",
      description: "Utilizamos movimentos de câmera inovadores e drones para capturas aéreas impressionantes",
    },
    {
      icon: Edit,
      title: "Edição e finalização",
      description: "Técnicas de edição que elevam a qualidade de cada projeto e prendem a atenção do público",
    },
  ]

  const openVideoModal = (videoId: string) => {
    setCurrentVideoId(videoId)
    setIsVideoModalOpen(true)
  }

  const closeVideoModal = () => {
    setIsVideoModalOpen(false)
    setCurrentVideoId(null)
  }


  return (
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
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/#portfolio" className="text-sm font-medium hover:text-primary transition-colors">
              Portfólio
            </Link>
            <Link href="/#servicos" className="text-sm font-medium hover:text-primary transition-colors">
              Serviços
            </Link>
            <Link href="/#sobre" className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </Link>
            <Link href="/#contato" className="text-sm font-medium hover:text-primary transition-colors">
              Contato
            </Link>
          </motion.nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-light mb-6 leading-tight">
                Transforme seu evento corporativo em uma
                <span className="text-primary font-semibold"> experiência inesquecível</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-gray-300 font-light leading-relaxed">
                Há mais de 10 anos, nossa equipe de especialistas em eventos corporativos utiliza tecnologias de última
                geração para entregar produções que geram autoridade para o seu negócio e conexão com sua audiência.
              </p>
              <Link href="#portfolio">
                <Button  onClick={handleRdStationPopup} className="modern-button text-white px-8 py-4 flex items-center gap-3">
                  Veja nosso portfólio!
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Produtora Licenciada Section */}
      <section className="bg-gradient-to-r from-gray-900/50 to-black py-12 border-y border-white/10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-2xl md:text-3xl font-light mb-4 md:mb-0">Produtora Licenciada</h2>
          <Image src="/brands/ancine.png" alt="Ancine" width={150} height={75} className="opacity-80" />
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">Cobertura completa do seu evento corporativo</h2>
              <p className="text-xl text-gray-300 leading-relaxed font-light">
                Desde convenções de vendas até lançamentos de produtos, nossa equipe especializada garante que cada
                momento importante seja capturado com a mais alta qualidade técnica e criativa.
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="modern-grid-2 mb-16">
              {[
                {
                  icon: Video,
                  title: "Cobertura completa do evento",
                  description:
                    "Filmagem de todas as atividades principais: palestras, apresentações, networking e momentos especiais.",
                },
                {
                  icon: Users,
                  title: "Entrevistas e depoimentos",
                  description:
                    "Captação de entrevistas com palestrantes, participantes e organizadores para enriquecer o conteúdo.",
                },
                {
                  icon: Camera,
                  title: "Capturas aéreas com drone",
                  description: "Imagens aéreas impressionantes do local do evento e da movimentação dos participantes.",
                },
                {
                  icon: Edit,
                  title: "Edição profissional",
                  description:
                    "Montagem dinâmica com trilha sonora, letterings e efeitos visuais que valorizam o conteúdo.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="modern-card p-8 group"
                >
                  <div className="flex items-center mb-6">
                    <service.icon className="w-8 h-8 text-primary mr-4 icon-float" />
                    <h3 className="text-xl font-semibold text-primary">{service.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Button id="wpp" onClick={handleRdStationPopup} className="modern-button text-white px-8 py-4 flex items-center gap-3 mx-auto">
                Solicite um orçamento
                <ArrowRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-black py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-center text-lg font-light mb-12 text-gray-400">Marcas que confiam</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
              {[
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
              ].map((brand, index) => (
                <Image
                  key={index}
                  src={brand.src || "/placeholder.svg"}
                  alt={brand.alt}
                  width={brand.width}
                  height={60}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">Nosso portfólio</h2>
            <p className="text-xl text-gray-400 font-light">
              Confira alguns dos nossos trabalhos em eventos corporativos
            </p>
          </motion.div>

          <div className="modern-grid mb-12">
            {portfolioVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => openVideoModal(video.videoId)}
              >
                <div className="modern-card overflow-hidden">
                  <div className="relative">
                    <Image
                      src={video.image || "/placeholder.svg"}
                      alt={video.title}
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
                    <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/portfolio">
            <Button className="modern-button text-white px-8 py-4 flex items-center gap-3 mx-auto">
              Acesse nosso portfólio completo!
              <ArrowRight size={20} />
            </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Updated */}
      <section className="bg-black py-24 border-t border-white/10 relative overflow-hidden">
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
              Por que escolher a
              <br />
              <span className="font-semibold bg-gradient-to-r from-[#00b2b2] to-[#008080] bg-clip-text text-transparent">
                Motin Films?
              </span>
            </h2>
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

          <div className="text-center mt-16">
            <Button id="wpp" onClick={handleRdStationPopup} className="modern-button text-white px-8 py-4 flex items-center gap-3 mx-auto">
              Conheça nosso método!
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-light mb-16 text-center">Nossos números</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-4xl mx-auto">
            {[
              { number: "+10", label: "anos de mercado" },
              { number: "+300", label: "clientes satisfeitos" },
              { number: "+500", label: "filmes realizados" },
              { number: "+2,000", label: "projetos desenvolvidos" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="modern-card p-8"
              >
                <p className="text-3xl md:text-4xl font-light stat-number mb-2">{stat.number}</p>
                <p className="text-gray-400 font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-black py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">METODOLOGIA</h2>
            <p className="text-xl text-gray-400 font-light">Compartilhe sua ideia e deixe o resto conosco!</p>
          </motion.div>

          <div className="modern-grid-2 max-w-5xl mx-auto">
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="modern-card p-8 group"
              >
                <div className="flex items-center mb-6">
                  <step.icon className="w-12 h-12 text-primary mr-4 icon-float" />
                </div>
                <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-black border-t border-white/10">
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

          <div className="modern-grid-3 max-w-6xl mx-auto">
            {[
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
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="testimonial-card p-8"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-black py-20 border-t border-white/10">
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
                Somos a Motin Films, uma produtora especializada em produções audiovisuais de alto impacto e certificada
                pela Ancine. Com mais de 10 anos de atuação no mercado, produzimos filmes com a missão de criar conexões
                entre marcas e consumidores.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Com técnicas inovadoras de edição e captação dinâmica, nossos projetos são personalizados e planejados
                de acordo com as necessidades específicas de cada cliente. Com qualidade excepcional de imagem e som,
                produzimos filmes para produtos, eventos corporativos, institucionais, promocionais, entre outros.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Acreditamos que o audiovisual é uma ferramenta poderosa para a construção de imagem da sua empresa.
                Através de técnicas de storytelling, contamos histórias que inspiram e agregam valor à sua marca e seus
                produtos.
              </p>
              <Button id="wpp" onClick={handleRdStationPopup} className="modern-button text-white px-8 py-4 flex items-center gap-3">
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

      {/* Video Modal */}
      {isVideoModalOpen && currentVideoId && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
              className="w-full h-full rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
