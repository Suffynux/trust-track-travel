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
 * Non-USD currencies float — update them when they drift.
 * Last checked: August 2026.
 */
export const currencies = [
  { code: "SAR", symbol: "SAR ", perSar: 1, fixed: true },
  { code: "USD", symbol: "$", perSar: 1 / 3.75, fixed: true },
  { code: "GBP", symbol: "£", perSar: 0.212, fixed: false },
  { code: "EUR", symbol: "€", perSar: 0.228, fixed: false },
  { code: "PKR", symbol: "₨", perSar: 74.1, fixed: false },
  { code: "INR", symbol: "₹", perSar: 24.25, fixed: false },
  { code: "BDT", symbol: "৳", perSar: 32.6, fixed: false },
  { code: "IDR", symbol: "Rp ", perSar: 4_390, fixed: false },
  { code: "MYR", symbol: "RM ", perSar: 1.13, fixed: false },
  { code: "AED", symbol: "AED ", perSar: 0.979, fixed: false },
  { code: "CAD", symbol: "C$", perSar: 0.365, fixed: false },
  { code: "AUD", symbol: "A$", perSar: 0.408, fixed: false },
  { code: "TRY", symbol: "₺", perSar: 11.7, fixed: false },
  { code: "NGN", symbol: "₦", perSar: 410, fixed: false },
  { code: "ZAR", symbol: "R", perSar: 4.72, fixed: false },
] as const;

/**
 * Browser fallback for choosing the opening currency when the edge platform
 * cannot resolve the visitor's IP country. This keeps every page statically
 * generated while still providing a useful result in local development.
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
  "Asia/Kolkata": "INR",
  "Asia/Dhaka": "BDT",
  "Asia/Jakarta": "IDR",
  "Asia/Kuala_Lumpur": "MYR",
  "Asia/Dubai": "AED",
  "Europe/Istanbul": "TRY",
  "Africa/Lagos": "NGN",
  "Africa/Johannesburg": "ZAR",
  "Europe/London": "GBP",
  "Europe/Paris": "EUR",
  "Europe/Berlin": "EUR",
  "Europe/Rome": "EUR",
  "Europe/Madrid": "EUR",
  "America/New_York": "USD",
  "America/Chicago": "USD",
  "America/Denver": "USD",
  "America/Los_Angeles": "USD",
  "America/Phoenix": "USD",
  "America/Anchorage": "USD",
  "America/Detroit": "USD",
  "Asia/Riyadh": "SAR",
  "America/Toronto": "CAD",
  "America/Vancouver": "CAD",
  "Australia/Sydney": "AUD",
  "Australia/Melbourne": "AUD",
};

const regionToCurrency: Record<string, CurrencyCode> = {
  PK: "PKR",
  IN: "INR",
  BD: "BDT",
  ID: "IDR",
  MY: "MYR",
  AE: "AED",
  TR: "TRY",
  NG: "NGN",
  ZA: "ZAR",
  GB: "GBP",
  IE: "EUR",
  FR: "EUR",
  DE: "EUR",
  IT: "EUR",
  ES: "EUR",
  NL: "EUR",
  BE: "EUR",
  AT: "EUR",
  PT: "EUR",
  FI: "EUR",
  GR: "EUR",
  US: "USD",
  CA: "CAD",
  AU: "AUD",
  NZ: "AUD",
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
  "Asia/Kolkata": "IN",
  "Asia/Dhaka": "BD",
  "Asia/Jakarta": "ID",
  "Asia/Kuala_Lumpur": "MY",
  "Asia/Dubai": "AE",
  "Europe/Istanbul": "TR",
  "Africa/Lagos": "NG",
  "Africa/Johannesburg": "ZA",
  "Europe/London": "GB",
  "Europe/Paris": "FR",
  "Europe/Berlin": "DE",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Anchorage": "US",
  "America/Detroit": "US",
  "Asia/Riyadh": "SA",
  "America/Toronto": "CA",
  "America/Vancouver": "CA",
  "Australia/Sydney": "AU",
  "Australia/Melbourne": "AU",
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
    code === "IDR"
      ? Math.round(value / 1_000) * 1_000
      : code === "PKR" || code === "NGN"
        ? Math.round(value / 100) * 100
        : Math.round(value);
  return currency.symbol + rounded.toLocaleString("en-US");
}

/** Builds a wa.me link with the message pre-written. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
