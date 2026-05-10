# MyStay Sarajevo - Travelpayouts/Booking.com Affiliate Integration

## ✅ Kompletna integracija je gotova!

---

## 📁 Fajlovi:

### 1. Affiliate Link Builder (`lib/affiliate.ts`)
**Funkcionalnosti:**
- ✅ `buildBookingUrl()` - gradi Booking.com affiliate deep link
- ✅ `buildBookingSearchUrl()` - gradi Booking.com search URL
- ✅ `generateBookingDates()` - generira datume za booking
- ✅ `formatDate()` - formatira datum za prikaz
- ✅ `calculateNights()` - računa broj noćenja

**Primjer upotrebe:**
```typescript
import { buildBookingUrl, generateBookingDates } from '@/lib/affiliate'

const dates = generateBookingDates(7, 3) // 7 dana od sad, 3 noćenja
const url = buildBookingUrl('hotel-europe', {
  checkin: dates.checkin,
  checkout: dates.checkout,
  adults: 2,
  children: 0,
})
// Rezultat: https://www.booking.com/hotel/ba/hotel-europe.bs.html?aid=YOUR_AID&label=mystay-sarajevo&checkin=2025-06-01&checkout=2025-06-04&group_adults=2&no_rooms=1
```

---

### 2. Date Picker Component (`components/SearchDates.tsx`)
**Funkcionalnosti:**
- ✅ Check-in / Check-out date inputs
- ✅ Guest count selector (adults 1-8, children 0-4)
- ✅ "Pretraži smještaj" submit button
- ✅ Mobile-friendly design
- ✅ Integracija sa affiliate link builderom

**Primjer upotrebe:**
```tsx
import SearchDates from '@/components/SearchDates'

// Na homepage - search svi Sarajevo hoteli
<SearchDates />

// Na hotel detail page - direktno booking tog hotela
<SearchDates hotelBookingId="hotel-europe" />

// Sa callback funkcijom
<SearchDates onSearch={(params) => {
  console.log('Search params:', params)
  // Ovdje filtriraj lokalne rezultate
}} />
```

---

### 3. Travelpayouts Widget (`components/BookingWidget.tsx`)
**Funkcionalnosti:**
- ✅ Embed Travelpayouts hotel search widget
- ✅ Bosnian label: "Uporedi cijene i rezerviši"
- ✅ Support za hotels i cars widget

**Primjer upotrebe:**
```tsx
import BookingWidget from '@/components/BookingWidget'

// Hotels widget
<BookingWidget type="hotels" />

// Cars widget
<BookingWidget type="cars" />
```

---

### 4. Prisma Schema Update
**Novo polje:**
- ✅ `bookingComId String?` - Booking.com hotel ID
- ✅ Index na `bookingComId` za brže pretraživanje
- ✅ Komentar o `affiliateUrl` computed field

**Migracija SQL:**
- ✅ `/prisma/migrations/add_booking_com_id.sql`
- ✅ ALTER TABLE za dodavanje kolone
- ✅ CREATE INDEX za optimizaciju
- ✅ UPDATE statementi za postojeće hotele

**Pokreni migraciju:**
```bash
cd /home/workspace/MyStaySarajevo-nextjs
npx prisma migrate dev --name add_booking_com_id
```

---

### 5. Privacy Policy Page (`app/politika-privatnosti/page.tsx`)
**Sadržaj:**
- ✅ Kompletna politika privatnosti na bosanskom jeziku
- ✅ Affiliate disclosure sekcija (FTC compliant)
- ✅ GDPR prava korisnika
- ✅ Cookie policy tabela
- ✅ Kontakt informacije

**URL:** `https://mystaysarajevo.ba/politika-privatnosti`

---

### 6. Cookie Consent Component (`components/CookieConsent.tsx`)
**Funkcionalnosti:**
- ✅ GDPR-compliant cookie banner
- ✅ 3 kategorije kolačića: Nužni, Analitički, Marketinški
- ✅ "Prihvati sve", "Prihvati odabrane", "Odbij sve"
- ✅ Link na politiku privatnosti
- ✅ LocalStorage za čuvanje preferenci

