"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Instagram, Linkedin, Facebook, Mail, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Portfólio", href: "/portfolio" },
  { name: "Filmes Institucionais", href: "/filmes-institucionais" },
  { name: "Eventos Corporativos", href: "/eventos-corporativos" },
  { name: "Filmes de Conteúdo", href: "/filmes-conteudo" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-background/95 backdrop-blur-sm border-r border-border/10 z-50 hidden lg:flex flex-col justify-between py-12 px-8">
      {/* Logo */}
      <div className="relative w-full h-12">
        <Link href="/">
            <Image
            src="/motin-logo-white.webp"
            alt="Motin Films"
            fill
            className="object-contain object-left"
            priority
            />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-sm font-heading uppercase tracking-widest hover:text-primary transition-colors",
              pathname === item.href ? "text-primary font-bold" : "text-muted-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Footer / Socials */}
      <div className="flex flex-col gap-6">
        <div className="flex gap-4">
            <Link href="https://instagram.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
            </Link>
            <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
            </Link>
            <Link href="https://facebook.com" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
            </Link>
        </div>
        <div className="text-[10px] text-muted-foreground/50 uppercase tracking-widest">
            © {new Date().getFullYear()} Motin Films
        </div>
      </div>
    </aside>
  )
}
