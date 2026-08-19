import { NextRequest } from "next/server";

const knownHotels = [
  { id: 1001, label: "Jabal Omar Marriott Hotel, Makkah, Saudi Arabia", lat: 21.42167, lon: 39.81917 },
  { id: 1002, label: "Hilton Makkah Convention Hotel, Makkah, Saudi Arabia", lat: 21.42103, lon: 39.81835 },
  { id: 1003, label: "Hilton Suites Makkah, Makkah, Saudi Arabia", lat: 21.42041, lon: 39.82147 },
  { id: 1004, label: "Makkah Clock Royal Tower, A Fairmont Hotel, Makkah, Saudi Arabia", lat: 21.41883, lon: 39.82538 },
  { id: 1005, label: "Swissôtel Makkah, Makkah, Saudi Arabia", lat: 21.41834, lon: 39.82622 },
  { id: 1006, label: "Pullman ZamZam Makkah, Makkah, Saudi Arabia", lat: 21.41875, lon: 39.82472 },
  { id: 1007, label: "Conrad Makkah, Makkah, Saudi Arabia", lat: 21.41994, lon: 39.82052 },
  { id: 1008, label: "Anjum Hotel Makkah, Makkah, Saudi Arabia", lat: 21.42315, lon: 39.81868 },
  { id: 1009, label: "InterContinental Dar Al Tawhid Makkah, Makkah, Saudi Arabia", lat: 21.42031, lon: 39.82179 },
  { id: 1010, label: "Shaza Makkah, Makkah, Saudi Arabia", lat: 21.42317, lon: 39.82442 },
  { id: 1101, label: "Anwar Al Madinah Mövenpick, Madinah, Saudi Arabia", lat: 24.47089, lon: 39.60832 },
  { id: 1102, label: "Pullman Zamzam Madina, Madinah, Saudi Arabia", lat: 24.46662, lon: 39.61179 },
  { id: 1103, label: "InterContinental Dar Al Iman Madinah, Madinah, Saudi Arabia", lat: 24.47068, lon: 39.61067 },
  { id: 1104, label: "Madinah Hilton, Madinah, Saudi Arabia", lat: 24.47111, lon: 39.61194 },
  { id: 1105, label: "The Oberoi Madina, Madinah, Saudi Arabia", lat: 24.47177, lon: 39.61281 },
  { id: 1106, label: "Shaza Al Madina, Madinah, Saudi Arabia", lat: 24.47251, lon: 39.60975 },
] as const;

function fallbackResults(query: string) {
  const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return knownHotels.filter((hotel) => terms.every((term) => hotel.label.toLocaleLowerCase().includes(term))).slice(0, 6);
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query || query.length < 3) return Response.json([]);

  const params = new URLSearchParams({
    q: `${query}, Saudi Arabia`,
    format: "jsonv2",
    addressdetails: "1",
    countrycodes: "sa",
    limit: "6",
  });

  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { "User-Agent": "TrustTrackTravels/1.0", "Accept-Language": "en" },
      signal: AbortSignal.timeout(4500),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Place search unavailable");
    const places = (await response.json()) as Array<{ place_id: number; display_name: string; lat: string; lon: string; type: string }>;
    const liveResults = places.map((place) => ({
      id: place.place_id,
      label: place.display_name,
      lat: Number(place.lat),
      lon: Number(place.lon),
      type: place.type,
    }));
    return Response.json(liveResults.length > 0 ? liveResults : fallbackResults(query));
  } catch {
    return Response.json(fallbackResults(query));
  }
}
