import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import AccommodationListing from '@/components/AccommodationListing'

export const metadata: Metadata = {
  title: 'Smještaj u Sarajevu | Hoteli, Apartmani i Vile - MyStay Sarajevo',
  description: 'Pregledajte najbolji smještaj u Sarajevu: Baščaršija, Centar, Ilidža, Jahorina i Bjelašnica. Direktne rezervacije i provjereni hoteli i apartmani.',
  openGraph: {
    title: 'Smještaj u Sarajevu | MyStay Sarajevo',
    description: 'Hoteli, apartmani i vile u Sarajevu i na olimpijskim planinama.',
    url: 'https://mystaysarajevo.ba/smjestaj',
    locale: 'bs_BA',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mystaysarajevo.ba/smjestaj',
  },
}

export const revalidate = 3600

export default async function SmjestajPage() {
  const [accommodations, types, tags, amenities] = await Promise.all([
    prisma.accommodation.findMany({
      include: {
        accommodationType: true,
        locationTags: true,
        amenities: true,
      },
      orderBy: [
        { isPremium: 'desc' },
        { rating: 'desc' },
      ],
    }),
    prisma.accommodationType.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.locationTag.findMany({
      orderBy: { name: 'asc' },
    }),
    prisma.amenity.findMany({
      orderBy: { name: 'asc' },
    }),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Smještaj u Sarajevu',
    description: 'Lista preporučenih hotela, apartmana i vila u Sarajevu i okolici',
    numberOfItems: accommodations.length,
    itemListElement: accommodations.map((acc, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: acc.name,
      url: `https://mystaysarajevo.ba/smjestaj/${acc.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-luxury-bg pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-luxury-secondary">
              <li>
                <Link href="/" className="hover:text-luxury-gold transition-colors flex items-center gap-1">
                  <Home size={12} />
                  Početna
                </Link>
              </li>
              <li><ChevronRight size={12} /></li>
              <li className="text-luxury-ink font-medium">Smještaj</li>
            </ol>
          </nav>

          {/* Page Header */}
          <div className="mb-10 space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-luxury-gold">
              Katalog smještaja
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif text-luxury-ink">
              Smještaj u Sarajevu i okolici
            </h1>
            <p className="text-luxury-secondary max-w-2xl text-base leading-relaxed">
              Pronađite savršeno mjesto za boravak — od historijskih hotela u srcu Baščaršije do planinskih oaza na Jahorini, Bjelašnici i Trebeviću.
            </p>
          </div>

          {/* Listings with Filters */}
          <Suspense fallback={
            <div className="p-12 text-center text-luxury-secondary">
              Učitavanje smještaja...
            </div>
          }>
            <AccommodationListing
              initialAccommodations={accommodations}
              allTypes={types}
              allTags={tags}
              allAmenities={amenities}
            />
          </Suspense>
        </div>
      </div>
    </>
  )
}
