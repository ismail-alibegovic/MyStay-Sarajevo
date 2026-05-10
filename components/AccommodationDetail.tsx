'use client'

import Image from 'next/image'
import { Star, MapPin, Wifi, Car, Coffee, Sparkles, ExternalLink } from 'lucide-react'
import { translations } from '@/lib/translations'
import { cn } from '@/lib/utils'
import type { Accommodation, Amenity, LocationTag, Review } from '@prisma/client'

interface AccommodationDetailProps {
  accommodation: Accommodation & {
    accommodationType: { name: string; slug: string } | null
    locationTags: LocationTag[]
    amenities: Amenity[]
    reviews: Review[]
  }
}

const iconMap: Record<string, any> = {
  Wifi,
  Car,
  Coffee,
  Sparkles,
  MapPin,
}

export default function AccommodationDetail({ accommodation }: AccommodationDetailProps) {
  const AmenityIcon = ({ iconName }: { iconName?: string }) => {
    const Icon = iconName ? iconMap[iconName] : MapPin
    return <Icon size={20} />
  }
  
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="relative aspect-[4/3] lg:aspect-[3/4] rounded-[3rem] overflow-hidden">
          {accommodation.coverImageUrl || accommodation.imageUrl ? (
            <Image
              src={accommodation.coverImageUrl || accommodation.imageUrl!}
              alt={accommodation.name}
              fill
              className="object-cover"
              priority
            />
          ) : null}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <span className="inline-block px-4 py-2 bg-luxury-gold text-white text-[10px] font-bold uppercase tracking-wider rounded-full mb-4">
              {accommodation.type}
            </span>
            <h1 className="text-4xl lg:text-5xl font-serif">{accommodation.name}</h1>
          </div>
        </div>
        
        {/* Details */}
        <div className="space-y-8">
          {/* Rating */}
          <div className="flex items-center justify-between pb-6 border-b border-black/5">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={cn(
                    i < Math.floor(accommodation.rating)
                      ? "text-luxury-gold fill-luxury-gold"
                      : "text-black/10"
                  )}
                />
              ))}
              <span className="ml-2 font-bold">{accommodation.rating}</span>
            </div>
            <span className="text-[10px] text-luxury-secondary font-bold uppercase tracking-wider">
              {accommodation.reviewsCount} {translations.card.reviews}
            </span>
          </div>
          
          {/* Tags */}
          {accommodation.locationTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {accommodation.locationTags.map((tag: any) => (
                <span
                  key={tag.id}
                  className="px-4 py-2 border border-black/10 bg-luxury-ink/[0.02] rounded-full text-[10px] font-bold uppercase tracking-wider text-luxury-ink/60"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          
          {/* Description */}
          <div className="prose prose-sm max-w-none">
            {accommodation.summary && (
              <p className="text-xl italic font-serif text-luxury-ink/40 leading-relaxed">
                &ldquo;{accommodation.summary}&rdquo;
              </p>
            )}
            <p className="text-base leading-relaxed">{accommodation.description}</p>
          </div>
          
          {/* Amenities */}
          {accommodation.amenities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-gold mb-4">
                {translations.detail.amenities}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {accommodation.amenities.map((amenity: any) => (
                  <div
                    key={amenity.id}
                    className="flex items-center gap-4 p-4 bg-luxury-ink/[0.02] rounded-2xl border border-black/5"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-luxury-gold">
                      <AmenityIcon iconName={amenity.icon || undefined} />
                    </div>
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Location */}
          {accommodation.latitude && accommodation.longitude && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-luxury-gold mb-4">
                {translations.detail.location}
              </h3>
              <a
                href={`https://www.google.com/maps/@${accommodation.latitude},${accommodation.longitude},15z`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-luxury-secondary hover:text-luxury-gold transition-colors"
              >
                <MapPin size={16} />
                <span>Pogledaj na Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
          
          {/* Booking CTA */}
          <div className="pt-8 border-t border-black/5 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-serif font-black">€{accommodation.basePrice}</span>
              <span className="text-sm text-luxury-secondary">EUR</span>
            </div>
            
            <a
              href={accommodation.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-luxury-ink text-white py-6 rounded-2xl text-center text-[11px] font-black uppercase tracking-[0.2em] hover:bg-luxury-gold transition-colors"
            >
              {translations.detail.bookNow}
            </a>
            
            <p className="text-center text-[10px] text-luxury-secondary font-bold uppercase tracking-wider">
              {translations.detail.secureBooking}
            </p>
          </div>
        </div>
      </div>
      
      {/* Reviews */}
      {accommodation.reviews.length > 0 && (
        <div className="mt-16 pt-16 border-t border-black/5">
          <h3 className="text-2xl font-serif mb-8">Recenzije gostiju</h3>
          <div className="space-y-6">
            {accommodation.reviews.map((review: any) => (
              <div key={review.id} className="bg-white border border-black/5 rounded-2xl p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-luxury-ink/5 rounded-full flex items-center justify-center text-luxury-ink/40 font-bold">
                      {review.userName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{review.userName}</p>
                      <p className="text-[10px] text-luxury-secondary uppercase tracking-wider">
                        {new Date(review.createdAt).toLocaleDateString('bs-BA')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-luxury-gold/5 px-3 py-1.5 rounded-full">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={cn(
                          i < review.rating
                            ? "text-luxury-gold fill-luxury-gold"
                            : "text-black/5"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-luxury-ink/60 font-light leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
