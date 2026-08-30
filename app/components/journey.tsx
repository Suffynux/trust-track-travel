"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { fareTables, tiers, type TierId } from "@/lib/fares";
import {
  currencies,
  detectCurrency,
  formatFare,
  site,
  whatsappLink,
  type CurrencyCode,
} from "@/lib/site";

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

type JourneyState = {
  tier: TierId;
  setTier: (t: TierId) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
};

const JourneyContext = createContext<JourneyState | null>(null);

function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside JourneyProvider");
  return ctx;
}

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<TierId>("staria");
  const [currency, setCurrency] = useState<CurrencyCode>("SAR");
  const manualCurrency = useRef(false);

  const chooseCurrency = useCallback((next: CurrencyCode) => {
    manualCurrency.current = true;
    window.localStorage.setItem("display-currency", next);
    setCurrency(next);
  }, []);

  // Currency can only be resolved in the browser, so the server renders the
  // neutral default and this fills it in after mount. Initialising it lazily
  // instead would make the first client render disagree with the server HTML.
  /* eslint-disable react-hooks/set-state-in-effect -- client-only signal */
  useEffect(() => {
    let cancelled = false;
    const saved = window.localStorage.getItem("display-currency");
    if (saved && currencies.some(({ code }) => code === saved)) {
      manualCurrency.current = true;
      setCurrency(saved as CurrencyCode);
      return;
    }

    setCurrency(detectCurrency());
    fetch("/api/geo")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { currency?: CurrencyCode | null } | null) => {
        if (!cancelled && !manualCurrency.current && data?.currency) {
          setCurrency(data.currency);
        }
      })
      .catch(() => {
        // Browser locale/time zone detection remains the fallback.
      });

    return () => {
      cancelled = true;
    };
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const value = useMemo(
    () => ({ tier, setTier, currency, setCurrency: chooseCurrency }),
    [tier, currency, chooseCurrency],
  );

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
}

export function useDisplayCurrency() {
  const { currency, setCurrency } = useJourney();
  return { currency, setCurrency };
}

/** A fare that follows the visitor's globally detected/selected currency. */
export function DisplayFare({ sar, prefix = "" }: { sar: number; prefix?: string }) {
  const { currency } = useJourney();
  return <>{prefix}{formatFare(sar, currency)}</>;
}

export function CurrencySelect({ className = "currency-select" }: { className?: string }) {
  const { currency, setCurrency } = useJourney();
  return (
    <label className={className}>
      <span>Display currency</span>
      <select
        value={currency}
        onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
        aria-label="Display currency"
      >
        {currencies.map(({ code }) => <option key={code} value={code}>{code}</option>)}
      </select>
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Ledger — the hero instrument                                        */
/* ------------------------------------------------------------------ */

export function FleetTiers({
  photos,
}: {
  /** Vehicle photography per tier, rendered on the server and passed in. */
  photos?: Partial<Record<TierId, React.ReactNode>>;
}) {
  const { tier, setTier, currency } = useJourney();
  // The Jeddah transfer, shown on each card as a common comparison point.
  const reference = fareTables[0];

  return (
    <div className="fleet">
      {tiers.map((t) => (
        <button
          key={t.id}
          type="button"
          className="tier"
          aria-pressed={tier === t.id}
          onClick={() => setTier(t.id)}
        >
          <span className="tier-state" aria-hidden="true">
            In ledger
          </span>
          <span className="tier-media">
            {photos?.[t.id]}
            <span className="numeral tier-numeral" aria-hidden="true">
              {t.index}
            </span>
          </span>
          <span className="tier-body">
            <span className="tier-index">Tier {t.index}</span>
            <span className="tier-name">{t.name}</span>
            <span className="tier-cap">{t.capacity}</span>
            <span className="tier-anchor">{t.anchor}</span>
            <span className="tier-fare">
              {formatFare(reference.rows[t.id] ?? 0, currency)}
              <small>Jeddah airport to Makkah</small>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile fare bar — appears once the ledger scrolls out of view       */
/* ------------------------------------------------------------------ */

export function FareBar() {
  const { tier, currency } = useJourney();
  const [show, setShow] = useState(false);
  const selected = tiers.find((t) => t.id === tier)!;
  const reference = fareTables[0].rows[tier];

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show || reference === undefined) return null;

  const message = [
    "Booking request for Trust Track Travels",
    "",
    `Vehicle: ${selected.name} (${selected.capacity})`,
    "",
    "Route:",
    "Travel date and time:",
    "Number of guests:",
  ].join("\n");

  return (
    <div className="farebar">
      <span className="farebar-total">
        <span className="farebar-label">
          {selected.name} · Jeddah to Makkah
        </span>
        <span className="farebar-value">
          {formatFare(reference, currency)}
        </span>
      </span>
      <a
        className="btn btn-primary btn-sm chamfer is-clipped"
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener"
      >
        Send on WhatsApp
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function WhatsAppButton({
  children,
  message,
  variant = "primary",
  size,
}: {
  children: React.ReactNode;
  message?: string;
  variant?: "primary" | "outline";
  size?: "sm";
}) {
  return (
    <a
      className={[
        "btn",
        variant === "primary" ? "btn-primary" : "btn-outline",
        size === "sm" ? "btn-sm" : "",
        "chamfer is-clipped",
      ]
        .filter(Boolean)
        .join(" ")}
      href={whatsappLink(
        message ??
          `Hello ${site.name}. I'd like a fixed quote for ground transport.\n\nRoute:\nTravel dates:\nNumber of guests:`,
      )}
      target="_blank"
      rel="noopener"
    >
      {children}
    </a>
  );
}
