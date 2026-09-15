import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Every image and video slot on the site.
 *
 * Nothing here has to exist. A slot with no file renders as a labelled plate
 * naming the exact path to drop the file at, so the layout is correct before
 * the media arrives. Drop a file in `public/media/...`, rebuild, and it
 * appears. See MEDIA.md.
 *
 * Server-only: this module touches the filesystem. Read it in a server
 * component and pass the resolved slot down to client components as props.
 */

export type Slot = {
  /** Path under public/, e.g. "media/fleet/suv.jpg" */
  src: string;
  /** Written for someone who cannot see it. Describe the subject, not the file. */
  alt: string;
  /** Recommended pixel size, shown on the placeholder plate. */
  size: string;
  /** What to shoot or source. Shown in MEDIA.md. */
  brief: string;
  width: number;
  height: number;
};

export type ResolvedSlot = Slot & { ready: boolean };

const wide = { width: 1920, height: 1080, size: "1920 × 1080" };
const portrait = { width: 1200, height: 1600, size: "1200 × 1600" };
const square = { width: 1200, height: 1200, size: "1200 × 1200" };

export const media = {
  heroPoster: {
    src: "media/hero-poster.jpg",
    alt: "A Trust Track vehicle on the Haramain Expressway at first light",
    brief:
      "First frame of the hero video, or a still in its place. Golden hour on the expressway, vehicle in motion, Makkah skyline distant.",
    ...wide,
  },
  heroVideo: {
    src: "media/hero.mp4",
    alt: "",
    brief:
      "8–15 second silent loop, no cuts. Expressway at golden hour, terminal forecourt, or the car pulling up. Keep the left two thirds calm because the headline sits there. Export at 1920×1080, under 4 MB, H.264. A WebM at media/hero.webm is used first if present.",
    ...wide,
  },
  heroVideoWebm: {
    src: "media/hero.webm",
    alt: "",
    brief: "Optional WebM of the same loop. Served ahead of the MP4.",
    ...wide,
  },
  expressway: {
    src: "media/expressway.jpg",
    alt: "The Haramain Expressway between Makkah and Madinah",
    brief:
      "Wide landscape for the closing band. Road, horizon, early light. No people.",
    ...wide,
  },
  interior: {
    src: "media/interior.jpg",
    alt: "The rear cabin of a Trust Track vehicle",
    brief:
      "Rear cabin, clean and empty. Water bottles, legroom. Shot from the door.",
    ...wide,
  },
  meetAndGreet: {
    src: "media/meet-and-greet.jpg",
    alt: "A chauffeur meeting guests at Jeddah airport arrivals",
    brief: "Airport arrivals meet-and-greet with a discreet vehicle and luggage.",
    ...wide,
  },
  hotelArrival: {
    src: "media/hotel-arrival.jpg",
    alt: "A family arriving at their hotel by private chauffeur",
    brief: "Vehicle arriving beneath a hotel porte-cochère with luggage assistance.",
    ...wide,
  },
  fleet: {
    // Keys match the tier ids in lib/fares.ts. They previously used the old
    // tier names (suv, van, coach), so only the sedan card found its image.
    //
    // These are the operator's own vehicle images: cutouts composited onto the
    // Indigo field so the cards read as one set. They are 16:9 like every
    // other slot, but not all 1920 wide — each was sized to what its source
    // could fill without upscaling into mush, so width/height are per-slot
    // rather than the shared `wide`. Keep them matching the files on disk:
    // next/image uses them to reserve space before the image loads.
    sedan: {
      src: "media/fleet/sedan.jpg",
      alt: "A black Toyota Camry executive sedan, front three-quarter view",
      brief: "Three-quarter front, vehicle clean, plain background.",
      width: 1866,
      height: 1049,
      size: "1866 × 1049",
    },
    staria: {
      src: "media/fleet/van.jpg",
      alt: "A black Hyundai Staria people carrier, front three-quarter view",
      brief: "Three-quarter front, matching angle and light to the others.",
      width: 1328,
      height: 747,
      size: "1328 × 747",
    },
    hiace: {
      src: "media/fleet/hiace.jpg",
      alt: "A black Toyota Hiace passenger van, front three-quarter view",
      brief: "Three-quarter front, side door closed.",
      width: 1119,
      height: 629,
      size: "1119 × 629",
    },
    gmc: {
      src: "media/fleet/suv.jpg",
      alt: "A black GMC Yukon Denali XL full-size SUV, front three-quarter view",
      brief: "Three-quarter front, full vehicle in frame.",
      width: 1321,
      height: 743,
      size: "1321 × 743",
    },
    // The only Coaster source available is 313 × 161, so this frame is small.
    // It is sharp at its own size but soft once a card scales it up; replacing
    // it with a larger image is the single biggest fleet improvement left.
    coaster: {
      src: "media/fleet/coach.jpg",
      alt: "A white Toyota Coaster minibus, front three-quarter view",
      brief: "Three-quarter front, full vehicle in frame.",
      width: 437,
      height: 245,
      size: "437 × 245",
    },
    // Standing in with the Coaster until a 47-seat coach photograph exists.
    bus: {
      src: "media/fleet/bus.jpg",
      alt: "A white Toyota Coaster minibus, front three-quarter view",
      brief: "Three-quarter front, full-size coach in frame.",
      width: 437,
      height: 245,
      size: "437 × 245",
    },
  },
  ziyarat: {
    makkah: {
      src: "media/ziyarat/makkah.jpg",
      alt: "The Makkah Ziyarat route",
      brief: "Makkah skyline or hillside at distance. Not the Haram interior.",
      ...portrait,
    },
    madinah: {
      src: "media/ziyarat/madinah.jpg",
      alt: "The Madinah Ziyarat route",
      brief: "Madinah at distance, Mount Uhud, or a road approach.",
      ...portrait,
    },
  },
  stops: {
    "jabal-al-noor": {
      src: "media/ziyarat/stops/jabal-al-noor.jpg",
      alt: "Jabal al-Noor",
      brief: "Exterior, daylight.",
      ...square,
    },
    "jabal-thawr": {
      src: "media/ziyarat/stops/jabal-thawr.jpg",
      alt: "Jabal Thawr",
      brief: "Exterior, daylight.",
      ...square,
    },
    mina: { src: "media/ziyarat/stops/mina.jpg", alt: "Mina", brief: "Exterior, daylight.", ...square },
    muzdalifah: {
      src: "media/ziyarat/stops/muzdalifah.jpg",
      alt: "Muzdalifah",
      brief: "Exterior, daylight.",
      ...square,
    },
    "jabal-al-rahmah": {
      src: "media/ziyarat/stops/jabal-al-rahmah.jpg",
      alt: "Jabal al-Rahmah at Arafat",
      brief: "Exterior, daylight.",
      ...square,
    },
    "masjid-quba": {
      src: "media/ziyarat/stops/masjid-quba.jpg",
      alt: "Masjid Quba",
      brief: "Exterior, daylight.",
      ...square,
    },
    "mount-uhud": {
      src: "media/ziyarat/stops/mount-uhud.jpg",
      alt: "Mount Uhud",
      brief: "Exterior, daylight.",
      ...square,
    },
    "masjid-al-qiblatain": {
      src: "media/ziyarat/stops/masjid-al-qiblatain.jpg",
      alt: "Masjid al-Qiblatain",
      brief: "Exterior, daylight.",
      ...square,
    },
    "ghars-well": {
      src: "media/ziyarat/stops/ghars-well.jpg",
      alt: "Ghars Well",
      brief: "Exterior, daylight.",
      ...square,
    },
    "salman-al-farsi-farm": {
      src: "media/ziyarat/stops/salman-al-farsi-farm.jpg",
      alt: "Salman Al Farsi Farm",
      brief: "Exterior, daylight.",
      ...square,
    },
    "seven-mosques": {
      src: "media/ziyarat/stops/seven-mosques.jpg",
      alt: "The Seven Mosques",
      brief: "Exterior, daylight.",
      ...square,
    },
  },
  routes: {
    "jeddah-airport-to-makkah": {
      src: "media/routes/jeddah-airport-to-makkah.jpg",
      alt: "The road from Jeddah airport to Makkah",
      brief: "Terminal forecourt or the Makkah approach road.",
      ...wide,
    },
    "makkah-to-madinah": {
      src: "media/routes/makkah-to-madinah.jpg",
      alt: "The Haramain Expressway between Makkah and Madinah",
      brief: "Open road, long horizon.",
      ...wide,
    },
    "madinah-airport-transfer": {
      src: "media/routes/madinah-airport-transfer.jpg",
      alt: "Madinah airport",
      brief: "Terminal exterior or the short hotel approach.",
      ...wide,
    },
    "madinah-to-badr": {
      src: "media/routes/madinah-to-badr.jpg",
      alt: "The mountain road from Madinah toward Badr",
      brief: "Wide Hijaz mountain road with a passenger vehicle in the distance.",
      ...wide,
    },
  },
} as const;

/** True when the file is actually sitting in public/. */
export function has(slot: Slot): boolean {
  return existsSync(path.join(process.cwd(), "public", slot.src));
}

export function resolve(slot: Slot): ResolvedSlot {
  return { ...slot, ready: has(slot) };
}

/** Flat list of every slot, for MEDIA.md and for counting what is missing. */
export function allSlots(): Slot[] {
  const out: Slot[] = [];
  const walk = (node: unknown) => {
    if (!node || typeof node !== "object") return;
    if ("src" in node && "brief" in node) {
      out.push(node as Slot);
      return;
    }
    for (const value of Object.values(node)) walk(value);
  };
  walk(media);
  return out;
}
