"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"

interface BrandCarouselProps {
  brands?: {
    src: string
    alt: string
    width?: number
  }[]
  whiteFilter?: boolean
}

export function BrandCarousel({ brands, whiteFilter = true }: BrandCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Default brands if none provided
  const defaultBrands = [
    { src: "/brands/unimed-logo.png", alt: "Unimed" },
    { src: "/brands/wb-logo.png", alt: "Warner Bros" },
    { src: "/brands/ssc-blueprism-logo.png", alt: "SSC BluePrism" },
    { src: "/brands/santos-logo.png", alt: "Santos" },
    { src: "/brands/sony-logo.png", alt: "Sony" },
    { src: "/brands/favretto-logo.png", alt: "Favretto" },
    { src: "/brands/paris-filmes-logo.png", alt: "Paris Filmes" },
    { src: "/brands/electrolux-white.png", alt: "Electrolux" },
    { src: "/brands/lumicenter.png", alt: "Lumicenter" },
    { src: "/brands/itaipu-logo.png", alt: "Itaipu" },
  ]

  const brandsToShow = brands || defaultBrands

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Faster animation speed
  useEffect(() => {
    if (!isClient) return

    const scrollWidth = carouselRef.current?.scrollWidth || 0
    const clientWidth = carouselRef.current?.clientWidth || 0

    if (scrollWidth <= clientWidth) return

    let scrollPosition = 0
    const scrollSpeed = 0.3 // Increased speed from 0.1 to 0.3 for more dynamic animation
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

    // Start animation immediately for more dynamic feel
    animationId = requestAnimationFrame(scroll)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [brandsToShow, isClient])

  const imageFilterClass = whiteFilter
    ? "brightness-[1.20] contrast-[1.25] saturate-[0.01] opacity-90 hover:opacity-100 transition-all duration-300"
    : "opacity-90 hover:opacity-100 transition-opacity filter brightness-100"

  return (
    <div className="w-full overflow-hidden relative">
      <div
        ref={carouselRef}
        className="flex items-center gap-12 py-8 overflow-x-auto scrollbar-hide" // Reduced gap from 16 to 12 for faster movement
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
                height={128}
                className={`h-auto w-auto max-h-48 max-w-[160px] object-contain ${imageFilterClass}`}
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
                height={128}
                className={`h-auto w-auto max-h-48 max-w-[160px] object-contain ${imageFilterClass}`}
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
