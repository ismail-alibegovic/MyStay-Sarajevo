import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const footerLinks = [
  {
    title: 'Smještaj',
    links: [
      { href: '/smjestaj?type=hotel', label: 'Hoteli' },
      { href: '/smjestaj?type=apartment', label: 'Apartmani' },
      { href: '/smjestaj?type=vila', label: 'Vile' },
      { href: '/smjestaj?type=pansion', label: 'Pansioni' },
    ],
  },
  {
    title: 'Resursi',
    links: [
      { href: '/vodic', label: 'Vodič' },
      { href: '/rent-a-car', label: 'Rent a Car' },
      { href: '/esim', label: 'eSIM' },
      { href: '/transfer', label: 'Transfer' },
    ],
  },
  {
    title: 'Informacije',
    links: [
      { href: '/o-nama', label: 'O nama' },
      { href: '/kontakt', label: 'Kontakt' },
      { href: '/politika-privatnosti', label: 'Politika privatnosti' },
      { href: '/uslovi-koristenja', label: 'Uslovi korištenja' },
    ],
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-luxury-ink text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="text-xl font-bold">
                MyStay<span className="text-luxury-gold">Sarajevo</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Vaš lokalni vodič za smještaj u Sarajevu. Kurirana selekcija hotela, apartmana i vila sa najboljim cijenama.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-luxury-gold mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin size={16} className="text-luxury-gold" />
                <span>Sarajevo, Bosna i Hercegovina</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Mail size={16} className="text-luxury-gold" />
                <a href="mailto:info@mystaysarajevo.ba" className="hover:text-white transition-colors">
                  info@mystaysarajevo.ba
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Disclaimer */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-6">
            <p className="text-xs text-white/50 leading-relaxed">
              <strong className="text-white/70">Affiliate Disclaimer:</strong>{' '}
              MyStay Sarajevo je partner Booking.com affiliate programa. Kad rezervišete putem naših linkova, 
              možemo ostvariti proviziju bez dodatnog troška za vas. To nam pomaže da održavamo ovaj sajt 
              i nastavimo pružati kvalitetne informacije o smještaju u Sarajevu.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} MyStay Sarajevo. Sva prava zadržana.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/40">
              Built with ❤️ in Sarajevo
            </span>
            <div className="h-4 w-px bg-white/20" />
            <Link href="/politika-privatnosti" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Privatnost
            </Link>
            <Link href="/uslovi-koristenja" className="text-xs text-white/40 hover:text-white/60 transition-colors">
              Uslovi
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
