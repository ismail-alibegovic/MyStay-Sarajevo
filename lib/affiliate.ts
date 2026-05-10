/**
 * Travelpayouts Affiliate Link Builder
 * Builds proper Booking.com affiliate deep links
 */

interface BookingParams {
  checkin?: string; // YYYY-MM-DD
  checkout?: string; // YYYY-MM-DD
  adults?: number; // 1-8
  children?: number; // 0-4
  rooms?: number; // Default 1
}

// Travelpayouts AID (Affiliate ID)
const TRAVELPAYOUTS_AID = process.env.TRAVELPAYOUTS_AID || 'YOUR_AID_HERE';
const TRAVELPAYOUTS_LABEL = 'mystay-sarajevo';

/**
 * Build Booking.com affiliate URL
 * @param hotelBookingId - Booking.com hotel ID (e.g., "hotel-europe")
 * @param params - Optional booking parameters
 * @returns Full affiliate URL
 */
export function buildBookingUrl(
  hotelBookingId: string,
  params?: BookingParams
): string {
  // Base URL
  const baseUrl = `https://www.booking.com/hotel/ba/${hotelBookingId}.bs.html`;
  
  // Required affiliate parameters
  const affiliateParams = new URLSearchParams({
    aid: TRAVELPAYOUTS_AID,
    label: TRAVELPAYOUTS_LABEL,
  });

  // Add optional parameters if provided
  if (params?.checkin) {
    affiliateParams.append('checkin', params.checkin);
  }

  if (params?.checkout) {
    affiliateParams.append('checkout', params.checkout);
  }

  if (params?.adults && params.adults >= 1 && params.adults <= 8) {
    affiliateParams.append('group_adults', params.adults.toString());
  }

  if (params?.children && params.children >= 0 && params.children <= 4) {
    affiliateParams.append('group_children', params.children.toString());
  }

  if (params?.rooms) {
    affiliateParams.append('no_rooms', params.rooms.toString());
  } else {
    affiliateParams.append('no_rooms', '1');
  }

  return `${baseUrl}?${affiliateParams.toString()}`;
}

/**
 * Build general Booking.com search URL
 * @param destination - Search destination (e.g., "Sarajevo")
 * @param params - Optional search parameters
 * @returns Full search URL
 */
export function buildBookingSearchUrl(
  destination: string,
  params?: BookingParams
): string {
  const baseUrl = 'https://www.booking.com/searchresults.bs.html';
  
  const searchParams = new URLSearchParams({
    aid: TRAVELPAYOUTS_AID,
    label: TRAVELPAYOUTS_LABEL,
    ss: destination,
  });

  if (params?.checkin) {
    searchParams.append('checkin', params.checkin);
  }

  if (params?.checkout) {
    searchParams.append('checkout', params.checkout);
  }

  if (params?.adults) {
    searchParams.append('group_adults', params.adults.toString());
  }

  if (params?.children) {
    searchParams.append('group_children', params.children.toString());
  }

  searchParams.append('no_rooms', params?.rooms?.toString() || '1');

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Generate date strings for booking
 * @param daysFromNow - Number of days from today
 * @param nights - Number of nights
 * @returns Object with checkin and checkout dates
 */
export function generateBookingDates(
  daysFromNow: number = 7,
  nights: number = 3
): { checkin: string; checkout: string } {
  const checkin = new Date();
  checkin.setDate(checkin.getDate() + daysFromNow);

  const checkout = new Date(checkin);
  checkout.setDate(checkout.getDate() + nights);

  return {
    checkin: checkin.toISOString().split('T')[0],
    checkout: checkout.toISOString().split('T')[0],
  };
}

/**
 * Format date for display
 * @param dateStr - Date string (YYYY-MM-DD)
 * @returns Formatted date string
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('bs-BA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculate number of nights between dates
 * @param checkin - Check-in date string
 * @param checkout - Check-out date string
 * @returns Number of nights
 */
export function calculateNights(checkin: string, checkout: string): number {
  const start = new Date(checkin);
  const end = new Date(checkout);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
