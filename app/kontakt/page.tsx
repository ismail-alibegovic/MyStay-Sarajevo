import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Kontakt - MyStay Sarajevo',
  description: 'Kontaktirajte MyStay Sarajevo tim. Tu smo da vam pomognemo pronaći savršeni smještaj u Sarajevu.',
  openGraph: {
    title: 'Kontakt - MyStay Sarajevo',
    description: 'Kontaktirajte MyStay Sarajevo tim. Tu smo da vam pomognemo pronaći savršeni smještaj u Sarajevu.',
    images: ['/og-image.jpg'],
  },
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adresa',
    value: 'Sarajevo, Bosna i Hercegovina',
    href: 'https://maps.google.com/?q=Sarajevo,+Bosnia+and+Herzegovina',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@mystaysarajevo.ba',
    href: 'mailto:info@mystaysarajevo.ba',
  },
]

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
]

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-luxury-bg">
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-ink/80 to-luxury-ink/40" />
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1920"
          alt="Sarajevo hotel lobby"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-serif text-white mb-6">
              Kontaktirajte <span className="italic">nas</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Tu smo da vam pomognemo pronaći savršeni smještaj
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-luxury-border shadow-lg">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-luxury-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                  Pošaljite Poruku
                </span>
              </div>
              <h2 className="text-3xl font-serif mb-4">
                Kako vam možemo <span className="italic">pomoći</span>?
              </h2>
              <p className="text-luxury-ink/60 leading-relaxed">
                Imate pitanje o smještaju? Želite preporuku? Javite nam se i odgovorit ćemo vam u roku 24 sata.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2rem] p-8 border border-luxury-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-luxury-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                  Kontakt Informacije
                </span>
              </div>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-luxury-bg transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-luxury-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <info.icon size={20} className="text-luxury-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-luxury-ink/70">{info.label}</p>
                      <p className="text-base text-luxury-ink">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-luxury-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-luxury-gold" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
                  Pratite Nas
                </span>
              </div>
              <p className="text-luxury-ink/60 mb-6">
                Budite u toku sa najnovijim preporukama i ponudama za smještaj u Sarajevu.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-luxury-ink flex items-center justify-center text-white hover:bg-neutral-800 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-luxury-ink rounded-[2rem] p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Radno vrijeme</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p>Ponedjeljak - Petak: 09:00 - 18:00</p>
                <p>Subota: 10:00 - 15:00</p>
                <p>Nedjelja: Zatvoreno</p>
              </div>
              <p className="text-xs text-white/50 mt-4">
                * Odgovaramo na email poruke 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-px bg-luxury-gold" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-luxury-gold">
              Često Postavljana Pitanja
            </span>
            <span className="w-8 h-px bg-luxury-gold" />
          </div>
          <h2 className="text-4xl font-serif">
            Brzi <span className="italic">odgovori</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              q: 'Kako da rezervišem smještaj?',
              a: 'Kliknite na "Rezerviši" dugme bilo kojeg smještaja i bit ćete preusmjereni na Booking.com za sigurnu rezervaciju.',
            },
            {
              q: 'Da li je rezervacija besplatna?',
              a: 'Da, pretraga i rezervacija su besplatne. Plaćate samo smještaj direktno Booking.com-u.',
            },
            {
              q: 'Mogu li promijeniti rezervaciju?',
              a: 'Sve promjene i otkazivanja vršite direktno na Booking.com-u prema uslovima smještaja.',
            },
            {
              q: 'Kako vas mogu podržati?',
              a: 'Rezervišite putem naših linkova! To nam pomaže da nastavimo pružati besplatne informacije.',
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-luxury-border">
              <h3 className="font-bold text-luxury-ink mb-2">{faq.q}</h3>
              <p className="text-sm text-luxury-ink/60 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
