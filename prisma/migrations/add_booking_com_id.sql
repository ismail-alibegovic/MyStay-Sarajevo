-- Migration: Add bookingComId field to Accommodation
-- Generated for MyStay Sarajevo

-- Add bookingComId column
ALTER TABLE `Accommodation` ADD COLUMN `bookingComId` TEXT;

-- Create index for faster lookups by bookingComId
CREATE INDEX `Accommodation_bookingComId_idx` ON `Accommodation`(`bookingComId`);

-- Update existing records with Booking.com hotel IDs
-- Example updates (adjust based on actual data):
UPDATE `Accommodation` SET `bookingComId` = 'hotel-europe' WHERE `name` = 'Hotel Europe';
UPDATE `Accommodation` SET `bookingComId` = 'swissotel-sarajevo' WHERE `name` = 'Swissotel Sarajevo';
UPDATE `Accommodation` SET `bookingComId` = 'bascarsija-pearl' WHERE `name` LIKE '%Baščaršija Pearl%';
UPDATE `Accommodation` SET `bookingComId` = 'pino-nature-hotel' WHERE `name` LIKE '%Pino Nature%';
UPDATE `Accommodation` SET `bookingComId` = 'courtyard-sarajevo' WHERE `name` LIKE '%Courtyard%';
UPDATE `Accommodation` SET `bookingComId` = 'alifakovac-view' WHERE `name` LIKE '%Alifakovac%';
UPDATE `Accommodation` SET `bookingComId` = 'unitic-suite' WHERE `name` LIKE '%Unitic%';

-- Note: bookingComId is the Booking.com hotel identifier used in their URLs
-- Example: https://www.booking.com/hotel/ba/hotel-europe.bs.html
-- In this case, bookingComId = 'hotel-europe'

-- To generate affiliate URL, use buildBookingUrl() function from lib/affiliate.ts
-- Example: buildBookingUrl('hotel-europe', { checkin: '2025-06-01', checkout: '2025-06-04', adults: 2 })
-- Result: https://www.booking.com/hotel/ba/hotel-europe.bs.html?aid=YOUR_AID&label=mystay-sarajevo&checkin=2025-06-01&checkout=2025-06-04&group_adults=2&no_rooms=1
