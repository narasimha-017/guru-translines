"use client";

import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps, isGoogleMapsConfigured } from "@/lib/googleMaps";

export interface LocationValue {
  description: string;
  placeId?: string;
  lat?: number | null;
  lng?: number | null;
}

interface LocationAutocompleteProps {
  label: string;
  placeholder?: string;
  value: LocationValue;
  onChange: (value: LocationValue) => void;
  icon?: React.ReactNode;
}

export default function LocationAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  icon,
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<any>(null);
  const configured = isGoogleMapsConfigured();
  const [mapsReady, setMapsReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const mapsFailed = !configured || loadFailed;

  useEffect(() => {
    if (!configured) return;

    loadGoogleMaps()
      .then(() => setMapsReady(true))
      .catch((error) => {
        console.error("[LocationAutocomplete] loadGoogleMaps() failed:", error);
        setLoadFailed(true);
      });
  }, [configured]);

  // These setState calls are synchronous, intentional bail-outs based on
  // conditions already known when the effect runs (not async/race-prone
  // data fetching), so this rule doesn't apply here.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!mapsReady || !inputRef.current || autocompleteRef.current) return;

    if (!window.google) {
      console.error(
        "[LocationAutocomplete] window.google is not defined — the Google Maps script did not load."
      );
      setLoadFailed(true);
      return;
    }
    if (!window.google.maps) {
      console.error(
        "[LocationAutocomplete] window.google.maps is not defined — the Maps JavaScript API failed to initialize."
      );
      setLoadFailed(true);
      return;
    }
    if (!window.google.maps.places) {
      console.error(
        "[LocationAutocomplete] window.google.maps.places is not defined — the Places library did not finish loading. Check that the Places API is enabled for this key."
      );
      setLoadFailed(true);
      return;
    }

    try {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "in" },
        // "geometry" is added so that place.geometry.location gives us lat/lng
        // immediately on selection — without it the map markers can't be placed
        // and the camera can't pan to an autocomplete-picked location. All other
        // fields are unchanged from the original.
        fields: ["place_id", "formatted_address", "name", "geometry"],
      });

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (!place) return;

        // Extract lat/lng from the geometry field now that we request it.
        // Falls back gracefully to null if geometry is absent for any reason
        // (e.g. the user pressed Enter without selecting a suggestion).
        const lat: number | null = place.geometry?.location?.lat?.() ?? null;
        const lng: number | null = place.geometry?.location?.lng?.() ?? null;

        onChange({
          description: place.formatted_address ?? place.name ?? inputRef.current?.value ?? "",
          placeId: place.place_id,
          lat,
          lng,
        });
      });
    } catch (error) {
      console.error("[LocationAutocomplete] Failed to initialize Google Places Autocomplete:", error);
      setLoadFailed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapsReady]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          defaultValue={value.description}
          onChange={(e) => {
            if (mapsFailed) {
              onChange({ description: e.target.value, placeId: undefined });
            }
          }}
          className={`w-full rounded-lg border border-gray-200 bg-white py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 ${
            icon ? "pl-9 pr-3" : "px-3"
          }`}
        />
      </div>
      {mapsFailed && (
        <p className="mt-1 text-xs text-amber-600">
          Map search unavailable — type the location name manually.
        </p>
      )}
    </div>
  );
}
