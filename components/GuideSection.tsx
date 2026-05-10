import { Coffee, Utensils, Zap, Camera } from 'lucide-react'
import { translations } from '@/lib/translations'
import Image from 'next/image'

export default function GuideSection() {
  const guideItems = [
    {
      icon: Utensils,
      title: translations.guide.items.food.title,
      description: translations.guide.items.food.description,
    },
    {
      icon: Coffee,
      title: translations.guide.items.coffee.title,
      description: translations.guide.items.coffee.description,
    },
    {
      icon: Zap,
      title: translations.guide.items.nightlife.title,
      description: translations.guide.items.nightlife.description,
    },
    {
      icon: Camera,
      title: translations.guide.items.photography.title,
      description: translations.guide.items.photography.description,
    },
  ]
  
  return (
    <section id="guide" className="py-24 px-6 bg-luxury-ink/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="bento-card p-12 lg:p-20 overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-luxury-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                  {translations.guide.subtitle}
                </span>
              </div>
              <h2 className="text-5xl font-serif leading-tight">{translations.guide.title}</h2>
              <p className="text-lg text-luxury-secondary font-light max-w-lg">
                Naš portal vam nudi više od same rezervacije. Mi smo vaš lokalni saputnik kroz uličice koje kriju vijekove historije.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8">
                {guideItems.map((item, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="w-10 h-10 bg-luxury-gold/10 rounded-full flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-luxury-gold" />
                    </div>
                    <h4 className="font-bold text-sm">{item.title}</h4>
                    <p className="text-xs text-luxury-ink/40 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"
                  alt="Sarajevo Guide"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/80 to-transparent" />
                <div className="absolute bottom-10 left-10 text-white">
                  <p className="text-4xl font-serif italic mb-2">#mySarajevo</p>
                  <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-60">
                    Pratite nas za više savjeta
                  </p>
                </div>
              </div>
              
              {/* Design accents */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-luxury-gold/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-luxury-ink/5 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
