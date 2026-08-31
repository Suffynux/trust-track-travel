import Link from "next/link";
import { DisplayFare, FleetTiers, WhatsAppButton } from "./components/journey";
import { HeroBooking } from "./components/hero-booking";
import { HotelEnquiry } from "./components/hotel-enquiry";
import { HeroBackdrop, Media } from "./components/media";
import { Arrow, Check } from "./components/icons";
import { media, resolve } from "@/lib/media";
import { fareTables, included, prestige, tiers } from "@/lib/fares";
import { routes } from "@/lib/routes";
import { site } from "@/lib/site";

const services = [
  {
    code: "JED / MED",
    name: "Airport transfers",
    body: "Jeddah and Madinah airports to your hotel door. Your chauffeur meets you at arrivals holding your name, tracks the flight, and waits an hour at no charge on international landings.",
    from: 260,
  },
  {
    code: "INT",
    name: "Intercity travel",
    body: "Makkah to Madinah along the Haramain Expressway, with a complimentary Dhul Hulaifah Miqat stop in the other direction, one rest break, and water in the cabin.",
    from: 1150,
  },
  {
    code: "ZYR",
    name: "Ziyarat touring",
    body: "Half-day routes through the holy sites of both cities. The driver waits at every stop, so you decide how long to stay rather than watching a meter.",
    from: 380,
  },
];

const marks = [
  "TGA registered",
  "Nusuk registered",
  "20+ vehicles",
  "24/7 WhatsApp",
];

