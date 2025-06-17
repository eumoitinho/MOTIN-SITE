"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, ChevronRight, CheckCircle, Users, Video, Zap, Globe, Award } from "lucide-react"
import { motion } from "framer-motion"
import { AnimatedSection } from "@/components/animated-section"
import { BrandCarousel } from "@/components/brand-carousel"
import Footer from "@/components/footer"

export default function FilmesConteudo() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState<string | null>("")

  const portfolioVideos = [
    {
      title: "CW Trends",
      videoId: "oSOtzDN-Z24",
      image: "https://i.ytimg.com/vi/oSOtzDN-Z24/maxresdefault.jpg"
    },
    {
      title: "NineTwo Performance",
      videoId: "W4gjiH1M2mI",
      image: "https://i.ytimg.com/vi/W4gjiH1M2mI/maxresdefault.jpg"
    },
    {
      title: "NineTwo Performance 2",
      videoId: "3zJg-Crte18",
      image: "https://i.ytimg.com/vi/3zJg-Crte18/maxresdefault.jpg"
    },
    {
      title: "ZapCerto",
      videoId: "2mUnS_zzyK4",
      image: "https://i.ytimg.com/vi/2mUnS_zzyK4/maxresdefault.jpg"
    }
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
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Motin Films" width={120} height={40} />
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">Início</Link>
            <Link href="/#portfolio" className="text-gray-700 hover:text-primary transition-colors">Portfólio</Link>
            <Link href="/#servicos" className="text-gray-700 hover:text-primary transition-colors">Serviços</Link>
            <Link href="/#sobre" className="text-gray-700 hover:text-primary transition-colors">Sobre</Link>
            <Link href="/#contato" className="text-gray-700 hover:text-primary transition-colors">Contato</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Aumente seu alcance nas redes sociais com 
                <span className="text-primary"> filmes de conteúdo</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Na Motin Films, transformamos seu conhecimento em conteúdos de valor para o Instagram, TikTok, YouTube e outras redes sociais.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-lg">
                QUERO SABER COMO FUNCIONA!
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gray-900 rounded-2xl p-8 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-white">Compilado de vídeos de conteúdo</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ancine Section */}
      <section className="bg-primary/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-4">
            <Image src="/brands/ancine.png" alt="Ancine" width={120} height={60} />
            <span className="text-lg font-semibold text-gray-700">Produtora licenciada Ancine</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                O futuro das redes sociais é o audiovisual
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Conte com vídeos mensais repletos de conteúdo relevante para fortalecer sua presença digital. 
                Cada vídeo é uma oportunidade única para você ou um membro da sua equipe compartilhar novidades, 
                promoções e informações importantes sobre o seu negócio.
              </p>
              <p className="text-lg text-gray-600 mt-4">
                Essa abordagem humanizada cria uma conexão mais verdadeira com o público, fortalecendo a 
                credibilidade e a identidade da sua marca.
              </p>
            </motion.div>

            {/* FAQ Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-primary">Por onde começo e o que gravar?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Criamos roteiros estratégicos, alinhados ao seu público e aos objetivos do seu negócio. 
                  A M2Z Creative, empresa especializada em marketing de conteúdo, trabalha conosco para 
                  garantir que sua mensagem seja clara e impactante.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <Users className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-primary">Como me expresso diante das câmeras?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Se você tem dificuldade para falar em frente a uma câmera, não se preocupe. 
                  Disponibilizamos um teleprompter para facilitar a gravação e garantir que você 
                  se sinta confiante e natural durante todo o processo.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <Video className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-primary">Os vídeos serão captados com câmeras profissionais?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Sim. Utilizamos equipamentos cinematográficos de alta qualidade, como câmeras de alta definição, 
                  iluminação profissional e microfones sem fio com tecnologia antirruído para uma captação 
                  impecável, tanto de vídeo como de áudio.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <Zap className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-primary">Preciso me preocupar com algo durante o processo?</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Não. Nosso time especializado é formado por 5 profissionais, incluindo gerente de projetos, 
                  diretor geral, roteirista, motion designer e editor. Cada um cuida de uma área para que 
                  você não precise se preocupar com nada.
                </p>
              </motion.div>
            </div>

            <div className="text-center">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-lg">
                ACESSE NOSSO PORTFÓLIO
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Marcas que confiam:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center">
            <Image src="/brands/blueprism.png" alt="SS&C Blue Prism" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/parana-clinicas.png" alt="Paraná Clínicas" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/naport.png" alt="Naport" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/lj-santos.png" alt="LJ Santos" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/compwire.png" alt="Compwire" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/itaipu.png" alt="Itaipu" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/warner-bros.png" alt="Warner Bros" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/paris-filmes.png" alt="Paris Filmes" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/sony.png" alt="Sony" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/electrolux.png" alt="Electrolux" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/unimed.png" alt="Unimed" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
            <Image src="/brands/favretto.png" alt="Favretto Mídia Exterior" width={120} height={60} className="opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nosso portfólio</h2>
            <p className="text-xl text-gray-600">Confira alguns dos nossos trabalhos de conteúdo</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {portfolioVideos.map((video, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => openVideoModal(video.videoId)}
              >
                <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-video">
                  <Image
                    src={video.image}
                    alt={video.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" fill="white" />
                  </div>
                </div>
                <h3 className="mt-4 font-semibold text-lg">{video.title}</h3>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-lg">
              ACESSE NOSSO PORTFÓLIO!
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Por que escolher a Motin Films?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Processo prático, eficiente e transparente</h3>
              <p className="text-gray-600">
                Do briefing à entrega final, você estará sempre ciente de cada etapa do projeto e 
                terá total controle sobre o resultado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Equipe multidisciplinar</h3>
              <p className="text-gray-600">
                Nossos profissionais especializados em marketing e produções audiovisuais oferecem 
                soluções completas e personalizadas para o seu negócio.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <Video className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Metodologia inovadora de captura</h3>
              <p className="text-gray-600">
                Utilizamos equipamentos de última geração e empregamos técnicas inovadoras de captura 
                com foco em movimento, para trazer mais ação e dinamismo aos seus filmes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <Award className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Técnicas avançadas de edição e finalização</h3>
              <p className="text-gray-600">
                Aplicamos técnicas de sonoplastia, letterings, ajustes de cor e edição dinâmica para 
                prender a atenção da sua audiência e garantir um resultado profissional.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Agilidade no processo</h3>
              <p className="text-gray-600">
                Com processos otimizados, garantimos a entrega de cada filme em tempo recorde, 
                sem comprometer a qualidade do projeto.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg"
            >
              <Globe className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Cobertura nacional</h3>
              <p className="text-gray-600">
                Não importa onde você esteja, nossa equipe interna percorre todo o Brasil para 
                garantir que sua produção seja realizada com a mais alta qualidade.
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-lg">
              CONHEÇA NOSSO MÉTODO!
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nossos números</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">+10</div>
              <div className="text-gray-600">anos de mercado</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">+300</div>
              <div className="text-gray-600">clientes satisfeitos</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">+500</div>
              <div className="text-gray-600">filmes registrados</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">+2.000</div>
              <div className="text-gray-600">projetos e filmes entregues</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">METODOLOGIA</h2>
            <p className="text-xl text-gray-600">Compartilhe sua ideia e deixe o resto conosco!</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Planejamento estratégico</h3>
              <p className="text-gray-600">
                Cada projeto começa com uma reunião de briefing, na qual mergulhamos no seu negócio 
                para entender seus objetivos, explorar temas e alinhar o tom da sua comunicação.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Roteiro</h3>
              <p className="text-gray-600">
                Nosso time de copywriters especializados em marketing desenvolve roteiros mensais que 
                tornam sua mensagem clara, impactante e capaz de gerar conversões.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Captação</h3>
              <p className="text-gray-600">
                Com o roteiro em mãos, você tem a opção de gravar os vídeos com um teleprompter. 
                Além do conteúdo, produzimos takes adicionais que complementam o que está sendo dito no roteiro.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Edição e finalização</h3>
              <p className="text-gray-600">
                Nossas técnicas de edição e recursos de pós-produção levam ritmo e linguagem para as 
                produções, elevando a qualidade de cada projeto.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Resultados comprovados por quem mais entende</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <p className="text-gray-600 italic mb-6">
                "Ficamos super satisfeitos com a produção. Vídeo principal, vídeos de performance bônus, show. 
                Atendimento, suporte, grupo com profissionais pré, durante e pós evento. Já os temos como 
                prioridade para continuar com nossa parceria de cobertura."
              </p>
              <div className="font-bold">- ENAF</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <p className="text-gray-600 italic mb-6">
                "Excelente experiência, conseguimos terminar nosso projeto com bastante tempo hábil e 
                entregar pros gestores da empresa, antes da nossa feira."
              </p>
              <div className="font-bold">- Marco Paulo Jr.</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <p className="text-gray-600 italic mb-6">
                "A nossa minisérie "Escolar pelo Brasil" contou a história de 10 papelarias de norte a sul do Brasil 
                e foi inspirador conhecer a jornada empreendedora de cada um. Agradecemos imensamente ao excelente 
                trabalho da Motin Films e todo o cuidado que tiveram com esse projeto tão especial."
              </p>
              <div className="font-bold">- Escolar Office Brasil</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Conheça a Motin Films</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Somos a Motin Films, uma produtora especializada em produções audiovisuais de alto impacto e 
                certificada pela Ancine. Com mais de 10 anos de atuação no mercado, produzimos filmes com a 
                missão de criar conexões entre marcas e consumidores.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Com técnicas inovadoras de edição e captação dinâmica, nossos projetos são personalizados e 
                planejados de acordo com as necessidades específicas de cada cliente. Com qualidade excepcional 
                de imagem e som, produzimos filmes para produtos, eventos corporativos, institucionais, 
                promocionais, entre outros.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Acreditamos que o audiovisual é uma ferramenta poderosa para a construção de imagem da sua empresa. 
                Através de técnicas de storytelling, contamos histórias que inspiram e agregam valor à sua marca 
                e seus produtos.
              </p>
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
