'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Cookie, X } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  })

  const applyConsent = useCallback((prefs: typeof preferences) => {
    // Apply consent logic here
    // For example, enable/disable Google Analytics
    if (prefs.analytics) {
      // Enable Google Analytics
      console.log('Analytics cookies enabled')
    }
    
    if (prefs.marketing) {
      // Enable marketing cookies
      console.log('Marketing cookies enabled')
    }
  }, [])

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      applyConsent(savedPreferences)
    }
  }, [applyConsent])

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setPreferences(allAccepted)
    applyConsent(allAccepted)
    setShowBanner(false)
  }

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    applyConsent(preferences)
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    localStorage.setItem('cookie-consent', JSON.stringify(onlyNecessary))
    setPreferences(onlyNecessary)
    applyConsent(onlyNecessary)
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl">
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Icon and Text */}
          <div className="flex items-start gap-4 flex-1">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Cookie className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Kolačići na ovoj stranici
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Koristimo kolačiće za poboljšanje vašeg iskustva, analizu prometa i personalizaciju oglasa. 
                Klikom na &ldquo;Prihvati sve&rdquo;, pristajete na našu upotrebu kolačića.{' '}
                <Link href="/politika-privatnosti" className="text-blue-600 hover:underline">
                  Pročitajte politiku privatnosti
                </Link>
              </p>

              {/* Cookie Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <label className="flex items-center gap-3 cursor-not-allowed opacity-60">
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 rounded border-gray-300"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Nužni</span>
                    <p className="text-xs text-gray-600">Uvijek aktivni</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e: any) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Analitički</span>
                    <p className="text-xs text-gray-600">Google Analytics</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e: any) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium text-gray-900">Marketinški</span>
                    <p className="text-xs text-gray-600">Affiliate programi</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:items-center">
            <button
              onClick={handleRejectAll}
              className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Odbij sve
            </button>
            <button
              onClick={handleAcceptSelected}
              className="px-6 py-3 border border-blue-600 rounded-xl font-medium text-blue-600 hover:bg-blue-50 transition-colors"
            >
              Prihvati odabrane
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Prihvati sve
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
