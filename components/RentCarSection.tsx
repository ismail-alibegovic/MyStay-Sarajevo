import { Car, ArrowRight, Bike } from 'lucide-react'
import { translations } from '@/lib/translations'
import { buildLocalrentUrl, buildTransferUrl, buildKiwitaxiUrl, buildBikesbookingUrl } from '@/lib/affiliate'

export default function RentCarSection() {
  const options = [
    {
      title: translations.rentCar.searchCars,
      description: 'Pronađite savršen auto uz Localrent — lokalne agencije, transparentne cijene, bez skrivenih troškova.',
      url: buildLocalrentUrl(),
      icon: Car,
      gradient: 'from-amber-500 to-orange-500',
      badge: 'Popularno',
    },
    {
      title: 'Privatni Transfer',
      description: 'Rezervišite privatni transfer od aerodroma ili između gradova uz GetTransfer.',
      url: buildTransferUrl(),
      icon: Car,
      gradient: 'from-blue-500 to-cyan-500',
      badge: null,
    },
    {
      title: 'Taxi Transfer',
      description: 'Povoljni taxi transferi sa Kiwi Taxi — jednostavna rezervacija unaprijed.',
      url: buildKiwitaxiUrl(),
      icon: Car,
      gradient: 'from-violet-500 to-purple-500',
      badge: null,
    },
    {
      title: 'Skooteri & Bicikli',
      description: 'Istražite Sarajevo na drugačiji način — iznajmite skooter ili bicikl uz Bikesbooking.',
      url: buildBikesbookingUrl(),
      icon: Bike,
      gradient: 'from-green-500 to-teal-500',
      badge: 'Novo',
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option) => (
            <a
              key={option.title}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-luxury-ink to-luxury-ink/90 p-8 text-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Badge */}
              {option.badge && (
                <span className="absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-luxury-gold rounded-full">
                  {option.badge}
                </span>
              )}

              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${option.gradient} opacity-20 blur-3xl`} />

              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-luxury-gold" />
                </div>

                <h3 className="text-lg font-serif">{option.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{option.description}</p>

                <div className="flex items-center gap-2 text-luxury-gold pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider">Rezerviši</span>
                  <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
