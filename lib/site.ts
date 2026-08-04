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
