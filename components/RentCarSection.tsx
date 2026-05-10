import Link from 'next/link'
import { Car, Plane, ArrowRight } from 'lucide-react'
import { translations } from '@/lib/translations'

export default function RentCarSection() {
  const options = [
    {
      title: translations.rentCar.searchCars,
      description: 'Pronađite savršen auto za vaše istraživanje Sarajeva',
      url: process.env.NEXT_PUBLIC_LOCALRENT_AFFILIATE_URL || 'https://localrent.tp.st/cqRoqom7',
      icon: Car,
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      title: translations.rentCar.airportTransfer,
      description: 'Transfer sa aerodroma do vašeg hotela ili apartmana',
      url: process.env.NEXT_PUBLIC_GETRENTACAR_AFFILIATE_URL || 'https://getrentacar.tp.st/GoKzHnYV',
      icon: Plane,
      gradient: 'from-blue-500 to-cyan-500',
    },
  ]
  
  return (
    <section id="rent-car" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif">{translations.rentCar.title}</h2>
          <p className="text-lg text-luxury-secondary font-light mt-4">
            {translations.rentCar.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {options.map((option) => (
            <a
              key={option.title}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-luxury-ink to-luxury-ink/90 p-12 text-white hover:shadow-2xl transition-all"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${option.gradient} opacity-20 blur-3xl`} />
              
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                  <option.icon className="w-8 h-8 text-luxury-gold" />
                </div>
                
                <h3 className="text-2xl font-serif">{option.title}</h3>
                <p className="text-white/60 font-light">{option.description}</p>
                
                <div className="flex items-center gap-2 text-luxury-gold">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Rezerviši</span>
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
