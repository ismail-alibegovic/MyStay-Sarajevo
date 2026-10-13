import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Default conversion & commission rates per partner (transparent assumptions)
// Conversion rate = share of clicks that turn into a booking/sale (e.g. 0.03 = 3%)
// Avg commission = estimated average payout per confirmed sale in EUR
export const PARTNER_ASSUMPTIONS: Record<string, { name: string; convRate: number; avgCommission: number }> = {
  booking:      { name: 'Booking.com',      convRate: 0.035, avgCommission: 9.50 },
  airalo:       { name: 'Airalo eSIM',      convRate: 0.080, avgCommission: 2.20 },
  yesim:        { name: 'Yesim eSIM',       convRate: 0.075, avgCommission: 3.10 },
  localrent:    { name: 'Localrent (Rent)', convRate: 0.025, avgCommission: 18.00 },
  gettransfer:  { name: 'GetTransfer',      convRate: 0.030, avgCommission: 12.00 },
  kiwitaxi:     { name: 'KiwiTaxi',         convRate: 0.030, avgCommission: 14.00 },
  kiwi:         { name: 'Kiwi.com Flights', convRate: 0.020, avgCommission: 7.00 },
  wegotrip:     { name: 'WeGoTrip Tours',   convRate: 0.040, avgCommission: 5.50 },
  tiqets:       { name: 'Tiqets',           convRate: 0.050, avgCommission: 3.80 },
  compensair:   { name: 'Compensair',       convRate: 0.015, avgCommission: 25.00 },
  bikesbooking: { name: 'BikesBooking',     convRate: 0.020, avgCommission: 8.00 },
}

// Zo cost: Default $19.99/mo (~€18.50/mo) or custom from env
export const ZO_MONTHLY_COST_EUR = Number(process.env.ZO_MONTHLY_COST_EUR) || 18.50

export async function GET(request: NextRequest) {
  try {
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Run queries concurrently
    const [
      clicksToday,
      clicks7Days,
      clicks30Days,
      clicksAll,
      payoutsAll,
      topPages,
    ] = await Promise.all([
      prisma.affiliateClick.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.affiliateClick.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.affiliateClick.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      prisma.affiliateClick.groupBy({
        by: ['partner'],
        _count: { id: true },
        where: { createdAt: { gte: thirtyDaysAgo } },
      }),
      prisma.payout.findMany({
        orderBy: { date: 'desc' },
      }),
      prisma.affiliateClick.groupBy({
        by: ['page'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 10,
      }),
    ])

    // Break down clicks & calculate estimated earnings per partner
    let totalEstimatedEarnings = 0

    const partnerStats = Object.keys(PARTNER_ASSUMPTIONS).map(partnerKey => {
      const assumption = PARTNER_ASSUMPTIONS[partnerKey]
      const clickGroup = clicksAll.find(c => c.partner === partnerKey)
      const clickCount = clickGroup?._count.id || 0

      // Formula: Clicks * ConvRate * AvgCommission
      const estimated = clickCount * assumption.convRate * assumption.avgCommission
      totalEstimatedEarnings += estimated

      return {
        key: partnerKey,
        name: assumption.name,
        clicks: clickCount,
        convRate: assumption.convRate,
        avgCommission: assumption.avgCommission,
        estimatedEarnings: Math.round(estimated * 100) / 100,
      }
    }).sort((a, b) => b.clicks - a.clicks)

    // Calculate confirmed payout total
    const totalConfirmedEarnings = payoutsAll.reduce((sum, p) => sum + p.amount, 0)

    // Net ROI vs Zo cost
    // Effective revenue = confirmed if > 0, else estimated
    const effectiveEarnings = totalConfirmedEarnings > 0 ? totalConfirmedEarnings : totalEstimatedEarnings
    const netProfit = effectiveEarnings - ZO_MONTHLY_COST_EUR
    const isPaidOff = netProfit >= 0

    // Estimated days to pay off Zo at current 30-day velocity
    const dailyEarningRate = effectiveEarnings > 0 ? effectiveEarnings / 30 : 0
    const daysToPayOff = dailyEarningRate > 0
      ? Math.max(1, Math.ceil(ZO_MONTHLY_COST_EUR / dailyEarningRate))
      : null

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          todayClicks: clicksToday,
          sevenDaysClicks: clicks7Days,
          thirtyDaysClicks: clicks30Days,
          totalEstimatedEarnings: Math.round(totalEstimatedEarnings * 100) / 100,
          totalConfirmedEarnings: Math.round(totalConfirmedEarnings * 100) / 100,
          zoMonthlyCost: ZO_MONTHLY_COST_EUR,
          netProfit: Math.round(netProfit * 100) / 100,
          isPaidOff,
          daysToPayOff,
        },
        partners: partnerStats,
        topPages: topPages.map(p => ({ page: p.page, clicks: p._count.id })),
        payouts: payoutsAll,
      },
    })
  } catch (error: any) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Greška pri učitavanju statistike' },
      { status: 500 }
    )
  }
}
