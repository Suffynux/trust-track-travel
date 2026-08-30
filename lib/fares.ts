/**
 * Every fare on this site, in SAR, per vehicle.
 * Figures come from the Standard Package Guide (Phase 01).
 */

export const tiers = [
  {
    id: "sedan",
    index: "01",
    name: "Signature Sedan",
    capacity: "Up to 3 guests · 3 bags",
    anchor: "Toyota Camry Grande or equivalent executive sedan",
    suits: "Solo travellers and couples wanting quiet, unhurried comfort.",
  },
  {
    id: "suv",
    index: "02",
    name: "Premium SUV",
    capacity: "Up to 5 guests · 5 bags",
    anchor: "GMC Yukon XL, Suburban, or Land Cruiser",
    suits: "Small families and travellers with heavier luggage.",
  },
  {
    id: "van",
    index: "03",
    name: "Executive Van",
    capacity: "Up to 7 guests · 7 bags",
    anchor: "Hyundai Staria VIP or Mercedes V-Class",
    suits: "Families and small groups travelling as one party.",
  },
  {
    id: "coach",
    index: "04",
    name: "Group Coach",
    capacity: "Up to 14 guests · group luggage",
    anchor: "Toyota Coaster or equivalent minibus",
    suits: "Extended family Hajj and Umrah parties, and tour groups.",
  },
] as const;

export type TierId = (typeof tiers)[number]["id"];

export const prestige = {
  name: "Prestige",
  capacity: "Up to 3 guests · 3 bags",
  anchor: "Mercedes S-Class or BMW 7 Series",
  suits:
    "VIP guests, anniversary Umrah, and dignitary movements where exclusivity is the point.",
  note: "Quoted individually rather than listed at a fixed rate.",
} as const;

type FareRow = Record<TierId, number>;

/** The five bookable legs of one pilgrim journey, in travel order. */
export const legs = [
  {
    id: "arrival",
    code: "JED",
    name: "Jeddah airport to your Makkah hotel",
    short: "Jeddah airport → Makkah",
    detail: "~85 km · 60–90 min",
    kind: "transfer",
    fares: { sedan: 550, suv: 700, van: 850, coach: 1100 } as FareRow,
  },
  {
    id: "ziyarat-makkah",
    code: "ZYR",
    name: "Makkah Ziyarat, 3-hour route",
    short: "Makkah Ziyarat, 3 hours",
    detail: "6 stops · driver waits",
    kind: "ziyarat",
    fares: { sedan: 420, suv: 560, van: 700, coach: 950 } as FareRow,
  },
  {
    id: "intercity",
    code: "INT",
    name: "Makkah to Madinah",
    short: "Makkah → Madinah",
    detail: "~450 km · 4.5–5.5 hr · Miqat stop",
    kind: "transfer",
    fares: { sedan: 1150, suv: 1450, van: 1750, coach: 2300 } as FareRow,
  },
  {
    id: "ziyarat-madinah",
    code: "ZYR",
    name: "Madinah Ziyarat, 3-hour route",
    short: "Madinah Ziyarat, 3 hours",
    detail: "5 stops · driver waits",
    kind: "ziyarat",
    fares: { sedan: 380, suv: 500, van: 640, coach: 880 } as FareRow,
  },
  {
    id: "departure",
    code: "MED",
    name: "Madinah hotel to Madinah airport",
    short: "Madinah → airport",
    detail: "~18 km · 20–30 min",
    kind: "transfer",
    fares: { sedan: 260, suv: 360, van: 460, coach: 620 } as FareRow,
  },
] as const;

export type LegId = (typeof legs)[number]["id"];

/**
 * Bundle discounts apply automatically when the qualifying legs are booked
 * together on one tier. Most specific match wins.
 */
export const bundles = [
  {
    id: "complete",
    name: "Complete Pilgrimage Transfer",
    rate: 0.15,
    requires: [
      "arrival",
      "ziyarat-makkah",
      "intercity",
      "ziyarat-madinah",
      "departure",
    ] as LegId[],
    blurb:
      "The full itinerary in one booking: airport arrival, Makkah Ziyarat, intercity, Madinah Ziyarat, and airport departure.",
  },
  {
    id: "twin-ziyarat",
    name: "Twin Ziyarat",
    rate: 0.08,
    requires: ["ziyarat-makkah", "ziyarat-madinah"] as LegId[],
    blurb: "Makkah Ziyarat and Madinah Ziyarat, booked as one reservation.",
  },
] as const;

export function activeBundle(selected: LegId[]) {
  return bundles.find((b) => b.requires.every((r) => selected.includes(r)));
}

