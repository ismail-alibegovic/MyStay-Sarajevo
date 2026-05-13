/**
 * Travelpayouts Affiliate Link Builder
 * Centralized logic for all affiliate programs used in MyStay Sarajevo
 *
 * Travelpayouts tracking: trs=528231 | shmarker=726312
 */

// Travelpayouts tracking identifiers
const TRS = process.env.TRAVELPAYOUTS_TRS || '528231';
const SHMARKER = process.env.TRAVELPAYOUTS_SHMARKER || '726312';
const TRAVELPAYOUTS_AID = process.env.TRAVELPAYOUTS_AID || '516629';
const TRAVELPAYOUTS_LABEL = 'mystay-sarajevo';

/**
 * All affiliate brand URLs — updated for 2026
 */
export const AFFILIATE_BRANDS = {
  // Car Rental
  LOCALRENT:    process.env.NEXT_PUBLIC_LOCALRENT_URL    || 'https://bikesbooking.tp.st/IAs8hfdB',
  BIKESBOOKING: process.env.NEXT_PUBLIC_BIKESBOOKING_URL || 'https://bikesbooking.tp.st/D3QJjvEY',

  // Transfers
  GETTRANSFER:  process.env.NEXT_PUBLIC_GETTRANSFER_URL  || 'https://tp.st/BuTMFqzJ',
  KIWITAXI:     process.env.NEXT_PUBLIC_KIWITAXI_URL     || 'https://kiwitravel.tp.st/IOEtwIu6',

  // eSIM
  YESIM:        process.env.NEXT_PUBLIC_YESIM_URL        || 'https://ektatraveling.tp.st/dV2C7SoI',
  AIRALO:       process.env.NEXT_PUBLIC_AIRALO_URL       || 'https://airalo.tp.st/86iUNaUC',

  // Flights
  KIWI:         process.env.NEXT_PUBLIC_KIWI_URL         || 'https://kiwi.tp.st/7zhn46qg',

  // Tours & Activities
  WEGOTRIP:     process.env.NEXT_PUBLIC_WEGOTRIP_URL     || 'https://wegotrip.tp.st/Co7z7fka',
  TIQETS:       process.env.NEXT_PUBLIC_TIQETS_URL       || 'https://tiqets.tp.st/6rE7k5Qv',

  // Insurance
  COMPENSAIR:   process.env.NEXT_PUBLIC_COMPENSAIR_URL   || 'https://compensair.tp.st/n1ZY1eZt',

  // Hotels / Booking
  BOOKING:      process.env.NEXT_PUBLIC_BOOKING_URL      || 'https://booking.tp.st/Y8yX6r9p',
};

/**
 * Kiwi.com Hotels widget script URL (USD) — embeds search widget
 */
export const KIWI_HOTELS_WIDGET_USD = `https://tpwgts.com/content?currency=usd&trs=${TRS}&shmarker=${SHMARKER}&locale=en&stops=any&show_hotels=true&powered_by=true&border_radius=0&plain=false&color_button=%23B7C059ff&color_button_text=%23ffffff&promo_id=3414&campaign_id=111`;

/**
 * Kiwi.com Hotels widget script URL (EUR)
 */
export const KIWI_HOTELS_WIDGET_EUR = `https://tpwgts.com/content?currency=eur&trs=${TRS}&shmarker=${SHMARKER}&powered_by=true&locale=en&campaign_id=111&promo_id=4484`;

// ─── Booking.com ──────────────────────────────────────────────────────────────

interface BookingParams {
  checkin?: string;
  checkout?: string;
  adults?: number;
  children?: number;
}

/**
 * Build a Booking.com hotel deep link with optional date/guest params.
 */
export function buildBookingUrl(hotelBookingId: string, params?: BookingParams): string {
  if (!hotelBookingId) return buildBookingSearchUrl('Sarajevo', params);

  const url = new URL(`https://www.booking.com/hotel/ba/${hotelBookingId}.bs.html`);
  url.searchParams.set('aid', TRAVELPAYOUTS_AID);
  url.searchParams.set('label', TRAVELPAYOUTS_LABEL);
  if (params?.checkin)  url.searchParams.set('checkin', params.checkin);
  if (params?.checkout) url.searchParams.set('checkout', params.checkout);
  if (params?.adults)   url.searchParams.set('group_adults', params.adults.toString());
  if (params?.children) url.searchParams.set('group_children', params.children.toString());
  return url.toString();
}

/**
 * Build a general Booking.com search URL for a destination.
 */
export function buildBookingSearchUrl(destination = 'Sarajevo', params?: BookingParams): string {
  const url = new URL('https://www.booking.com/searchresults.bs.html');
  url.searchParams.set('ss', destination);
  url.searchParams.set('aid', TRAVELPAYOUTS_AID);
  url.searchParams.set('label', TRAVELPAYOUTS_LABEL);
  if (params?.checkin)  url.searchParams.set('checkin', params.checkin);
  if (params?.checkout) url.searchParams.set('checkout', params.checkout);
  if (params?.adults)   url.searchParams.set('group_adults', params.adults.toString());
  if (params?.children) url.searchParams.set('group_children', params.children.toString());
  return url.toString();
}

// ─── Simple link builders ─────────────────────────────────────────────────────

export const buildLocalrentUrl    = (): string => AFFILIATE_BRANDS.LOCALRENT;
export const buildBikesbookingUrl = (): string => AFFILIATE_BRANDS.BIKESBOOKING;
export const buildTransferUrl     = (): string => AFFILIATE_BRANDS.GETTRANSFER;
export const buildKiwitaxiUrl     = (): string => AFFILIATE_BRANDS.KIWITAXI;
export const buildEsimUrl = (brand: 'YESIM' | 'AIRALO' = 'YESIM'): string =>
  brand === 'YESIM' ? AFFILIATE_BRANDS.YESIM : AFFILIATE_BRANDS.AIRALO;
export const buildFlightsUrl      = (): string => AFFILIATE_BRANDS.KIWI;
export const buildToursUrl        = (): string => AFFILIATE_BRANDS.WEGOTRIP;
export const buildTiqetsUrl       = (): string => AFFILIATE_BRANDS.TIQETS;
export const buildInsuranceUrl    = (): string => AFFILIATE_BRANDS.COMPENSAIR;
