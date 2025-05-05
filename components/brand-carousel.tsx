"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface BrandCarouselProps {
  brands: {
    src: string
    alt: string
    width: number
  }[]
}

export function BrandCarousel({ brands }: BrandCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollWidth = carouselRef.current?.scrollWidth || 0
    const clientWidth = carouselRef.current?.clientWidth || 0

    if (scrollWidth <= clientWidth) return

    let scrollPosition = 0
    const scrollSpeed = 0.4
    const gap = 20

    const scroll = () => {
      if (!carouselRef.current) return

      scrollPosition += scrollSpeed

      // Reset position when we've scrolled through half the items
      if (scrollPosition >= scrollWidth / 2) {
        scrollPosition = 0
      }

      carouselRef.current.scrollLeft = scrollPosition
      requestAnimationFrame(scroll)
    }

    const animation = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animation)
  }, [brands])

  return (
    <div className="w-full overflow-hidden relative">
      <div
        ref={carouselRef}
        className="flex items-center gap-16 py-6 overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* First set of brands */}
        {brands.map((brand, index) => (
          <motion.div
            key={`brand-${index}`}
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={brand.src || "/placeholder.svg"}
              alt={brand.alt}
              width={brand.width}
              height={50}
              className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity filter brightness-100"
            />
          </motion.div>
        ))}

        {/* Duplicate brands for infinite scroll effect */}
        {brands.map((brand, index) => (
          <motion.div
            key={`brand-dup-${index}`}
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={brand.src || "/placeholder.svg"}
              alt={brand.alt}
              width={brand.width}
              height={50}
              className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity filter brightness-100"
            />
          </motion.div>
        ))}
      </div>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10"></div>
    </div>
  )
}
