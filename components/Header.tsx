'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Home, BookOpen, Users, Phone } from 'lucide-react'

const navLinks = [
  { href: '/smjestaj', label: 'Smještaj', icon: Home },
  { href: '/vodic', label: 'Vodič', icon: BookOpen },
  { href: '/o-nama', label: 'O nama', icon: Users },
  { href: '/kontakt', label: 'Kontakt', icon: Phone },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-luxury-ink rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-3 h-3 bg-luxury-gold rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">
                MyStay<span className="text-luxury-gold">Sarajevo</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-ink/50">
                Lokalno Kurirano
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 text-sm font-medium text-luxury-ink/70 hover:text-luxury-ink transition-colors group"
              >
                <link.icon size={16} className="text-luxury-gold group-hover:scale-110 transition-transform" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-luxury-ink/5 transition-colors"
            aria-label={isMobileMenuOpen ? 'Zatvori meni' : 'Otvori meni'}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-luxury-ink" />
            ) : (
              <Menu size={24} className="text-luxury-ink" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-luxury-border">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-luxury-ink/5 transition-colors"
              >
                <link.icon size={20} className="text-luxury-gold" />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
