import {
  ACCOMMODATIONS,
  ACCOMMODATION_TYPES,
  LOCATION_TAGS,
  AMENITIES,
  AccommodationItem,
} from '@/data/accommodations'
import { prisma } from './prisma'

export type Accommodation = ReturnType<typeof formatAccommodation>

// Format accommodation into the shape expected by UI components
export function formatAccommodation(acc: AccommodationItem) {
  const typeObj = ACCOMMODATION_TYPES.find(t => t.name.toLowerCase() === acc.type.toLowerCase() || t.slug === acc.type.toLowerCase())
  const locationTagObjs = acc.tags.map(tSlug => {
    const found = LOCATION_TAGS.find(lt => lt.slug === tSlug)
    return {
      id: `tag-${tSlug}`,
      slug: tSlug,
      name: found ? found.name : tSlug,
      description: found?.description || null,
      icon: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
  const amenityObjs = acc.amenities.map(aSlug => {
    const found = AMENITIES.find(am => am.slug === aSlug)
    return {
      id: `am-${aSlug}`,
      slug: aSlug,
      name: found ? found.name : aSlug,
      icon: found?.icon || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  return {
    id: acc.id,
    name: acc.name,
    slug: acc.slug,
    bookingComId: acc.bookingComId,
    description: acc.description,
    summary: acc.summary,
    type: acc.type,
    rating: acc.rating,
    reviewsCount: acc.reviewsCount,
    priceLevel: acc.priceLevel,
    basePrice: acc.basePrice,
    imageUrl: acc.imageUrl,
    coverImageUrl: acc.coverImageUrl || null,
    bookingUrl: acc.bookingUrl,
    isPremium: acc.isPremium,
    isFeatured: acc.isFeatured,
    latitude: acc.latitude || null,
    longitude: acc.longitude || null,
    typeId: typeObj?.slug || null,
    createdAt: new Date(),
    updatedAt: new Date(),
    accommodationType: typeObj ? {
      id: `type-${typeObj.slug}`,
      name: typeObj.name,
      slug: typeObj.slug,
      description: typeObj.description || null,
      icon: typeObj.icon || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } : null,
    locationTags: locationTagObjs,
    amenities: amenityObjs,
  }
}

export async function getAccommodations() {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('fake')) {
    try {
      const dbData = await prisma.accommodation.findMany({
        include: {
          accommodationType: true,
          locationTags: true,
          amenities: true,
        },
        orderBy: [
          { isPremium: 'desc' },
          { rating: 'desc' },
        ],
      })
      if (dbData && dbData.length > 0) return dbData
    } catch {
      // Fallback seamlessly to static dataset
    }
  }

  return ACCOMMODATIONS.map(formatAccommodation).sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1
    if (!a.isPremium && b.isPremium) return 1
    return b.rating - a.rating
  })
}

export async function getAccommodationBySlug(slug: string) {
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('fake')) {
    try {
      const dbAcc = await prisma.accommodation.findUnique({
        where: { slug },
        include: {
          locationTags: true,
          amenities: true,
        },
      })
      if (dbAcc) return dbAcc
    } catch {
      // Fallback seamlessly to static dataset
    }
  }

  const found = ACCOMMODATIONS.find(a => a.slug === slug)
  return found ? formatAccommodation(found) : null
}

export async function getRelatedAccommodations(acc: any, limit = 3) {
  const currentTags = (acc.locationTags || []).map((t: any) => t.slug)
  const all = await getAccommodations()
  return all
    .filter(a => a.id !== acc.id && a.locationTags.some((t: any) => currentTags.includes(t.slug)))
    .slice(0, limit)
}

export async function getCatalogTypes() {
  return ACCOMMODATION_TYPES.map(t => ({
    id: `type-${t.slug}`,
    name: t.name,
    slug: t.slug,
    description: t.description,
    icon: t.icon,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
}

export async function getCatalogTags() {
  return LOCATION_TAGS.map(t => ({
    id: `tag-${t.slug}`,
    name: t.name,
    slug: t.slug,
    description: t.description,
    icon: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
}

export async function getCatalogAmenities() {
  return AMENITIES.map(a => ({
    id: `amenity-${a.slug}`,
    name: a.name,
    slug: a.slug,
    icon: a.icon,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
}
