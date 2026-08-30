import { NextRequest } from "next/server";
import { currencyForRegion, type CurrencyCode } from "@/lib/site";

/**
 * The visitor's currency, resolved from their IP at the edge.
 *
 * Vercel sets `x-vercel-ip-country` on every request; Cloudflare and a few
 * other proxies set their own equivalents, which are checked as a fallback so
 * this still works off-platform. No IP is read, stored or logged — only the
 * two-letter country the platform has already resolved.
 *
 * This lives in a route handler rather than in the page so that every page
 * stays statically generated: the HTML is cached globally and only this small
 * JSON response varies by visitor.
 */
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const region =
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-country-code") ??
    "";

  // Only answer when the platform actually resolved a country. Returning a
  // default here would let an unknown IP overwrite the browser-locale guess,
  // which is the better signal in that case.
  const currency: CurrencyCode | null = region ? currencyForRegion(region) : null;

  return Response.json(
    { region: region || null, currency },
    {
      headers: {
        // Per-visitor, so never share it in a CDN cache.
        "cache-control": "private, no-store",
      },
    },
  );
}
