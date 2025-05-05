import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "./i18n/config"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname starts with a locale (en or es)
  const pathnameHasLocale = locales
    .filter((locale) => locale !== defaultLocale)
    .some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Se não tem locale, deixa como está (português padrão, sem prefixo)
  return
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}