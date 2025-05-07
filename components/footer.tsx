"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative h-10 w-40">
                <Image src="/motin-logo-white.webp" alt="Motin Films" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-gray-400">
              Produtora audiovisual especializada em vídeos institucionais, motion graphics, cobertura de eventos e
              edição de vídeo.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Linkedin"
              >
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-primary" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Vídeos Institucionais
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Motion Graphics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Cobertura de Eventos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Edição de Vídeo
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Produção Audiovisual
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Carreiras
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Endereço</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Rua João Alencar Guimarães, 500</li>
              <li>Bigorrilho, Curitiba - PR</li>
              <li>CEP 80730-320</li>
              <li>Brasil</li>
              <li>
                <Link href="mailto:contato@motinfilms.com.br" className="hover:text-primary transition-colors">
                  contato@motinfilms.com.br
                </Link>
              </li>
              <li>
                <Link href="tel:+5541999999999" className="hover:text-primary transition-colors">
                  +55 41 99999-9999
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {currentYear} Motin Films. Todos os direitos reservados.</p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">Desenvolvido com ❤️ no Brasil</p>
        </div>
      </div>
    </footer>
  )
}
