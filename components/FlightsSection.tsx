import { Plane, ArrowRight, Search } from 'lucide-react'
import { buildFlightsUrl } from '@/lib/affiliate'

export default function FlightsSection() {
  return (
    <section id="flights" className="py-24 px-6 bg-luxury-ink text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-luxury-gold">
                <Plane size={18} />
                <span className="text-xs font-black uppercase tracking-widest">Letovi</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif leading-tight">
                Pronađite Najjeftiniji Let do Sarajeva
              </h2>
              <p className="text-white/60 font-light text-lg leading-relaxed">
                Pretraži stotine aviokompanija i pronađi najjeftiniji let na aerodrom Sarajevo (SJJ) 
                iz bilo kojeg dijela svijeta.
              </p>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {[
                'Poređenje cijena iz 750+ aviokompanija',
                'Hack letovi i otvorene karte (Kiwi Nomad)',
                'Besplatna izmjena rute u 24 sata',
              ].map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-white/70 text-sm">
                  <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full mt-1.5 flex-shrink-0" />
                  {feat}
                </li>
              ))}
            </ul>

            <a
              href={buildFlightsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-luxury-gold text-white rounded-full font-bold uppercase tracking-wider text-[11px] hover:bg-luxury-gold/90 transition-colors group"
            >
              <Search size={16} />
              Pretraži Letove na Kiwi.com
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right — Stats / Visual */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '750+', label: 'Aviokompanije' },
              { value: 'SJJ', label: 'Aerodrom Sarajevo' },
              { value: '24/7', label: 'Korisnička podrška' },
              { value: '0 €', label: 'Naknada za pretragu' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center"
              >
                <p className="text-3xl font-serif font-bold text-luxury-gold">{stat.value}</p>
                <p className="text-xs text-white/50 mt-1 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