**Integracija:**
- ✅ Dodano u `app/layout.tsx` za prikaz na svim stranicama

---

## 🎯 Kako koristiti:

### 1. Environment Varijable
Dodaj u `.env`:
```env
TRAVELPAYOUTS_AID=your_travelpayouts_aid_here
```

### 2. Dodaj Booking.com ID u bazu
```typescript
// Prisma seed ili direktno u bazu
await prisma.accommodation.update({
  where: { slug: 'hotel-europe' },
  data: { bookingComId: 'hotel-europe' }
})
```

### 3. Koristi na stranicama

#### Homepage (`app/page.tsx`):
```tsx
import SearchDates from '@/components/SearchDates'
import BookingWidget from '@/components/BookingWidget'

export default function HomePage() {
  return (
    <main>
      {/* Hero section */}
      <Hero />
      
      {/* Date picker za pretragu */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <SearchDates />
      </section>
      
      {/* Travelpayouts widget */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <BookingWidget type="hotels" />
      </section>
      
      {/* Ostali sadržaj */}
    </main>
  )
}
```

#### Hotel Detail (`app/smjestaj/[slug]/page.tsx`):
```tsx
import SearchDates from '@/components/SearchDates'
import { buildBookingUrl } from '@/lib/affiliate'

export default function HotelDetailPage({ params }) {
  const accommodation = await getAccommodation(params.slug)
  
  return (
    <main>
      {/* Hero sa slikom */}
      <Hero accommodation={accommodation} />
      
      {/* Booking sekcija */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2>Rezerviši svoj boravak</h2>
        <SearchDates 
          hotelBookingId={accommodation.bookingComId}
        />
        
        {/* Direktni affiliate link */}
        <a 
          href={buildBookingUrl(accommodation.bookingComId)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          Rezerviši na Booking.com
        </a>
      </section>
    </main>
  )
}
```

---

## 📊 Affiliate URL Format:

### Base URL:
```
https://www.booking.com/hotel/ba/{bookingComId}.bs.html
```

### Sa parametrima:
```
https://www.booking.com/hotel/ba/hotel-europe.bs.html
  ?aid={TRAVELPAYOUTS_AID}
  &label=mystay-sarajevo
  &checkin=2025-06-01
  &checkout=2025-06-04
  &group_adults=2
  &group_children=0
  &no_rooms=1
```

---

## ✨ Benefiti:

| Benefit | Opis |
|---------|------|
| **Provizija** | Zarada na svakoj rezervaciji preko affiliate linka |
| **GDPR Compliant** | Usklađeno sa evropskim propisima o privatnosti |
| **FTC Compliant** | Transparentno otkrivanje partnerskih odnosa |
| **SEO Friendly** | Deep links sa relevantnim parametrima |
| **User Friendly** | Jednostavan date picker i pretraga |
| **Mobile Optimized** | Responsive dizajn za sve uređaje |

---

## 🚀 Sljedeći koraci:

1. **Testiraj integraciju:**
   ```bash
   npm run dev
   ```

2. **Dodaj prave Travelpayouts AID:**
   - Pronađi svoj AID u Travelpayouts dashboardu
   - Dodaj u `.env` kao `TRAVELPAYOUTS_AID`

3. **Popuni bazu sa Booking.com ID-jevima:**
   - Pokreni migraciju
   - Update svaki hotel sa odgovarajućim ID-jem

4. **Deploy na production:**
   - Provjeri sve affiliate linkove
   - Testiraj cookie consent
   - Provjeri privacy policy

---

**Status:** 🎉 **Kompletna Travelpayouts/Booking.com affiliate integracija je gotova i spremna za korištenje!**

Svi zahtjevi Travelpayouts-a su zadovoljeni:
✅ Affiliate link builder
✅ Date picker sa guest selectorom
✅ Travelpayouts widget
✅ Privacy policy sa affiliate disclosure
✅ GDPR-compliant cookie consent
✅ Booking.com ID u bazi podataka
