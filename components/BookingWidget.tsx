'use client'

import { useEffect } from 'react'

interface BookingWidgetProps {
  type?: 'hotels' | 'cars' | 'flights'
  className?: string
}

export default function BookingWidget({
  type = 'hotels',
  className = '',
}: BookingWidgetProps) {
  useEffect(() => {
    // Load Travelpayouts widget script dynamically
    const script = document.createElement('script')
    script.src = '//tpwgts.com/content?trs=526765&shmarker=726312&locale=en&country=141&city=82501&powered_by=true&campaign_id=87&promo_id=2466'
    script.async = true
    script.charset = 'utf-8'

    const container = document.getElementById('travelpayouts-widget')
    if (container) {
      container.appendChild(script)
    }

    return () => {
      // Cleanup script on unmount
      if (container && script.parentNode) {
        container.removeChild(script)
      }
    }
  }, [])

  if (type === 'hotels') {
    return (
      <div className={className}>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Uporedi cijene i rezerviši
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Pronađi najbolje cijene za smještaj u Sarajevu
          </p>
        </div>
        <div
          id="travelpayouts-widget"
          className="w-full min-h-[200px] bg-gray-50 rounded-xl"
        >
          {/* Travelpayouts widget will be injected here */}
        </div>
      </div>
    )
  }

  if (type === 'cars') {
    return (
      <div className={className}>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Rent a Car
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Pronađi najbolje ponude za iznajmljivanje automobila
          </p>
        </div>
        <div
          id="travelpayouts-widget"
          className="w-full min-h-[200px] bg-gray-50 rounded-xl"
        >
          {/* Travelpayouts car widget will be injected here */}
        </div>
      </div>
    )
  }

  return null
}
