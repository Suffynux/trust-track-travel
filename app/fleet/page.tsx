import type { Metadata } from "next";
import Link from "next/link";
import { FleetTiers, WhatsAppButton } from "../components/journey";
import { Media } from "../components/media";
import { Arrow, Check } from "../components/icons";
import { media, resolve } from "@/lib/media";
import { fareTables, included, prestige, tiers } from "@/lib/fares";

export const metadata: Metadata = {
  title: "Fleet",
  description:
    "Four fixed tiers and one bespoke: Signature Sedan, Premium SUV, Executive Van, Group Coach, and the Prestige tier by request. Capacity, luggage and fares per vehicle.",
  alternates: { canonical: "/fleet" },
};

const photoFor = {
  sedan: media.fleet.sedan,
  suv: media.fleet.suv,
  van: media.fleet.van,
  coach: media.fleet.coach,
} as const;

const sizingMessage = [
  "Hello Trust Track Travels — please help me pick a vehicle.",
  "",
  "Number of travellers:",
  "Number of bags:",
  "Route:",
  "Travel dates:",
].join("\n");

export default function FleetPage() {
  const photos = {
    sedan: <Media slot={resolve(photoFor.sedan)} sizes="(min-width: 72rem) 25vw, 50vw" />,
    suv: <Media slot={resolve(photoFor.suv)} sizes="(min-width: 72rem) 25vw, 50vw" />,
    van: <Media slot={resolve(photoFor.van)} sizes="(min-width: 72rem) 25vw, 50vw" />,
    coach: <Media slot={resolve(photoFor.coach)} sizes="(min-width: 72rem) 25vw, 50vw" />,
  };

  return (
    <>
      <section className="pagehead">
        <div className="shell pagehead-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Fleet</span>
          </nav>
          <h1 className="h1">
            Four tiers, <em>one bespoke</em>
          </h1>
          <p className="lede">
            Every fare on this site is per vehicle, not per person. A family of
            four in a Premium SUV pays what one person would. Pick the tier that
            fits your party and your luggage, and the ledger reprices the whole
            journey.
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="tiers-title">
        <p className="rail" aria-hidden="true">
          Tiers
        </p>
        <div className="shell">
          <h2 className="h2 band-head" id="tiers-title">
            The vehicles
          </h2>
          <div data-reveal>
            <FleetTiers photos={photos} />
          </div>

          <div className="prestige" data-reveal>
            <p className="eyebrow">By request · {prestige.name}</p>
            <p className="prose small">
              {prestige.anchor}. {prestige.suits} {prestige.note}
            </p>
          </div>
        </div>
      </section>

      <section className="band band-field on-field" aria-labelledby="group-fleet-title">
        <div className="shell">
          <div className="band-head-split">
            <div><p className="eyebrow">Larger parties</p><h2 className="h2" id="group-fleet-title">Hiace to full coach</h2></div>
            <p className="lede">Dedicated group vehicles for families, organisers and 47-seat movements—with luggage space confirmed before booking.</p>
          </div>
          <div className="vehicle-gallery">
            <figure><Media slot={resolve(media.fleet.hiace)} sizes="(min-width: 48rem) 50vw, 100vw" /><figcaption><b>Toyota Hiace</b><span>Up to 11 guests</span></figcaption></figure>
            <figure><Media slot={resolve(media.fleet.bus)} sizes="(min-width: 48rem) 50vw, 100vw" /><figcaption><b>Full coach</b><span>47 seats</span></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="band band-surface" aria-labelledby="cabin-title">
        <div className="shell">
          <div className="feature feature-flip">
            <div className="feature-media" data-reveal>
              <Media
                slot={resolve(media.interior)}
                sizes="(min-width: 62rem) 55vw, 100vw"
              />
            </div>
            <div className="feature-body" data-reveal>
              <p className="eyebrow">The cabin</p>
              <h2 className="h2" id="cabin-title">
                Unmarked, and kept that way
              </h2>
              <p className="prose">
                The fleet carries one discreet decal and nothing else. No wrap,
                no roof sign, no window stickers. Guests booking a private
                chauffeur are choosing to be unremarkable on the road, and a
                branded vehicle takes that away.
              </p>
              <p className="prose">
                Inside: water, refreshments, WiFi, and a seatback card with the
                WhatsApp number in case you need us mid-journey. Child seats and
                wheelchair-accessible vehicles come on request at no extra fare.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="band band-field on-field"
        aria-labelledby="fleet-included-title"
      >
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">On every journey</p>
              <h2 className="h2" id="fleet-included-title">
                In every tier
              </h2>
            </div>
            <p className="lede" data-reveal>
              The list does not shorten on the cheaper vehicles. The difference
              between tiers is space, not service.
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

      <section className="band" aria-labelledby="fleet-fares-title">
        <p className="rail" aria-hidden="true">
          Reference
        </p>
        <div className="shell">
          <div className="band-head-split">
            <div data-reveal="wipe">
              <p className="eyebrow">Reference fares</p>
              <h2 className="h2" id="fleet-fares-title">
                What each tier costs
              </h2>
            </div>
            <p className="lede" data-reveal>
              The two airport transfers, side by side, so you can compare tiers
              on a like-for-like route.
            </p>
          </div>

          <div className="tables">
            {fareTables.slice(0, 2).map((t, i) => (
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
                      <th scope="col">Capacity</th>
                      <th scope="col">One-way</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tiers.map((tier) => (
                      <tr key={tier.id}>
                        <th scope="row">{tier.name}</th>
                        <td className="cell-num">
                          {tier.capacity.replace("Up to ", "").replace(" guests", "")}
                        </td>
                        <td className="cell-num">
                          {t.rows[tier.id].toLocaleString("en-US")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {"note" in t && <p className="table-note">{t.note}</p>}
              </div>
            ))}
          </div>

          <p className="band-foot" data-reveal>
            <Link className="link-arrow" href="/fares">
              Every route and bundle <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="band band-field on-field closer">
        <div className="shell closer-inner">
          <div className="band-head band-head-flush">
            <p className="eyebrow">Not sure which tier?</p>
            <h2 className="h2">Tell us the party, we&apos;ll size it</h2>
            <p className="lede">
              Send the number of travellers and how many bags you are carrying.
              We come back with the right tier and a fixed fare, not an upsell.
            </p>
          </div>
          <div className="closer-actions">
            <WhatsAppButton message={sizingMessage}>
              Ask on WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
