import { Accommodation } from '@prisma/client'

// JSON-LD Structured Data Generator

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MyStay Sarajevo',
    url: 'https://mystaysarajevo.ba',
    description: 'Pronađite najbolji smještaj u Sarajevu - apartmani, hoteli i vile.',
    publisher: {
      '@type': 'Organization',
      name: 'MyStay Sarajevo',
      url: 'https://mystaysarajevo.ba',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://mystaysarajevo.ba/smjestaj?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateLodgingBusinessSchema(accommodation: {
  id: string
  name: string
  description: string
  type: string
  rating: number
  reviewsCount: number
  basePrice: number | null
  imageUrl: string | null
  latitude: number | null
  longitude: number | null
  address?: string
  telephone?: string
}) {
  const accommodationTypeMap: Record<string, string> = {
    Hotel: 'Hotel',
    Apartman: 'Apartment',
    Vila: 'House',
    Pansion: 'BedAndBreakfast',
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: accommodation.name,
    description: accommodation.description,
    '@id': `https://mystaysarajevo.ba/smjestaj/${accommodation.id}`,
    url: `https://mystaysarajevo.ba/smjestaj/${accommodation.id}`,
    image: accommodation.imageUrl || [],
    priceRange: accommodation.basePrice ? `€${accommodation.basePrice}` : undefined,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sarajevo',
      addressCountry: 'BA',
      addressRegion: 'Federacija Bosne i Hercegovine',
    },
    geo: accommodation.latitude && accommodation.longitude
      ? {
          '@type': 'GeoCoordinates',
          latitude: accommodation.latitude,
          longitude: accommodation.longitude,
        }
      : undefined,
    aggregateRating: accommodation.reviewsCount > 0
      ? {
          '@type': 'AggregateRating',
          ratingValue: accommodation.rating,
          reviewCount: accommodation.reviewsCount,
          bestRating: 5,
          worstRating: 1,
        }
      : undefined,
    telephone: accommodation.telephone,
    hasMap: `https://maps.google.com/?q=${accommodation.latitude},${accommodation.longitude}`,
    checkinTime: '14:00',
    checkoutTime: '11:00',
  }
}

export function generateOfferSchema(accommodation: {
  id: string
  name: string
  basePrice: number | null
}) {
  if (!accommodation.basePrice) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: `Rezervacija - ${accommodation.name}`,
    description: `Smještaj u ${accommodation.name}, Sarajevo`,
    url: `https://mystaysarajevo.ba/smjestaj/${accommodation.id}`,
    priceCurrency: 'EUR',
    price: accommodation.basePrice,
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'MyStay Sarajevo',
    },
  }
}

export function generateArticleSchema(article: {
  title: string
  excerpt: string
  publishedAt: string
  modifiedAt?: string
  author: string
  slug: string
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://mystaysarajevo.ba/o-nama',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyStay Sarajevo',
      url: 'https://mystaysarajevo.ba',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://mystaysarajevo.ba/vodic/${article.slug}`,
    },
    image: article.imageUrl,
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://mystaysarajevo.ba${item.url}`,
    })),
  }
}
