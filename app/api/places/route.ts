import { NextRequest } from "next/server";

/**
 * Hotel lookup for the booking forms.
 *
 * This is a curated list rather than a live geocoder. It used to call
 * Nominatim (OpenStreetMap) on every keystroke, which their usage policy
 * forbids on two counts: autocomplete is explicitly disallowed, and
 * commercial services are asked to run their own instance. The practical
 * risk was a silent IP ban once real traffic arrived.
 *
 * The trade-off is fine here. Guests are overwhelmingly staying at one of
 * the central properties below, the field still accepts free text for
 * anything not listed, and the booking path no longer depends on a third
 * party being up. If broader coverage is ever needed, a paid geocoder
 * (Google Places, Mapbox) is the route — not the public Nominatim endpoint.
 *
 * Coordinates are approximate hotel centroids, used only to attach a map
 * pin to the WhatsApp message. They do not need survey precision.
 */
const hotels = [
  // Makkah — Clock Tower / Abraj Al-Bait complex
  { id: 1004, label: "Makkah Clock Royal Tower, A Fairmont Hotel, Makkah, Saudi Arabia", lat: 21.41883, lon: 39.82538 },
  { id: 1005, label: "Swissôtel Makkah, Makkah, Saudi Arabia", lat: 21.41834, lon: 39.82622 },
  { id: 1006, label: "Pullman ZamZam Makkah, Makkah, Saudi Arabia", lat: 21.41875, lon: 39.82472 },
  { id: 1011, label: "Swissôtel Al Maqam Makkah, Makkah, Saudi Arabia", lat: 21.41796, lon: 39.82601 },
  { id: 1012, label: "Raffles Makkah Palace, Makkah, Saudi Arabia", lat: 21.41852, lon: 39.82559 },
  { id: 1013, label: "Mövenpick Hotel & Residence Hajar Tower Makkah, Makkah, Saudi Arabia", lat: 21.41905, lon: 39.82489 },

  // Makkah — Jabal Omar
  { id: 1001, label: "Jabal Omar Marriott Hotel, Makkah, Saudi Arabia", lat: 21.42167, lon: 39.81917 },
  { id: 1002, label: "Hilton Makkah Convention Hotel, Makkah, Saudi Arabia", lat: 21.42103, lon: 39.81835 },
  { id: 1003, label: "Hilton Suites Makkah, Makkah, Saudi Arabia", lat: 21.42041, lon: 39.82147 },
  { id: 1007, label: "Conrad Makkah, Makkah, Saudi Arabia", lat: 21.41994, lon: 39.82052 },
  { id: 1014, label: "DoubleTree by Hilton Jabal Omar Makkah, Makkah, Saudi Arabia", lat: 21.42088, lon: 39.81953 },
  { id: 1015, label: "Address Jabal Omar Makkah, Makkah, Saudi Arabia", lat: 21.42134, lon: 39.81886 },
  { id: 1016, label: "Jabal Omar Hyatt Regency Makkah, Makkah, Saudi Arabia", lat: 21.42056, lon: 39.81879 },

  // Makkah — other central properties
  { id: 1008, label: "Anjum Hotel Makkah, Makkah, Saudi Arabia", lat: 21.42315, lon: 39.81868 },
  { id: 1009, label: "InterContinental Dar Al Tawhid Makkah, Makkah, Saudi Arabia", lat: 21.42031, lon: 39.82179 },
  { id: 1010, label: "Shaza Makkah, Makkah, Saudi Arabia", lat: 21.42317, lon: 39.82442 },
  { id: 1017, label: "Makkah Towers, Makkah, Saudi Arabia", lat: 21.42264, lon: 39.82301 },
  { id: 1018, label: "Elaf Kinda Hotel, Makkah, Saudi Arabia", lat: 21.42198, lon: 39.82266 },
  { id: 1019, label: "Al Marwa Rayhaan by Rotana, Makkah, Saudi Arabia", lat: 21.42352, lon: 39.82537 },
  { id: 1020, label: "Al Safwah Royale Orchid Hotel, Makkah, Saudi Arabia", lat: 21.41924, lon: 39.82614 },

  // Madinah — central, facing or near Al-Masjid an-Nabawi
  { id: 1101, label: "Anwar Al Madinah Mövenpick, Madinah, Saudi Arabia", lat: 24.47089, lon: 39.60832 },
  { id: 1102, label: "Pullman Zamzam Madina, Madinah, Saudi Arabia", lat: 24.46662, lon: 39.61179 },
  { id: 1103, label: "InterContinental Dar Al Iman Madinah, Madinah, Saudi Arabia", lat: 24.47068, lon: 39.61067 },
  { id: 1104, label: "Madinah Hilton, Madinah, Saudi Arabia", lat: 24.47111, lon: 39.61194 },
  { id: 1105, label: "The Oberoi Madina, Madinah, Saudi Arabia", lat: 24.47177, lon: 39.61281 },
  { id: 1106, label: "Shaza Al Madina, Madinah, Saudi Arabia", lat: 24.47251, lon: 39.60975 },
  { id: 1107, label: "Dar Al Taqwa Hotel, Madinah, Saudi Arabia", lat: 24.47143, lon: 39.61115 },
  { id: 1108, label: "Dallah Taibah Hotel, Madinah, Saudi Arabia", lat: 24.47205, lon: 39.61042 },
  { id: 1109, label: "Frontel Al Harithia Hotel, Madinah, Saudi Arabia", lat: 24.46951, lon: 39.61283 },
  { id: 1110, label: "Millennium Al Aqeeq Hotel, Madinah, Saudi Arabia", lat: 24.46884, lon: 39.60719 },
  { id: 1111, label: "Crowne Plaza Madinah, Madinah, Saudi Arabia", lat: 24.46797, lon: 39.61048 },
  { id: 1112, label: "Al Eiman Royal Hotel, Madinah, Saudi Arabia", lat: 24.47298, lon: 39.61146 },
  { id: 1113, label: "Elaf Taiba Hotel, Madinah, Saudi Arabia", lat: 24.47167, lon: 39.60918 },
  { id: 1114, label: "Le Méridien Medina, Madinah, Saudi Arabia", lat: 24.46612, lon: 39.60544 },
] as const;

/**
 * Strip accents and lowercase, so someone typing "movenpick" or "swissotel"
 * on a plain keyboard still finds "Mövenpick" and "Swissôtel". Without this
 * those properties are simply unreachable for most guests.
 */
function normalise(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLocaleLowerCase();
}

/**
 * Every query term must appear somewhere in the label, so "hilton makkah"
 * narrows rather than widening. Case-, accent- and order-insensitive.
 */
function search(query: string) {
  const terms = normalise(query).split(/\s+/).filter(Boolean);
  return hotels
    .filter((hotel) => {
      const label = normalise(hotel.label);
      return terms.every((term) => label.includes(term));
    })
    .slice(0, 6);
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query || query.length < 3) return Response.json([]);

  // Purely in-memory, so this can be cached hard at the edge.
  return Response.json(search(query), {
    headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
  });
}
