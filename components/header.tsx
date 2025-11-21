"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  dictionary?: any
  locale?: string
}

const navItems = [
  { name: "Home", href: "/" },
  { name: "Portfólio", href: "/portfolio" },
  { name: "Serviços", href: "/#servicos" },
  { name: "Contato", href: "/#contato" },
]

export function Header({ dictionary = {}, locale = "pt" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed w-full z-50 transition-all duration-300 border-b border-transparent",
          isScrolled ? "bg-background/80 backdrop-blur-md border-border/10 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="relative w-32 h-10 block z-50">
            <Image
              src="/motin-logo-white.webp"
              alt="Motin Films"
              fill
              className="object-contain object-left"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 ml-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-heading uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Socials & Mobile Toggle */}
          <div className="flex items-center gap-6">
            
            
            <button 
                className="md:hidden text-white z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-heading uppercase tracking-widest text-white hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
