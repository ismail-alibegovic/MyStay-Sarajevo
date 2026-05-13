'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { translations } from '@/lib/translations'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  const navItems = [
    { label: translations.nav.accommodation, href: '/#accommodation' },
    { label: translations.nav.destinations, href: '/#destinations' },
    { label: translations.nav.activities, href: '/#activities' },
    { label: translations.nav.rentCar, href: '/#rent-car' },
    { label: translations.nav.esim, href: '/#esim' },
    { label: translations.nav.guide, href: '/#guide' },
  ]
  
  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-luxury-ink rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            MyStay <span className="text-luxury-gold">Sarajevo</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-[11px] uppercase tracking-[0.2em] font-bold text-luxury-ink/60">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-luxury-gold transition-colors"
            >
              {item.label}
            </Link>
          ))}
          
          <Link
            href="/auth"
            className="px-6 py-2.5 bg-luxury-ink text-white rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-luxury-gold transition-colors"
          >
            {translations.nav.signIn}
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-black/5 py-6 px-6">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-luxury-ink/70 hover:text-luxury-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
            
            <Link
              href="/auth"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-6 py-3 bg-luxury-ink text-white rounded-full text-center text-[10px] font-bold uppercase tracking-[0.15em]"
            >
              {translations.nav.signIn}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
