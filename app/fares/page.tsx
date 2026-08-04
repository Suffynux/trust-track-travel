import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "../components/journey";
import { Arrow, Check } from "../components/icons";
import { fareTables, included, policies, tiers } from "@/lib/fares";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Fares",
  description:
    "The complete Trust Track Travels tariff in Saudi riyals: airport transfers, Makkah–Madinah intercity, Ziyarat routes, bundle discounts and booking terms. Per vehicle, fixed at the quote.",
  alternates: { canonical: "/fares" },
};

const bundleExamples = [
  {
    id: "roundtrip",
    name: "Round-trip airport transfer",
    rate: "10% off",
    blurb:
      "Arrival and departure in the same city, on the same tier, booked together in one reservation.",
    lines: [
      ["2 × Jeddah–Makkah transfer", "1,100"],
      ["Bundle discount", "−110"],
    ],
    total: "990",
  },
  {
    id: "twin",
    name: "Twin Ziyarat",
    rate: "8% off",
    blurb:
      "The Makkah route and the Madinah route, booked as one reservation on one tier.",
    lines: [
      ["Makkah + Madinah Ziyarat", "800"],
      ["Bundle discount", "−64"],
    ],
    total: "736",
  },
  {
    id: "complete",
    name: "Complete pilgrimage transfer",
    rate: "15% off",
    blurb:
      "The full itinerary in one booking: arrival, Makkah Ziyarat, intercity, Madinah Ziyarat, departure.",
    lines: [
      ["Five legs, Signature Sedan", "2,760"],
      ["Bundle discount", "−414"],
    ],
    total: "2,346",
  },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default function FaresPage() {
  return (
    <>
      <section className="pagehead">
        <div className="shell pagehead-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Fares</span>
          </nav>
          <h1 className="h1">
            The complete <em>tariff</em>
          </h1>
          <p className="lede">
            Every fare we charge, one-way and per vehicle, in Saudi riyals.
            These are the numbers we quote from. There is no second price list
            and no fare that appears only at drop-off.
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="tables-title">
        <p className="rail" aria-hidden="true">
          Fares
        </p>
        <div className="shell">
          <h2 className="h2 band-head" id="tables-title">
            Route by route
          </h2>

          <div className="tables">
            {fareTables.map((t, i) => {
              const hasExtra = "extra" in t;
              return (
                <div
                  key={t.id}
                  className="table-block"
                  data-reveal
                  style={delay((i % 2) * 90)}
                >
                  <div className="table-head">
                    <span className="table-code">{t.code}</span>
                    <h3 className="h3">{t.title}</h3>
                  </div>
                  <p className="table-detail">{t.detail}</p>
                  <table className="fare-table">
                    <thead>
                      <tr>
                        <th scope="col">Tier</th>
                        <th scope="col">
                          {hasExtra ? "3-hour tour" : "One-way"}
                        </th>
                        {hasExtra && <th scope="col">Extra hour</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {tiers.map((tier) => (
                        <tr key={tier.id}>
                          <th scope="row">{tier.name}</th>
                          <td className="cell-num">
                            {t.rows[tier.id].toLocaleString("en-US")}
                          </td>
                          {hasExtra && (
                            <td className="cell-num">+{t.extra[tier.id]}</td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {"note" in t && t.note && (
                    <p className="table-note">{t.note}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="band band-surface" aria-labelledby="bundles-title">
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Bundles</p>
              <h2 className="h2" id="bundles-title">
                Book the journey, not the leg
              </h2>
            </div>
            <p className="lede" data-reveal>
              Discounts apply on their own when the qualifying legs are booked
              together on one tier. Examples use the Signature Sedan; the
              percentage is the same at every tier.
            </p>
          </div>

          <div className="bundles">
            {bundleExamples.map((b, i) => (
              <article
                key={b.id}
                className="bundle"
                data-reveal
                style={delay(i * 90)}
              >
                <span className="bundle-rate">{b.rate}</span>
                <h3 className="h3">{b.name}</h3>
                <p className="prose small">{b.blurb}</p>
                <div className="bundle-lines fig">
                  {b.lines.map(([label, value]) => (
                    <div key={label} className="bundle-line">
                      <span>{label}</span>
                      <span>{value}</span>
                    </div>
                  ))}
                  <div className="bundle-line bundle-line-total">
                    <span>Total, SAR</span>
                    <span>{b.total}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="included-title">
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">On every journey</p>
              <h2 className="h2" id="included-title">
                What the fare already covers
              </h2>
            </div>
            <p className="lede" data-reveal>
              None of this is an add-on or an upgrade. If it is on this list, it
              is in the number you were quoted.
            </p>
          </div>
          <ul className="included included-light" data-reveal>
            {included.map((item) => (
              <li key={item}>
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="band band-field on-field"
        aria-labelledby="policy-title"
      >
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Booking terms</p>
              <h2 className="h2" id="policy-title">
                The fine print, kept short
              </h2>
            </div>
            <p className="lede" data-reveal>
              Five things worth knowing before you book. All of them are
              disclosed at the quote rather than at pickup.
            </p>
          </div>
          <div className="facts facts-policy" data-reveal>
            {policies.map((p) => (
              <article key={p.title} className="fact">
                <h3 className="h4">{p.title}</h3>
                <p className="prose small">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="route-pages-title">
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">By route</p>
              <h2 className="h2" id="route-pages-title">
                Pricing one leg in particular
              </h2>
            </div>
            <p className="lede" data-reveal>
              Each route page carries its own fares, timings and the questions
              we get asked most about that journey.
            </p>
          </div>
          <ul className="link-list" data-reveal>
            {routes.map((r) => (
              <li key={r.slug}>
                <Link className="link-arrow" href={`/routes/${r.slug}`}>
                  {r.title} <Arrow />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band-field on-field closer">
        <div className="shell closer-inner">
          <div className="band-head band-head-flush">
            <p className="eyebrow">Get your number</p>
            <h2 className="h2">A quote, not an estimate</h2>
            <p className="lede">
              Send your dates, flight number and hotels. We reply with the fare
              for your exact itinerary, and it holds from that message to
              drop-off.
            </p>
          </div>
          <div className="closer-actions">
            <WhatsAppButton>Get a fixed quote</WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
