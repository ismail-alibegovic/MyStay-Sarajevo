import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import '../styles/globals.css'
import CookieConsent from '@/components/CookieConsent'

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mystaysarajevo.ba'),
  title: {
    default: 'MyStay Sarajevo - Rezervacije apartmana i hotela',
    template: 'MyStay Sarajevo | %s',
  },
  description: 'Pronađite najbolji smještaj u Sarajevu - apartmani, hoteli i vile. Lokalno kurirana selekcija sa najboljim cijenama na Booking.com i Airbnb.',
  keywords: ['Sarajevo smještaj', 'apartmani Sarajevo', 'hotel Sarajevo', 'rezervacije Sarajevo', 'Baščaršija'],
  openGraph: {
    type: 'website',
    locale: 'bs_BA',
    url: 'https://mystaysarajevo.ba',
    siteName: 'MyStay Sarajevo',
    title: 'MyStay Sarajevo - Rezervacije apartmana i hotela',
    description: 'Pronađite najbolji smještaj u Sarajevu - apartmani, hoteli i vile.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MyStay Sarajevo - Smještaj u srcu grada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyStay Sarajevo - Rezervacije apartmana i hotela',
    description: 'Pronađite najbolji smještaj u Sarajevu - apartmani, hoteli i vile.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bs" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-luxury-bg text-luxury-ink selection:bg-luxury-gold selection:text-white">
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
