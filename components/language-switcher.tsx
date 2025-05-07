"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { locales, localeNames, type Locale } from "@/i18n/config"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (locale: Locale) => {
    // Get the current path
    const path = window.location.pathname

    // Remove the current locale from the path if it exists
    const pathWithoutLocale = path.replace(/^\/(pt|en|es)/, "")

    // Construct the new path with the selected locale
    const newPath = locale === "pt" ? pathWithoutLocale || "/" : `/${locale}${pathWithoutLocale}`

    // Navigate to the new path
    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:text-[#00B2B2]">
          <Globe size={20} />
          <span className="sr-only">Mudar idioma</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black border border-gray-800">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            className={`cursor-pointer ${
              currentLocale === locale ? "text-[#00B2B2]" : "text-white"
            } hover:text-[#00B2B2]`}
            onClick={() => handleLanguageChange(locale)}
          >
            {localeNames[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
