import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Wifi, Car, Coffee, Sparkles, ArrowRight, Home, ChevronRight } from 'lucide-react'
import { translations } from '@/lib/translations'

// Force dynamic rendering to avoid database connection at build time
export const dynamic = 'force-dynamic'

// Icon mapping
const amenityIcons: Record<string, any> = {
  Wifi,
  Car,
  Coffee,
  Sparkles,
  MapPin,
}

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const accommodations = await prisma.accommodation.findMany({
    include: {
      locationTags: true,
      amenities: true
    }
  })
  
  const acc = accommodations.find((a: any) => 
    a.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.slug
  )
  
  if (!acc) return { title: 'Not Found' }
  
  return {
    title: `${acc.name} - MyStay Sarajevo`,
    description: acc.description.slice(0, 160),
    openGraph: {
      title: acc.name,
      description: acc.description.slice(0, 160),
      images: [acc.imageUrl || '/og-image.jpg'],
      type: 'website',
      locale: 'bs_BA',
    },
    twitter: {
      card: 'summary_large_image',
      title: acc.name,
      description: acc.description.slice(0, 160),
      images: [acc.imageUrl || '/og-image.jpg'],
    },
  }
}

// JSON-LD structured data
function generateJsonLd(acc: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: acc.name,
    description: acc.description,
    image: acc.imageUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sarajevo',
      addressCountry: 'BA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: acc.latitude,
      longitude: acc.longitude,
    },
    starRating: {
      '@type': 'Rating',
      ratingValue: acc.rating,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: acc.rating,
      reviewCount: acc.reviewsCount,
    },
    priceRange: `€${acc.basePrice}`,
    amenityFeature: acc.amenities?.map((a: any) => ({
      '@type': 'LocationFeatureSpecification',
      name: a.name,
    })),
  }
}

function generateBreadcrumbJsonLd(acc: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Početna',
        item: 'https://mystaysarajevo.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Smještaj',
        item: 'https://mystaysarajevo.com/#accommodation',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: acc.name,
      },
    ],
  }
}

