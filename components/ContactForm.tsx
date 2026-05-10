'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-luxury-ink/70 mb-2">
            Ime i prezime *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-luxury-border bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all"
            placeholder="Vaše ime"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-luxury-ink/70 mb-2">
            Email adresa *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-luxury-border bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all"
            placeholder="vas@email.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-luxury-ink/70 mb-2">
          Predmet
        </label>
        <input
          type="text"
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-luxury-border bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all"
          placeholder="O čemu želite razgovarati?"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-luxury-ink/70 mb-2">
          Poruka *
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-luxury-border bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all resize-none"
          placeholder="Vaša poruka..."
        />
      </div>

      {status === 'success' && (
        <div className="flex items-center gap-3 p-4 bg-green-50 text-green-700 rounded-xl">
          <CheckCircle size={20} />
          <span className="text-sm font-medium">Poruka je uspješno poslana! Odgovorit ćemo vam u najkraćem roku.</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 bg-red-50 text-red-700 rounded-xl">
          <span className="text-sm font-medium">Došlo je do greške. Molimo pokušajte ponovo.</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full md:w-auto flex items-center justify-center gap-2 bg-luxury-ink text-white px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Šalje se...</span>
          </>
        ) : (
          <>
            <Send size={18} />
            <span>Pošalji poruku</span>
          </>
        )}
      </button>
    </form>
  )
}
