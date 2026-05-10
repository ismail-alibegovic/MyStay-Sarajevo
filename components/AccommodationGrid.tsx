'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Star, MapPin, Building2, Coffee, Sparkles, Filter, ChevronUp, ChevronDown } from 'lucide-react'
import { translations } from '@/lib/translations'
import { cn } from '@/lib/utils'
import type { Accommodation, Amenity, LocationTag } from '@prisma/client'

interface AccommodationGridProps {
  accommodations: (Accommodation & {
    accommodationType: { name: string; slug: string } | null
    locationTags: LocationTag[]
    amenities: Amenity[]
  })[]
}

export default function AccommodationGrid({ accommodations }: AccommodationGridProps) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'rating' | 'basePrice' | 'reviewsCount'>('rating')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  
  const filteredAccommodations = useMemo(() => {
    let filtered = accommodations.filter(acc => 
      acc.name.toLowerCase().includes(search.toLowerCase()) ||
      acc.description.toLowerCase().includes(search.toLowerCase())
    )
    
    return filtered.sort((a, b) => {
      const aVal = a[sortBy] || 0
      const bVal = b[sortBy] || 0
      return order === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal)
    })
  }, [accommodations, search, sortBy, order])
  
  const sortOptions = [
    { label: translations.filters.mostPopular, value: 'reviewsCount' as const, order: 'desc' as const },
    { label: translations.filters.highestRated, value: 'rating' as const, order: 'desc' as const },
    { label: translations.filters.lowestPrice, value: 'basePrice' as const, order: 'asc' as const },
    { label: translations.filters.highestPrice, value: 'basePrice' as const, order: 'desc' as const },
  ]
  
  return (
    <div id="accommodation">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl lg:text-4xl font-serif">Smještaj u Sarajevu</h2>
          <p className="text-sm text-luxury-secondary mt-2">{filteredAccommodations.length} dostupnih opcija</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-secondary" size={18} />
          <input
            type="text"
            placeholder={translations.filters.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-black/5 rounded-xl focus:border-luxury-gold outline-none transition-colors"
          />
        </div>
        
        {/* Sort */}
        <div className="flex gap-2">
          {sortOptions.map((option) => (
            <button
              key={`${option.value}-${option.order}`}
              onClick={() => {
                setSortBy(option.value)
                setOrder(option.order)
              }}
              className={cn(
                "px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border",
                sortBy === option.value && order === option.order
                  ? "bg-luxury-ink text-white border-luxury-ink"
                  : "bg-white border-black/5 text-luxury-secondary hover:border-black/10"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccommodations.map((acc) => (
          <Link
            key={acc.id}
            href={`/smjestaj/${acc.slug}`}
            className="group bg-white rounded-[2rem] overflow-hidden border border-black/5 hover:shadow-xl transition-all"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              {acc.imageUrl && (
                <Image
                  src={acc.imageUrl}
                  alt={acc.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              
              {acc.isPremium && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-luxury-gold text-white text-[9px] font-bold uppercase tracking-wider rounded-full">
                  Premium
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-luxury-gold font-bold">
                    {acc.type}
                  </span>
                  <h3 className="text-lg font-serif mt-1">{acc.name}</h3>
                </div>
                
                <div className="flex items-center gap-1 bg-luxury-gold/5 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-luxury-gold fill-luxury-gold" />
                  <span className="text-xs font-bold">{acc.rating}</span>
                </div>
              </div>
              
              {acc.summary && (
                <p className="text-sm text-luxury-secondary line-clamp-2">{acc.summary}</p>
              )}
              
              {/* Tags */}
              {acc.locationTags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {acc.locationTags.slice(0, 2).map(tag => (
                    <span
                      key={tag.id}
                      className="text-[9px] uppercase tracking-wider text-luxury-secondary bg-black/5 px-2 py-1 rounded"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-black/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">€{acc.basePrice}</span>
                  <span className="text-[10px] text-luxury-secondary font-medium">/noć</span>
                </div>
                
                <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-gold group-hover:underline">
                  Detalji →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
