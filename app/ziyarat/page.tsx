import type { Metadata } from "next";
import Link from "next/link";
import { DisplayFare, WhatsAppButton } from "../components/journey";
import { Media } from "../components/media";
import { Arrow } from "../components/icons";
import { media, resolve, type Slot } from "@/lib/media";
import { fareTables, tiers, ziyaratRoutes } from "@/lib/fares";

export const metadata: Metadata = {
  title: "Ziyarat routes",
  description:
    "Ziyarat in Makkah and Madinah, plus Badr (Badar) from Madinah. Explore the stops, historical details and per-vehicle fares, with return visits quoted individually.",
  alternates: { canonical: "/ziyarat" },
};

/** Stop name to its media slot, in route order. */
const stopSlots: Record<string, keyof typeof media.stops> = {
  "Jabal al-Noor": "jabal-al-noor",
  "Jabal Thawr": "jabal-thawr",
  Mina: "mina",
  Muzdalifah: "muzdalifah",
  "Jabal al-Rahmah, Arafat": "jabal-al-rahmah",
  "Masjid Quba": "masjid-quba",
  "Mount Uhud & Shuhada Uhud": "mount-uhud",
  "Masjid al-Qiblatain": "masjid-al-qiblatain",
  "The Seven Mosques": "seven-mosques",
  "Ghars Well": "ghars-well",
  "Salman Al Farsi Farm": "salman-al-farsi-farm",
};

// Historical details verified against Visit Madinah's Badr destination guide.
const stopDetails: Partial<Record<string, string>> = {
  "Masjid al-Arish":
    "The mosque marks the site associated with the shelter from which Prophet Muhammad ﷺ directed the Battle of Badr.",
  "Badr battlefield":
    "The historic area where the Battle of Badr took place in Ramadan, 2 AH (624 CE). The surrounding valley helps place the events in their geographical setting.",
  "Martyrs of Badr Cemetery":
    "The cemetery commemorates the companions who were martyred at Badr. A respectful visit or an outside viewing depends on access on the day.",
};

const ziyaratMessage = [
  "Hello Trust Track Travels. I'd like to book a Ziyarat tour.",
  "",
  "Route (Makkah / Madinah / Badr / multiple):",
  "Date:",
  "Number of guests:",
  "Hotel:",
  "For Badr: one-way transfer or return visit with sightseeing?",
].join("\n");

