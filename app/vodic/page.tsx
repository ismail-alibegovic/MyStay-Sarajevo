import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/mdx'
import { translations } from '@/lib/translations'

export const metadata: Metadata = {
  title: 'Vodič kroz Sarajevo - MyStay',
  description: 'Potpuni vodič kroz Sarajevo: smještaj, hrana, kultura i transport. Otkrijte najbolje hotele, restorane i atrakcije.',
  openGraph: {
    title: 'Vodič kroz Sarajevo',
    description: 'Potpuni vodič kroz Sarajevo: smještaj, hrana, kultura i transport.',
    type: 'website',
    locale: 'bs_BA',
  },
}

const categories = [
  { slug: 'smjestaj', name: 'Smještaj', icon: '🏨' },
  { slug: 'hrana', name: 'Hrana', icon: '🍽️' },
  { slug: 'kultura', name: 'Kultura', icon: '🎭' },
  { slug: 'transport', name: 'Transport', icon: '🚗' },
]

export default function VodicPage() {
  const articles = getAllArticles()

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative py-24 px-6 bg-ink">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-luxury-gold/20 text-luxury-gold px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Vodič
          </span>
          <h1 className="text-5xl lg:text-6xl font-serif text-white mb-6">
            Vodič kroz Sarajevo
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Otkrijte najbolje smještaje, restorane, kulturne atrakcije i savjete za putovanje u Sarajevu. Lokalno znanje za nezaboravno iskustvo.
          </p>
        </div>
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&q=80&w=1920"
            alt="Sarajevo"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((cat) => {
            const count = articles.filter(a => a.category === cat.slug).length
            return (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-ink/10 text-sm font-medium text-ink/70 hover:border-luxury-gold hover:text-luxury-gold transition-all"
              >
                <span>{cat.icon}</span>
                {cat.name}
                <span className="text-xs bg-ink/5 px-2 py-0.5 rounded-full">{count}</span>
              </a>
            )
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/vodic/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-ink/5 hover:border-luxury-gold/30 transition-all shadow-sm hover:shadow-lg"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-ink/70">
                    {categories.find(c => c.slug === article.category)?.icon}{' '}
                    {categories.find(c => c.slug === article.category)?.name}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h2 className="text-xl font-serif text-ink group-hover:text-luxury-gold transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-sm text-ink/60 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-2 text-xs text-ink/40">
                  <span>{article.readTime}</span>
                  <span>{new Date(article.date).toLocaleDateString('bs-BA', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="max-w-4xl mx-auto px-6 pb-12">
        <p className="text-center text-xs text-ink/40">
          Neki linkovi u člancima su partnerski linkovi. Rezervacijom nam pomažete da održavamo ovaj sajt.
        </p>
      </section>
    </div>
  )
}
