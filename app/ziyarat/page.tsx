import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppButton } from "../components/journey";
import { Media } from "../components/media";
import { Arrow } from "../components/icons";
import { media, resolve, type Slot } from "@/lib/media";
import { fareTables, tiers, ziyaratRoutes } from "@/lib/fares";

export const metadata: Metadata = {
  title: "Ziyarat routes",
  description:
    "Three-hour Ziyarat routes through the holy sites of Makkah and Madinah, stop by stop. Hotel pickup and drop-off, the driver waits at every stop, fares fixed per vehicle.",
  alternates: { canonical: "/ziyarat" },
};

/** Stop name to its media slot, in route order. */
const stopSlots: Record<string, keyof typeof media.stops> = {
  "Jabal al-Noor": "jabal-al-noor",
  "Jabal Thawr": "jabal-thawr",
  Mina: "mina",
  Muzdalifah: "muzdalifah",
  "Jabal al-Rahmah, Arafat": "jabal-al-rahmah",
  "Jannat al-Mu'alla": "jannat-al-mualla",
  "Masjid Quba": "masjid-quba",
  "Mount Uhud & Shuhada Uhud": "mount-uhud",
  "Masjid al-Qiblatain": "masjid-al-qiblatain",
  "The Seven Mosques": "seven-mosques",
  "Jannat al-Baqi": "jannat-al-baqi",
};

const ziyaratMessage = [
  "Hello Trust Track Travels. I'd like to book a Ziyarat tour.",
  "",
  "City (Makkah / Madinah / both):",
  "Date:",
  "Number of guests:",
  "Hotel:",
].join("\n");

export default function ZiyaratPage() {
  const ziyaratTables = fareTables.filter((t) => t.id.startsWith("zyr"));

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
            Both routes run three hours from hotel pickup to drop-off, in the
            order below, with the driver waiting at every stop. You decide how
            long to stay; extra hours are charged at the published rate for your
            tier.
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="routes-title">
        <p className="rail" aria-hidden="true">
          Two routes
        </p>
        <div className="shell">
          <h2 className="h2 band-head" id="routes-title">
            Makkah and Madinah
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
                    From <b>SAR {r.from}</b>
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
                In driving order. The route is fixed so the three hours are
                spent at the sites rather than deciding between them.
              </p>
            </div>
            <div className="stop-tiles">
              {r.stops.map((s, i) => {
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
              Per vehicle for the three hours, with the hourly rate if you want
              longer. Booking both cities together takes 8% off.
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
                      <th scope="col">3-hour tour</th>
                      <th scope="col">Extra hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((tier) => (
                      <tr key={tier.id}>
                        <th scope="row">{tier.name}</th>
                        <td className="cell-num">
                          {t.rows[tier.id].toLocaleString("en-US")}
                        </td>
                        <td className="cell-num">
                          {"extra" in t ? `+${t.extra[tier.id]}` : "Not available"}
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
              Tell us the city, the date and how many of you there are. The
              price comes back fixed, and the driver waits at every stop.
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
