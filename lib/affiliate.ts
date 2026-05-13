/**
 * Travelpayouts Affiliate Link Builder
 * Centralized logic for all affiliate programs used in MyStay Sarajevo
 */

// Travelpayouts AID (Affiliate ID) - Default if not provided in env
const TRAVELPAYOUTS_AID = process.env.TRAVELPAYOUTS_AID || '516629';
const TRAVELPAYOUTS_LABEL = 'mystay-sarajevo';

/**
 * Common brands and their base Travelpayouts redirect URLs
 */
export const AFFILIATE_BRANDS = {
  LOCALRENT: 'https://localrent.tp.st/cqRoqom7',
  GETTRANSFER: 'https://gettransfer.tp.st/GoKzHnYV',
  YESIM: 'https://yesim.tp.st/7PuGrZg2',
  AIRALO: 'https://airalo.tp.st/86iUNaUC',
  KLOOK: 'https://klook.tp.st/n4zW9mN8',
  TIQETS: 'https://tiqets.tp.st/6rE7k5Qv',
  KIWI: 'https://kiwi.tp.st/8Xo9zM3m',
  BOOKING: 'https://booking.tp.st/Y8yX6r9p', // General Booking.com deep link
};

/**
 * Build a Booking.com hotel deep link
 */
export function buildBookingUrl(hotelBookingId: string): string {
  // If we have a specific hotel ID, we can build a direct link
  // Otherwise return the general search for Sarajevo
  if (!hotelBookingId) return buildBookingSearchUrl('Sarajevo');
  
  return `https://www.booking.com/hotel/ba/${hotelBookingId}.bs.html?aid=${TRAVELPAYOUTS_AID}&label=${TRAVELPAYOUTS_LABEL}`;
}

/**
 * Build general Booking.com search URL
 */
export function buildBookingSearchUrl(destination: string = 'Sarajevo'): string {
  return `https://www.booking.com/searchresults.bs.html?ss=${encodeURIComponent(destination)}&aid=${TRAVELPAYOUTS_AID}&label=${TRAVELPAYOUTS_LABEL}`;
}

/**
 * Build GetTransfer URL (often needs destination for better conversion)
 */
export function buildTransferUrl(destination: string = 'Sarajevo'): string {
  return `${AFFILIATE_BRANDS.GETTRANSFER}?endpoint=${encodeURIComponent(destination)}`;
}

/**
 * Build Localrent URL (specialized for Balkan car rentals)
 */
export function buildLocalrentUrl(): string {
  return AFFILIATE_BRANDS.LOCALRENT;
}

/**
 * Build Activity/Tour URLs (Klook or Tiqets)
 */
export function buildActivitiesUrl(brand: 'KLOOK' | 'TIQETS' = 'KLOOK'): string {
  const baseUrl = brand === 'KLOOK' ? AFFILIATE_BRANDS.KLOOK : AFFILIATE_BRANDS.TIQETS;
  return `${baseUrl}?q=${encodeURIComponent('Sarajevo')}`;
}

/**
 * Build eSIM URLs
 */
export function buildEsimUrl(brand: 'YESIM' | 'AIRALO' = 'YESIM'): string {
  return brand === 'YESIM' ? AFFILIATE_BRANDS.YESIM : AFFILIATE_BRANDS.AIRALO;
}

/**
 * Build Flight URLs (Kiwi.com)
 */
export function buildFlightsUrl(destination: string = 'SJJ'): string {
  return `${AFFILIATE_BRANDS.KIWI}?to=${destination}`;
}
