import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { AFFILIATE_BRANDS, buildBookingUrl, buildBookingSearchUrl } from '@/lib/affiliate'

// Known bot user-agents to filter out from click analytics
const BOT_USER_AGENTS = [
  'bot', 'spider', 'crawler', 'crawling', 'curl', 'wget', 'slurp',
  'mediapartners-google', 'googlebot', 'bingbot', 'yandex', 'duckduckbot',
  'baiduspider', 'facebookexternalhit', 'linkedinbot', 'twitterbot',
  'slackbot', 'telegrambot', 'applebot', 'semrushbot', 'ahrefsbot'
]

function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false
  const lower = userAgent.toLowerCase()
  return BOT_USER_AGENTS.some(bot => lower.includes(bot))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ partner: string }> }
) {
  const { partner } = await params
  const partnerKey = partner?.toLowerCase()
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '/'
  const acc = searchParams.get('acc') || null
  const referrer = request.headers.get('referer') || null
  const userAgent = request.headers.get('user-agent') || ''

  // 1. Resolve destination URL based on partner whitelist
  let targetUrl: string | null = null

  switch (partnerKey) {
    case 'booking':
      if (acc) {
        targetUrl = buildBookingUrl(acc)
      } else {
        targetUrl = AFFILIATE_BRANDS.BOOKING || 'https://booking.tp.st/Y8yX6r9p'
      }
      break

    case 'airalo':
      targetUrl = AFFILIATE_BRANDS.AIRALO
      break

    case 'yesim':
      targetUrl = AFFILIATE_BRANDS.YESIM
      break

    case 'kiwi':
    case 'flights':
      targetUrl = AFFILIATE_BRANDS.KIWI
      break

    case 'localrent':
    case 'rentcar':
      targetUrl = AFFILIATE_BRANDS.LOCALRENT
      break

    case 'bikesbooking':
      targetUrl = AFFILIATE_BRANDS.BIKESBOOKING
      break

    case 'gettransfer':
    case 'transfer':
      targetUrl = AFFILIATE_BRANDS.GETTRANSFER
      break

    case 'kiwitaxi':
      targetUrl = AFFILIATE_BRANDS.KIWITAXI
      break

    case 'wegotrip':
    case 'tours':
      targetUrl = AFFILIATE_BRANDS.WEGOTRIP
      break

    case 'tiqets':
      targetUrl = AFFILIATE_BRANDS.TIQETS
      break

    case 'compensair':
    case 'insurance':
      targetUrl = AFFILIATE_BRANDS.COMPENSAIR
      break

    default:
      targetUrl = null
  }

  // If partner is not recognized, redirect safely back to homepage
  if (!targetUrl) {
    return NextResponse.redirect(new URL('/', request.url), 302)
  }

  // 2. Track click asynchronously if not a known crawler (no IP logged for GDPR compliance)
  if (!isBot(userAgent)) {
    try {
      await prisma.affiliateClick.create({
        data: {
          partner: partnerKey,
          page: page.slice(0, 255),
          accommodationId: acc ? acc.slice(0, 100) : null,
          referrer: referrer ? referrer.slice(0, 500) : null,
        },
      })
    } catch (error) {
      // Non-blocking error logging - never disrupt user redirection
      console.error('[Affiliate Track Error]:', error)
    }
  }

  // 3. Perform 302 Found redirect to affiliate destination
  return NextResponse.redirect(targetUrl, 302)
}
