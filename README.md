# MyStay Sarajevo - Next.js 14

Complete Next.js 14 App Router project for Sarajevo accommodation bookings with SSR/SSG, SEO optimization, and Travelpayouts affiliate integration.

## 🚀 Features

- ✅ **Next.js 14 App Router** with SSR/SSG
- ✅ **SEO Optimized** - Unique metadata per page, JSON-LD structured data
- ✅ **Bosnian Language** - Full localization with `lang="bs"`
- ✅ **Prisma + SQLite** - Database ORM with seed data
- ✅ **Tailwind CSS** - Luxury-themed design system
- ✅ **Framer Motion** - Smooth animations
- ✅ **Travelpayouts Affiliate** - Rent a Car, eSIM integrations
- ✅ **TypeScript** - Strict type safety

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Run development server
npm run dev
```

## 🔧 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
DATABASE_URL="file:./dev.db"

# Travelpayouts Affiliate Links
LOCALRENT_AFFILIATE_URL="https://localrent.tp.st/cqRoqom7"
GETRENTACAR_AFFILIATE_URL="https://getrentacar.tp.st/GoKzHnYV"
YESIM_AFFILIATE_URL="https://yesim.tp.st/7PuGrZg2"
AIRALO_AFFILIATE_URL="https://airalo.tp.st/86iUNaUC"
DRIMSIM_AFFILIATE_URL="https://drimsim.tp.st/PUAc9sbZ"
SAILY_AFFILIATE_URL="https://saily.tp.st/LKvc7wrT"
```

## 📁 Project Structure

```
mystay-sarajevo-nextjs/
├── app/
│   ├── layout.tsx              # Root layout with Bosnian lang, Google Fonts
│   ├── page.tsx                # Homepage (SSG with Prisma)
│   ├── smjestaj/
│   │   └── [slug]/
│   │       └── page.tsx        # Dynamic hotel pages with generateStaticParams
│   └── api/
│       └── accommodations/
│           └── route.ts        # API route (replaces Express)
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── AccommodationGrid.tsx
│   ├── AccommodationDetail.tsx
│   ├── Destinations.tsx
│   ├── ESIMSection.tsx
│   ├── RentCarSection.tsx
│   ├── GuideSection.tsx
│   └── Footer.tsx
├── lib/
│   ├── prisma.ts              # Prisma client singleton
│   ├── translations.ts        # Bosnian translations
│   └── utils.ts               # Utility functions
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed data
└── styles/
    └── globals.css            # Tailwind + custom styles
```

## 🎨 Design System

### Colors
```css
--luxury-bg: #FAFAF8;        /* Cream background */
--luxury-ink: #1C1C1A;       /* Dark text */
--luxury-gold: #B8860B;      /* Accent gold */
--luxury-secondary: #6B6B69; /* Muted text */
```

### Typography
- **Playfair Display** - Serif headings
- **Inter** - Sans-serif body text

## 🔍 SEO Features

### Homepage
- JSON-LD Schema for `WebSite` with `SearchAction`
- Open Graph + Twitter cards
- `lang="bs"` attribute

### Accommodation Pages
- JSON-LD Schema for `LodgingBusiness`
- Unique `title`, `description`, `og:image` per hotel
- `generateStaticParams()` for all routes
- ISR with 1-hour revalidation

## 🌐 Deployment

### Vercel (Recommended)
```bash
npx vercel
```

### Build for Production
```bash
npm run build
npm start
```

## 📊 Database Schema

### Tables
- `Accommodation` - Hotels/apartments
- `AccommodationType` - Hotel, Apartman, Vila, Pansion
- `LocationTag` - Baščaršija, Trebević, Business District, Quiet Oasis
- `Amenity` - WiFi, Parking, Doručak, Kuhinja, Teretana, Spa
- `Review` - User reviews

## 🔗 Affiliate Links

All affiliate links are configurable via environment variables:

| Service | Provider | Default URL |
|---------|----------|-------------|
| Car Rental | LocalRent | `localrent.tp.st/cqRoqom7` |
| Airport Transfer | GetRentACar | `getrentacar.tp.st/GoKzHnYV` |
| eSIM | Yesim | `yesim.tp.st/7PuGrZg2` |
| eSIM | Airalo | `airalo.tp.st/86iUNaUC` |
| eSIM | DrimSim | `drimsim.tp.st/PUAc9sbZ` |
| eSIM | Saily | `saily.tp.st/LKvc7wrT` |

## 📝 License

Personal project for MyStay Sarajevo.

---

Built with ❤️ in Sarajevo using Next.js 14, Prisma, and Tailwind CSS.
