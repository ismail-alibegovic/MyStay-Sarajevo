import { prisma } from '@/lib/prisma'
import { translations } from '@/lib/translations'
import AccommodationGrid from '@/components/AccommodationGrid'
import Hero from '@/components/Hero'
import Destinations from '@/components/Destinations'
import ESIMSection from '@/components/ESIMSection'
import RentCarSection from '@/components/RentCarSection'
import GuideSection from '@/components/GuideSection'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

// Force dynamic rendering to avoid database connection at build time
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  // Fetch accommodations at build time (SSG)
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

  // JSON-LD Schema for Website
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
      
      <Navigation />
      
      <main className="min-h-screen">
        <Hero 
          headline={translations.hero.headline}
          subheadline={translations.hero.subheadline}
          ctaText={translations.hero.cta}
        />
        
        <section className="max-w-7xl mx-auto px-6 py-16">
          <AccommodationGrid accommodations={accommodations} />
        </section>
        
        <Destinations />
        
        <ESIMSection />
        
        <RentCarSection />
        
        <GuideSection />
      </main>
      
      <Footer />
    </>
  )
}

// Revalidate every hour for ISR
export const revalidate = 3600
