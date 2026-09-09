/**
 * Options and properties for the hotel enquiry.
 *
 * We do not sell rooms from the site — the form collects what is needed to
 * check availability and hands it to WhatsApp, the same way the transfer form
 * does. Areas are described by distance from the Haram because that, not the
 * star rating, is what pilgrims actually choose on.
 *
 * The hotel list is curated rather than pulled from a booking API: it loads
 * instantly, costs nothing, and stays under your control. Star ratings are the
 * properties' published ratings and distances are approximate — check the list
 * against what you can actually book before relying on it.
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
  { id: "2", label: "2 star" },
  { id: "apartment", label: "Serviced apartment" },
] as const;

export type HotelStars = "5" | "4" | "3" | "2";

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

export type Hotel = {
  id: string;
  name: string;
  city: HotelCityId;
  stars: HotelStars;
  /** Approximate walk from the Haram, as a person would describe it. */
  distance: string;
  note: string;
};

export const hotels: Hotel[] = [
  // ---------- Makkah ----------
  { id: "mk-fairmont", name: "Fairmont Makkah Clock Royal Tower", city: "makkah", stars: "5", distance: "Facing the Haram", note: "Clock Tower complex, direct access to the courtyard." },
  { id: "mk-conrad", name: "Conrad Makkah", city: "makkah", stars: "5", distance: "~200 m", note: "Jabal Omar, short covered walk to King Abdulaziz Gate." },
  { id: "mk-swissotel", name: "Swissôtel Makkah", city: "makkah", stars: "5", distance: "Facing the Haram", note: "Clock Tower, family rooms and connecting suites." },
  { id: "mk-pullman", name: "Pullman ZamZam Makkah", city: "makkah", stars: "5", distance: "Facing the Haram", note: "Clock Tower, Haram-view rooms on request." },
  { id: "mk-jabalomar-marriott", name: "Jabal Omar Marriott", city: "makkah", stars: "5", distance: "~300 m", note: "Jabal Omar, quieter than the Clock Tower side." },
  { id: "mk-intercontinental", name: "InterContinental Dar Al Tawhid", city: "makkah", stars: "5", distance: "~150 m", note: "Direct walkway to the Haram." },
  { id: "mk-anjum", name: "Anjum Hotel Makkah", city: "makkah", stars: "4", distance: "~800 m", note: "Free shuttle, popular with larger groups." },
  { id: "mk-elaf-kinda", name: "Elaf Kinda Hotel", city: "makkah", stars: "4", distance: "~300 m", note: "Ibrahim Al Khalil Road, walkable." },
  { id: "mk-mhotel", name: "M Hotel Makkah by Millennium", city: "makkah", stars: "4", distance: "~600 m", note: "Ibrahim Al Khalil Road, shuttle at peak times." },
  { id: "mk-alkiswah", name: "Al Kiswah Towers", city: "makkah", stars: "3", distance: "~2 km", note: "Shuttle included, good value for longer stays." },
  { id: "mk-rawabi", name: "Rawabi Al Zahra Hotel", city: "makkah", stars: "3", distance: "~2.5 km", note: "Shuttle included, quiet district." },
  { id: "mk-almasa", name: "Al Masa Hotel", city: "makkah", stars: "2", distance: "~3 km", note: "Budget, shuttle included." },
  { id: "mk-daraleiman-ajyad", name: "Dar Al Eiman Ajyad", city: "makkah", stars: "2", distance: "~1.5 km", note: "Budget, walkable for able travellers." },

  // ---------- Madinah ----------
  { id: "md-oberoi", name: "The Oberoi Madina", city: "madinah", stars: "5", distance: "~150 m", note: "Facing the Haram's eastern courtyard." },
  { id: "md-movenpick", name: "Anwar Al Madinah Mövenpick", city: "madinah", stars: "5", distance: "~100 m", note: "Direct access to the piazza." },
  { id: "md-intercontinental", name: "InterContinental Dar Al Iman", city: "madinah", stars: "5", distance: "~200 m", note: "Central, short walk to the Prophet's Mosque." },
  { id: "md-pullman", name: "Pullman Zamzam Madina", city: "madinah", stars: "5", distance: "~250 m", note: "Family rooms and suites." },
  { id: "md-hilton", name: "Madinah Hilton", city: "madinah", stars: "5", distance: "~150 m", note: "Facing the western courtyard." },
  { id: "md-shaza", name: "Shaza Al Madina", city: "madinah", stars: "5", distance: "~300 m", note: "Quieter side, short walk." },
  { id: "md-frontel", name: "Frontel Al Harithia", city: "madinah", stars: "4", distance: "~500 m", note: "Walkable, good for mid-size groups." },
  { id: "md-millennium", name: "Millennium Al Aqeeq", city: "madinah", stars: "4", distance: "~1 km", note: "Shuttle included." },
  { id: "md-emaar-royal", name: "Emaar Royal Hotel Al Madinah", city: "madinah", stars: "4", distance: "~700 m", note: "Walkable, family rooms." },
  { id: "md-daraleiman-taibah", name: "Dar Al Eiman Taibah", city: "madinah", stars: "3", distance: "~600 m", note: "Straightforward, close to the Haram." },
  { id: "md-alhamra", name: "Al Hamra Palace", city: "madinah", stars: "3", distance: "~1.5 km", note: "Shuttle included, quiet." },
  { id: "md-rawdat-aqeeq", name: "Rawdat Al Aqeeq", city: "madinah", stars: "2", distance: "~2 km", note: "Budget, shuttle included." },
  { id: "md-alsaha", name: "Al Saha Hotel", city: "madinah", stars: "2", distance: "~1.8 km", note: "Budget, walkable for able travellers." },
];

export const starBands = [
  { stars: "5" as const, label: "5 star", blurb: "Haram-facing towers and the Jabal Omar complex. Rooms with a view of the courtyard, on request." },
  { stars: "4" as const, label: "4 star", blurb: "Walkable or a short shuttle. The usual choice for families who want space without the tower premium." },
  { stars: "3" as const, label: "3 star", blurb: "A little further out with a shuttle included. Good value on longer stays." },
  { stars: "2" as const, label: "2 star", blurb: "Budget rooms, clean and simple, shuttle included where the walk is long." },
];

export function hotelsFor(city: HotelCityId, stars?: HotelStars) {
  return hotels.filter((h) => h.city === city && (!stars || h.stars === stars));
}
