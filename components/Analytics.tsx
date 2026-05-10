'use client'

import Script from 'next/script'
import { useEffect } from 'react'

// Google Analytics 4 ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'

// Custom event tracking utilities
export const trackAffiliateClick = (hotel: {
  name: string
  type: string
  priceLevel: number
  destination?: string
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      hotel_name: hotel.name,
      hotel_type: hotel.type,
      price_level: hotel.priceLevel,
      destination: hotel.destination || 'Sarajevo',
    })
  }
}

export const trackSearchPerformed = (data: {
  query: string
  filtersActive: string[]
  resultsCount: number
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'search_performed', {
      query: data.query,
      filters_active: data.filtersActive.join(','),
      results_count: data.resultsCount,
    })
  }
}

export const trackHotelViewed = (data: {
  hotelName: string
  locationTag?: string
}) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'hotel_viewed', {
      hotel_name: data.hotelName,
      location_tag: data.locationTag || 'unknown',
    })
  }
}

export default function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'SameSite=None;Secure',
            });
          `,
        }}
      />
    </>
  )
}
