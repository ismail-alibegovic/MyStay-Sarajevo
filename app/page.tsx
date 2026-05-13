import { prisma } from '@/lib/prisma'
import { translations } from '@/lib/translations'
import AccommodationGrid from '@/components/AccommodationGrid'
import Hero from '@/components/Hero'
import Destinations from '@/components/Destinations'
import ESIMSection from '@/components/ESIMSection'
import RentCarSection from '@/components/RentCarSection'
import ActivitiesSection from '@/components/ActivitiesSection'
import FlightsSection from '@/components/FlightsSection'
import InsuranceSection from '@/components/InsuranceSection'
import GuideSection from '@/components/GuideSection'
import SearchDates from '@/components/SearchDates'

// Force dynamic rendering to avoid database connection at build time
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const accommodations = await prisma.accommodation.findMany({
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MyStay Sarajevo',
    description: translations.hero.subheadline,
    url: 'https://mystaysarajevo.ba',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://mystaysarajevo.ba/smjestaj?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen">
        {/* 1. Hero */}
        <Hero
          headline={translations.hero.headline}
          subheadline={translations.hero.subheadline}
          ctaText={translations.hero.cta}
        />

        {/* 2. Quick date/guest search widget */}
        <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
          <SearchDates />
        </div>

        {/* 3. Accommodation listings */}
        <section id="accommodation" className="max-w-7xl mx-auto px-6 py-20">
          <AccommodationGrid accommodations={accommodations} />
        </section>

        {/* 4. Destinations */}
        <Destinations />

        {/* 5. Tours & Activities — WeGoTrip featured */}
        <ActivitiesSection />

        {/* 6. Transfers & Car Rental */}
        <RentCarSection />

        {/* 7. Flights — Kiwi.com */}
        <FlightsSection />

        {/* 8. eSIM — Yesim & Airalo */}
        <ESIMSection />

        {/* 9. Travel Insurance — Compensair */}
        <InsuranceSection />

        {/* 10. City Guide */}
        <GuideSection />
      </main>
    </>
  )
}

// Revalidate every hour for ISR
export const revalidate = 3600
