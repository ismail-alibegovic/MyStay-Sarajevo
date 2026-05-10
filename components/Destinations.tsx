import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { translations } from '@/lib/translations'

export default function Destinations() {
  const destinations = [
    {
      id: '1',
      name: translations.destinations.bascarsija.name,
      slug: 'bascarsija',
      description: translations.destinations.bascarsija.description,
      imageUrl: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: '2',
      name: translations.destinations.trebevic.name,
      slug: 'trebevic-view',
      description: translations.destinations.trebevic.description,
      imageUrl: 'https://images.unsplash.com/photo-1549115796-7d12a95c370f?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: '3',
      name: translations.destinations.centar.name,
      slug: 'business-district',
      description: translations.destinations.centar.description,
      imageUrl: 'https://images.unsplash.com/photo-1620332372374-f108c53d2e03?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: '4',
      name: translations.destinations.ilidza.name,
      slug: 'quiet-oasis',
      description: translations.destinations.ilidza.description,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    },
  ]
  
  return (
    <section id="destinations" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block w-12 h-px bg-luxury-gold mb-4" />
          <h2 className="text-4xl lg:text-5xl font-serif">{translations.destinations.title}</h2>
          <p className="text-lg text-luxury-secondary font-light mt-4 max-w-2xl mx-auto">
            {translations.destinations.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/?tag=${dest.slug}#accommodation`}
              className="group relative h-[450px] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <Image
                src={dest.imageUrl}
                alt={dest.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-luxury-gold" />
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Region</span>
                </div>
                <h3 className="text-2xl font-serif mb-2">{dest.name}</h3>
                <p className="text-sm text-white/60 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {dest.description}
                </p>
                
                <div className="mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[10px] font-bold uppercase tracking-wider border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    Pogledaj Smještaj
                  </span>
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-luxury-ink">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
