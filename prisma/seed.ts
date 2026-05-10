import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding MyStay Sarajevo data...')

  // 1. Create Accommodation Types
  const types = [
    { name: 'Hotel', slug: 'hotel', description: 'Luksuzni i standardni hoteli sa potpunom uslugom.', icon: 'Building2' },
    { name: 'Apartman', slug: 'apartment', description: 'Potpuno opremljeni apartmani za maksimalnu privatnost.', icon: 'Home' },
    { name: 'Vila', slug: 'vila', description: 'Ekskluzivne vile za veće grupe i luksuzan odmor.', icon: 'Tent' },
    { name: 'Pansion', slug: 'pansion', description: 'Tradicionalni pansioni sa autentičnim domaćinstvom.', icon: 'Coffee' },
  ]

  const createdTypes = await Promise.all(
    types.map(t => prisma.accommodationType.upsert({
      where: { slug: t.slug },
      update: {},
      create: t,
    }))
  )

  // 2. Create Location Tags
  const tags = [
    { name: 'U srcu Baščaršije', slug: 'bascarsija', description: 'Najautentičniji dio grada, blizu Sebilja i zanatskih radnji.' },
    { name: 'Pogled na Trebević', slug: 'trebevic-view', description: 'Vrhunski komfor sa panoramskim pogledom na olimpijsku planinu.' },
    { name: 'Blizu poslovnog centra', slug: 'business-district', description: 'Idealno za poslovne putnike, u blizini Unitic nebodera i SCC-a.' },
    { name: 'Tiha oaza', slug: 'quiet-oasis', description: 'Smještaj u mirnim mahalama izvan gradske buke, a opet blizu centra.' },
  ]

  const createdTags = await Promise.all(
    tags.map(tag => prisma.locationTag.upsert({
      where: { slug: tag.slug },
      update: {},
      create: tag,
    }))
  )

  // 3. Create Amenities
  const amenities = [
    { name: 'WiFi', slug: 'wifi', icon: 'Wifi' },
    { name: 'Parking', slug: 'parking', icon: 'Car' },
    { name: 'Doručak', slug: 'breakfast', icon: 'Coffee' },
    { name: 'Kuhinja', slug: 'kitchen', icon: 'Utensils' },
    { name: 'Teretana', slug: 'gym', icon: 'Dumbbell' },
    { name: 'Spa', slug: 'spa', icon: 'Sparkles' },
  ]

  await Promise.all(
    amenities.map(a => prisma.amenity.upsert({
      where: { slug: a.slug },
      update: {},
      create: a,
    }))
  )

  // 4. Create Accommodations
  const accommodations = [
    {
      name: 'Hotel Europe',
      slug: 'hotel-europe',
      description: 'Simbol sarajevskog gostoprimstva. Smješten na samoj granici orijentalnog i evropskog Sarajeva.',
      summary: 'Legendarni hotel sa 5 zvjezdica u centru grada.',
      type: 'Hotel',
      typeSlug: 'hotel',
      rating: 4.8,
      reviewsCount: 1240,
      priceLevel: 4,
      basePrice: 250,
      imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800',
      bookingUrl: 'https://booking.com/affiliate/europe-sarajevo',
      isPremium: true,
      latitude: 43.8587,
      longitude: 18.4289,
      tags: ['bascarsija', 'business-district']
    },
    {
      name: 'Swissotel Sarajevo',
      slug: 'swissotel-sarajevo',
      description: 'Moderni luksuz u srcu poslovnog distrikta. Vrhunski spa centar i direktan pristup šoping centru.',
      summary: 'Savremeni dizajn i besprijekorna usluga.',
      type: 'Hotel',
      typeSlug: 'hotel',
      rating: 4.9,
      reviewsCount: 850,
      priceLevel: 4,
      basePrice: 320,
      imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
      bookingUrl: 'https://booking.com/affiliate/swissotel-sarajevo',
      isPremium: true,
      latitude: 43.8557,
      longitude: 18.4095,
      tags: ['business-district', 'trebevic-view']
    },
    {
      name: 'Apartman Baščaršija Pearl',
      slug: 'apartman-bascarsija-pearl',
      description: 'Doživite duh starog grada u ovom moderno opremljenom apartmanu u historijskoj zgradi.',
      summary: 'Šarmantan apartman na par koraka od Baščaršije.',
      type: 'Apartman',
      typeSlug: 'apartment',
      rating: 4.7,
      reviewsCount: 120,
      priceLevel: 2,
      basePrice: 95,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      bookingUrl: 'https://booking.com/affiliate/bascarsija-pearl',
      isPremium: false,
      latitude: 43.8595,
      longitude: 18.4312,
      tags: ['bascarsija']
    },
    {
      name: 'Pino Nature Hotel',
      slug: 'pino-nature-hotel',
      description: 'Smješten na planini Trebević, samo 15 minuta vožnje od centra. Savršen spoj prirode i arhitekture.',
      summary: 'Planinski odmor sa pet zvjezdica iznad Sarajeva.',
      type: 'Hotel',
      typeSlug: 'hotel',
      rating: 4.8,
      reviewsCount: 2100,
      priceLevel: 3,
      basePrice: 180,
      imageUrl: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&q=80&w=800',
      bookingUrl: 'https://booking.com/affiliate/pino-nature',
      isPremium: false,
      latitude: 43.8341,
      longitude: 18.4347,
      tags: ['trebevic-view', 'quiet-oasis']
    },
    {
      name: 'Hotel Courtyard by Marriott',
      slug: 'hotel-courtyard-marriott',
      description: 'Moderan hotel na obali Miljacke, preko puta Skenderije. Idealan za poslovne ljude i turiste.',
      summary: 'Internacionalni standard u srcu grada.',
      type: 'Hotel',
      typeSlug: 'hotel',
      rating: 4.7,
      reviewsCount: 1540,
      priceLevel: 3,
      basePrice: 220,
      imageUrl: 'https://images.unsplash.com/photo-1541971875076-8f970d573be6?auto=format&fit=crop&q=80&w=800',
      bookingUrl: 'https://booking.com/affiliate/marriott-sarajevo',
      isPremium: false,
      latitude: 43.8553,
      longitude: 18.4168,
      tags: ['business-district']
    },
    {
      name: 'Flat with a View - Alifakovac',
      slug: 'flat-view-alifakovac',
      description: 'Uživajte u najljepšem zalasku sunca u Sarajevu sa balkona ovog tradicionalnog stana na Alifakovcu.',
      summary: 'Autentični stan u najstarijoj mahali.',
      type: 'Apartman',
      typeSlug: 'apartment',
      rating: 4.9,
      reviewsCount: 45,
      priceLevel: 1,
      basePrice: 75,
      imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800',
      bookingUrl: 'https://booking.com/affiliate/alifakovac-view',
      isPremium: false,
      latitude: 43.8578,
      longitude: 18.4365,
      tags: ['bascarsija', 'trebevic-view', 'quiet-oasis']
    },
    {
      name: 'Unitic Business Suite',
      slug: 'unitic-business-suite',
      description: 'Luksuzni apartman smješten u blizini Unitic tornjeva. Savremena oprema i vrhunska sigurnost.',
      summary: 'Savršen za digitalne nomade i poslovne putnike.',
      type: 'Apartman',
      typeSlug: 'apartment',
      rating: 4.6,
      reviewsCount: 30,
      priceLevel: 2,
      basePrice: 130,
      imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      bookingUrl: 'https://booking.com/affiliate/unitic-suite',
      isPremium: false,
      latitude: 43.8568,
      longitude: 18.4062,
      tags: ['business-district']
    }
  ]

  for (const acc of accommodations) {
    const { tags: accTags, typeSlug, ...data } = acc
    await prisma.accommodation.upsert({
      where: { slug: acc.slug },
      update: {},
      create: {
        ...data,
        accommodationType: {
          connect: { slug: typeSlug }
        },
        locationTags: {
          connect: accTags.map(slug => ({ slug }))
        }
      }
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
