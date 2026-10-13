'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Search, Star, MapPin, Building2, Home, Sparkles, Filter, X } from 'lucide-react'
import { translations } from '@/lib/translations'
import { cn } from '@/lib/utils'
import type { Accommodation, Amenity, LocationTag, AccommodationType } from '@prisma/client'

interface AccommodationListingProps {
  initialAccommodations: (Accommodation & {
    accommodationType: { name: string; slug: string } | null
    locationTags: LocationTag[]
    amenities: Amenity[]
  })[]
  allTypes: AccommodationType[]
  allTags: LocationTag[]
  allAmenities: Amenity[]
}

export default function AccommodationListing({
  initialAccommodations,
  allTypes,
  allTags,
  allAmenities,
}: AccommodationListingProps) {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialType = searchParams.get('type') || 'all'
  const initialTag = searchParams.get('tag') || 'all'

  const [search, setSearch] = useState(initialQuery)
  const [selectedType, setSelectedType] = useState<string>(initialType)
  const [selectedTag, setSelectedTag] = useState<string>(initialTag)
  const [selectedPriceLevel, setSelectedPriceLevel] = useState<number | 'all'>('all')
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'rating' | 'basePrice' | 'reviewsCount'>('rating')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  const toggleAmenity = (slug: string) => {
    setSelectedAmenities(prev =>
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    )
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedType('all')
    setSelectedTag('all')
    setSelectedPriceLevel('all')
    setSelectedAmenities([])
    setSortBy('rating')
    setOrder('desc')
  }

  const filteredAccommodations = useMemo(() => {
    return initialAccommodations.filter(acc => {
      // 1. Text search
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchesName = acc.name.toLowerCase().includes(query)
        const matchesDesc = acc.description.toLowerCase().includes(query)
        const matchesSummary = acc.summary?.toLowerCase().includes(query)
        const matchesTag = acc.locationTags.some(t => t.name.toLowerCase().includes(query))
        if (!matchesName && !matchesDesc && !matchesSummary && !matchesTag) {
          return false
        }
      }

      // 2. Type filter
      if (selectedType !== 'all') {
        const typeSlug = acc.accommodationType?.slug || acc.type.toLowerCase()
        if (typeSlug !== selectedType && acc.type.toLowerCase() !== selectedType.toLowerCase()) {
          return false
        }
      }

      // 3. Location tag filter
      if (selectedTag !== 'all') {
        const hasTag = acc.locationTags.some(t => t.slug === selectedTag)
        if (!hasTag) return false
      }

      // 4. Price level filter
      if (selectedPriceLevel !== 'all') {
        if (acc.priceLevel !== selectedPriceLevel) return false
      }

      // 5. Amenities filter
      if (selectedAmenities.length > 0) {
        const hasAllSelectedAmenities = selectedAmenities.every(reqAmenity =>
          acc.amenities.some(a => a.slug === reqAmenity)
        )
        if (!hasAllSelectedAmenities) return false
      }

      return true
    }).sort((a, b) => {
      const aVal = a[sortBy] || 0
      const bVal = b[sortBy] || 0
      return order === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal)
    })
  }, [
    initialAccommodations,
    search,
    selectedType,
    selectedTag,
    selectedPriceLevel,
    selectedAmenities,
    sortBy,
    order,
  ])

  const sortOptions = [
    { label: translations.filters.highestRated, value: 'rating' as const, order: 'desc' as const },
    { label: translations.filters.mostPopular, value: 'reviewsCount' as const, order: 'desc' as const },
    { label: translations.filters.lowestPrice, value: 'basePrice' as const, order: 'asc' as const },
    { label: translations.filters.highestPrice, value: 'basePrice' as const, order: 'desc' as const },
  ]

  const hasActiveFilters =
    search !== '' ||
    selectedType !== 'all' ||
    selectedTag !== 'all' ||
    selectedPriceLevel !== 'all' ||
    selectedAmenities.length > 0

  return (
    <div className="space-y-8">
      {/* Search and Top Bar */}
      <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-secondary" size={20} />
            <input
              type="text"
              placeholder="Pretraži po nazivu, lokaciji ili opisu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-luxury-bg/50 border border-black/5 rounded-2xl focus:border-luxury-gold focus:bg-white outline-none transition-all text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-secondary hover:text-luxury-ink"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {sortOptions.map((opt) => (
              <button
                key={`${opt.value}-${opt.order}`}
                onClick={() => {
                  setSortBy(opt.value)
                  setOrder(opt.order)
                }}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border",
                  sortBy === opt.value && order === opt.order
                    ? "bg-luxury-ink text-white border-luxury-ink shadow-sm"
                    : "bg-white border-black/5 text-luxury-secondary hover:border-black/10 hover:text-luxury-ink"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="space-y-4 pt-4 border-t border-black/5">
          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-luxury-secondary mr-2 flex items-center gap-1">
              <Building2 size={14} /> Tip:
            </span>
            <button
              onClick={() => setSelectedType('all')}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                selectedType === 'all'
                  ? "bg-luxury-gold text-white font-bold"
                  : "bg-black/5 text-luxury-ink/70 hover:bg-black/10"
              )}
            >
              Svi tipovi
            </button>
            {allTypes.map(t => (
              <button
                key={t.slug}
                onClick={() => setSelectedType(selectedType === t.slug ? 'all' : t.slug)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  selectedType === t.slug
                    ? "bg-luxury-gold text-white font-bold"
                    : "bg-black/5 text-luxury-ink/70 hover:bg-black/10"
                )}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Location Tag Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-luxury-secondary mr-2 flex items-center gap-1">
              <MapPin size={14} /> Lokacija:
            </span>
            <button
              onClick={() => setSelectedTag('all')}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                selectedTag === 'all'
                  ? "bg-luxury-gold text-white font-bold"
                  : "bg-black/5 text-luxury-ink/70 hover:bg-black/10"
              )}
            >
              Sve lokacije
            </button>
            {allTags.map(tag => (
              <button
                key={tag.slug}
                onClick={() => setSelectedTag(selectedTag === tag.slug ? 'all' : tag.slug)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  selectedTag === tag.slug
                    ? "bg-luxury-gold text-white font-bold"
                    : "bg-black/5 text-luxury-ink/70 hover:bg-black/10"
                )}
              >
                {tag.name}
              </button>
            ))}
          </div>

          {/* Amenities & Price Level */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-luxury-secondary mr-2 flex items-center gap-1">
                <Sparkles size={14} /> Pogodnosti:
              </span>
              {allAmenities.map(am => (
                <button
                  key={am.slug}
                  onClick={() => toggleAmenity(am.slug)}
                  className={cn(
                    "px-3 py-1 rounded-full text-[11px] font-medium transition-colors border",
                    selectedAmenities.includes(am.slug)
                      ? "bg-luxury-ink text-white border-luxury-ink font-semibold"
                      : "bg-white border-black/10 text-luxury-secondary hover:border-luxury-gold/50"
                  )}
                >
                  {am.name}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-semibold text-luxury-gold hover:underline flex items-center gap-1"
              >
                <X size={14} /> Poništi filtere
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-luxury-secondary font-medium">
          Prikazano <span className="font-bold text-luxury-ink">{filteredAccommodations.length}</span> od{' '}
          {initialAccommodations.length} smještaja
        </p>
      </div>

      {/* Grid */}
      {filteredAccommodations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-black/5 space-y-4">
          <p className="text-xl font-serif text-luxury-ink">Nema smještaja koji odgovaraju odabranim kriterijima.</p>
          <p className="text-sm text-luxury-secondary">Pokušajte prilagoditi pretragu ili poništiti filtere.</p>
          <button
            onClick={clearFilters}
            className="px-6 py-2.5 bg-luxury-ink text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-luxury-gold transition-colors"
          >
            Poništi sve filtere
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAccommodations.map((acc) => (
            <Link
              key={acc.id}
              href={`/smjestaj/${acc.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                {acc.imageUrl ? (
                  <Image
                    src={acc.imageUrl}
                    alt={acc.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-luxury-secondary text-sm">
                    Nema slike
                  </div>
                )}

                {acc.isPremium && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-luxury-gold text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-md">
                    Premium
                  </div>
                )}

                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-luxury-ink flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-luxury-gold fill-luxury-gold" />
                  <span>{acc.rating.toFixed(1)}</span>
                  <span className="text-[10px] text-luxury-secondary font-normal">
                    ({acc.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">
                      {acc.type}
                    </span>
                    {acc.locationTags[0] && (
                      <span className="text-[10px] text-luxury-secondary flex items-center gap-1">
                        <MapPin size={10} className="text-luxury-gold" />
                        {acc.locationTags[0].name}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif text-luxury-ink group-hover:text-luxury-gold transition-colors line-clamp-1">
                    {acc.name}
                  </h3>

                  {acc.summary && (
                    <p className="text-xs text-luxury-secondary line-clamp-2 leading-relaxed">
                      {acc.summary}
                    </p>
                  )}
                </div>

                {/* Amenities pills */}
                {acc.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {acc.amenities.slice(0, 3).map(a => (
                      <span
                        key={a.id}
                        className="text-[9px] bg-black/5 text-luxury-ink/70 px-2 py-0.5 rounded-md font-medium"
                      >
                        {a.name}
                      </span>
                    ))}
                    {acc.amenities.length > 3 && (
                      <span className="text-[9px] text-luxury-secondary px-1 py-0.5">
                        +{acc.amenities.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-black/5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-serif font-bold text-luxury-ink">
                      €{acc.basePrice}
                    </span>
                    <span className="text-[11px] text-luxury-secondary font-medium">/noć</span>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold group-hover:translate-x-0.5 transition-transform">
                    Detalji & Rezervacija →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
