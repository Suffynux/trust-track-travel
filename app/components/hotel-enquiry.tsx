"use client";

import { useMemo, useState } from "react";
import {
  hotelAreas,
  hotelBudgets,
  hotelCategories,
  hotelCities,
  type HotelCityId,
} from "@/lib/hotels";
import { site, whatsappLink } from "@/lib/site";

/**
 * Hotel enquiry. Mirrors the transfer form's structure and classes so the two
 * read as one system, and hands the request to the same WhatsApp thread.
 *
 * Nothing here is priced: rates move with the season, so quoting a figure on
 * the page would be a number we could not hold. The form gathers enough to
 * check availability, and the reply carries the actual rate.
 */

/** Today in the visitor's own timezone, as YYYY-MM-DD for the date inputs. */
function todayISO() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

/**
 * Date arithmetic on the calendar date itself.
 *
 * The obvious version — parse local, setDate, toISOString — silently returns
 * the same date east of UTC, because toISOString converts back to UTC and
 * lands on the previous day, cancelling the increment. Working in UTC
 * throughout keeps a calendar date a calendar date.
 */
function addDays(iso: string, days: number) {
  const date = new Date(`${iso}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Nights between two ISO dates, or null when the range is not usable. */
function nightsBetween(from: string, to: string) {
  if (!from || !to) return null;
  const ms =
    new Date(`${to}T00:00:00Z`).getTime() - new Date(`${from}T00:00:00Z`).getTime();
  const nights = Math.round(ms / 86400000);
  return nights > 0 ? nights : null;
}

/** Written out so the operator can read the dates without decoding them. */
function readable(iso: string) {
  if (!iso) return "Not given";
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function HotelEnquiry() {
  const [city, setCity] = useState<HotelCityId>("makkah");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");

  const selectedCity = hotelCities.find((c) => c.id === city)!;
  const minCheckIn = todayISO();

  // Check-out must be after check-in. Derived during render rather than
  // corrected in the change handler, so there is no window in which state
  // holds an impossible range.
  const minCheckOut = checkIn ? addDays(checkIn, 1) : minCheckIn;
  const effectiveCheckOut =
    checkIn && checkOut && checkOut <= checkIn ? minCheckOut : checkOut;
  const nights = nightsBetween(checkIn, effectiveCheckOut);

  const labelFor = (
    list: readonly { id: string; label: string }[],
    id: string,
  ) => list.find((item) => item.id === id)?.label ?? "No preference";

  const message = useMemo(
    () =>
      [
        `Hotel enquiry for ${site.name}`,
        "",
        `City: ${selectedCity.label}`,
        `Area: ${labelFor(hotelAreas, area)}`,
        `Category: ${labelFor(hotelCategories, category)}`,
        `Budget: ${labelFor(hotelBudgets, budget)}`,
        "",
        `Check-in: ${readable(checkIn)}`,
        `Check-out: ${readable(effectiveCheckOut)}`,
        nights ? `Nights: ${nights}` : "Nights: Not given",
        `Guests: ${guests || "Not given"}`,
        `Rooms: ${rooms || "Not given"}`,
      ].join("\n"),
    [area, budget, category, checkIn, effectiveCheckOut, guests, nights, rooms, selectedCity.label],
  );

  return (
    <form
      className="ledger booking-form chamfer"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="ledger-top">
        <h3 className="ledger-title">Find a hotel</h3>
        <span className="booking-step">Enquiry</span>
      </div>

      <div className="booking-field">
        <label className="booking-label" htmlFor="hotel-city">
          City
        </label>
        <select
          className="booking-select"
          id="hotel-city"
          value={city}
          onChange={(event) => setCity(event.target.value as HotelCityId)}
        >
          {hotelCities.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-grid">
        <div className="booking-field">
          <label className="booking-label" htmlFor="hotel-checkin">
            Check-in
          </label>
          <input
            className="booking-input"
            id="hotel-checkin"
            type="date"
            min={minCheckIn}
            value={checkIn}
            onChange={(event) => setCheckIn(event.target.value)}
          />
        </div>
        <div className="booking-field">
          <label className="booking-label" htmlFor="hotel-checkout">
            Check-out
          </label>
          <input
            className="booking-input"
            id="hotel-checkout"
            type="date"
            min={minCheckOut}
            value={effectiveCheckOut}
            onChange={(event) => setCheckOut(event.target.value)}
          />
        </div>
      </div>

      <div className="booking-grid">
        <div className="booking-field">
          <label className="booking-label" htmlFor="hotel-guests">
            Guests
          </label>
          <input
            className="booking-input"
            id="hotel-guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
          />
        </div>
        <div className="booking-field">
          <label className="booking-label" htmlFor="hotel-rooms">
            Rooms
          </label>
          <input
            className="booking-input"
            id="hotel-rooms"
            type="number"
            inputMode="numeric"
            min={1}
            max={20}
            value={rooms}
            onChange={(event) => setRooms(event.target.value)}
          />
        </div>
      </div>

      <div className="booking-field">
        <label className="booking-label" htmlFor="hotel-area">
          Distance from {selectedCity.haram}
        </label>
        <select
          className="booking-select"
          id="hotel-area"
          value={area}
          onChange={(event) => setArea(event.target.value)}
        >
          {hotelAreas.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-field">
        <label className="booking-label" htmlFor="hotel-category">
          Hotel category
        </label>
        <select
          className="booking-select"
          id="hotel-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {hotelCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-field">
        <label className="booking-label" htmlFor="hotel-budget">
          Budget, per room per night
        </label>
        <select
          className="booking-select"
          id="hotel-budget"
          value={budget}
          onChange={(event) => setBudget(event.target.value)}
        >
          {hotelBudgets.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-total">
        <span className="booking-total-label">
          Your stay
          <small>
            {nights
              ? `${selectedCity.label} · ${guests || "?"} ${Number(guests) === 1 ? "guest" : "guests"}`
              : "Add your dates for a faster reply"}
          </small>
        </span>
        <strong className="booking-total-value">
          {nights ? `${nights} ${nights === 1 ? "night" : "nights"}` : "—"}
        </strong>
      </div>

      <a
        className="btn btn-primary btn-block chamfer is-clipped"
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener"
      >
        Send enquiry on WhatsApp
      </a>
      <p className="ledger-foot" aria-live="polite">
        We check what is available around your requirements and reply with
        options and rates.
      </p>
    </form>
  );
}
