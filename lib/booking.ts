export type BookingFare = number | readonly [number, number];

export const bookingVehicles = [
  { id: "sedan", name: "Sedan", capacity: "Up to 3 guests" },
  { id: "staria", name: "Hyundai Staria", capacity: "Up to 7 guests" },
  { id: "hiace", name: "Toyota Hiace", capacity: "Up to 11 guests" },
  { id: "gmc", name: "GMC", capacity: "Premium SUV" },
  { id: "coaster", name: "Coaster", capacity: "Up to 22 guests" },
  { id: "bus", name: "Bus", capacity: "47 seats" },
] as const;

export type BookingVehicleId = (typeof bookingVehicles)[number]["id"];
type BookingFareRow = Partial<Record<BookingVehicleId, BookingFare>>;

/** Customer-supplied tariff with SAR 50 already added to every quoted fare. */
export const bookingRoutes = [
  { id: "jed-mak", code: "JED", name: "Jeddah airport → Makkah", fares: { sedan: 200, staria: 250, hiace: 330, gmc: [400, 450], coaster: 550, bus: 850 } },
  { id: "mak-jed", code: "JED", name: "Makkah → Jeddah airport", fares: { sedan: 200, staria: 250, hiace: 300, gmc: [300, 400], coaster: 550, bus: 650 } },
  { id: "mak-med", code: "INT", name: "Makkah → Madinah", fares: { sedan: 350, staria: 450, hiace: 550, gmc: [750, 850], coaster: 850, bus: 950 } },
  { id: "med-mak", code: "INT", name: "Madinah → Makkah", fares: { sedan: 350, staria: 450, hiace: 550, gmc: [750, 850], coaster: 850, bus: 950 } },
  { id: "med-ziyarat", code: "ZYR", name: "Madinah Ziyarat", fares: { sedan: 200, staria: 250, hiace: 300, gmc: [350, 450], coaster: 450, bus: 550 } },
  { id: "med-airport", code: "MED", name: "Madinah hotel → Madinah airport", fares: { sedan: 130, staria: 150, hiace: 200, gmc: [250, 300], coaster: 350, bus: 450 } },
  { id: "med-badr", code: "BAD", name: "Madinah → Badr", fares: { sedan: 350, staria: 450, hiace: 550, gmc: 750, coaster: 850 } },
] as const satisfies readonly { id: string; code: string; name: string; fares: BookingFareRow }[];

export type BookingRouteId = (typeof bookingRoutes)[number]["id"];

export function bookingFare(routeId: BookingRouteId, vehicleId: BookingVehicleId) {
  const route = bookingRoutes.find((item) => item.id === routeId);
  return route ? (route.fares as BookingFareRow)[vehicleId] : undefined;
}

export function formatBookingFare(fare: BookingFare | undefined) {
  if (fare === undefined) return "Quote required";
  if (Array.isArray(fare)) return `SAR ${fare[0]}–${fare[1]}`;
  return `SAR ${fare}`;
}