export default async function AccommodationPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const accommodations = await prisma.accommodation.findMany({
    include: {
      locationTags: true,
      amenities: true
    }
  })
  
  const acc = accommodations.find((a: any) => 
    a.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === params.slug
  )
  
  if (!acc) notFound()
  
  // Find related accommodations (matching tags)
  const relatedAccommodations = accommodations
    .filter((a: any) => {
      if (a.id === acc.id) return false
      return a.locationTags.some((tag: any) => 
        acc.locationTags.some((t: any) => t.slug === tag.slug)
      )
    })
    .slice(0, 3)

  // Generate image placeholders
  const images = [
    acc.imageUrl,
    acc.coverImageUrl,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1582719508461-930c911f134a?auto=format&fit=crop&q=80&w=800',
  ].filter(Boolean)

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(acc)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbJsonLd(acc)),
        }}
      />

      <div className="min-h-screen bg-cream">
        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-6 py-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs text-ink/50">
            <li>
              <Link href="/" className="hover:text-luxury-gold transition-colors flex items-center gap-1">
                <Home size={12} />
                Početna
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li>
              <Link href="/#accommodation" className="hover:text-luxury-gold transition-colors">
                Smještaj
              </Link>
            </li>
            <li><ChevronRight size={12} /></li>
            <li className="text-ink font-medium">{acc.name}</li>
          </ol>
        </nav>

        {/* Main Content - Two Column Layout */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            
            {/* LEFT COLUMN - Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-ink/5">
                <Image
                  src={images[0] || '/placeholder.jpg'}
                  alt={acc.name}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoKChgMDQ4ODQ4ODhYaExISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIS/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFB//EACUQAAEEAgEEAgMAAAAAAAAAAAECAwQRBQAhMQYHEhMiQVKBsf/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A2YOMOOOaQxOaSxGOMYxjGMbxjjGMbxjGMbxjGMbxjGMbxjGMbxjGMbxjGMbxjGMbxjGMbxjGMbxjGMbxjGMbxj//2Q=="
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {acc.isPremium && (
                  <div className="absolute top-6 left-6 bg-luxury-gold text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                    Premium
                  </div>
                )}
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-3">
                {images.slice(1, 5).filter(Boolean).map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-ink/5 cursor-pointer hover:opacity-80 transition-opacity">
                    <Image
                      src={img!}
                      alt={`${acc.name} - slika ${idx + 2}`}
                      fill
                      className="object-cover"
                      sizes="150px"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN - Info + CTA */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                {/* Type Badge */}
                <span className="inline-block bg-luxury-gold/10 text-luxury-gold px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                  {acc.type}
                </span>

                {/* Name */}
                <h1 className="text-4xl lg:text-5xl font-serif text-ink leading-tight">
                  {acc.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={20}
                        className={star <= Math.floor(acc.rating) ? 'text-luxury-gold fill-luxury-gold' : 'text-ink/10'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-ink">{acc.rating}</span>
                  <span className="text-xs text-ink/40">
                    ({acc.reviewsCount} recenzija)
                  </span>
                </div>
              </div>

              {/* Location Tags */}
              <div className="flex flex-wrap gap-2">
                {acc.locationTags?.map((tag: any) => (
                  <span
                    key={tag.slug}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-ink/5 rounded-full text-xs font-medium text-ink/70"
                  >
                    <MapPin size={12} className="text-luxury-gold" />
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Description */}
              <div className="prose prose-sm max-w-none">
                <p className="text-lg italic font-serif text-ink/50 leading-relaxed">
                  &ldquo;{acc.summary}&rdquo;
                </p>
                <p className="text-base text-ink/60 leading-relaxed">
                  {acc.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink/40">
                  Pogodnosti
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {acc.amenities?.map((amenity: any) => {
                    const IconComponent = amenityIcons[amenity.icon] || Sparkles
                    return (
                      <div
                        key={amenity.slug}
                        className="flex items-center gap-3 p-3 bg-white rounded-xl border border-ink/5"
                      >
                        <div className="w-10 h-10 bg-luxury-gold/10 rounded-lg flex items-center justify-center">
                          <IconComponent size={18} className="text-luxury-gold" />
                        </div>
                        <span className="text-sm font-medium text-ink/80">
                          {amenity.name}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Price + CTA */}
              <div className="space-y-6 pt-8 border-t border-ink/10">
                {/* Price */}
                <div>
                  <p className="text-xs text-ink/40 uppercase tracking-wider mb-2">
                    Cijena po noćenju
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif font-bold text-ink">
                      €{acc.basePrice}
                    </span>
                    <span className="text-sm text-ink/40">/ noć</span>
                  </div>
                  <p className="text-[10px] text-ink/30 mt-2">
                    * Cijena može varirati ovisno o datumu i dostupnosti
                  </p>
                </div>

                {/* CTA Button */}
                <div className="space-y-3">
                  <a
                    href={acc.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-affiliate="booking"
                    onClickCapture={() => {
                      if (typeof window !== 'undefined' && (window as any).gtag) {
                        (window as any).gtag('event', 'affiliate_click', {
                          event_category: 'Booking',
                          event_label: acc.name,
                          accommodation_id: acc.id,
                        })
                      }
                    }}
                    className="block w-full bg-luxury-gold text-white px-8 py-5 rounded-2xl text-center font-bold uppercase tracking-[0.15em] hover:bg-luxury-gold/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                  >
                    <span className="flex items-center justify-center gap-3">
                      Provjeri dostupnost na Booking.com
                      <ArrowRight size={20} />
                    </span>
                  </a>
                  <p className="text-center text-[10px] text-ink/40 uppercase tracking-widest">
                    Rezervišete na Booking.com — sigurno i brzo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Accommodations */}
          {relatedAccommodations.length > 0 && (
            <section className="mt-24">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif text-ink">
                  Slični smještaji
                </h2>
                <Link
                  href="/#accommodation"
                  className="text-sm text-luxury-gold hover:underline"
                >
                  Pogledaj sve →
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedAccommodations.map((related: any) => (
                  <Link
                    key={related.id}
                    href={`/smjestaj/${related.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="group block bg-white rounded-2xl overflow-hidden border border-ink/5 hover:border-luxury-gold/30 transition-all"
                  >
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={related.imageUrl || '/placeholder.jpg'}
                        alt={related.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <h3 className="font-serif text-lg text-ink group-hover:text-luxury-gold transition-colors">
                        {related.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-ink/50">
                        <span className="px-2 py-1 bg-ink/5 rounded-full">{related.type}</span>
                        <span>€{related.basePrice}/noć</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}

// Revalidate every hour for ISR
export const revalidate = 3600
