"use client";

import { useMemo, useState } from "react";
import {
  hotelAreas,
  hotelBudgets,
  hotelCategories,
  hotelCities,
  hotelsFor,
  type HotelCityId,
  type HotelStars,
} from "@/lib/hotels";
import { site, whatsappLink } from "@/lib/site";

/**
 * Hotel enquiry. Mirrors the transfer form's structure and classes so the two
 * read as one system, and hands the request to the same WhatsApp thread.
 *
 * Nothing here is priced: rates move with the season, so quoting a figure on
 * the page would be a number we could not hold. The reply carries the rate.
 */
export function HotelEnquiry({
  initialCity = "makkah",
  initialStars = "",
  initialHotel = "",
}: {
  initialCity?: HotelCityId;
  initialStars?: string;
  initialHotel?: string;
}) {
  const [city, setCity] = useState<HotelCityId>(initialCity);
  const [category, setCategory] = useState(initialStars);
  const [hotel, setHotel] = useState(initialHotel);
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const [guests, setGuests] = useState("2");
  const [rooms, setRooms] = useState("1");

  const selectedCity = hotelCities.find((c) => c.id === city)!;

  // Hotels narrow to the chosen city and star band. Changing either can strand
  // a selection that no longer matches, so the effective value falls back to
  // "no preference" rather than pointing at a hotel no longer in the list.
  const matches = useMemo(
    () =>
      hotelsFor(
        city,
        category === "apartment" || category === ""
          ? undefined
          : (category as HotelStars),
      ),
    [city, category],
  );
  const selectedHotel = matches.find((h) => h.id === hotel);
  const effectiveHotel = selectedHotel ? hotel : "";

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
        selectedHotel
          ? `Hotel: ${selectedHotel.name} (${selectedHotel.stars} star, ${selectedHotel.distance})`
          : `Category: ${labelFor(hotelCategories, category)}`,
        `Area: ${labelFor(hotelAreas, area)}`,
        `Budget: ${labelFor(hotelBudgets, budget)}`,
        `Guests: ${guests || "Not given"}`,
        `Rooms: ${rooms || "Not given"}`,
        "",
        "Travel dates:",
      ].join("\n"),
    [area, budget, category, guests, rooms, selectedCity.label, selectedHotel],
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
          onChange={(event) => {
            setCity(event.target.value as HotelCityId);
            setHotel("");
          }}
        >
          {hotelCities.map((item) => (
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
          onChange={(event) => {
            setCategory(event.target.value);
            setHotel("");
          }}
        >
          {hotelCategories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-field">
        <label className="booking-label" htmlFor="hotel-name">
          Hotel
        </label>
        <select
          className="booking-select"
          id="hotel-name"
          value={effectiveHotel}
          onChange={(event) => setHotel(event.target.value)}
        >
          <option value="">
            {matches.length
              ? `No preference · ${matches.length} available`
              : "No hotels in this band"}
          </option>
          {matches.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} · {item.stars}★ · {item.distance}
            </option>
          ))}
        </select>
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
          {selectedHotel ? "Selected hotel" : "Your enquiry"}
          <small>
            {selectedHotel
              ? `${selectedHotel.stars} star · ${selectedHotel.distance}`
              : `${selectedCity.label} · ${matches.length} ${matches.length === 1 ? "option" : "options"}`}
          </small>
        </span>
        <strong className="booking-total-value booking-total-name">
          {selectedHotel
            ? selectedHotel.name
            : `${guests || "?"} ${Number(guests) === 1 ? "guest" : "guests"}`}
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
      <p className="ledger-foot">
        We check what is available around your requirements and reply with
        options and rates. Tell us your dates in the chat.
      </p>
    </form>
  );
}
