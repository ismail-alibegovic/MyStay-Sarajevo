import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface HeroProps {
  headline: string
  subheadline: string
  ctaText: string
}

export default function Hero({ headline, subheadline, ctaText }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-4 py-1.5 bg-luxury-gold/10 text-luxury-gold text-[10px] font-bold uppercase tracking-[0.3em] rounded-full">
              Lokalna Platforma za Sarajevo
            </span>
            
            <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight">
              <span className="luxury-text-gradient">{headline}</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-luxury-secondary font-light max-w-lg leading-relaxed">
              {subheadline}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#accommodation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-luxury-ink text-white rounded-full text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-luxury-gold transition-colors group"
            >
              {ctaText}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/#destinations"
              className="inline-flex items-center gap-2 px-8 py-4 border border-luxury-ink/20 text-luxury-ink rounded-full text-[11px] font-bold uppercase tracking-[0.15em] hover:border-luxury-gold hover:text-luxury-gold transition-colors"
            >
              Istražite Destinacije
            </Link>
          </div>
          
          {/* Stats */}
          <div className="flex gap-12 pt-8">
            <div>
              <p className="text-3xl font-bold text-luxury-ink">7+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-secondary mt-1">Kuriranih Mjesta</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-luxury-ink">4.8</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-secondary mt-1">Prosječna Ocjena</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-luxury-ink">24/7</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-secondary mt-1">Podrška</p>
            </div>
          </div>
        </div>
        
        {/* Image */}
        <div className="relative hidden lg:block">
          <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
              alt="Luxury hotel in Sarajevo"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <p className="text-sm font-medium text-luxury-ink">Premium hotels & apartments</p>
                <p className="text-xs text-luxury-secondary mt-1">Booking.com & Airbnb partner</p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-luxury-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-luxury-ink/5 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  )
}
