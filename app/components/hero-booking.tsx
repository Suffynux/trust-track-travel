"use client";

import { useEffect, useMemo, useState } from "react";
import {
  bookingFare,
  bookingRoutes,
  bookingVehicles,
  formatBookingFare,
  type BookingRouteId,
  type BookingVehicleId,
} from "@/lib/booking";
import {
  currencies,
  detectCurrency,
  formatFare,
  whatsappLink,
  type CurrencyCode,
} from "@/lib/site";

type Place = { id: number; label: string; lat: number; lon: number };

export function HeroBooking() {
  const [currency, setCurrency] = useState<CurrencyCode>("SAR");
  const [vehicle, setVehicle] = useState<BookingVehicleId>("sedan");
  const [route, setRoute] = useState<BookingRouteId>("jed-mak");
  const [hotel, setHotel] = useState("");
  const [place, setPlace] = useState<Place | null>(null);
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const [pickedCurrency, setPickedCurrency] = useState(false);

  /**
   * Currency comes from the visitor's IP country, resolved by the platform at
   * the edge. The browser locale is used first so the number is right on the
   * very first paint, then the IP answer refines it — a Pakistani traveller on
   * an en-US phone gets PKR either way.
   *
   * Runs after mount so the server HTML stays static and identical for every
   * visitor. An explicit choice always wins.
   */
  useEffect(() => {
    let cancelled = false;

    /* eslint-disable-next-line react-hooks/set-state-in-effect -- client-only signal */
    setCurrency((current) => (current === "SAR" ? detectCurrency() : current));

    fetch("/api/geo")
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { currency?: CurrencyCode | null } | null) => {
        // A null currency means the platform could not resolve the country;
        // the locale guess already in state is the better answer, so keep it.
        if (cancelled || !data?.currency) return;
        const fromIp = data.currency;
        setCurrency((current) => (pickedCurrency ? current : fromIp));
      })
      .catch(() => {
        // Locale detection already ran; nothing more to do.
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- detect once on mount
  }, []);

  const fare = bookingFare(route, vehicle);
  const selectedVehicle = bookingVehicles.find((item) => item.id === vehicle)!;
  const selectedRoute = bookingRoutes.find((item) => item.id === route)!;

  const convertedFare =
    fare === undefined
      ? "Quote required"
      : typeof fare === "number"
        ? formatFare(fare, currency)
        : `${formatFare(fare[0], currency)}–${formatFare(fare[1], currency).replace(/^[^\d]+/, "")}`;

  useEffect(() => {
    if (hotel.trim().length < 3 || hotel === place?.label) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6500);
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch(
          `/api/places?q=${encodeURIComponent(hotel)}`,
          { signal: controller.signal },
        );
        setResults(response.ok ? await response.json() : []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setResults([]);
      } finally {
        window.clearTimeout(timeout);
        setSearching(false);
      }
    }, 350);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [hotel, place?.label]);

  const message = useMemo(() => {
    const location = place
      ? `${place.label}\nMap: https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=17/${place.lat}/${place.lon}`
      : hotel || "Not selected";
    return [
      "Booking request for Trust Track Travels",
      "",
      `Vehicle: ${selectedVehicle.name} (${selectedVehicle.capacity})`,
      `Route: ${selectedRoute.name}`,
      `Fare: ${formatBookingFare(fare)} per vehicle`,
      "",
      `Hotel / pickup location: ${location}`,
      "",
      "Travel date and time:",
      "Flight number (if applicable):",
      "Number of guests:",
    ].join("\n");
  }, [fare, hotel, place, selectedRoute, selectedVehicle]);

  return (
    <form
      className="ledger booking-form chamfer"
      id="ledger"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="ledger-top">
        <h2 className="ledger-title">Book your transfer</h2>
        <span className="booking-step">Fixed fare</span>
      </div>

      <div className="booking-field">
        <label className="booking-label" htmlFor="booking-vehicle">
          Vehicle
        </label>
        <select
          className="booking-select"
          id="booking-vehicle"
          value={vehicle}
          onChange={(event) =>
            setVehicle(event.target.value as BookingVehicleId)
          }
        >
          {bookingVehicles.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} · {item.capacity}
            </option>
          ))}
        </select>
      </div>

      <div className="booking-field">
        <label className="booking-label" htmlFor="booking-route">
          Route
        </label>
        <select
          className="booking-select"
          id="booking-route"
          value={route}
          onChange={(event) => setRoute(event.target.value as BookingRouteId)}
        >
          {bookingRoutes.map((item) => {
            const available = bookingFare(item.id, vehicle) !== undefined;
            return (
              <option key={item.id} value={item.id} disabled={!available}>
                {item.name}
                {available ? "" : " · unavailable"}
              </option>
            );
          })}
        </select>
      </div>

      <div className="booking-field booking-location">
        <label className="booking-label" htmlFor="booking-hotel">
          Hotel or pickup location
        </label>
        <input
          className="booking-input"
          id="booking-hotel"
          value={hotel}
          onChange={(event) => {
            setHotel(event.target.value);
            setPlace(null);
            setResults([]);
          }}
          placeholder="Search a hotel in Makkah or Madinah"
          autoComplete="off"
        />
        <span className="booking-search-status" aria-live="polite">
          {searching ? "Searching…" : "Optional · helps us confirm pickup"}
        </span>
        {results.length > 0 && (
          <ul className="place-results">
            {results.map((result) => (
              <li key={result.id}>
                <button
                  type="button"
                  onClick={() => {
                    setPlace(result);
                    setHotel(result.label);
                    setResults([]);
                  }}
                >
                  {result.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="booking-total">
        <span className="booking-total-label">
          Fixed fare
          <small>Charged as {formatBookingFare(fare)}</small>
        </span>
        <strong className="booking-total-value">{convertedFare}</strong>
      </div>

      <div className="currency-suggestion">
        <span>Shown in</span>
        <div role="group" aria-label="Choose display currency">
          {currencies.map(({ code }) => (
            <button
              type="button"
              key={code}
              aria-pressed={currency === code}
              onClick={() => {
                setPickedCurrency(true);
                setCurrency(code);
              }}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      <a
        className={`btn btn-primary btn-block chamfer is-clipped${fare === undefined ? " is-disabled" : ""}`}
        href={fare === undefined ? undefined : whatsappLink(message)}
        target="_blank"
        rel="noopener"
        aria-disabled={fare === undefined}
      >
        Send booking on WhatsApp
      </a>
      <p className="ledger-foot">
        Your vehicle, route and fare are filled into the message automatically.
        Tell us your dates and guest count in the chat.
      </p>
    </form>
  );
}
