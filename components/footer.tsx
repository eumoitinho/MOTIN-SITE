"use client"

interface FooterProps {
  dictionary: any
}

export function Footer({ dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid gri\
