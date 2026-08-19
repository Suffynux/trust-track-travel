"use client";

import { useEffect, useMemo, useState } from "react";
import { bookingFare, bookingRoutes, bookingVehicles, formatBookingFare, type BookingRouteId, type BookingVehicleId } from "@/lib/booking";
import { whatsappLink } from "@/lib/site";

type Place = { id: number; label: string; lat: number; lon: number };

export function HeroBooking() {
  const [vehicle, setVehicle] = useState<BookingVehicleId>("sedan");
  const [route, setRoute] = useState<BookingRouteId>("jed-mak");
  const [hotel, setHotel] = useState("");
  const [place, setPlace] = useState<Place | null>(null);
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const fare = bookingFare(route, vehicle);
  const selectedVehicle = bookingVehicles.find((item) => item.id === vehicle)!;
  const selectedRoute = bookingRoutes.find((item) => item.id === route)!;

  useEffect(() => {
    if (hotel.trim().length < 3 || hotel === place?.label) {
      return;
    }
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6500);
    const timer = window.setTimeout(async () => {
      setSearching(true);
      try {
        const response = await fetch(`/api/places?q=${encodeURIComponent(hotel)}`, { signal: controller.signal });
        setResults(response.ok ? await response.json() : []);
      } catch (error) {
        if ((error as Error).name !== "AbortError") setResults([]);
      } finally { window.clearTimeout(timeout); setSearching(false); }
    }, 350);
    return () => { window.clearTimeout(timer); window.clearTimeout(timeout); controller.abort(); };
  }, [hotel, place?.label]);

  const message = useMemo(() => {
    const location = place ? `${place.label}\nMap: https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lon}#map=17/${place.lat}/${place.lon}` : hotel || "Not selected";
    return [
      "Booking request — Trust Track Travels", "",
      `Vehicle: ${selectedVehicle.name} (${selectedVehicle.capacity})`,
      `Route: ${selectedRoute.name}`,
      `Fare: ${formatBookingFare(fare)} per vehicle`, "",
      `Hotel / pickup location: ${location}`, "",
      "Travel date and time:", "Flight number (if applicable):", "Number of guests:",
    ].join("\n");
  }, [fare, hotel, place, selectedRoute, selectedVehicle]);

  return (
    <form className="ledger booking-form chamfer" id="ledger" onSubmit={(event) => event.preventDefault()}>
      <div className="ledger-top">
        <h2 className="ledger-title">Book your transfer</h2>
        <span className="booking-step">Fixed SAR fare</span>
      </div>

      <label className="booking-label" htmlFor="booking-vehicle">Vehicle</label>
      <select className="booking-select" id="booking-vehicle" value={vehicle} onChange={(event) => setVehicle(event.target.value as BookingVehicleId)}>
        {bookingVehicles.map((item) => <option key={item.id} value={item.id}>{item.name} · {item.capacity}</option>)}
      </select>

      <label className="booking-label" htmlFor="booking-route">Route</label>
      <select className="booking-select" id="booking-route" value={route} onChange={(event) => setRoute(event.target.value as BookingRouteId)}>
        {bookingRoutes.map((item) => {
          const available = bookingFare(item.id, vehicle) !== undefined;
          return <option key={item.id} value={item.id} disabled={!available}>{item.name}{available ? "" : " · unavailable"}</option>;
        })}
      </select>

      <div className="booking-location">
        <label className="booking-label" htmlFor="booking-hotel">Hotel or pickup location</label>
        <input className="booking-input" id="booking-hotel" value={hotel} onChange={(event) => { setHotel(event.target.value); setPlace(null); setResults([]); }} placeholder="Search a hotel in Makkah or Madinah" autoComplete="off" />
        <span className="booking-search-status" aria-live="polite">{searching ? "Searching OpenStreetMap…" : "Powered by OpenStreetMap"}</span>
        {results.length > 0 && (
          <ul className="place-results">
            {results.map((result) => <li key={result.id}><button type="button" onClick={() => { setPlace(result); setHotel(result.label); setResults([]); }}>{result.label}</button></li>)}
          </ul>
        )}
      </div>

      {place && <iframe className="booking-map" title={`Map of ${place.label}`} loading="lazy" src={`https://www.openstreetmap.org/export/embed.html?bbox=${place.lon - 0.008}%2C${place.lat - 0.005}%2C${place.lon + 0.008}%2C${place.lat + 0.005}&layer=mapnik&marker=${place.lat}%2C${place.lon}`} />}

      <div className="booking-total"><span>Fixed fare</span><strong>{formatBookingFare(fare)}</strong></div>
      <a className={`btn btn-primary btn-block chamfer is-clipped${fare === undefined ? " is-disabled" : ""}`} href={fare === undefined ? undefined : whatsappLink(message)} target="_blank" rel="noopener" aria-disabled={fare === undefined}>Send booking on WhatsApp</a>
      <p className="ledger-foot">The selected vehicle, route, fare, and hotel map link are included automatically in your message.</p>
    </form>
  );
}
