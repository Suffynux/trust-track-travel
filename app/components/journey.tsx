"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { legs, quote, tiers, type LegId, type TierId } from "@/lib/fares";
import type { ResolvedSlot } from "@/lib/media";
import {
  currencies,
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
  selected: LegId[];
  toggleLeg: (id: LegId) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
};

const JourneyContext = createContext<JourneyState | null>(null);

function useJourney() {
  const ctx = useContext(JourneyContext);
  if (!ctx) throw new Error("useJourney must be used inside JourneyProvider");
  return ctx;
}

/** Defaults to the common Umrah pattern: fly into Jeddah, out of Madinah. */
const defaultLegs: LegId[] = [
  "arrival",
  "ziyarat-makkah",
  "intercity",
  "ziyarat-madinah",
  "departure",
];

export function JourneyProvider({ children }: { children: React.ReactNode }) {
  const [tier, setTier] = useState<TierId>("suv");
  const [selected, setSelected] = useState<LegId[]>(defaultLegs);
  const [currency, setCurrency] = useState<CurrencyCode>("SAR");

  const toggleLeg = useCallback((id: LegId) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id],
    );
  }, []);

  const value = useMemo(
    () => ({ tier, setTier, selected, toggleLeg, currency, setCurrency }),
    [tier, selected, currency, toggleLeg],
  );

  return (
    <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/* Shared helpers                                                      */
/* ------------------------------------------------------------------ */

function Check() {
  return (
    <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M2 6.2 4.7 9 10 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** The itinerary, written out so the operator can act on it as-is. */
function buildMessage(tier: TierId, selected: LegId[]) {
  const t = tiers.find((x) => x.id === tier)!;
  const q = quote(selected, tier);

  const lines = [
    "Fixed fare request — Trust Track Travels",
    "",
    `Vehicle: ${t.name} (${t.capacity.toLowerCase()})`,
    "",
    "Journey:",
    ...q.lines.map((l) => `- ${l.short} — SAR ${l.fare.toLocaleString("en-US")}`),
    "",
    `Subtotal: SAR ${q.subtotal.toLocaleString("en-US")}`,
  ];

  if (q.bundle) {
    lines.push(
      `${q.bundle.name} (${Math.round(q.bundle.rate * 100)}% off): -SAR ${q.discount.toLocaleString("en-US")}`,
    );
  }

  lines.push(
    `Total: SAR ${q.total.toLocaleString("en-US")}`,
    "",
    "Travel dates:",
    "Arrival flight number:",
    "Hotel in Makkah:",
    "Hotel in Madinah:",
    "Number of guests:",
  );

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/* Ledger — the hero instrument                                        */
/* ------------------------------------------------------------------ */

export function Ledger() {
  const { tier, selected, toggleLeg, currency, setCurrency } = useJourney();
  const t = tiers.find((x) => x.id === tier)!;
  const q = quote(selected, tier);
  const empty = q.lines.length === 0;

  return (
    <div className="ledger chamfer" id="ledger">
      <div className="ledger-top">
        <h2 className="ledger-title">Fixed fare ledger</h2>
        <div
          className="currency-picker"
          role="group"
          aria-label="Show fares in another currency"
        >
          {currencies.map((c) => (
            <button
              key={c.code}
              type="button"
              className="currency-btn"
              aria-pressed={currency === c.code}
              onClick={() => setCurrency(c.code)}
            >
              {c.code}
            </button>
          ))}
        </div>
      </div>

      <div className="ledger-tier">
        <span className="ledger-tier-name">{t.name}</span>
        <span className="ledger-tier-cap">{t.capacity}</span>
      </div>

      <ul className="ledger-legs">
        {legs.map((leg) => {
          const on = selected.includes(leg.id);
          return (
            <li key={leg.id} className="ledger-leg">
              <button
                type="button"
                className="leg-btn"
                aria-pressed={on}
                onClick={() => toggleLeg(leg.id)}
              >
                <span className="leg-tick" aria-hidden="true">
                  <Check />
                </span>
                <span className="leg-code">{leg.code}</span>
                <span className="leg-name">{leg.short}</span>
                <span className="leg-fare">
                  {formatFare(leg.fares[tier], currency)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="ledger-sum">
        {empty ? (
          <p className="sum-row">
            Pick the legs you need and the fare builds here.
          </p>
        ) : (
          <>
            <div className="sum-row">
              <span>
                Subtotal, {q.lines.length}{" "}
                {q.lines.length === 1 ? "leg" : "legs"}
              </span>
              <span className="sum-value">
                {formatFare(q.subtotal, currency)}
              </span>
            </div>
            {q.bundle && (
              <div className="sum-row sum-row-discount">
                <span>
                  {q.bundle.name}, {Math.round(q.bundle.rate * 100)}% off
                </span>
                <span className="sum-value">
                  −{formatFare(q.discount, currency)}
                </span>
              </div>
            )}
          </>
        )}

        <div className="ledger-total">
          <span className="ledger-total-label">Total</span>
          <span className="ledger-total-value">
            {formatFare(q.total, currency)}
          </span>
        </div>
        {currency !== "SAR" && (
          <p className="ledger-alt">
            Charged as SAR {q.total.toLocaleString("en-US")} · conversion
            indicative
          </p>
        )}
      </div>

      <div className="ledger-cta">
        <a
          className="btn btn-primary btn-block chamfer is-clipped"
          href={whatsappLink(buildMessage(tier, selected))}
          target="_blank"
          rel="noopener"
        >
          Send this itinerary on WhatsApp
        </a>
      </div>

      <p className="ledger-foot">
        Fares are per vehicle, not per person, and hold from quote to drop-off.
        Travelling a different route? <a href="/#contact">Send it to us</a> and
        we&apos;ll price it the same way.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fleet — doubles as the ledger's tier selector                       */
/* ------------------------------------------------------------------ */

export function FleetTiers({
  photos,
  children,
}: {
  /** Vehicle photography per tier, resolved on the server. */
  photos?: Partial<Record<TierId, React.ReactNode>>;
  children?: never;
}) {
  const { tier, setTier, currency } = useJourney();
  const reference = legs[0];

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
              {formatFare(reference.fares[t.id], currency)}
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
  const { tier, selected, currency } = useJourney();
  const [show, setShow] = useState(false);
  const q = quote(selected, tier);

  useEffect(() => {
    const ledger = document.getElementById("ledger");

    // Pages without the ledger still need a running total and a way out to
    // WhatsApp, so the bar shows as soon as the reader is past the header.
    if (!ledger) {
      const onScroll = () => setShow(window.scrollY > 320);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(ledger);
    return () => observer.disconnect();
  }, []);

  if (!show || q.lines.length === 0) return null;

  return (
    <div className="farebar">
      <span className="farebar-total">
        <span className="farebar-label">
          {tiers.find((t) => t.id === tier)!.name} · {q.lines.length}{" "}
          {q.lines.length === 1 ? "leg" : "legs"}
        </span>
        <span className="farebar-value">{formatFare(q.total, currency)}</span>
      </span>
      <a
        className="btn btn-primary btn-sm chamfer is-clipped"
        href={whatsappLink(buildMessage(tier, selected))}
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
          `Hello ${site.name} — I'd like a fixed quote for ground transport.\n\nRoute:\nTravel dates:\nNumber of guests:`,
      )}
      target="_blank"
      rel="noopener"
    >
      {children}
    </a>
  );
}
