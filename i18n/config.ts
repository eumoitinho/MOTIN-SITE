export type Locale = "pt" | "en" | "es"

export const defaultLocale: Locale = "pt"

export const locales: Locale[] = ["pt", "en", "es"]

export const localeNames: Record<Locale, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
}
