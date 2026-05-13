import { Wifi, Shield, Globe, ExternalLink } from 'lucide-react'
import { buildEsimUrl } from '@/lib/affiliate'

const providers = [
  {
    name: 'Yesim eSIM',
    brand: 'YESIM' as const,
    tagline: 'Aktivacija za 2 minute',
    description: 'Kupite eSIM prije polaska i budite online čim sletite. Podrška za BiH i cijelu Europu.',
    features: ['Neograničeni podaci', '100+ zemalja', 'Trenutna aktivacija'],
    color: 'from-amber-500 to-orange-500',
    recommended: true,
  },
  {
    name: 'Airalo',
    brand: 'AIRALO' as const,
    tagline: 'Najpovoljniji planovi',
    description: 'Globalni lider u eSIM tržištu. Savršen za dugotrajna putovanja sa fleksibilnim planovima.',
    features: ['Povoljne cijene', '200+ zemalja', 'Jednostavno korištenje'],
    color: 'from-blue-500 to-cyan-500',
    recommended: false,
  },
]

export default function ESIMSection() {
  return (
    <section id="esim" className="py-24 px-6 bg-luxury-ink/[0.02]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-2xl mb-4">
            <Wifi className="w-8 h-8 text-luxury-gold" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif">Ostanite Povezani</h2>
          <p className="text-lg text-luxury-secondary font-light mt-4 max-w-2xl mx-auto">
            Kupite eSIM prije putovanja u Sarajevo i uštedite na roamingu. Radi odmah po slijetanju.
          </p>
        </div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {providers.map((provider) => (
            <a
              key={provider.name}
              href={buildEsimUrl(provider.brand)}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top accent bar */}
              <div className={`h-1.5 bg-gradient-to-r ${provider.color}`} />

              {/* Recommended badge */}
              {provider.recommended && (
                <div className="absolute top-6 right-6 text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-luxury-gold text-white rounded-full">
                  Preporučeno
                </div>
              )}

              <div className="p-8 space-y-5">
                {/* Icon & Name */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 bg-gradient-to-br ${provider.color} rounded-2xl flex items-center justify-center`}>
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{provider.name}</p>
                    <p className="text-xs text-luxury-secondary">{provider.tagline}</p>
                  </div>
                </div>

                <p className="text-sm text-luxury-secondary leading-relaxed">{provider.description}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {provider.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-luxury-secondary">
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-luxury-gold">
                    Kupi eSIM →
                  </span>
                  <ExternalLink size={14} className="text-luxury-secondary/50 group-hover:text-luxury-gold transition-colors" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-luxury-secondary/50 mt-8 flex items-center justify-center gap-2">
          <Shield size={12} />
          eSIM radi na svim novijim iPhone i Android uređajima
        </p>
      </div>
    </section>
  )
}
