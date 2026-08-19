import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppButton } from "../../components/journey";
import { Media } from "../../components/media";
import { Arrow, Check } from "../../components/icons";
import { media, resolve } from "@/lib/media";
import { tiers } from "@/lib/fares";
import { routeBySlug, routes } from "@/lib/routes";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return routes.map((r) => ({ route: r.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/routes/[route]">): Promise<Metadata> {
  const { route: slug } = await params;
  const route = routeBySlug(slug);
  if (!route) return {};

  return {
    title: route.title,
    description: `${route.title} by private chauffeur. ${route.distance}, ${route.duration}. Fixed fare per vehicle from SAR ${route.fares.sedan}, meet-and-greet, flight tracking, no surge.`,
    alternates: { canonical: `/routes/${route.slug}` },
    openGraph: {
      title: `${route.title} | ${site.name}`,
      url: `/routes/${route.slug}`,
    },
  };
}

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default async function RoutePage({
  params,
}: PageProps<"/routes/[route]">) {
  const { route: slug } = await params;
  const route = routeBySlug(slug);
  if (!route) notFound();

  const others = routes.filter((r) => r.slug !== route.slug);
  const message = [
    `Hello ${site.name}. I'd like a fixed fare for ${route.title}.`,
    "",
    "Travel date:",
    "Number of guests:",
    "Number of bags:",
    route.slug === "makkah-to-madinah" ? "Pickup hotel:" : "Flight number:",
  ].join("\n");

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: route.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <section className="pagehead">
        <div className="backdrop">
          <Media
            slot={resolve(media.routes[route.slug as keyof typeof media.routes])}
            sizes="100vw"
            priority
          />
        </div>
        <div className="backdrop-scrim" />
        <div className="shell pagehead-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/fares">Fares</Link>
            <span aria-hidden="true">/</span>
            <span>{route.code}</span>
          </nav>
          <h1 className="h1">{route.title}</h1>
          <p className="lede">{route.summary}</p>
        </div>
      </section>

      <section className="band band-tight band-flush-top band-field on-field">
        <div className="shell">
          <div className="facts">
            {route.facts.map((f) => (
              <div key={f.label} className="fact">
                <p className="caption">{f.label}</p>
                <p className="fact-value">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="route-fares-title">
        <p className="rail" aria-hidden="true">
          {route.code}
        </p>
        <div className="shell">
          <div className="feature">
            <div className="feature-body" data-reveal>
              <p className="eyebrow">The journey</p>
              <h2 className="h2" id="route-fares-title">
                {route.from} to {route.to}
              </h2>
              <p className="prose">{route.intro}</p>
              <WhatsAppButton message={message}>
                Get this fare on WhatsApp
              </WhatsAppButton>
            </div>

            <div data-reveal style={delay(90)}>
              <div className="table-block">
                <div className="table-head">
                  <span className="table-code">{route.code}</span>
                  <h3 className="h3">Fixed fare, per vehicle</h3>
                </div>
                <p className="table-detail">
                  {route.distance} · {route.duration} · one-way
                </p>
                <table className="fare-table">
                  <thead>
                    <tr>
                      <th scope="col">Tier</th>
                      <th scope="col">Guests</th>
                      <th scope="col">One-way</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((t) => (
                      <tr key={t.id}>
                        <th scope="row">{t.name}</th>
                        <td className="cell-num">
                          {t.capacity.replace("Up to ", "").split(" ")[0]}
                        </td>
                        <td className="cell-num">
                          {route.fares[t.id].toLocaleString("en-US")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="table-note">
                  Fares are per vehicle, not per person, and hold from quote to
                  drop-off. Hajj and the last ten days of Ramadan carry a
                  published 25% surcharge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="band band-surface"
        aria-labelledby="route-included-title"
      >
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">On this route</p>
              <h2 className="h2" id="route-included-title">
                What the fare covers
              </h2>
            </div>
            <p className="lede" data-reveal>
              Specific to this leg, on top of everything included on every
              journey we run.
            </p>
          </div>
          <ul className="included included-light" data-reveal>
            {route.includes.map((item) => (
              <li key={item}>
                <Check />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band" aria-labelledby="route-faq-title">
        <p className="rail" aria-hidden="true">
          Questions
        </p>
        <div className="shell">
          <h2 className="h2 band-head" id="route-faq-title">
            What people ask
          </h2>
          <div className="faq">
            {route.faq.map((f, i) => (
              <article
                key={f.q}
                className="faq-item"
                data-reveal
                style={delay(i * 70)}
              >
                <h3 className="h3">{f.q}</h3>
                <p className="prose">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band band-field on-field" aria-labelledby="other-routes">
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Other legs</p>
              <h2 className="h2" id="other-routes">
                The rest of the journey
              </h2>
            </div>
            <p className="lede" data-reveal>
              Book them together and the bundle discount applies on its own.
            </p>
          </div>
          <div className="route-cards">
            {others.map((r, i) => (
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
                    <span>{r.duration}</span>
                    <b>SAR {r.fares.sedan.toLocaleString("en-US")}</b>
                  </span>
                </span>
              </Link>
            ))}
          </div>
          <p className="band-foot" data-reveal>
            <Link className="link-arrow" href="/fares">
              The complete tariff <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="band band-field on-field closer">
        <div className="shell closer-inner">
          <div className="band-head band-head-flush">
            <p className="eyebrow">{route.code}</p>
            <h2 className="h2">Book {route.title.toLowerCase()}</h2>
            <p className="lede">
              Send your date and flight number. The fare comes back fixed, on a
              thread that stays open for the whole trip.
            </p>
          </div>
          <div className="closer-actions">
            <WhatsAppButton message={message}>
              Message us on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
