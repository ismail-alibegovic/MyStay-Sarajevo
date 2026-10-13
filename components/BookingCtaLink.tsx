'use client'

import React from 'react'

interface BookingCtaLinkProps {
  href: string
  accommodationName: string
  accommodationId: string
  className?: string
  children: React.ReactNode
}

export default function BookingCtaLink({
  href,
  accommodationName,
  accommodationId,
  className = "block w-full bg-luxury-gold text-white px-8 py-5 rounded-2xl text-center font-bold uppercase tracking-[0.15em] hover:bg-luxury-gold/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]",
  children,
}: BookingCtaLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-affiliate="booking"
      onClickCapture={() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'affiliate_click', {
            event_category: 'Booking',
            event_label: accommodationName,
            accommodation_id: accommodationId,
          })
        }
      }}
      className={className}
    >
      {children}
    </a>
  )
}