export function quote(selected: LegId[], tier: TierId) {
  const lines = legs
    .filter((l) => selected.includes(l.id))
    .map((l) => ({ ...l, fare: l.fares[tier] }));
  const subtotal = lines.reduce((sum, l) => sum + l.fare, 0);
  const bundle = activeBundle(selected);
  const discount = bundle ? Math.round(subtotal * bundle.rate) : 0;
  return { lines, subtotal, bundle, discount, total: subtotal - discount };
}

/** Full tier-by-tier tables, as published in the package guide. */
export const fareTables = [
  {
    id: "jed",
    code: "JED",
    title: "Jeddah airport ↔ Makkah hotels",
    detail: "~85 km · 60–90 min · one-way, per vehicle",
    rows: { sedan: 550, suv: 700, van: 850, coach: 1100 } as FareRow,
    note: "Round trip on the same tier, booked together: 10% off the combined total.",
  },
  {
    id: "med",
    code: "MED",
    title: "Madinah airport ↔ Madinah hotels",
    detail: "~18 km · 20–30 min · one-way, per vehicle",
    rows: { sedan: 260, suv: 360, van: 460, coach: 620 } as FareRow,
    note: "Round trip on the same tier, booked together: 10% off the combined total.",
  },
  {
    id: "int",
    code: "INT",
    title: "Makkah ↔ Madinah intercity",
    detail: "~450 km · 4.5–5.5 hr · one-way, per vehicle",
    rows: { sedan: 1150, suv: 1450, van: 1750, coach: 2300 } as FareRow,
    note: "Includes a complimentary Dhul Hulaifah Miqat stop travelling Madinah to Makkah, one rest break, and bottled water.",
  },
  {
    id: "zyr-mkh",
    code: "ZYR",
    title: "Makkah Ziyarat, 3-hour route",
    detail: "Hotel pickup and drop-off · driver waits at every stop",
    rows: { sedan: 200, suv: 250, van: 300, coach: 450 } as FareRow,
    extra: { sedan: 70, suv: 90, van: 110, coach: 150 } as FareRow,
    note: "An optional detour to Masjid Aisha (Ta'neem) is available for guests renewing Ihram for a second Umrah.",
  },
  {
    id: "zyr-med",
    code: "ZYR",
    title: "Madinah Ziyarat, 3-hour route",
    detail: "Hotel pickup and drop-off · driver waits at every stop",
    rows: { sedan: 200, suv: 250, van: 300, coach: 450 } as FareRow,
    extra: { sedan: 70, suv: 90, van: 110, coach: 150 } as FareRow,
  },
] as const;

export const ziyaratRoutes = [
  {
    city: "Makkah",
    duration: "3-hour route",
    from: 200,
    stops: [
      "Jabal al-Noor",
      "Jabal Thawr",
      "Mina",
      "Muzdalifah",
      "Jabal al-Rahmah, Arafat",
      "Jannat al-Mu'alla",
    ],
    note: "Optional detour to Masjid Aisha (Ta'neem) for guests renewing Ihram.",
  },
  {
    city: "Madinah",
    duration: "3-hour route",
    from: 200,
    stops: [
      "Masjid Quba",
      "Mount Uhud & Shuhada Uhud",
      "Masjid al-Qiblatain",
      "The Seven Mosques",
    ],
    note: "Hotel pickup and drop-off, with the driver waiting at every stop.",
  },
] as const;

export const included = [
  "Professional chauffeur speaking English, Urdu, and Arabic",
  "Meet-and-greet with name signage at arrivals",
  "Live flight tracking, no charge for early or delayed landings",
  "Luggage assistance at every stop",
  "Complimentary bottled water and welcome refreshments",
  "In-vehicle WiFi",
  "Fixed, all-inclusive pricing with no surge",
  "TGA and Nusuk-registered vehicles and drivers",
  "24/7 WhatsApp booking and live support",
  "Child seats and wheelchair-accessible vehicles on request",
] as const;

export const policies = [
  {
    title: "Peak season",
    body: "The Hajj period and the last ten days of Ramadan carry a flat 25% surcharge. It is disclosed when you get your quote, never applied at pickup.",
  },
  {
    title: "Cancellation",
    body: "Free cancellation up to 48 hours before pickup. Inside 48 hours, 50% of the fare applies. No-shows are charged in full.",
  },
  {
    title: "Waiting time",
    body: "Complimentary wait covers 60 minutes for international arrivals and 30 minutes for domestic. Beyond that, the hourly extension rate for your tier applies.",
  },
  {
    title: "Currency",
    body: "We quote and charge in SAR. The riyal is pegged at 1 USD = 3.75 SAR; other conversions on this page are indicative and move with the market.",
  },
  {
    title: "Group convoys",
    body: "Hajj groups needing several vehicles moving together are quoted as a convoy package with one lead coordinator. Ask for a group rate.",
  },
] as const;
