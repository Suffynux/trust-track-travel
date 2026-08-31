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
 * the page would be a number we could not hold. The form gathers the four
 * things needed to start checking, and the reply carries the actual rate.
 */
export function HotelEnquiry() {
  const [city, setCity] = useState<HotelCityId>("makkah");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");

  const selectedCity = hotelCities.find((c) => c.id === city)!;
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
        "Check-in date:",
        "Check-out date:",
        "Number of guests:",
        "Rooms needed:",
      ].join("\n"),
    [area, budget, category, selectedCity.label],
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
        options and rates. Tell us your dates and guest count in the chat.
      </p>
    </form>
  );
}
