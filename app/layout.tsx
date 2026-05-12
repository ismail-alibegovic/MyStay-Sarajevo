import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import Script from 'next/script'
import '../styles/globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'MyStay Sarajevo | Najbolji Smještaj u Sarajevu',
  description: 'Pronađite najbolji smještaj u Sarajevu - apartmani, hoteli i vile. Lokalno kurirana selekcija sa najboljim cijenama na Booking.com i Airbnb.',
  keywords: 'Sarajevo, smještaj, apartmani, hoteli, vile, Bosna i Hercegovina, turizam',
  openGraph: {
    title: 'MyStay Sarajevo | Najbolji Smještaj u Sarajevu',
    description: 'Pronađite najbolji smještaj u Sarajevu - apartmani, hoteli i vile.',
    type: 'website',
    locale: 'bs_BA',
    url: 'https://mystaysarajevo.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyStay Sarajevo | Najbolji Smještaj u Sarajevu',
    description: 'Pronađite najbolji smještaj u Sarajevu - apartmani, hoteli i vile.',
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
      <body className="min-h-screen bg-luxury-bg text-luxury-ink selection:bg-luxury-gold selection:text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <Script
          id="travelpayouts-drive"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){var script=document.createElement("script");script.async=1;script.src="https://emrldtp.com/NTI4MjMx.js?t=528231";document.head.appendChild(script);})();`,
          }}
        />
      </body>
    </html>
  )
}
