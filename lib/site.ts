/**
 * Single source of truth for contact details and currency.
 * Replace the three PLACEHOLDER values below and every CTA on the site updates.
 */

export const site = {
  name: "Trust Track Travels",
  tagline: "Fixed-fare ground transport, Jeddah · Makkah · Madinah",

  /** Digits only, with country code, no +, no spaces. Example: 966501234567 */
  whatsapp: "966500000000", // PLACEHOLDER
  /** Shown as a tel: link. */
  phone: "+966 50 000 0000", // PLACEHOLDER
  email: "hello@trusttracktravels.com", // PLACEHOLDER

  cities: "Makkah · Madinah · Jeddah",
} as const;

/**
 * SAR is the operating currency and the only one we quote in.
 * Everything below is an indicative reading for guests booking from abroad,
 * labelled as such wherever it appears.
 *
 * USD is fixed: the riyal is pegged at 1 USD = 3.75 SAR.
 * GBP and PKR float — update these two when they drift.
 * Last checked: August 2026.
 */
export const currencies = [
  { code: "SAR", symbol: "SAR ", perSar: 1, fixed: true },
  { code: "USD", symbol: "$", perSar: 1 / 3.75, fixed: true },
  { code: "GBP", symbol: "£", perSar: 0.212, fixed: false },
  { code: "PKR", symbol: "₨", perSar: 74.1, fixed: false },
] as const;

/**
 * Which currency to open in, worked out from the visitor's own browser
 * settings — no IP lookup, no consent banner, no extra request, and every
 * page stays statically generated.
 *
 * The IANA time zone is checked first: it is the more reliable signal for
 * someone running an en-US browser while actually living in Karachi. Locale
 * region is the fallback.
 *
 * SAR is the floor for Saudi Arabia and anywhere unrecognised, because SAR is
 * what we actually charge — the rest are indicative conversions.
 */
const zoneToCurrency: Record<string, CurrencyCode> = {
  "Asia/Karachi": "PKR",
  "Europe/London": "GBP",
  "America/New_York": "USD",
  "America/Chicago": "USD",
  "America/Denver": "USD",
  "America/Los_Angeles": "USD",
  "America/Phoenix": "USD",
  "America/Anchorage": "USD",
  "America/Detroit": "USD",
  "Asia/Riyadh": "SAR",
};

const regionToCurrency: Record<string, CurrencyCode> = {
  PK: "PKR",
  GB: "GBP",
  US: "USD",
  SA: "SAR",
};

/** Region code -> the origin option id used by the hero booking form. */
const regionToOrigin: Record<string, string> = {
  PK: "pk",
  GB: "gb",
  US: "us",
  SA: "sa",
};

/**
 * The visitor's country as one of the hero form's origin ids, or "" when we
 * cannot tell — in which case the form stays on "Select your country" rather
 * than guessing wrong.
 */
/**
 * Country code -> display currency. Used by the /api/geo route to turn the
 * platform's resolved IP country into a currency, and as the client fallback.
 */
export function currencyForRegion(region: string): CurrencyCode {
  return regionToCurrency[region.toUpperCase()] ?? "SAR";
}

export function detectOriginId(): string {
  return regionToOrigin[detectRegion() ?? ""] ?? "";
}

/** Best guess at the visitor's ISO region, from time zone then locale. */
function detectRegion(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone && zoneToRegion[zone]) return zoneToRegion[zone];
    for (const tag of navigator.languages ?? [navigator.language]) {
      const region = new Intl.Locale(tag).maximize().region;
      if (region) return region;
    }
  } catch {
    // Intl.Locale is missing on some older browsers.
  }
  return null;
}

const zoneToRegion: Record<string, string> = {
  "Asia/Karachi": "PK",
  "Europe/London": "GB",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Anchorage": "US",
  "America/Detroit": "US",
  "Asia/Riyadh": "SA",
};

export function detectCurrency(): CurrencyCode {
  if (typeof window === "undefined") return "SAR";

  try {
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (zone && zoneToCurrency[zone]) return zoneToCurrency[zone];

    // `en-GB` -> GB, `ur-PK` -> PK, `en` -> US once maximised.
    for (const tag of navigator.languages ?? [navigator.language]) {
      const region = new Intl.Locale(tag).maximize().region;
      if (region && regionToCurrency[region]) return regionToCurrency[region];
    }
  } catch {
    // Intl.Locale is missing on some older browsers; SAR is a safe floor.
  }

  return "SAR";
}

export type CurrencyCode = (typeof currencies)[number]["code"];

export function formatFare(sar: number, code: CurrencyCode): string {
  const currency = currencies.find((c) => c.code === code) ?? currencies[0];
  const value = sar * currency.perSar;
  const rounded =
    code === "PKR" ? Math.round(value / 100) * 100 : Math.round(value);
  return currency.symbol + rounded.toLocaleString("en-US");
}

/** Builds a wa.me link with the message pre-written. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
