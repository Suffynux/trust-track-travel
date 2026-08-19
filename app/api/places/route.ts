import { NextRequest } from "next/server";

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
      headers: { "User-Agent": "TrustTrackTravels/1.0 (hotel booking search)" },
      next: { revalidate: 86400 },
    });
    if (!response.ok) throw new Error("Place search unavailable");
    const places = (await response.json()) as Array<{ place_id: number; display_name: string; lat: string; lon: string; type: string }>;
    return Response.json(places.map((place) => ({
      id: place.place_id,
      label: place.display_name,
      lat: Number(place.lat),
      lon: Number(place.lon),
      type: place.type,
    })));
  } catch {
    return Response.json([], { status: 503 });
  }
}
