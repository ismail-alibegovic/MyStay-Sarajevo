import type { Metadata } from 'next'
import ZoPayForItselfDashboard from '@/components/ZoPayForItselfDashboard'

export const metadata: Metadata = {
  title: 'Zo Autopilot — "Make Zo Pay for Itself" Dashboard | MyStay Sarajevo',
  description: 'Javni dashboard za praćenje affiliate prihoda, klikova i ROI metrike za MyStay Sarajevo vođenog od strane Zo agenta.',
  robots: 'noindex, nofollow',
}

export const dynamic = 'force-dynamic'

export default function StatsPage() {
  return <ZoPayForItselfDashboard />
}
