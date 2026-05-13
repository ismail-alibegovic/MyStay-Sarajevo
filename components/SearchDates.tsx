'use client'

import { useState } from 'react'
import { Calendar, Users, Search, ChevronDown } from 'lucide-react'
import { buildBookingUrl, buildBookingSearchUrl } from '@/lib/affiliate'

interface SearchDatesProps {
  hotelBookingId?: string
  onSearch?: (params: {
    checkin: string
    checkout: string
    adults: number
    children: number
  }) => void
  className?: string
}

export default function SearchDates({
  hotelBookingId,
  onSearch,
  className = '',
}: SearchDatesProps) {
  // Default dates: 7 days from now, 3 nights
  const getDefaultCheckin = () => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date.toISOString().split('T')[0]
  }

  const getDefaultCheckout = () => {
    const date = new Date()
    date.setDate(date.getDate() + 10)
    return date.toISOString().split('T')[0]
  }

  const [checkin, setCheckin] = useState(getDefaultCheckin())
  const [checkout, setCheckout] = useState(getDefaultCheckout())
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [showGuestDropdown, setShowGuestDropdown] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = { checkin, checkout, adults, children }

    if (onSearch) {
      onSearch(params)
    } else if (hotelBookingId) {
      // Redirect to Booking.com with affiliate link and params
      const url = buildBookingUrl(hotelBookingId, params)
      window.open(url, '_blank')
    } else {
      // Search all Sarajevo hotels with params
      const url = buildBookingSearchUrl('Sarajevo', params)
      window.open(url, '_blank')
    }
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('bs-BA', {
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-white rounded-2xl shadow-lg p-4 ${className}`}
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Check-in Date */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Dolazak
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex-1">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Odlazak
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              min={checkin}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>
        </div>

        {/* Guests Selector */}
        <div className="flex-1 relative">
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Gosti
          </label>
          <button
            type="button"
            onClick={() => setShowGuestDropdown(!showGuestDropdown)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-400" />
              <span>
                {adults} {adults === 1 ? 'odrasli' : 'odraslih'}
                {children > 0 && `, ${children} ${children === 1 ? 'dijete' : 'djece'}`}
              </span>
            </div>
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </button>

          {/* Guest Dropdown */}
          {showGuestDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-4">
              {/* Adults */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Odrasli</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.min(8, adults + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Djeca</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(Math.min(4, children + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowGuestDropdown(false)}
                className="w-full mt-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Potvrdi
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full lg:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            <span>Pretraži smještaj</span>
          </button>
        </div>
      </div>

      {/* Date Summary */}
      <div className="mt-3 text-xs text-gray-500">
        {formatDate(checkin)} - {formatDate(checkout)} •{' '}
        {Math.ceil(
          (new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24)
        )}{' '}
        noćenja
      </div>
    </form>
  )
}
