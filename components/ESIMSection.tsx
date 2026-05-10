import { Wifi, ExternalLink } from 'lucide-react'
import { translations } from '@/lib/translations'

export default function ESIMSection() {
  const providers = [
    {
      name: translations.esim.providers.yesim,
      url: process.env.NEXT_PUBLIC_YESIM_AFFILIATE_URL || 'https://yesim.tp.st/7PuGrZg2',
      color: 'from-amber-500 to-orange-500',
      features: ['Unlimited data', '100+ countries', 'Instant activation'],
    },
    {
      name: translations.esim.providers.airalo,
      url: process.env.NEXT_PUBLIC_AIRALO_AFFILIATE_URL || 'https://airalo.tp.st/86iUNaUC',
      color: 'from-blue-500 to-cyan-500',
      features: ['Affordable plans', '200+ countries', 'Easy setup'],
    },
    {
      name: translations.esim.providers.drimsim,
      url: process.env.NEXT_PUBLIC_DRIMSIM_AFFILIATE_URL || 'https://drimsim.tp.st/PUAc9sbZ',
      color: 'from-purple-500 to-pink-500',
      features: ['Pay as you go', 'No expiration', 'Global coverage'],
    },
    {
      name: translations.esim.providers.saily,
      url: process.env.NEXT_PUBLIC_SAILY_AFFILIATE_URL || 'https://saily.tp.st/LKvc7wrT',
      color: 'from-green-500 to-teal-500',
      features: ['Flexible plans', 'Instant delivery', '24/7 support'],
    },
  ]
  
  return (
    <section id="esim" className="py-24 px-6 bg-luxury-ink/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-luxury-gold/10 rounded-2xl mb-4">
            <Wifi className="w-8 h-8 text-luxury-gold" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif">{translations.esim.title}</h2>
          <p className="text-lg text-luxury-secondary font-light mt-4 max-w-2xl mx-auto">
            {translations.esim.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {providers.map((provider) => (
            <a
              key={provider.name}
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-all"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${provider.color}`} />
              
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{provider.name}</h3>
                
                <ul className="space-y-2">
                  {provider.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-luxury-secondary">
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-gold group-hover:underline">
                    {translations.esim.cta}
                  </span>
                  <ExternalLink size={14} className="text-luxury-secondary" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
