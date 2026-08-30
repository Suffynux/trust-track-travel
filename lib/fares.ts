/**
 * Every fare on this site, in SAR, per vehicle.
 * Figures come from the Standard Package Guide (Phase 01).
 */

/**
 * The real fleet, in seat order. These ids and prices are the same ones the
 * booking form quotes from (lib/booking.ts) — the site previously carried a
 * separate set of invented tiers priced 2-3x higher, so the Fares page and the
 * booking form disagreed about the cost of the same journey.
 */
export const tiers = [
  {
    id: "sedan",
    index: "01",
    name: "Sedan",
    capacity: "Up to 3 guests · 3 bags",
    anchor: "Toyota Camry Grande or equivalent executive sedan",
    suits: "Solo travellers and couples wanting quiet, unhurried comfort.",
  },
  {
    id: "staria",
    index: "02",
    name: "Hyundai Staria",
    capacity: "Up to 7 guests · 7 bags",
    anchor: "Hyundai Staria",
    suits: "Families and small groups travelling as one party.",
  },
  {
    id: "stariavip",
    index: "03",
    name: "Staria VIP",
    capacity: "7 to 9 guests · group luggage",
    anchor: "Hyundai Staria VIP, higher-spec interior",
    suits: "Guests who want the extra space and finish on a longer leg.",
  },
  {
    id: "hiace",
    index: "04",
    name: "Toyota Hiace",
    capacity: "Up to 11 guests · group luggage",
    anchor: "Toyota Hiace",
    suits: "Larger families travelling together with full luggage.",
  },
  {
    id: "gmc",
    index: "05",
    name: "GMC",
    capacity: "Premium SUV · up to 6 guests",
    anchor: "GMC Yukon XL, Suburban, or Land Cruiser",
    suits: "Travellers wanting an SUV rather than a van.",
  },
  {
    id: "coaster",
    index: "06",
    name: "Coaster",
    capacity: "Up to 22 guests · group luggage",
    anchor: "Toyota Coaster or equivalent minibus",
    suits: "Extended family Hajj and Umrah parties.",
  },
  {
    id: "bus",
    index: "07",
    name: "Bus",
    capacity: "47 seats",
    anchor: "Full-size coach",
    suits: "Tour groups and large Hajj parties moving as one.",
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
/** Full tier-by-tier tables, as published in the package guide. */
/**
 * The published tariff. Every figure here matches lib/booking.ts, which is
 * what the booking form quotes from — the two must never disagree, because a
 * customer comparing this page to the form is comparing the same journey.
 *
 * GMC is quoted as a band in the tariff (it depends on the specific vehicle);
 * the tables show the lower figure and the note says the range.
 */
export const fareTables = [
  {
    id: "jed",
    code: "JED",
    title: "Jeddah airport ↔ Makkah hotels",
    detail: "~85 km · 60–90 min · one-way, per vehicle",
    rows: { sedan: 200, staria: 250, stariavip: 400, hiace: 330, gmc: 400, coaster: 550, bus: 850 } as FareRow,
    note: "GMC is SAR 400–450 depending on the vehicle. Makkah to Jeddah is priced the same, except the Hiace at SAR 300 and the bus at SAR 650.",
  },
  {
    id: "med",
    code: "MED",
    title: "Madinah airport ↔ Madinah hotels",
    detail: "~18 km · 20–30 min · one-way, per vehicle",
    rows: { sedan: 130, staria: 150, stariavip: 250, hiace: 200, gmc: 250, coaster: 350, bus: 450 } as FareRow,
    note: "GMC is SAR 250–300 depending on the vehicle. Priced the same in both directions.",
  },
  {
    id: "int",
    code: "INT",
    title: "Makkah ↔ Madinah intercity",
    detail: "~450 km · 4.5–5.5 hr · one-way, per vehicle",
    rows: { sedan: 350, staria: 450, stariavip: 750, hiace: 550, gmc: 750, coaster: 850, bus: 950 } as FareRow,
    note: "Includes a complimentary Dhul Hulaifah Miqat stop travelling Madinah to Makkah, one rest break, and bottled water. GMC is SAR 750–850.",
  },
  {
    id: "zyr-mkh",
    code: "ZYR",
    title: "Makkah Ziyarat, 3-hour route",
    detail: "Hotel pickup and drop-off · driver waits at every stop",
    rows: { sedan: 200, staria: 250, stariavip: 350, hiace: 300, gmc: 350, coaster: 450, bus: 550 } as FareRow,
    note: "An optional detour to Masjid Aisha (Ta'neem) is available for guests renewing Ihram for a second Umrah. GMC is SAR 350–450.",
  },
  {
    id: "zyr-med",
    code: "ZYR",
    title: "Madinah Ziyarat, 3-hour route",
    detail: "Hotel pickup and drop-off · driver waits at every stop",
    rows: { sedan: 200, staria: 250, stariavip: 350, hiace: 300, gmc: 350, coaster: 450, bus: 550 } as FareRow,
    note: "GMC is SAR 350–450 depending on the vehicle.",
  },
  {
    id: "badr",
    code: "BAD",
    title: "Madinah ↔ Badr",
    detail: "~150 km · one-way, per vehicle",
    rows: { sedan: 350, staria: 450, stariavip: 750, hiace: 550, gmc: 750, coaster: 850 } as FareRow,
    note: "Priced the same in both directions. Not available in the 47-seat bus.",
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
