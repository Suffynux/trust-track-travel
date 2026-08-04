import type { TierId } from "./fares";

/**
 * The three routes people actually search for. Each gets its own page with
 * that route's fares, timings and questions, and a WhatsApp message already
 * written for it.
 */

type Fares = Record<TierId, number>;

export type Route = {
  slug: string;
  code: string;
  title: string;
  short: string;
  from: string;
  to: string;
  distance: string;
  duration: string;
  /** One sentence that says what this journey actually is. */
  summary: string;
  intro: string;
  fares: Fares;
  facts: { label: string; value: string }[];
  includes: string[];
  faq: { q: string; a: string }[];
};

export const routes: Route[] = [
  {
    slug: "jeddah-airport-to-makkah",
    code: "JED → MKH",
    title: "Jeddah airport to Makkah",
    short: "Jeddah airport → Makkah",
    from: "King Abdulaziz International Airport",
    to: "Your Makkah hotel",
    distance: "~85 km",
    duration: "60–90 min",
    summary:
      "The first leg of most Umrah trips, and the one where a fixed fare matters most: you land tired, in a queue, with a driver quoting whatever the hour allows.",
    intro:
      "Your chauffeur waits inside arrivals with your name on a board, tracks your flight so an early or late landing costs nothing, and drives straight to your hotel door in Makkah. The fare is agreed before you fly and does not move.",
    fares: { sedan: 550, suv: 700, van: 850, coach: 1100 },
    facts: [
      { label: "Distance", value: "~85 km" },
      { label: "Journey time", value: "60–90 min" },
      { label: "Complimentary wait", value: "60 min" },
      { label: "Terminals", value: "1, North, South" },
    ],
    includes: [
      "Meet-and-greet inside arrivals with name signage",
      "Live flight tracking, no charge for early or delayed landings",
      "60 minutes of complimentary wait on international arrivals",
      "Luggage assistance from the belt to the vehicle",
      "Direct to your hotel door, no shared stops",
    ],
    faq: [
      {
        q: "What happens if my flight is delayed?",
        a: "Nothing changes. We track the flight and your chauffeur arrives for the actual landing time. There is no charge for a delay.",
      },
      {
        q: "Where will the driver meet me?",
        a: "Inside the arrivals hall, past customs, holding a board with your name. Send your terminal when you book and we confirm the exact meeting point.",
      },
      {
        q: "Can we stop at the Miqat on the way?",
        a: "Pilgrims flying into Jeddah normally enter Ihram before landing, so this leg runs direct. If you need a Miqat stop, say so when you book and we build it into the route at no extra fare.",
      },
      {
        q: "Is the fare per person or per vehicle?",
        a: "Per vehicle. Four people in a Premium SUV pay the same SAR 700 as one person does.",
      },
    ],
  },
  {
    slug: "makkah-to-madinah",
    code: "MKH → MED",
    title: "Makkah to Madinah",
    short: "Makkah → Madinah",
    from: "Your Makkah hotel",
    to: "Your Madinah hotel",
    distance: "~450 km",
    duration: "4.5–5.5 hr",
    summary:
      "The long leg. Four and a half hours of expressway, which is either a comfortable stretch of the trip or the worst part of it, depending on the vehicle and the driver.",
    intro:
      "We run this leg door to door along the Haramain Expressway with one rest break, water in the cabin, and a complimentary stop at the Dhul Hulaifah Miqat for guests travelling in the other direction. No shared vans, no waiting for a full load.",
    fares: { sedan: 1150, suv: 1450, van: 1750, coach: 2300 },
    facts: [
      { label: "Distance", value: "~450 km" },
      { label: "Journey time", value: "4.5–5.5 hr" },
      { label: "Rest break", value: "1 included" },
      { label: "Miqat stop", value: "Complimentary" },
    ],
    includes: [
      "Door to door, your hotel in Makkah to your hotel in Madinah",
      "Complimentary Dhul Hulaifah Miqat stop travelling Madinah to Makkah",
      "One rest break at a service stop of your choosing",
      "Bottled water and refreshments in the cabin",
      "In-vehicle WiFi for the full journey",
    ],
    faq: [
      {
        q: "How long does the drive actually take?",
        a: "Four and a half to five and a half hours, depending on how long you stop. The expressway is the whole route; the variation is rest breaks, not traffic.",
      },
      {
        q: "Do you stop at the Miqat?",
        a: "Yes, at Dhul Hulaifah, at no extra charge, for guests travelling from Madinah to Makkah who need to enter Ihram.",
      },
      {
        q: "Can we leave at night?",
        a: "Yes. Overnight departures are common on this leg and are charged at the same fixed fare — there is no night surcharge.",
      },
      {
        q: "Is the train not cheaper?",
        a: "For one or two people, usually. For a family with luggage, once you add both taxi legs to and from the stations, a private vehicle door to door is often close on price and much less handling.",
      },
    ],
  },
  {
    slug: "madinah-airport-transfer",
    code: "MED",
    title: "Madinah airport transfer",
    short: "Madinah ↔ airport",
    from: "Prince Mohammad bin Abdulaziz Airport",
    to: "Your Madinah hotel",
    distance: "~18 km",
    duration: "20–30 min",
    summary:
      "The short one. Twenty minutes, which is exactly why it gets overcharged at the kerb on the way out.",
    intro:
      "Arrivals or departures, both directions, at the same fixed fare. On departures we work backwards from your flight time so you leave the hotel with room to spare, and your chauffeur helps with bags at the terminal door.",
    fares: { sedan: 260, suv: 360, van: 460, coach: 620 },
    facts: [
      { label: "Distance", value: "~18 km" },
      { label: "Journey time", value: "20–30 min" },
      { label: "Complimentary wait", value: "60 min" },
      { label: "Direction", value: "Both ways" },
    ],
    includes: [
      "Meet-and-greet with name signage on arrivals",
      "Pickup timed backwards from your departure on the way out",
      "60 minutes of complimentary wait on international arrivals",
      "Luggage assistance at the terminal door",
      "Round trip on the same tier, booked together: 10% off",
    ],
    faq: [
      {
        q: "How early should we leave the hotel for a departure?",
        a: "Tell us your flight time and we set the pickup. For international departures we normally leave three and a half hours before, and for domestic, two.",
      },
      {
        q: "Do you charge more at night?",
        a: "No. The fare is the same at 3am as at 3pm.",
      },
      {
        q: "Can we book the arrival and departure together?",
        a: "Yes, and you should — the same tier both ways in one reservation takes 10% off the combined total.",
      },
      {
        q: "How close to Masjid an-Nabawi can you drop us?",
        a: "As close as the traffic plan allows on the day. Central Madinah has restricted zones during peak times; your chauffeur takes you to the nearest permitted point and helps with the bags.",
      },
    ],
  },
];

export function routeBySlug(slug: string) {
  return routes.find((r) => r.slug === slug);
}
