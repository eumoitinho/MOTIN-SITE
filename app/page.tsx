"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Play, ArrowRight, CheckCircle, Users, Video, Zap, Globe, Award, Target, Lightbulb, Camera, Edit, Monitor, Smartphone, Film, BarChart, Clock, AlertTriangle, DollarSign, EyeOff, MessageSquare, Frown, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandCarousel } from "@/components/brand-carousel"
import { HorizontalScrollCarousel } from "@/components/horizontal-scroll-carousel"
import { Badge } from "@/components/ui/badge"

export default function MotinFilms() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const portfolioItems = [
    {
      title: "Mercedes Benz",
      category: "Institucional",
      description: "Filme institucional para Mercedes Benz.",
      image: "https://i.ytimg.com/vi/Wyg3UPuf5Ec/maxresdefault.jpg", // Placeholder, update if real ID known
      videoId: "Wyg3UPuf5Ec",
    },
    {
      title: "AWA Comercial",
      category: "Comercial",
      description: "Filme comercial para AWA.",
      image: "https://i.ytimg.com/vi/6bseD2wgI6A/maxresdefault.jpg",
      videoId: "6bseD2wgI6A",
    },
    {
      title: "Unifateb",
      category: "Institucional",
      description: "Filme institucional produzido para a Unifateb.",
      image: "https://i.ytimg.com/vi/Wyg3UPuf5Ec/maxresdefault.jpg",
      videoId: "Wyg3UPuf5Ec",
    },
    {
      title: "LJ Santos",
      category: "Produto",
      description: "Filme de produto para LJ Santos.",
      image: "https://i.ytimg.com/vi/hELpTXBl798/maxresdefault.jpg",
      videoId: "hELpTXBl798",
    },
    {
      title: "BioBio Cosméticos",
      category: "Produto",
      description: "Lançamento de produto BioBio Cosméticos.",
      image: "https://i.ytimg.com/vi/RuZy13ZDmeQ/maxresdefault.jpg",
      videoId: "RuZy13ZDmeQ",
    },
    {
      title: "Ditrator",
      category: "Institucional",
      description: "Filme institucional para Ditrator.",
      image: "https://i.ytimg.com/vi/AO4UycrhPMM/maxresdefault.jpg",
      videoId: "AO4UycrhPMM",
    },
  ]

  const painPoints = [
    {
      icon: Film,
      problem: "Vídeos genéricos?",
      solution: "Tenha filmes irreverentes, com linguagem moderna e impacto para destacar sua empresa no mercado."
    },
    {
      icon: Clock,
      problem: "Falta de tempo para planejar?",
      solution: "Não se preocupe com nada. Cuidamos de todo o processo, do conceito à entrega, para que você foque no seu negócio."
    },
    {
      icon: FileText,
      problem: "Roteiros confusos?",
      solution: "Nossos roteiristas especialistas em marketing criam narrativas que simplificam a complexidade do seu negócio."
    },
    {
      icon: Camera,
      problem: "Falta de equipamentos e recursos?",
      solution: "Contamos com tecnologia de ponta e equipe especializada para produções cinematográficas."
    },
    {
      icon: DollarSign,
      problem: "Orçamento limitado?",
      solution: "Oferecemos soluções personalizadas e formas de pagamento facilitadas que se encaixam na sua necessidade."
    },
    {
      icon: EyeOff,
      problem: "Baixa percepção de autoridade?",
      solution: "Elevamos a imagem da sua marca, transmitindo o profissionalismo e a credibilidade que sua marca merece."
    },
    {
      icon: MessageSquare,
      problem: "Comunicação desatualizada?",
      solution: "Modernizamos sua marca com vídeos que conversam com a linguagem das redes sociais e aumentam seu alcance."
    },
    {
      icon: Frown,
      problem: "Vídeos cansativos?",
      solution: "Unimos criatividade e técnicas avançadas de edição e storytelling para prender a atenção do espectador."
    }
  ]

  const services = [
    {
      title: "Filmes Institucional",
      description: "Apresente seus produtos, serviços, valores e missão de forma envolvendo e profissional, fortalecendo a identidade da sua marca."
    },
    {
      title: "Filmes Produto",
      description: "Destaque seus produtos de maneira única no mercado, expondo seus diferenciais e impulsionando vendas."
    },
    {
      title: "Filme Evento Corporativo",
      description: "Capture os momentos mais importantes dos seus eventos, transformando-os em materiais de divulgação impactantes."
    },
    {
      title: "Filmes Conteúdo",
      description: "Dê voz à sua marca nas redes sociais com conteúdos estratégicos que informam, conectam e geram autoridade."
    },
    {
      title: "Filmes Case",
      description: "Demonstre a experiência e o sucesso de clientes reais com seu produto ou serviço, construindo credibilidade e validando sua expertise."
    },
    {
      title: "Filmes Ação de Marketing",
      description: "Divulgue suas campanhas promocionais e ações com vídeos que geram engajamento e atraem novos clientes."
    }
  ]

  const differentials = [
    { title: "Processo transparente", desc: "Do briefing à entrega final, você estará sempre ciente de cada etapa do projeto e terá total controle sobre o resultado." },
    { title: "Equipe especializada", desc: "Unimos conhecimento em marketing com a expertise cinematográfica de nossa equipe para criar filmes não apenas contem sua história, mas também vendam sua marca." },
    { title: "Tecnologia de ponta", desc: "Utilizamos equipamentos de última geração, incluindo drones e câmeras tecnológicas, para capturas dinâmicas e takes cinematográficos." },
    { title: "Edição avançada", desc: "Empregamos técnicas inovadoras de edição, sonoplastia e color grading para levar ritmo e linguagem para o seu vídeo e prender a atenção da sua audiência." },
    { title: "Agilidade na entrega", desc: "Com processos otimizados, garantimos a entrega do filme em tempo recorde, sem comprometer a qualidade do projeto." },
    { title: "Abrangência nacional", desc: "Não importa onde você esteja, nossa equipe percorre todo o Brasil para garantir que sua produção seja realizada com a mais alta qualidade." }
  ]

  const methodology = [
    { step: "01", title: "Planejamento estratégico", desc: "Em uma reunião de briefing, mergulhamos no seu negócio para entender suas necessidades e criar filmes que atendam aos seus objetivos." },
    { step: "02", title: "Roteiro", desc: "Nosso time especializado em marketing cria roteiros que não apenas contam sua história, mas tornam sua mensagem clara, impactante e capaz de gerar conversões." },
    { step: "03", title: "Storyboard", desc: "Antes da filmagem, desenvolvemos um storyboard detalhado, planejando meticulosamente cada cena para uma narrativa coerente e envolvente." },
    { step: "04", title: "Captação", desc: "Durante a captação, utilizamos movimentos de câmera inovadores e drones para capturas aéreas impressionantes." },
    { step: "05", title: "Edição e finalização", desc: "Nossas técnicas de edição e recursos de pós-produção levam ritmo e linguagem para as produções, elevando a qualidade de cada projeto." }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-transparent text-foreground font-sans selection:bg-primary selection:text-white">
      {/* Bloco 1: Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden">
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full opacity-30 grayscale"
            >
                <source src="/Showreel.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl z-10"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 text-primary leading-[0.9] uppercase">
            Filmes de alto impacto<br />
            <span className="text-foreground opacity-90">com qualidade cinematográfica</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 font-light leading-relaxed tracking-wide uppercase">
            Conectamos marcas e pessoas com soluções audiovisuais únicas.
          </p>
          
          <div className="flex items-center gap-4">
             <Button className="rounded-none px-10 py-7 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest">
                CONHEÇA NOSSAS SOLUÇÕES
             </Button>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex items-center gap-4 text-muted-foreground z-10"
        >
          <span className="text-xs font-heading uppercase tracking-[0.2em]">Scroll</span>
          <ArrowDown className="animate-bounce text-primary" size={16} />
        </motion.div>
      </section>

      {/* Bloco 2: Stats Section */}
      <section className="py-20 bg-secondary/10 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
            {[
              { number: "+10", label: "anos de atuação" },
              { number: "+300", label: "clientes satisfeitos" },
              { number: "+500", label: "filmes registrados" },
              { number: "+2.000", label: "projetos e filmes entregues" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-4"
              >
                <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-muted-foreground font-light uppercase tracking-wide text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloco 3: Pain Points Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent relative">
        <div className="container mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Desafios</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Por que você ainda não<br/>investe em audiovisual?</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {painPoints.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-secondary/10 border border-white/5 p-8 hover:bg-secondary/20 transition-colors group"
                    >
                        <div className="mb-6 text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                            <item.icon size={40} strokeWidth={1.5} />
                        </div>
                        <h4 className="font-heading text-lg font-bold uppercase tracking-wide mb-4 text-white">{item.problem}</h4>
                        <p className="text-muted-foreground font-light text-sm leading-relaxed">{item.solution}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Bloco 4: Impact & Clients Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/30 relative border-y border-border/40">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                <div>
                    <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none mb-8">Impacto em cada cena,<br/>essência em cada frame</h3>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed mb-6">
                        Mais de 80% do tráfego online é gerado por vídeos. O futuro é audiovisual e sua marca precisa de uma produtora de vídeo experiente para causar impacto no mercado. Com a Motin Films, você pode se comunicar com a mesma qualidade cinematográfica de grandes marcas e contar sua história de forma memorável.
                    </p>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                        Com mais de 10 anos de experiência e certificação Ancine, transformamos a complexidade de seus produtos e serviços em narrativas poderosas e irresistíveis.
                    </p>
                    <Button className="rounded-none px-10 py-7 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest">
                        VEJA NOSSO PORTFÓLIO!
                    </Button>
                </div>
                <div className="relative h-[400px] w-full overflow-hidden rounded-none border border-white/5">
                     {/* Placeholder for an impactful image or showreel snippet */}
                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Play className="text-primary w-20 h-20 opacity-80" />
                     </div>
                     <Image src="/images/impact-bg.jpg" alt="Impacto" fill className="object-cover -z-10 opacity-50" />
                </div>
            </div>

            <div className="text-center">
                 <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">NOSSOS CLIENTES</h2>
                 <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-12">O padrão de qualidade escolhido pelas grandes marcas</h3>
                 
                 <BrandCarousel
                    brands={[
                      { src: "/brands/lumicenter-logo.png", alt: "Lumicenter", width: 150 },
                      { src: "/brands/unimed-logo.png", alt: "Unimed", width: 130 },
                      { src: "/brands/electrolux-logo.png", alt: "Electrolux", width: 140 },
                      { src: "/brands/actioncoach-logo.png", alt: "ActionCOACH", width: 140 },
                      // Add more logos here as per the list provided if files exist
                      { src: "/brands/wb-logo.png", alt: "Warner Pictures", width: 120 },
                      { src: "/brands/dentaluni-logo.png", alt: "DentalUni", width: 180 },
                      { src: "/brands/paris-filmes-logo.png", alt: "Paris Filmes", width: 130 },
                      { src: "/brands/sony-logo.png", alt: "Sony", width: 120 },
                      { src: "/brands/itaipu-logo.png", alt: "Itaipu Binacional", width: 150 },
                      { src: "/brands/favretto-logo.png", alt: "Favretto Mídia Exterior", width: 140 },
                      { src: "/brands/compwire-logo.png", alt: "Compwire", width: 150 },
                    ]}
                  />
            </div>
        </div>
      </section>

      {/* Bloco 5: Portfolio Section - Horizontal Scroll */}
      <section id="portfolio">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-10">
            <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-4">Portfólio</h2>
            <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">Veja o que fazemos na prática!</h3>
        </div>
        <HorizontalScrollCarousel items={portfolioItems} />
        <div className="container mx-auto px-6 md:px-12 lg:px-24 pb-32 text-center">
             <Link href="/portfolio">
                <Button className="rounded-none px-10 py-7 text-lg bg-primary text-white hover:bg-primary/90 transition-all font-heading uppercase tracking-widest mt-12">
                    VER PORTFÓLIO COMPLETO!
                </Button>
             </Link>
        </div>
      </section>

      {/* Bloco 6: Services Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/10 relative border-t border-border/40" id="servicos">
        <div className="container mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Soluções</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none mb-6">Soluções audiovisuais<br/>para empresas</h3>
                <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">Oferecemos um leque completo de soluções audiovisuais para impulsionar sua marca.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-black/40 border border-white/5 p-8 hover:border-primary/30 transition-colors group"
                    >
                        <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-4 text-white group-hover:text-primary transition-colors">{service.title}</h4>
                        <p className="text-muted-foreground font-light text-sm leading-relaxed mb-8">{service.description}</p>
                        <Button variant="link" className="text-primary p-0 h-auto font-heading uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                            SAIBA MAIS! <ArrowRight size={14} className="ml-2" />
                        </Button>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Bloco 7: Produtora Licenciada */}
      <section className="py-16 border-y border-border/40 bg-secondary/30 relative">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-8">
          <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-muted-foreground">Produtora Licenciada</h2>
          <Image src="/brands/ancine.png" alt="Ancine" width={150} height={75} className="opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
        </div>
      </section>

      {/* Bloco 8: Differentials Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent relative">
        <div className="container mx-auto">
            <div className="mb-20">
                <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Diferenciais</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Por que escolher a<br/>Motin Films?</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {differentials.map((item, i) => (
                    <div key={i} className="group">
                        <div className="w-12 h-1 bg-primary mb-6 group-hover:w-20 transition-all duration-500" />
                        <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-4">{item.title}</h4>
                        <p className="text-muted-foreground font-light leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Bloco 9: Compact Versions */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-secondary/10 border-y border-border/40">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h3 className="font-heading text-3xl md:text-4xl font-bold uppercase leading-none mb-6">Amplie o alcance da sua mensagem com versões compactas</h3>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                        A Motin Films é a única produtora de vídeos a fornecer versões compactas dos filmes principais contratados, atendendo perfeitamente todas as suas necessidades de comunicação.
                    </p>
                    <div className="space-y-8">
                        <div className="bg-black/20 p-6 border-l-2 border-primary">
                            <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-2 text-white">Filme comercial</h4>
                            <p className="text-muted-foreground font-light text-sm mb-4">Versão compacta do filme principal para uso em apresentações, feiras, eventos e exibições na televisão. Com apelo comercial, o formato destaca os pontos-chave do seu negócio de forma clara e direta.</p>
                            <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-primary">
                                <span>Duração: 30 segundos</span>
                                <span>Formatos: 16:9 e 9:16</span>
                            </div>
                        </div>
                        <div className="bg-black/20 p-6 border-l-2 border-primary">
                            <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-2 text-white">Filme de performance</h4>
                            <p className="text-muted-foreground font-light text-sm mb-4">Compactos e altamente eficazes, a versão é ideal para anúncios e campanhas pagas. Com mensagens diretas e chamadas comerciais, o formato é projetado para capturar a atenção de potenciais clientes.</p>
                            <div className="flex gap-4 text-xs font-bold uppercase tracking-wider text-primary">
                                <span>Duração: 15 segundos</span>
                                <span>Formatos: 16:9 e 9:16</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[600px] w-full bg-black/50 border border-white/5 flex items-center justify-center">
                    <div className="text-center">
                        <Smartphone className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
                        <p className="font-heading uppercase tracking-widest text-muted-foreground">Formatos Verticais & Horizontais</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Bloco 10: Methodology Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent relative">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                <div className="sticky top-32">
                    <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Nossa Metodologia</h2>
                    <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none mb-8">Você traz a ideia<br/>e nós executamos</h3>
                    <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                        Na Motin Films, você não precisa se preocupar com nada. Nós cuidamos de cada detalhe para que você se concentre no que realmente importa: o crescimento do seu negócio.
                    </p>
                    <Button variant="outline" className="rounded-none px-8 py-6 text-base gap-2 hover:bg-secondary border-primary/20 font-heading uppercase tracking-widest">
                        INICIAR PROJETO <ArrowRight size={16} />
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-8">
                    {methodology.map((item, i) => (
                        <div key={i} className="flex gap-6 items-start group bg-secondary/5 p-8 border border-white/5 hover:border-primary/20 transition-colors">
                            <span className="text-4xl font-heading font-bold text-primary/20 group-hover:text-primary transition-colors">{item.step}</span>
                            <div>
                                <h4 className="font-heading text-xl font-bold uppercase tracking-wide mb-2">{item.title}</h4>
                                <p className="text-muted-foreground font-light text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Bloco 11: Team Section */}
      <section className="py-20 bg-secondary/10 border-y border-border/40">
        <div className="container mx-auto px-6 text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase mb-12">Conheça a equipe por trás do seu sucesso</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {["Gerente de projetos", "Diretor geral", "Roteiristas", "Cinegrafistas", "Motion designers", "Editores"].map((role, i) => (
                    <Badge key={i} variant="outline" className="px-6 py-3 text-sm font-heading uppercase tracking-widest border-primary/30 bg-primary/5 text-foreground hover:bg-primary/10 transition-colors">
                        {role}
                    </Badge>
                ))}
            </div>
        </div>
      </section>

      {/* Bloco 12: Testimonials Section */}
      <section className="py-32 px-6 md:px-12 lg:px-24 bg-transparent">
        <div className="container mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-6">Depoimentos</h2>
                <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase leading-none">Resultados comprovados<br/>por quem mais entende</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    text: "Ficamos super satisfeitos com a produção. Vídeo principal, vídeos de performance bônus, show. Atendimento, suporte, grupo com profissionais pré, durante e pós evento. Já os temos como prioridade para continuar com nossa parceria de cobertura.",
                    author: "ENAF",
                    image: "/testimonials/enaf.webp",
                  },
                  {
                    text: "A nossa minisérie \"Escolar pelo Brasil\" contou a história de 10 papelarias de norte a sul do Brasil e foi inspirador conhecer a jornada empreendedora de cada um. Agradecemos imensamente ao excelente trabalho da Motin Films e todo o cuidado que tiveram com esse projeto tão especial.",
                    author: "Escolar Office Brasil",
                    image: "/brands/escolar-office-brasil.jpeg",
                  },
                  {
                    text: "Ficamos bem contentes com o resultado e com o trabalho de toda a equipe. Conseguiram pegar ótimos takes e prestaram suporte, sempre que necessário. Todos estão de parabéns.",
                    author: "Liquexpress",
                    image: "/placeholder.svg", // Update if real image exists
                  },
                ].map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-secondary/10 border border-white/5 p-8 flex flex-col"
                  >
                    <div className="mb-6 text-primary opacity-50">
                        <MessageSquare size={32} />
                    </div>
                    <p className="italic text-muted-foreground mb-8 leading-relaxed font-light flex-grow">"{testimonial.text}"</p>
                    <div className="flex items-center mt-auto">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-primary/20 bg-black">
                         {/* Fallback for image */}
                         <Image
                           src={testimonial.image}
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

      {/* Bloco 13: Holding Section */}
      <section className="py-20 bg-secondary/30 border-t border-border/40">
        <div className="container mx-auto px-6">
             <div className="max-w-4xl mx-auto text-center bg-black/40 border border-white/5 p-12 backdrop-blur-sm">
                 <h3 className="font-heading text-2xl font-bold uppercase tracking-wide mb-2 text-primary">Uma empresa Catalisti Holding</h3>
                 <div className="w-24 h-1 bg-primary mx-auto mb-8" />
                 <p className="text-muted-foreground leading-relaxed font-light mb-6">
                    A Motin Films integra a Catalisti Holding, ecossistema de aceleração que potencializa empresas através do Martech - união de marketing digital e tecnologia.
                 </p>
                 <p className="text-muted-foreground leading-relaxed font-light mb-6">
                    A Catalisti é composta por três empresas especializadas, que atuam de forma integrada nas áreas de desenvolvimento web, gestão de redes sociais, produção audiovisual, análise de dados e marketing de performance.
                 </p>
                 <p className="text-white font-medium uppercase tracking-wide">
                    Já investimos mais de R$ 50 milhões em mídias digitais e sabemos exatamente o que o seu cliente precisa para crescer online e gerar resultados.
                 </p>
             </div>
        </div>
      </section>
    </div>
  )
}
