import { Map, Camera, Mountain, Clock, Users, Star, ExternalLink } from 'lucide-react'
import { buildToursUrl, buildTiqetsUrl } from '@/lib/affiliate'

const WEGOTRIP_URL = 'https://wegotrip.tp.st/Co7z7fka'

const featuredTour = {
  title: 'Sarajevo: Vođena Tura po Starom Gradu',
  provider: 'WeGoTrip',
  description: 'Otkrijte skrivene priče Baščaršije, Sebilj fontane i sarajevske džamije uz audio vodič koji možete slušati u vlastitom tempu — bez čekanja na grupu.',
  duration: '2–3 sata',
  type: 'Self-guided audio',
  rating: 4.9,
  reviews: 312,
  highlights: [
    'Baščaršija & Gazi Husrev-begova džamija',
    'Vijećnica – historijska gradska vijećnica',
    'Latinsko ćuprija & počeci WWI',
    'Lokalna hrana & kafane',
  ],
  image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&q=80&w=1200',
  url: WEGOTRIP_URL,
}

const moreTours = [
  {
    icon: Mountain,
    title: 'Ratni Tunel & Historija Opsade',
    description: 'Posjeta tunelu koji je spasio Sarajevo tokom opsade 1992–95.',
    url: buildToursUrl(),
    cta: 'Rezerviši na Klook',
  },
  {
    icon: Camera,
    title: 'Muzeji bez Reda',
    description: 'Ulaznice za Zemaljski muzej, Galeriju i Vijećnicu — bez čekanja.',
    url: buildTiqetsUrl(),
    cta: 'Kupi na Tiqets',
  },
]

export default function ActivitiesSection() {
  return (
    <section id="activities" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-luxury-gold mb-3">
              <Map size={18} />
              <span className="text-xs font-black uppercase tracking-widest">Ture & Aktivnosti</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif leading-tight max-w-lg">
              Doživite Sarajevo kao lokalac
            </h2>
          </div>
          <a
            href={WEGOTRIP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-luxury-ink/20 text-luxury-ink rounded-full text-[11px] font-bold uppercase tracking-wider hover:border-luxury-gold hover:text-luxury-gold transition-all group"
          >
            Sve ture
            <ExternalLink size={14} className="group-hover:rotate-45 transition-transform" />
          </a>
        </div>

        {/* FEATURED WEGOTRIP TOUR */}
        <a
          href={featuredTour.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block rounded-[2.5rem] overflow-hidden bg-luxury-ink text-white hover:shadow-2xl transition-all duration-500 mb-8"
        >
          <div className="grid lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredTour.image}
                alt={featuredTour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-ink/60 to-transparent lg:bg-none" />
              <div className="absolute top-6 left-6">
                <span className="inline-block bg-luxury-gold text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  ⭐ Featured Tour
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-10 lg:p-14 flex flex-col justify-between">
              <div className="space-y-5">
                {/* Provider tag */}
                <p className="text-luxury-gold text-xs font-bold uppercase tracking-widest">{featuredTour.provider}</p>

                <h3 className="text-2xl lg:text-3xl font-serif leading-tight">{featuredTour.title}</h3>

                <p className="text-white/60 font-light leading-relaxed text-sm">
                  {featuredTour.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {featuredTour.duration}</span>
                  <span className="flex items-center gap-1.5"><Users size={14} /> {featuredTour.type}</span>
                  <span className="flex items-center gap-1.5"><Star size={14} className="fill-luxury-gold text-luxury-gold" /> {featuredTour.rating} ({featuredTour.reviews})</span>
                </div>

                {/* Highlights */}
                <ul className="space-y-2">
                  {featuredTour.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-white/70">
                      <span className="w-1.5 h-1.5 bg-luxury-gold rounded-full mt-1.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-luxury-gold">
                  Rezerviši Audio Turu
                </span>
                <ExternalLink size={14} className="text-luxury-gold group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </a>

        {/* More Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moreTours.map((tour) => (
            <a
              key={tour.title}
              href={tour.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-5 p-8 bg-luxury-ink/[0.02] rounded-3xl border border-black/5 hover:border-luxury-gold/20 hover:shadow-md transition-all"
            >
              <div className="w-12 h-12 bg-luxury-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <tour.icon className="w-6 h-6 text-luxury-gold" />
              </div>
              <div>
                <h4 className="font-bold mb-1">{tour.title}</h4>
                <p className="text-sm text-luxury-secondary font-light mb-3">{tour.description}</p>
                <span className="text-[10px] font-black uppercase tracking-wider text-luxury-ink/50 group-hover:text-luxury-gold transition-colors">
                  {tour.cta} →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
