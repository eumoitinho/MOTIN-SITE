"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { LanguageSwitcher } from "@/components/language-switcher"
import type { Locale } from "@/i18n/config"

interface HeaderProps {
  dictionary: any
  locale: Locale
}

export function Header({ dictionary, locale }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("inicio")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      const scrollPosition = window.scrollY + 100
      const sections = ["inicio", "portfolio", "servicos", "sobre", "contato"]

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const getNavLink = (key: string, href: string) => {
    // Se estamos na página inicial, usamos links de âncora
    if (
      (typeof window !== "undefined" && window.location.pathname === `/${locale}`) ||
      window.location.pathname === "/"
    ) {
      return (
        <Link
          href={`#${href}`}
          className={`text-sm font-medium hover:text-[#00B2B2] transition-colors ${
            activeSection === href ? "text-[#00B2B2]" : ""
          }`}
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(href)
          }}
        >
          {dictionary.navigation[key]}
        </Link>
      )
    }

    // Caso contrário, usamos links normais
    return (
      <Link
        href={`/${locale}${href === "inicio" ? "" : `/#${href}`}`}
        className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
      >
        {dictionary.navigation[key]}
      </Link>
    )
  }

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/90 border-b border-gray-800 backdrop-blur-sm" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href={`/${locale}`} className="text-2xl font-bold">
            <Image src="/motin-logo-white.webp" alt="Motin Films" width={120} height={36} />
          </Link>
        </motion.div>

        {/* Desktop Menu */}
        <motion.nav
          className="hidden md:flex space-x-6 items-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {getNavLink("home", "inicio")}
          {getNavLink("portfolio", "portfolio")}
          {getNavLink("services", "servicos")}
          {getNavLink("about", "sobre")}
          <Link href={`/${locale}/contato`} className="text-sm font-medium hover:text-[#00B2B2] transition-colors">
            {dictionary.navigation.contact}
          </Link>
          <Link
            href={`/${locale}/trabalhe-conosco`}
            className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
          >
            {dictionary.navigation.careers}
          </Link>
          <LanguageSwitcher currentLocale={locale} />
        </motion.nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageSwitcher currentLocale={locale} />

          <motion.button
            className="text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-black shadow-lg absolute w-full border-b border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.navigation.home}
            </Link>
            <Link
              href={`/${locale}/#portfolio`}
              className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.navigation.portfolio}
            </Link>
            <Link
              href={`/${locale}/#servicos`}
              className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.navigation.services}
            </Link>
            <Link
              href={`/${locale}/#sobre`}
              className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.navigation.about}
            </Link>
            <Link
              href={`/${locale}/contato`}
              className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.navigation.contact}
            </Link>
            <Link
              href={`/${locale}/trabalhe-conosco`}
              className="text-sm font-medium hover:text-[#00B2B2] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {dictionary.navigation.careers}
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}
