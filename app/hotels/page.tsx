import type { Metadata } from "next";
import Link from "next/link";
import { HotelEnquiry } from "../components/hotel-enquiry";
import { Media } from "../components/media";
import { Arrow, Check } from "../components/icons";
import { media, resolve } from "@/lib/media";
import { hotelCities, hotelsFor, starBands } from "@/lib/hotels";

export const metadata: Metadata = {
  title: "Hotels in Makkah and Madinah",
  description:
    "Hotels in Makkah and Madinah from 2 to 5 star, walking distance to the Haram or further out with a shuttle. Tell us what you need and we check availability and rates.",
  alternates: { canonical: "/hotels" },
};

const included = [
  "Rooms held while you decide, not booked out from under you",
  "Rates confirmed in writing before you commit",
  "Walking distance or shuttle, whichever suits the party",
  "Family rooms and connecting rooms where the hotel has them",
  "Booked alongside your transfers on one thread",
  "Late arrival flagged to the hotel so the room is not released",
];

export default function HotelsPage() {
  return (
    <>
      <section className="pagehead">
        <div className="backdrop">
          <Media slot={resolve(media.ziyarat.makkah)} sizes="100vw" priority />
        </div>
        <div className="backdrop-scrim" />
        <div className="shell pagehead-inner">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Hotels</span>
          </nav>
          <h1 className="h1">
            Start with <em>where you want to stay</em>
          </h1>
          <p className="lede">
            Hotels in Makkah and Madinah from two star to five, walking distance
            to the Haram or further out with a shuttle. Tell us the city, the
            standard and roughly what you want to spend, and we check what is
            actually available.
          </p>
        </div>
      </section>

      <section className="band" aria-labelledby="hotel-form-title">
        <p className="rail" aria-hidden="true">
          Enquiry
        </p>
        <div className="shell">
          <div className="feature">
            <div className="feature-body" data-reveal>
              <p className="eyebrow">Find a room</p>
              <h2 className="h2" id="hotel-form-title">
                Tell us what you need
              </h2>
              <p className="prose">
                Pick a city and a standard and the list narrows to what we book
                in that band. Choose a specific hotel if you have one in mind,
                or leave it open and we come back with the closest matches on
                your dates.
              </p>
              <ul className="included included-light">
                {included.map((item) => (
                  <li key={item}>
                    <Check />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <HotelEnquiry />
            </div>
          </div>
        </div>
      </section>

      {hotelCities.map((cityItem) => (
        <section
          key={cityItem.id}
          className="band band-surface"
          id={cityItem.id}
          aria-labelledby={`hotels-${cityItem.id}`}
        >
          <div className="shell">
            <div className="band-head-split">
              <div data-reveal="wipe">
                <p className="eyebrow">{cityItem.label}</p>
                <h2 className="h2" id={`hotels-${cityItem.id}`}>
                  Where to stay in {cityItem.label}
                </h2>
              </div>
              <p className="lede" data-reveal>
                Distances are the walk to {cityItem.haram}. Anything beyond a
                comfortable walk includes a shuttle.
              </p>
            </div>

            <div className="star-bands">
              {starBands.map((band) => {
                const list = hotelsFor(cityItem.id, band.stars);
                if (list.length === 0) return null;
                return (
                  <article
                    key={band.stars}
                    className="star-band"
                    data-reveal
                  >
                    <div className="star-band-head">
                      <span className="star-band-mark">{band.stars}★</span>
                      <div>
                        <h3 className="h3">{band.label}</h3>
                        <p className="prose small">{band.blurb}</p>
                      </div>
                    </div>
                    <ul className="hotel-list">
                      {list.map((h) => (
                        <li key={h.id}>
                          <span className="hotel-name">{h.name}</span>
                          <span className="hotel-meta">
                            {h.distance} · {h.note}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <p className="table-note">
              A guide to what we book, not live availability. Rates and rooms
              are confirmed on your dates before you commit to anything.
            </p>
          </div>
        </section>
      ))}

      <section className="band band-field on-field closer">
        <div className="shell closer-inner">
          <div className="band-head band-head-flush">
            <p className="eyebrow">Rooms and transport together</p>
            <h2 className="h2">One provider for the whole ground trip</h2>
            <p className="lede">
              Book the hotel with the transfers and it all sits on one thread:
              the driver knows the hotel, the hotel knows the arrival time, and
              you are not re-explaining the trip to anyone.
            </p>
          </div>
          <div className="closer-actions">
            <Link className="link-arrow" href="/fares">
              See transfer fares <Arrow />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
