import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Heart, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'O nama - MyStay Sarajevo',
  description: 'Upoznajte tim koji stoji iza MyStay Sarajevo - vašeg lokalnog vodiča za smještaj u srcu Bosne i Hercegovine.',
  openGraph: {
    title: 'O nama - MyStay Sarajevo',
    description: 'Upoznajte tim koji stoji iza MyStay Sarajevo - vašeg lokalnog vodiča za smještaj u srcu Bosne i Hercegovine.',
    images: ['/og-image.jpg'],
  },
}

const values = [
  {
    icon: MapPin,
    title: 'Lokalna Ekspertiza',
    description: 'Poznajemo svaki kutak Sarajeva. Od Baščaršije do Trebevića, mi smo istražili svaki hotel i apartman.',
  },
  {
    icon: Heart,
    title: 'Iskrena Preporuka',
    description: 'Ne plaćamo za pozicije. Svaki smještaj je odabran na osnovu kvaliteta, lokacije i vrijednosti.',
  },
  {
    icon: Shield,
    title: 'Transparentnost',
    description: 'Jasno objavljujemo affiliate odnos. Naša provizija ne utiče na vašu cijenu rezervacije.',
  },
  {
    icon: Users,
    title: 'Zajednica',
    description: 'Gradimo zajednicu putnika koji dijele iskustva i pomažu jedni drugima pronaći idealni smještaj.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-luxury-bg">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-ink/80 to-luxury-ink/40" />
        <Image
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1920"
          alt="Sarajevo panorama"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
              O <span className="italic">MyStay Sarajevo</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Vaš lokalni partner za smještaj u srcu Bosne i Hercegovine
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-px bg-luxury-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                Naša Misija
              </span>
            </div>
            <h2 className="text-4xl font-serif mb-6">
              Pomažemo vam pronaći <span className="italic">savršeni</span> smještaj
            </h2>
            <p className="text-luxury-ink/60 leading-relaxed mb-6">
              MyStay Sarajevo je rođen iz ljubavi prema našem gradu i želje da pomognemo posjetiocima 
              da otkriju najbolje što Sarajevo ima da ponudi. Mi smo tim lokalnih eksperata koji su 
              proveli godine istražujući svaki hotel, apartman i vilu u gradu.
            </p>
            <p className="text-luxury-ink/60 leading-relaxed mb-6">
              Naša misija je jednostavna: pružiti vam najtačnije informacije i pomoći vam da donesete 
              informisanu odluku o vašem smještaju. Bez skrivenih naknada, bez plaćenih pozicija - 
              samo iskrena preporuka bazirana na kvalitetu i vrijednosti.
            </p>
            <Link
              href="/smjestaj"
              className="inline-flex items-center gap-2 bg-luxury-ink text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
            >
              Istraži Smještaj
            </Link>
          </div>
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"
              alt="Sarajevo streets"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-ink/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-8 h-px bg-luxury-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                Naše Vrijednosti
              </span>
              <span className="w-8 h-px bg-luxury-gold" />
            </div>
            <h2 className="text-4xl font-serif">
              Načela koja nas <span className="italic">vode</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 rounded-[2rem] bg-luxury-bg hover:bg-white transition-all duration-300 border border-transparent hover:border-luxury-border hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-2xl bg-luxury-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <value.icon size={24} className="text-luxury-gold" />
                </div>
                <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                <p className="text-sm text-luxury-ink/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate Transparency Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-luxury-ink rounded-[2rem] p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-3xl font-serif mb-6">
                Transparentnost o <span className="italic">affiliate</span> programu
              </h3>
              <p className="text-white/70 leading-relaxed mb-6">
                MyStay Sarajevo je ponosni partner Booking.com affiliate programa. To znači da 
                zarađujemo malu proviziju kada rezervišete smještaj putem naših linkova.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                <strong className="text-white">Važno:</strong> Ova provizija ne utiče na cijenu vaše 
                rezervacije. Vi plaćate istu cijenu kao da ste direktno posjetili Booking.com. 
                Provizija nam pomaže da održavamo ovaj sajt i nastavimo pružati besplatne informacije.
              </p>
              <p className="text-white/70 leading-relaxed">
                Mi nikada ne dozvoljavamo da financijski odnos utiče na naše preporuke. Svaki smještaj 
                je odabran isključivo na osnovu kvaliteta, lokacije i vrijednosti za goste.
              </p>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              <h4 className="text-lg font-bold mb-6">Što znači za vas?</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">✓</span>
                  </span>
                  <span className="text-sm text-white/80">Ista cijena kao na Booking.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">✓</span>
                  </span>
                  <span className="text-sm text-white/80">Podržavate lokalni tim</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">✓</span>
                  </span>
                  <span className="text-sm text-white/80">Objektivne preporuke bez plaćenih pozicija</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-luxury-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">✓</span>
                  </span>
                  <span className="text-sm text-white/80">Besplatni vodiči i resursi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-serif mb-4">
          Spremni za <span className="italic">Sarajevo</span>?
        </h2>
        <p className="text-luxury-ink/60 mb-8 max-w-2xl mx-auto">
          Istražite našu kuriranu selekciju smještaja i pronađite savršeno mjesto za vaš boravak.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/smjestaj"
            className="inline-flex items-center justify-center gap-2 bg-luxury-ink text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors"
          >
            Pogledaj Smještaj
          </Link>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 bg-white text-luxury-ink px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest border border-luxury-border hover:bg-luxury-bg transition-colors"
          >
            Kontaktirajte nas
          </Link>
        </div>
      </section>
    </main>
  )
}
