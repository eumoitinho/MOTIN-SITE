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
import { Footer } from "@/components/footer"

export default function FilmesInstitucionais() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>("")

  const portfolioVideos = [
    {
      title: "ActionCOACH",
      videoId: "Roo1OWxkCZM",
      image: "https://i.ytimg.com/vi/Roo1OWxkCZM/maxresdefault.jpg",
    },
    {
      title: "CW Trends",
      videoId: "jaBbTGKz21k",
      image: "https://i.ytimg.com/vi/jaBbTGKz21k/maxresdefault.jpg",
    },
    {
      title: "LJ Santos",
      videoId: "Qjciy6xLVsk",
      image: "https://i.ytimg.com/vi/Qjciy6xLVsk/maxresdefault.jpg",
    },
    {
      title: "Gards",
      videoId: "Zkt_QW_i7LE",
      image: "https://i.ytimg.com/vi/Zkt_QW_i7LE/maxresdefault.jpg",
    },
    {
      title: "Vila Yamon",
      videoId: "JjBw2zdNuek",
      image: "https://i.ytimg.com/vi/JjBw2zdNuek/maxresdefault.jpg",
    },
  ]

  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: "Processo transparente",
      description: "Do briefing à entrega final, você estará sempre ciente de cada etapa do projeto",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Users,
      title: "Equipe multidisciplinar",
      description: "Profissionais especializados em marketing, eventos, filmagem corporativa e fotografia",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Video,
      title: "Metodologia inovadora",
      description: "Equipamentos de última geração com técnicas inovadoras de captura",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Award,
      title: "Edição profissional",
      description: "Técnicas avançadas de sonoplastia, color grading e edição dinâmica",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Zap,
      title: "Agilidade no processo",
      description: "Entrega do filme em tempo recorde, sem comprometer a qualidade",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      icon: Globe,
      title: "Cobertura nacional",
      description: "Nossa equipe percorre todo o Brasil com a mesma qualidade",
      gradient: "from-primary/10 to-primary/5",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
  ]

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


      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden pt-32">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 text-primary leading-[0.9] uppercase">
                <span className="text-primary font-bold">Especialistas</span> <span className="text-foreground opacity-90">em contar histórias com excelência</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed tracking-wide uppercase">
                Há mais de 10 anos, nossa equipe de especialistas em roteiro, direção e pós-produção utilizam
                tecnologias de última geração para entregar produções que geram autoridade para o seu negócio e conexão
                com sua audiência.
              </p>
              <Link href="#portfolio" className="inline-block">
              <Button className="rounded-none px-10 py-7 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest">
                Veja nosso portfólio
                <ArrowRight size={20} className="ml-2" />
              </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Produtora Licenciada Section */}
      <section className="py-16 border-y border-border/40 bg-secondary/30 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-muted-foreground">Produtora Licenciada</h2>
          <Image src="/brands/ancine.png" alt="Ancine" width={150} height={75} className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 border-y border-border/40 bg-secondary/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-center text-xs font-heading font-bold text-muted-foreground mb-10 uppercase tracking-[0.3em]">Marcas que confiam</p>
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
                  className="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Versions Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Formatos</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Versões Disponíveis</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {[
              {
                number: "1",
                title: "FILME INSTITUCIONAL",
                description:
                  "Filme que captura a essência e identidade completa do seu negócio. Com roteiro envolvente, narração impactante, captações dinâmicas e recursos atrativos de edição.",
                duration: "a definir",
              },
              {
                number: "2",
                title: "FILME PARA REDES SOCIAIS",
                description:
                  "Versão mais curta e direcionada do filme principal, criada para gerar engajamento nas redes sociais com edição dinâmica e uso estratégico de letterings.",
                duration: "1 minuto",
              },
              {
                number: "3",
                title: "FILME COMERCIAL",
                description:
                  "Versão compacta do filme principal, ideal para uso em apresentações, feiras, eventos e exibições na televisão com apelo comercial.",
                duration: "30 segundos",
              },
              {
                number: "4",
                title: "FILME DE PERFORMANCE",
                description:
                  "Compactos e altamente eficazes, ideal para anúncios e campanhas pagas com mensagens diretas e chamadas comerciais.",
                duration: "15 segundos",
              },
            ].map((version, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-secondary/10 border border-white/5 p-8 hover:bg-secondary/20 transition-colors"
              >
                <div className="flex items-center mb-6">
                  <span className="bg-primary/20 text-primary w-10 h-10 rounded-none flex items-center justify-center text-sm font-bold mr-4 font-heading">
                    {version.number}
                  </span>
                  <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground">{version.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed font-light">{version.description}</p>
                <p className="text-primary font-bold text-sm uppercase tracking-widest">Duração: {version.duration}</p>
              </motion.div>
            ))}
          </div>

          {/* Format Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-12">Opções de formatos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-secondary/10 border border-white/5 p-8 text-center">
                <div className="bg-secondary/30 w-full h-24 mb-6 flex items-center justify-center border border-white/5">
                  <span className="text-primary font-bold text-lg font-heading">16:9</span>
                </div>
                <h4 className="font-heading font-bold uppercase tracking-wide mb-2">Wide (16:9)</h4>
                <p className="text-muted-foreground text-sm font-light">
                  Ideal para uso em sites, comerciais, apresentações e plataformas como o YouTube.
                </p>
              </div>
              <div className="bg-secondary/10 border border-white/5 p-8 text-center">
                <div className="bg-secondary/30 w-16 h-24 mb-6 mx-auto flex items-center justify-center border border-white/5">
                  <span className="text-primary font-bold text-lg font-heading">9:16</span>
                </div>
                <h4 className="font-heading font-bold uppercase tracking-wide mb-2">Vertical (9:16)</h4>
                <p className="text-muted-foreground text-sm font-light">Ideal para Reels, Shorts, Stories, TikTok e status.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 md:px-12 lg:px-24 bg-transparent border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Portfólio</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Trabalhos Realizados</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
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
                <div className="relative aspect-video overflow-hidden bg-secondary/30">
                  <div className="relative h-full">
                    <Image
                      src={video.image || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                      <div className="bg-primary/70 rounded-full h-16 w-16 flex items-center justify-center border border-primary/30 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Play size={24} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6 space-y-2">
                  <h3 className="text-xl font-heading font-bold uppercase tracking-wide text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/portfolio">
              <Button className="rounded-none px-10 py-7 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest">
                Ver portfólio completo
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Updated */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/10 relative border-y border-border/20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Diferenciais</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Por que escolher a<br/>Motin Films?</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="w-12 h-1 bg-primary mb-6 group-hover:w-20 transition-all duration-500" />
                <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-4 text-foreground">{item.title}</h4>
                <p className="text-muted-foreground font-light leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button id="wpp" onClick={handleRdStationPopup} className="rounded-none px-10 py-7 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest">
              Conheça nosso método
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Metodologia</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none mb-6">Como trabalhamos</h3>
            <p className="text-xl text-muted-foreground font-light max-w-2xl">Compartilhe sua ideia e deixe o resto conosco!</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start group"
              >
                <span className="text-4xl font-heading font-bold text-primary/20 group-hover:text-primary transition-colors">0{index + 1}</span>
                <div>
                    <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-2 text-foreground group-hover:text-primary transition-colors">{step.title}</h4>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-transparent border-t border-border/40">
        <div className="container mx-auto px-6">
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
                className="p-8"
              >
                <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground font-light uppercase tracking-wide text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent border-t border-border/40">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Depoimentos</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Resultados Comprovados</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                text: 'A nossa minisérie "Escolar pelo Brasil" contou a história de 10 papelarias de norte a sul do Brasil e foi inspirador conhecer a jornada empreendedora de cada uno.',
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
                className="bg-secondary/10 border border-white/5 p-8"
              >
                <p className="italic text-muted-foreground mb-6 leading-relaxed font-light">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-primary/20">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-heading font-bold uppercase tracking-wide text-sm text-foreground">- {testimonial.author}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Quem Somos</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Conheça a Motin Films</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-2 space-y-6"
            >
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Somos a Motin Films, uma produtora especializada em produções audiovisuais de alto impacto e certificada
                pela Ancine. Com mais de 10 anos de atuação no mercado, produzimos filmes com a missão de criar conexões
                entre marcas e consumidores.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Com técnicas inovadoras de edição e captação dinâmica, nossos projetos são personalizados e planejados
                de acordo com as necessidades específicas de cada cliente. Com qualidade excepcional de imagem e som,
                produzimos filmes para produtos, eventos corporativos, institucionais, promocionais, entre outros.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light text-lg">
                Acreditamos que o audiovisual é uma ferramenta poderosa para a construção de imagem da sua empresa.
                Através de técnicas de storytelling, contamos histórias que inspiram e agregam valor à sua marca e seus
                produtos.
              </p>
              <Button id="wpp" onClick={handleRdStationPopup} className="rounded-none px-10 py-7 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest">
                Fale conosco agora
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="bg-secondary/10 border border-white/5 p-8 text-center w-full">
                <Image
                  src="/about/catalisti-grupo.png"
                  alt="Grupo Catalisti"
                  width={300}
                  height={150}
                  className="mb-4 mx-auto"
                />
                <p className="text-muted-foreground text-sm font-light uppercase tracking-widest">Uma empresa Catalisti Holding</p>
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
