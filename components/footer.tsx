"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border/20 bg-secondary/30">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        {/* Logo & Copyright */}
        <div className="flex flex-col gap-4">
            <div className="relative w-32 h-10">
                <Image
                    src="/motin-logo-white.webp"
                    alt="Motin Films"
                    fill
                    className="object-contain object-left"
                />
            </div>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
                © {new Date().getFullYear()} Motin Films. Todos os direitos reservados.
            </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2 text-sm text-muted-foreground font-light">
            <p>Rua Coronel Joaquim Ignácio Taborda Ribas - 212, Bigorrilho, Curitiba - PR</p>
            <p>CEP 80730-320, Brasil</p>
            <p>contato@motinfilms.com.br</p>
            <p>+55 41 9142-5126</p>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
            <Link href="https://www.instagram.com/motinfilms" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
            <Link href="https://www.linkedin.com/company/93245114/admin/dashboard" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
            <Link href="https://www.facebook.com/motinfilms" target="_blank" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
            <Link href="https://www.tiktok.com/@motinfilms" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                {/* Simple TikTok Icon SVG since it might not be in lucide-react version used */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music-2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            </Link>
        </div>

      </div>
    </footer>
  )
}