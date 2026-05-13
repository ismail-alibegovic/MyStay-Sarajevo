import { ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react'
import { buildInsuranceUrl } from '@/lib/affiliate'

const benefits = [
  'Kompenzacija do 600€ za kašnjenja i otkazivanja',
  'Besplatna prijava za 5 minuta',
  'Bez upitnika i birokratije',
  'Plaćamo čak i ako avio kompanija odbije',
]

export default function InsuranceSection() {
  return (
    <section id="insurance" className="py-24 px-6 bg-luxury-ink/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 bg-white rounded-[2.5rem] p-10 lg:p-16 border border-black/5 shadow-sm">

          {/* Icon */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-luxury-gold/10 rounded-3xl flex items-center justify-center">
              <ShieldCheck className="w-10 h-10 text-luxury-gold" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-luxury-gold mb-2">
                Zaštita putnika
              </p>
              <h2 className="text-3xl font-serif leading-snug">
                Let Kasnio ili Otkazan? Dobijte do <span className="text-luxury-gold">600€</span> Kompenzacije
              </h2>
            </div>
            <p className="text-luxury-secondary font-light leading-relaxed">
              Compensair automatski provjerava da li imate pravo na naknadu i vodi kompletan proces 
              umjesto vas — bez predujma, plaćamo samo ako uspijemo.
            </p>

            <ul className="space-y-2 pt-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-luxury-secondary">
                  <CheckCircle size={15} className="text-luxury-gold flex-shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0 text-center">
            <a
              href={buildInsuranceUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-luxury-ink text-white rounded-full font-bold text-[11px] uppercase tracking-wider hover:bg-luxury-gold transition-colors"
            >
              Provjeri Kompenzaciju
              <ExternalLink size={14} className="group-hover:rotate-45 transition-transform" />
            </a>
            <p className="text-xs text-luxury-secondary/50 mt-3">
              Besplatno • Bez rizika • 5 minuta
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