const bundleExamples = [
  {
    id: "roundtrip",
    name: "Round-trip airport transfer",
    rate: "10% off",
    blurb:
      "Arrival and departure in the same city, on the same tier, booked together.",
    lines: [
      ["2 × Jeddah–Makkah transfer", "400"],
      ["Bundle discount", "−40"],
    ],
    total: "360",
  },
  {
    id: "twin",
    name: "Twin Ziyarat",
    rate: "8% off",
    blurb: "Makkah Ziyarat and Madinah Ziyarat, booked as one reservation.",
    lines: [
      ["Makkah + Madinah Ziyarat", "400"],
      ["Bundle discount", "−32"],
    ],
    total: "368",
  },
  {
    id: "complete",
    name: "Complete pilgrimage transfer",
    rate: "15% off",
    blurb:
      "Arrival, Makkah Ziyarat, intercity, Madinah Ziyarat and departure, in one booking.",
    lines: [
      ["Five legs, Sedan", "1,080"],
      ["Bundle discount", "−162"],
    ],
    total: "918",
  },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;
const sarAmount = (value: string) => Number(value.replace(/[^\d]/g, ""));

export default function Home() {
  const fleetPhotos = {
    sedan: (
      <Media
        slot={resolve(media.fleet.sedan)}
        sizes="(min-width: 72rem) 25vw, 50vw"
      />
    ),
    suv: (
      <Media
        slot={resolve(media.fleet.suv)}
        sizes="(min-width: 72rem) 25vw, 50vw"
      />
    ),
    van: (
      <Media
        slot={resolve(media.fleet.van)}
        sizes="(min-width: 72rem) 25vw, 50vw"
      />
    ),
    coach: (
      <Media
        slot={resolve(media.fleet.coach)}
        sizes="(min-width: 72rem) 25vw, 50vw"
      />
    ),
  };

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero on-field">
        <HeroBackdrop
          video={resolve(media.heroVideo)}
          webm={resolve(media.heroVideoWebm)}
          poster={resolve(media.heroPoster)}
        />
        <div className="shell hero-inner">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{site.cities}</p>
              <h1 className="display">
                The fare is <em>set</em> before you land
              </h1>
              <p className="lede">
                Private, door-to-door journeys for Umrah and Ziyarat, planned
                around your flight, your hotel and the people travelling with
                you. One clear vehicle price, agreed before you arrive.
              </p>
              <div className="hero-marks">
                {marks.map((m) => (
                  <span key={m} className="mark-chip">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-ledger">
              <HeroBooking />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="band" aria-labelledby="services-title">
        <p className="rail" aria-hidden="true">
          Services
        </p>
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Services</p>
              <h2 className="h2" id="services-title">
                Three ways we move you
              </h2>
            </div>
            <p className="lede" data-reveal style={delay(80)}>
              Every route is quoted per vehicle and fixed before you travel.
              There is no second price list.
            </p>
          </div>

          <div className="stack">
            {services.map((s, i) => (
              <article
                key={s.name}
                className="stack-item"
                data-reveal
                style={delay(i * 90)}
              >
                <p className="stack-code">{s.code}</p>
                <h3 className="stack-title">{s.name}</h3>
                <p className="prose small">{s.body}</p>
                <p className="stack-fare fig">
                  <DisplayFare sar={s.from} />
                  <small>From, per vehicle</small>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="image-stories" aria-label="The Trust Track journey">
        <figure className="image-story"><Media slot={resolve(media.meetAndGreet)} sizes="(min-width: 48rem) 33vw, 100vw" /><figcaption>Meet at arrivals</figcaption></figure>
        <figure className="image-story"><Media slot={resolve(media.hotelArrival)} sizes="(min-width: 48rem) 33vw, 100vw" /><figcaption>Hotel-door service</figcaption></figure>
        <figure className="image-story"><Media slot={resolve(media.routes["madinah-to-badr"])} sizes="(min-width: 48rem) 33vw, 100vw" /><figcaption>Across the Hijaz</figcaption></figure>
      </section>

      {/* ---------- Fleet ---------- */}
      <section
        className="band band-field on-field"
        id="fleet"
        aria-labelledby="fleet-title"
      >
        <p className="rail" aria-hidden="true">
          Fleet
        </p>
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Fleet</p>
              <h2 className="h2" id="fleet-title">
                Four tiers, one bespoke
              </h2>
            </div>
            <p className="lede" data-reveal>
              Choose a tier and the ledger reprices your whole journey. The
              figure on each card is the Jeddah airport transfer, shown as a
              common reference point.
            </p>
          </div>

          <div data-reveal>
            <FleetTiers photos={fleetPhotos} />
          </div>

          <div className="prestige" data-reveal>
            <p className="eyebrow">By request · {prestige.name}</p>
            <p className="prose small">
              {prestige.anchor}, quoted individually rather than listed at a
              fixed rate. For VIP guests, anniversary Umrah, and dignitary
              movements.
            </p>
          </div>

          <p className="band-foot" data-reveal>
            <Link className="link-arrow" href="/fleet">
              See the fleet in full <Arrow />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- Hotels ---------- */}
      <section className="band" id="hotels" aria-labelledby="hotels-title">
        <p className="rail" aria-hidden="true">
          Hotels
        </p>
        <div className="shell">
          <div className="feature">
            <div className="feature-body" data-reveal>
              <p className="eyebrow">Hotels</p>
              <h2 className="h2" id="hotels-title">
                Need a room as well?
              </h2>
              <p className="prose">
                We book hotels in Makkah and Madinah alongside the transport, so
                the whole ground trip sits with one provider on one thread. Tell
                us roughly what you are after and we come back with what is
                actually available on your dates.
              </p>
              <ul className="hotel-points">
                <li>Walking distance to the Haram, or further out with a shuttle.</li>
                <li>Three star through to five, and serviced apartments.</li>
                <li>Rates confirmed before you commit to anything.</li>
              </ul>
            </div>

            <div data-reveal style={delay(90)}>
              <HotelEnquiry />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Routes ---------- */}
      <section className="band" aria-labelledby="routes-title">
        <p className="rail" aria-hidden="true">
          Routes
        </p>
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Routes</p>
              <h2 className="h2" id="routes-title">
                The three legs people book
              </h2>
            </div>
            <p className="lede" data-reveal>
              Each has its own page with timings, the full tariff for that
              route, and the questions we get asked most.
            </p>
          </div>

          <div className="route-cards">
            {routes.map((r, i) => (
              <Link
                key={r.slug}
                className="route-card"
                href={`/routes/${r.slug}`}
                data-reveal
                style={delay(i * 90)}
              >
                <Media
                  slot={resolve(
                    media.routes[r.slug as keyof typeof media.routes],
                  )}
                  sizes="(min-width: 56rem) 33vw, 100vw"
                />
                <span className="route-card-body">
                  <span className="route-card-code">{r.code}</span>
                  <span className="route-card-title">{r.title}</span>
                  <span className="route-card-meta fig">
                    <span>
                      {r.distance} · {r.duration}
                    </span>
                    <b><DisplayFare sar={r.fares.sedan} /></b>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Why the fare holds ---------- */}
      <section className="band band-surface" aria-labelledby="why-title">
        <div className="shell">
          <div className="feature">
            <div className="feature-media" data-reveal>
              <Media
                slot={resolve(media.interior)}
                sizes="(min-width: 62rem) 55vw, 100vw"
              />
            </div>
            <div className="feature-body" data-reveal style={delay(80)}>
              <p className="eyebrow">Why the fare holds</p>
              <h2 className="h2" id="why-title">
                No meter, no negotiation
              </h2>
              <p className="prose">
                A street driver prices your journey when you are tired, holding
                bags and out of options. We price it before you fly. The number
                you agree is the number at drop-off, including a delayed
                landing, an extra hour of waiting, or traffic on the Haramain.
              </p>
              <p className="prose">
                Peak season is the one exception, and it is published rather
                than sprung: a flat 25% during Hajj and the last ten days of
                Ramadan, disclosed when you get your quote.
              </p>
              <Link className="link-arrow" href="/fares">
                Read the full tariff <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Fares preview ---------- */}
      <section className="band" id="fares" aria-labelledby="fares-title">
        <p className="rail" aria-hidden="true">
          Tariff
        </p>
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Tariff</p>
              <h2 className="h2" id="fares-title">
                The transfer fares
              </h2>
            </div>
            <p className="lede" data-reveal>
              One-way, per vehicle, in Saudi riyals. Intercity, Ziyarat and the
              booking terms are on the fares page.
            </p>
          </div>

          <div className="tables">
            {fareTables.slice(0, 2).map((t, i) => (
              <div
                key={t.id}
                className="table-block"
                data-reveal
                style={delay(i * 90)}
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
                      <th scope="col">One-way</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((tier) => (
                      <tr key={tier.id}>
                        <th scope="row">{tier.name}</th>
                        <td className="cell-num">
                          <DisplayFare sar={t.rows[tier.id]} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {"note" in t && <p className="table-note">{t.note}</p>}
              </div>
            ))}
          </div>

          <div className="bundles band-gap">
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
                      <span><DisplayFare sar={sarAmount(value)} prefix={value.startsWith("−") ? "−" : ""} /></span>
                    </div>
                  ))}
                  <div className="bundle-line bundle-line-total">
                    <span>Total</span>
                    <span><DisplayFare sar={sarAmount(b.total)} /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Included ---------- */}
      <section
        className="band band-field on-field"
        id="included"
        aria-labelledby="included-title"
      >
        <p className="rail" aria-hidden="true">
          On every journey
        </p>
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">On every journey</p>
              <h2 className="h2" id="included-title">
                What the fixed price buys
              </h2>
            </div>
            <p className="lede" data-reveal>
              None of this is an add-on, an upgrade, or a line you will find on
              the invoice afterwards.
            </p>
          </div>
          <ul className="included" data-reveal>
            {included.map((item) => (
              <li key={item}>
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Closing CTA ---------- */}
      <section
        className="band band-field on-field closer"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div className="backdrop">
          <Media slot={resolve(media.expressway)} sizes="100vw" />
        </div>
        <div className="backdrop-scrim" />
        <div className="shell closer-inner">
          <div className="band-head band-head-flush">
            <p className="eyebrow">Contact</p>
            <h2 className="h2" id="contact-title">
              Send your flight, get your fare
            </h2>
            <p className="lede">
              Message us with your dates, flight number and hotels. A fixed
              price comes back in minutes, on one WhatsApp thread that stays
              open for the whole trip.
            </p>
          </div>
          <div className="closer-actions">
            <WhatsAppButton>Message us on WhatsApp</WhatsAppButton>
            <a
              className="btn btn-outline chamfer is-clipped"
              href={`tel:${site.phone.replace(/\s/g, "")}`}
            >
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
