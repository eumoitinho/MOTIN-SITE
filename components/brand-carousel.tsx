"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface BrandCarouselProps {
  brands?: {
    src: string
    alt: string
    width?: number
  }[]
  whiteFilter?: boolean // Novo prop para controlar se aplicamos o filtro branco
}

export function BrandCarousel({ brands, whiteFilter = true }: BrandCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Default brands if none provided
  const defaultBrands = [
    { src: "/images/brands/unimed-logo.png", alt: "Unimed" },
    { src: "/images/brands/wb-logo.png", alt: "Warner Bros" },
    { src: "/images/brands/ssc-blueprism-logo.png", alt: "SSC BluePrism" },
    { src: "/images/brands/santos-logo.png", alt: "Santos" },
    { src: "/images/brands/sony-logo.png", alt: "Sony" },
    { src: "/images/brands/favretto-logo.png", alt: "Favretto" },
    { src: "/images/brands/paris-filmes-logo.png", alt: "Paris Filmes" },
    { src: "/images/brands/electrolux-white.png", alt: "Electrolux" },
    { src: "/images/brands/lumicenter.png", alt: "Lumicenter" },
    { src: "/images/brands/itaipu-logo.png", alt: "Itaipu" },
  ]

  const brandsToShow = brands || defaultBrands

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Don't run animation on server or before hydration
  useEffect(() => {
    if (!isClient) return

    const scrollWidth = carouselRef.current?.scrollWidth || 0
    const clientWidth = carouselRef.current?.clientWidth || 0

    if (scrollWidth <= clientWidth) return

    let scrollPosition = 0
    const scrollSpeed = 0.1 // Reduced speed
    let animationId: number | null = null

    const scroll = () => {
      if (!carouselRef.current) return

      scrollPosition += scrollSpeed

      // Reset position when we've scrolled through half the items
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0
      }

      carouselRef.current.scrollLeft = scrollPosition
      animationId = requestAnimationFrame(scroll)
    }

    // Start animation after a delay to reduce initial load
    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(scroll)
    }, 2000)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      clearTimeout(timeoutId)
    }
  }, [brandsToShow, isClient])

 const imageFilterClass = whiteFilter
    ? "brightness-[1.20] contrast-[1.25] saturate-[0.01] opacity-90 hover:opacity-100 transition-all duration-300" 
    : "opacity-90 hover:opacity-100 transition-opacity filter brightness-100"

  return (
    <div className="w-full overflow-hidden relative">
      <div
        ref={carouselRef}
        className="flex items-center gap-16 py-8 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* First set of brands */}
        {brandsToShow.map((brand, index) => (
          <div key={`brand-${index}`} className="flex-shrink-0 h-16 flex items-center">
            <div className="relative">
              <Image
                src={brand.src || "/placeholder.svg"}
                alt={brand.alt}
                width={ 160}
                height={64}
                className={`h-auto w-auto max-h-16 max-w-[160px] object-contain ${imageFilterClass}`}
                loading="lazy"
              />
            </div>
          </div>
        ))}

        {/* Duplicate brands for infinite scroll effect */}
        {brandsToShow.map((brand, index) => (
          <div key={`brand-dup-${index}`} className="flex-shrink-0 h-16 flex items-center">
            <div className="relative">
              <Image
                src={brand.src || "/placeholder.svg"}
                alt={brand.alt}
                width={ 160}
                height={64}
                className={`h-auto w-auto max-h-16 max-w-[160px] object-contain ${imageFilterClass}`}
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>
    </div>
  )
}