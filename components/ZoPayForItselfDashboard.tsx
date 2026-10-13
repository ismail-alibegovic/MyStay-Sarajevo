'use client'

import { useState, useEffect } from 'react'
import {
  TrendingUp,
  DollarSign,
  MousePointerClick,
  Calendar,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Zap,
  ArrowUpRight
} from 'lucide-react'

interface StatsData {
  summary: {
    todayClicks: number
    sevenDaysClicks: number
    thirtyDaysClicks: number
    totalEstimatedEarnings: number
    totalConfirmedEarnings: number
    zoMonthlyCost: number
    netProfit: number
    isPaidOff: boolean
    daysToPayOff: number | null
  }
  partners: Array<{
    key: string
    name: string
    clicks: number
    convRate: number
    avgCommission: number
    estimatedEarnings: number
  }>
  topPages: Array<{
    page: string
    clicks: number
  }>
  payouts: Array<{
    id: string
    partner: string
    amount: number
    date: string
    notes?: string
  }>
}

export default function ZoPayForItselfDashboard() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFormulaInfo, setShowFormulaInfo] = useState(false)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/stats')
      const json = await res.json()
      if (json.success) {
        setData(json.data)
      } else {
        setError(json.error)
      }
    } catch (err: any) {
      setError(err.message || 'Greška pri preuzimanju podataka')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-bg flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold tracking-wider text-luxury-secondary uppercase">
            Učitavanje Zo Autopilot analitike...
          </p>
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-luxury-bg flex items-center justify-center p-6">
        <div className="max-w-md bg-white p-8 rounded-3xl border border-red-100 text-center space-y-4 shadow-sm">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold font-serif text-luxury-ink">Učitavanje nije uspjelo</h2>
          <p className="text-sm text-luxury-secondary">{error || 'Nepoznata greška'}</p>
          <button
            onClick={fetchStats}
            className="px-6 py-2.5 bg-luxury-ink text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-luxury-gold transition-colors"
          >
            Pokušaj ponovo
          </button>
        </div>
      </div>
    )
  }

  const { summary, partners, topPages, payouts } = data
  const maxClicks = Math.max(...partners.map(p => p.clicks), 1)

  return (
    <div className="min-h-screen bg-luxury-bg text-luxury-ink pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 space-y-10">

        {/* HERO BANNER: "ZO SE ISPLATIO" */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-luxury-ink text-white p-8 md:p-14 border border-white/10 shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-luxury-gold/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-luxury-gold text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} /> Zo "Make Zo Pay for Itself" Challenge
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-medium leading-tight">
                {summary.isPaidOff ? (
                  <span className="text-emerald-400">Zo se isplatio.</span>
                ) : (
                  <span>Zo vodi MyStay Sarajevo na autopilotu.</span>
                )}
              </h1>
              <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
                Zo agent prati ponude, ažurira sezonski sadržaj i generiše konverzije. Ispod je transparentan obračun prihoda naspram mjesečnog troška Zoa.
              </p>
            </div>

            {/* BIG ROI COUNTER CARD */}
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 md:p-8 min-w-[280px] space-y-4 text-center lg:text-right">
              <span className="text-[11px] font-bold uppercase tracking-widest text-luxury-gold block">
                Neto status (Prihod − Zo trošak)
              </span>
              <div className="text-4xl md:text-5xl font-serif font-bold text-white flex items-center justify-center lg:justify-end gap-1">
                {summary.netProfit >= 0 ? '+' : ''}€{summary.netProfit.toFixed(2)}
              </div>
              <div className="text-xs text-white/60">
                Trošak Zoa: <strong className="text-white">€{summary.zoMonthlyCost.toFixed(2)}/mj</strong>
                {summary.daysToPayOff && (
                  <span className="block text-emerald-400 mt-1 font-medium">
                    ⚡ Isplata u roku od ~{summary.daysToPayOff} dana
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 4 KEY METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Total Clicks */}
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-luxury-secondary">
              <span className="text-xs font-bold uppercase tracking-wider">Klikovi (30 dana)</span>
              <div className="w-9 h-9 rounded-xl bg-luxury-ink/5 flex items-center justify-center text-luxury-ink">
                <MousePointerClick size={18} />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold">{summary.thirtyDaysClicks}</div>
            <div className="flex items-center gap-3 text-xs text-luxury-secondary">
              <span>Danas: <strong className="text-luxury-ink">{summary.todayClicks}</strong></span>
              <span>•</span>
              <span>7 dana: <strong className="text-luxury-ink">{summary.sevenDaysClicks}</strong></span>
            </div>
          </div>

          {/* Card 2: Estimated Earnings */}
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-luxury-secondary">
              <span className="text-xs font-bold uppercase tracking-wider">Procijenjeni prihod</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <TrendingUp size={18} />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-luxury-gold">
              €{summary.totalEstimatedEarnings.toFixed(2)}
            </div>
            <div className="text-[11px] text-luxury-secondary flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
              <span>Oznaka: <strong>Procjena</strong> (formulska)</span>
            </div>
          </div>

          {/* Card 3: Confirmed Payouts */}
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-luxury-secondary">
              <span className="text-xs font-bold uppercase tracking-wider">Potvrđeni prihod</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck size={18} />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-emerald-600">
              €{summary.totalConfirmedEarnings.toFixed(2)}
            </div>
            <div className="text-[11px] text-luxury-secondary flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Oznaka: <strong>Potvrđeno</strong> (Travelpayouts)</span>
            </div>
          </div>

          {/* Card 4: Zo Subscription */}
          <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-luxury-secondary">
              <span className="text-xs font-bold uppercase tracking-wider">Mjesečni trošak Zoa</span>
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Zap size={18} />
              </div>
            </div>
            <div className="text-3xl font-serif font-bold text-luxury-ink">
              €{summary.zoMonthlyCost.toFixed(2)}
            </div>
            <div className="text-[11px] text-luxury-secondary">
              Plan: <strong>Zo Basic ($19.99/mj)</strong>
            </div>
          </div>
        </div>

        {/* TRANSPARENCY NOTICE (HONESTY REQUIREMENT) */}
        <div className="bg-amber-50/60 border border-amber-200/60 rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-amber-900">
              <strong>Transparentnost izazova:</strong> Svaki prihod označen sa <span className="bg-amber-200/70 px-1.5 py-0.5 rounded font-bold">PROCJENA</span> računa se strogo po formuli: <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono">klikovi × pretpostavljena konverzija × prosječna provizija</code>. 
              Prihodi označeni sa <span className="bg-emerald-200/70 px-1.5 py-0.5 rounded font-bold text-emerald-900">POTVRĐENO</span> predstavljaju realizovane isplate iz Travelpayouts panela.
            </div>
          </div>
          <button
            onClick={() => setShowFormulaInfo(!showFormulaInfo)}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline flex-shrink-0"
          >
            {showFormulaInfo ? 'Sakrij formulu' : 'Vidi pretpostavke po partneru →'}
          </button>
        </div>

        {/* DETAILED PARTNERS BREAKDOWN */}
        <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-luxury-ink">Klikovi i procjena po partnerima</h2>
              <p className="text-xs text-luxury-secondary mt-1">
                Realni podaci zabilježeni kroz vlastitu <code className="bg-black/5 px-1 py-0.5 rounded font-mono">/go/[partner]</code> rutu
              </p>
            </div>
            <div className="text-xs text-luxury-secondary font-medium">
              Ukupno partnera u sistemu: <strong className="text-luxury-ink">{partners.length}</strong>
            </div>
          </div>

          <div className="space-y-4">
            {partners.map((partner) => {
              const widthPct = Math.max(4, Math.round((partner.clicks / maxClicks) * 100))
              return (
                <div key={partner.key} className="p-4 rounded-2xl bg-luxury-bg/40 border border-black/5 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-luxury-ink">{partner.name}</span>
                      <span className="text-[10px] text-luxury-secondary font-mono">({partner.key})</span>
                    </div>
                    <div className="flex items-center gap-4 text-xs">
                      <span>Klikovi: <strong className="font-mono text-luxury-ink">{partner.clicks}</strong></span>
                      <span className="text-luxury-secondary">•</span>
                      <span>
                        Procjena: <strong className="font-mono text-luxury-gold">€{partner.estimatedEarnings.toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-black/5 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-luxury-gold h-full rounded-full transition-all duration-500"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  {showFormulaInfo && (
                    <div className="text-[10px] text-luxury-secondary font-mono pt-1 flex gap-4">
                      <span>Konverzija: {(partner.convRate * 100).toFixed(1)}%</span>
                      <span>Prosj. provizija: €{partner.avgCommission.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* TWO-COLUMN SECTION: TOP PAGES & CONFIRMED PAYOUTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* TOP 10 PAGES */}
          <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-bold">Najpopularnije stranice po klikovima</h3>
            {topPages.length === 0 ? (
              <p className="text-sm text-luxury-secondary italic">
                Još nema zabilježenih klikova. Klikovi na sajtu kroz <code className="font-mono">/go/</code> automatski se pojavljuju ovdje.
              </p>
            ) : (
              <div className="space-y-3">
                {topPages.map((p, idx) => (
                  <div key={p.page} className="flex items-center justify-between p-3 rounded-xl bg-luxury-bg/50 border border-black/5 text-xs">
                    <span className="font-mono text-luxury-ink truncate max-w-[280px]">
                      {idx + 1}. {p.page}
                    </span>
                    <span className="font-bold font-mono bg-white px-2.5 py-1 rounded-md border border-black/5">
                      {p.clicks} klikova
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CONFIRMED PAYOUTS (TRAVELPAYOUTS STATEMENTS) */}
          <div className="bg-white rounded-3xl border border-black/5 p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-serif font-bold">Potvrđene isplate (Travelpayouts)</h3>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                Službeni podaci
              </span>
            </div>

            {payouts.length === 0 ? (
              <div className="p-6 rounded-2xl bg-luxury-bg/40 border border-black/5 text-center space-y-2">
                <p className="text-sm font-medium text-luxury-ink">Trenutno nema unesenih realizovanih isplata.</p>
                <p className="text-xs text-luxury-secondary leading-relaxed">
                  Provizije iz Travelpayouts obračunavaju se po realizaciji boravka. Prihodi se unose direktno u tabelu <code className="font-mono">Payout</code> čim partner potvrdi rezervaciju.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {payouts.map((po) => (
                  <div key={po.id} className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs">
                    <div>
                      <p className="font-bold text-luxury-ink capitalize">{po.partner}</p>
                      <p className="text-[10px] text-luxury-secondary">
                        {new Date(po.date).toLocaleDateString('bs-BA')} {po.notes ? `• ${po.notes}` : ''}
                      </p>
                    </div>
                    <span className="font-bold font-mono text-emerald-700 text-sm">
                      +€{po.amount.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
