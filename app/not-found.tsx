import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-8">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">404</p>
          <h1 className="text-5xl lg:text-6xl font-serif">Stranica nije pronađena</h1>
          <p className="text-lg text-luxury-secondary font-light max-w-md mx-auto">
            Izgleda da traženi smještaj više ne postoji ili je premješten.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-luxury-ink text-white rounded-full text-[10px] font-bold uppercase tracking-wider hover:bg-luxury-gold transition-colors"
          >
            <Home size={16} />
            Nazad na početnu
          </Link>
          
          <Link
            href="/#accommodation"
            className="inline-flex items-center gap-2 px-6 py-3 border border-luxury-ink/20 text-luxury-ink rounded-full text-[10px] font-bold uppercase tracking-wider hover:border-luxury-gold hover:text-luxury-gold transition-colors"
          >
            <ArrowLeft size={16} />
            Pogledaj smještaj
          </Link>
        </div>
      </div>
    </div>
  )
}
