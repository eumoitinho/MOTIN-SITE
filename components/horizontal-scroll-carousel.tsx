"use client"

import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Play, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type PortfolioItem = {
  title: string
  category: string
  image: string
  description: string
  videoId?: string
}

interface HorizontalScrollCarouselProps {
  items: PortfolioItem[]
}

export function HorizontalScrollCarousel({ items }: HorizontalScrollCarouselProps) {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"])

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-secondary/30 border-t border-border/40">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute top-12 left-6 md:left-12 lg:left-24 z-10">
             <h2 className="text-xs font-heading font-bold uppercase tracking-[0.3em] text-primary mb-4">Portfólio</h2>
             <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase">Projetos Selecionados</h3>
        </div>
        
        <motion.div style={{ x }} className="flex gap-8 md:gap-12 pl-6 md:pl-12 lg:pl-24">
          {items.map((item, index) => (
            <Card item={item} key={index} />
          ))}
          {/* Last card to view all */}
          <div className="group relative h-[400px] w-[300px] md:h-[500px] md:w-[400px] overflow-hidden bg-secondary/10 border border-white/5 flex flex-col items-center justify-center flex-shrink-0">
             <Link href="/portfolio" className="flex flex-col items-center gap-4 p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <ArrowRight className="text-primary w-8 h-8" />
                </div>
                <h4 className="text-2xl font-heading font-bold uppercase tracking-wide text-foreground">Ver Todos os Projetos</h4>
                <p className="text-muted-foreground font-light">Explore nosso portfólio completo</p>
             </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Card = ({ item }: { item: PortfolioItem }) => {
  return (
    <div
      className="group relative h-[400px] w-[300px] md:h-[500px] md:w-[600px] overflow-hidden bg-secondary/10 border border-white/5 flex-shrink-0"
    >
      <div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110">
        <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 rounded-none font-heading uppercase text-[10px] tracking-widest mb-4 w-fit">
                {item.category}
            </Badge>
            <h4 className="text-2xl md:text-4xl font-heading font-bold uppercase tracking-wide text-white mb-2">{item.title}</h4>
            <p className="text-gray-300 text-sm md:text-base font-light line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.description}</p>
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none">
        <div className="w-20 h-20 bg-primary/90 flex items-center justify-center rounded-full backdrop-blur-sm transform scale-50 group-hover:scale-100 transition-transform duration-500">
            <Play className="ml-1 text-white fill-white" size={24} />
        </div>
      </div>
    </div>
  )
}