export default function ZiyaratPage() {
  const ziyaratTables = fareTables.filter((t) => t.id.startsWith("zyr") || t.id === "badr");

  return (
    <>
      <section className="pagehead">
        <div className="backdrop">
          <Media slot={resolve(media.ziyarat.makkah)} sizes="100vw" />
        </div>
        <div className="backdrop-scrim" />
        <div className="shell pagehead-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Ziyarat</span>
          </nav>
          <h1 className="h1">
            The routes, <em>stop by stop</em>
          </h1>
          <p className="lede">
            Makkah and Madinah tours run two hours from hotel pickup to
            drop-off, with the driver waiting at every stop. Badr is a longer
            trip from Madinah, with the itinerary, return journey and duration
            agreed when you book. Extra hours are quoted on request.
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="routes-title">
        <p className="rail" aria-hidden="true">
          Three routes
        </p>
        <div className="shell">
          <h2 className="h2 band-head" id="routes-title">
            Makkah, Madinah and Badr
          </h2>

          <div className="routes-grid">
            {ziyaratRoutes.map((r, ri) => (
              <article
                key={r.city}
                data-reveal
                style={{ "--delay": `${ri * 100}ms` } as React.CSSProperties}
              >
                <div className="route-head">
                  <h3 className="route-city">{r.city}</h3>
                  <p className="route-from">
                    From <b><DisplayFare sar={r.from} /></b>
                    {r.city === "Badr" && <small>One-way transfer</small>}
                  </p>
                </div>
                <ol className="stops">
                  {r.stops.map((s) => (
                    <li key={s} className="stop">
                      <span className="stop-dot" aria-hidden="true" />
                      <span className="stop-name">{s}</span>
                    </li>
                  ))}
                </ol>
                <p className="route-note">{r.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {ziyaratRoutes.map((r) => (
        <section
          key={r.city}
          className="band band-surface"
          aria-labelledby={`tiles-${r.city}`}
        >
          <div className="shell">
            <div className="band-head-split">
              <div data-reveal="wipe">
                <p className="eyebrow">{r.city} · {r.duration}</p>
                <h2 className="h2" id={`tiles-${r.city}`}>
                  Where you stop
                </h2>
              </div>
              <p className="lede" data-reveal>
                {r.city === "Badr"
                  ? "Visit the historical sites associated with the Battle of Badr, about 150 km from Madinah. Confirm pickup, stop order, time at each site and your return journey when booking."
                  : "In driving order. The route is fixed so the two hours are spent at the sites rather than deciding between them."}
              </p>
            </div>
            <div className="stop-tiles">
              {r.stops.map((s, i) => {
                const description = stopDetails[s];
                if (description) {
                  return (
                    <article key={s} className="stop-detail" data-reveal>
                      <h3 className="stop-tile-name">
                        <span className="stop-tile-index">{String(i + 1).padStart(2, "0")}</span>
                        <span>{s}</span>
                      </h3>
                      <p>{description}</p>
                    </article>
                  );
                }
                const key = stopSlots[s];
                const slot = key
                  ? (media.stops[key] as Slot)
                  : media.ziyarat.makkah;
                return (
                  <figure
                    key={s}
                    className="stop-tile"
                    data-reveal
                    style={{ "--delay": `${i * 70}ms` } as React.CSSProperties}
                  >
                    <Media
                      slot={resolve(slot)}
                      sizes="(min-width: 46rem) 33vw, 50vw"
                    />
                    <figcaption className="stop-tile-name">
                      <span className="stop-tile-index">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{s}</span>
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            {r.city === "Badr" && (
              <p className="band-foot">
                <a className="link-arrow" href="https://visitmadinahsa.com/sa-en/destinations/The-Journey-of-the-Prophetic-Path-to-the-Great-Battle-of-Badr" target="_blank" rel="noopener noreferrer">
                  Badr history · Visit Madinah <Arrow />
                </a>
              </p>
            )}
          </div>
        </section>
      ))}

      <section className="band" aria-labelledby="ziyarat-fares-title">
        <p className="rail" aria-hidden="true">
          Tariff
        </p>
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Tariff</p>
              <h2 className="h2" id="ziyarat-fares-title">
                What a route costs
              </h2>
            </div>
            <p className="lede" data-reveal>
              Makkah and Madinah fares cover a two-hour tour per vehicle;
              booking both together takes 8% off. Badr fares below cover a
              one-way transfer only. Ask for a fixed quote for a return visit
              with sightseeing.
            </p>
          </div>

          <div className="tables">
            {ziyaratTables.map((t, i) => (
              <div
                key={t.id}
                className="table-block"
                data-reveal
                style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
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
                      <th scope="col">{t.id === "badr" ? "One-way transfer" : "2-hour tour"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((tier) => (
                      <tr key={tier.id}>
                        <th scope="row">{tier.name}</th>
                        <td className="cell-num">
                          {t.rows[tier.id] === undefined ? (t.id === "badr" ? "Unavailable" : "On request") : <DisplayFare sar={t.rows[tier.id]} />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {"note" in t && t.note && (
                  <p className="table-note">{t.note}</p>
                )}
              </div>
            ))}
          </div>

          <p className="band-foot" data-reveal>
            <Link className="link-arrow" href="/fares">
              Every fare and bundle <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="band band-field on-field closer">
        <div className="shell closer-inner">
          <div className="band-head band-head-flush">
            <p className="eyebrow">Book a route</p>
            <h2 className="h2">Pick your day, we&apos;ll set the fare</h2>
            <p className="lede">
              Tell us the route, the date and how many of you there are. For
              Badr, include whether you need a one-way transfer or a return
              visit with sightseeing. We confirm your itinerary and fixed fare.
            </p>
          </div>
          <div className="closer-actions">
            <WhatsAppButton message={ziyaratMessage}>
              Book Ziyarat on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
