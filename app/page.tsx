import Image from "next/image";
import {
  FareBar,
  FleetTiers,
  JourneyProvider,
  Ledger,
  WhatsAppButton,
} from "./components/journey";
import {
  fareTables,
  included,
  policies,
  prestige,
  tiers,
  ziyaratRoutes,
} from "@/lib/fares";
import { site } from "@/lib/site";

const navLinks = [
  { href: "#fleet", label: "Fleet" },
  { href: "#ziyarat", label: "Ziyarat" },
  { href: "#fares", label: "Fares" },
  { href: "#included", label: "What's included" },
  { href: "#contact", label: "Contact" },
];

const services = [
  {
    code: "JED / MED",
    name: "Airport transfers",
    body: "Jeddah and Madinah airports to your hotel door. Your chauffeur meets you at arrivals holding your name, tracks your flight, and waits 60 minutes at no charge on international landings.",
    from: 260,
  },
  {
    code: "INT",
    name: "Intercity travel",
    body: "Makkah to Madinah along the Haramain Expressway, with a complimentary stop at the Dhul Hulaifah Miqat travelling in the other direction, one rest break, and water in the cabin.",
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

/** Worked examples, all on the Signature Sedan, straight from the guide. */
const bundleExamples = [
  {
    id: "roundtrip",
    name: "Round-trip airport transfer",
    rate: "10% off",
    blurb:
      "Arrival and departure transfer in the same city, on the same tier, booked together.",
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
    blurb: "Makkah Ziyarat and Madinah Ziyarat, booked as one reservation.",
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
      "Arrival, Makkah Ziyarat, intercity, Madinah Ziyarat and departure, in one booking.",
    lines: [
      ["Five legs, Signature Sedan", "2,760"],
      ["Bundle discount", "−414"],
    ],
    total: "2,346",
  },
];

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

export default function Home() {
  return (
    <JourneyProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="masthead on-field">
        <div className="shell masthead-inner">
          <a className="masthead-mark" href="#main" aria-label={site.name}>
            <Image
              src="/logo.png"
              alt={site.name}
              width={592}
              height={247}
              priority
            />
          </a>
          <nav className="masthead-nav" aria-label="Sections">
            {navLinks.map((l) => (
              <a key={l.href} className="masthead-link" href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <WhatsAppButton size="sm">WhatsApp us</WhatsAppButton>
        </div>
      </header>

      <main id="main">
        {/* ---------- Hero ---------- */}
        <section className="hero on-field">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{site.cities}</p>
              <h1 className="display">
                The fare is <em>set</em> before you land
              </h1>
              <p className="lede">
                Airport transfers, intercity travel and Ziyarat touring for
                pilgrims arriving from the UK, the US and Pakistan. Every leg is
                priced per vehicle and held from quote to drop-off — no meter,
                no negotiation, no surge.
              </p>
              <div className="hero-marks">
                {marks.map((m) => (
                  <span key={m} className="mark-chip">
                    {m}
                  </span>
                ))}
              </div>
            </div>
            <Ledger />
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section className="band" aria-labelledby="services-title">
          <div className="shell">
            <div className="band-head">
              <p className="eyebrow">Services</p>
              <h2 className="h2" id="services-title">
                Three ways we move you
              </h2>
              <p className="lede">
                Every route below is quoted per vehicle and fixed before you
                travel. The full tier-by-tier tariff is further down this page.
              </p>
            </div>
            <div className="services">
              {services.map((s) => (
                <article key={s.name} className="service">
                  <p className="service-code">{s.code}</p>
                  <h3 className="h3">{s.name}</h3>
                  <p className="prose">{s.body}</p>
                  <p className="service-from">
                    From <b>SAR {s.from.toLocaleString("en-US")}</b>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Fleet ---------- */}
        <section
          className="band band-field on-field"
          id="fleet"
          aria-labelledby="fleet-title"
        >
          <div className="shell">
            <div className="band-head">
              <p className="eyebrow">Fleet</p>
              <h2 className="h2" id="fleet-title">
                Four tiers, one bespoke
              </h2>
              <p className="lede">
                Fares are per vehicle, not per person. Choose a tier and the
                ledger at the top of the page reprices your whole journey. The
                figure on each card is the Jeddah airport transfer, shown as a
                common reference point.
              </p>
            </div>
            <FleetTiers />
            <div className="prestige">
              <p className="eyebrow">By request · {prestige.name}</p>
              <p className="prose">
                {prestige.anchor}, quoted individually rather than listed at a
                fixed rate. For VIP guests, anniversary Umrah, and dignitary
                movements.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Ziyarat ---------- */}
        <section className="band" id="ziyarat" aria-labelledby="ziyarat-title">
          <div className="shell">
            <div className="band-head">
              <p className="eyebrow">Ziyarat</p>
              <h2 className="h2" id="ziyarat-title">
                The routes, stop by stop
              </h2>
              <p className="lede">
                Both routes run three hours from hotel pickup to drop-off, in
                the order below, with the driver waiting at every stop. Extra
                hours are charged at the published rate for your tier.
              </p>
            </div>
            <div className="routes">
              {ziyaratRoutes.map((r) => (
                <article key={r.city}>
                  <div className="route-head">
                    <h3 className="h2 route-city">
                      {r.city}
                    </h3>
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

        {/* ---------- Fares ---------- */}
        <section className="band" id="fares" aria-labelledby="fares-title">
          <div className="shell">
            <div className="band-head">
              <p className="eyebrow">Tariff</p>
              <h2 className="h2" id="fares-title">
                Every fare we charge
              </h2>
              <p className="lede">
                One-way, per vehicle, in Saudi riyals. These are the numbers we
                quote from — there is no second price list.
              </p>
            </div>

            <div className="tables">
              {fareTables.map((t) => (
                <div key={t.id} className="table-block">
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
                          {"extra" in t ? "3-hour tour" : "One-way"}
                        </th>
                        {"extra" in t && <th scope="col">Extra hour</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {tiers.map((tier) => (
                        <tr key={tier.id}>
                          <th scope="row">
                            {tier.name}
                          </th>
                          <td className="cell-num">
                            {t.rows[tier.id].toLocaleString("en-US")}
                          </td>
                          {"extra" in t && (
                            <td className="cell-num">
                              +{t.extra[tier.id]}
                            </td>
                          )}
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
          </div>
        </section>

        {/* ---------- Bundles ---------- */}
        <section className="band" aria-labelledby="bundles-title">
          <div className="shell">
            <div className="band-head">
              <p className="eyebrow">Bundles</p>
              <h2 className="h2" id="bundles-title">
                Book the journey, not the leg
              </h2>
              <p className="lede">
                Discounts apply on their own when the qualifying legs are booked
                together on one tier. Examples below use the Signature Sedan;
                the same percentage applies at every tier.
              </p>
            </div>
            <div className="bundles">
              {bundleExamples.map((b) => (
                <article key={b.id} className="bundle">
                  <span className="bundle-rate">{b.rate}</span>
                  <h3 className="h3">{b.name}</h3>
                  <p className="prose text-sm">
                    {b.blurb}
                  </p>
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

        {/* ---------- Included ---------- */}
        <section
          className="band band-field on-field"
          id="included"
          aria-labelledby="included-title"
        >
          <div className="shell">
            <div className="band-head">
              <p className="eyebrow">On every journey</p>
              <h2 className="h2" id="included-title">
                What the fixed price buys
              </h2>
              <p className="lede">
                None of the following is an add-on, an upgrade, or a line item
                you will find on the invoice.
              </p>
            </div>
            <ul className="included">
              {included.map((item) => (
                <li key={item}>
                  <Check />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Policy ---------- */}
        <section className="band" aria-labelledby="policy-title">
          <div className="shell">
            <div className="band-head">
              <p className="eyebrow">Booking terms</p>
              <h2 className="h2" id="policy-title">
                The fine print, kept short
              </h2>
            </div>
            <div className="policies">
              {policies.map((p) => (
                <article key={p.title} className="policy">
                  <h3 className="h3">{p.title}</h3>
                  <p className="prose text-md">
                    {p.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- Closing CTA ---------- */}
        <section
          className="band band-field on-field"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="shell closer">
            <div className="band-head">
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
      </main>

      <footer className="footer on-field">
        <div className="shell">
          <div className="footer-grid">
            <div>
              <Image
                className="footer-mark"
                src="/logo.png"
                alt={site.name}
                width={592}
                height={247}
              />
              <p className="prose footer-blurb">
                Ground transport and Ziyarat touring for pilgrims travelling to
                Makkah and Madinah from the UK, the US and Pakistan.
              </p>
            </div>
            <div>
              <p className="eyebrow footer-head">Sections</p>
              <ul className="footer-list">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow footer-head">Reach us</p>
              <ul className="footer-list">
                <li>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <span>{site.cities}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-base">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <span>TGA &amp; Nusuk-registered ground transport</span>
          </div>
        </div>
      </footer>

      <FareBar />
    </JourneyProvider>
  );
}
