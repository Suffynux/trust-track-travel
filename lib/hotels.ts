/**
 * Options for the hotel enquiry form.
 *
 * We do not sell rooms from the site — the form collects enough to check
 * availability and hands it to WhatsApp, the same way the transfer form does.
 * Areas are described by distance from the Haram because that, not the star
 * rating, is what pilgrims actually choose on.
 */

export const hotelCities = [
  { id: "makkah", label: "Makkah", haram: "Masjid al-Haram" },
  { id: "madinah", label: "Madinah", haram: "Masjid an-Nabawi" },
] as const;

export type HotelCityId = (typeof hotelCities)[number]["id"];

export const hotelAreas = [
  { id: "", label: "Any distance" },
  { id: "walking", label: "Walking distance to the Haram" },
  { id: "under-1km", label: "Within 1 km" },
  { id: "under-3km", label: "Within 3 km" },
  { id: "shuttle", label: "Further out, with a shuttle" },
] as const;

export const hotelCategories = [
  { id: "", label: "Any category" },
  { id: "5", label: "5 star" },
  { id: "4", label: "4 star" },
  { id: "3", label: "3 star" },
  { id: "apartment", label: "Serviced apartment" },
] as const;

/**
 * Budget is per room per night in SAR. Kept as a band rather than a figure
 * because rates swing hard with the season, and a single number would read as
 * a quote we cannot hold.
 */
export const hotelBudgets = [
  { id: "", label: "Any budget" },
  { id: "under-400", label: "Under SAR 400 a night" },
  { id: "400-800", label: "SAR 400 to 800 a night" },
  { id: "800-1500", label: "SAR 800 to 1,500 a night" },
  { id: "over-1500", label: "Over SAR 1,500 a night" },
] as const;
