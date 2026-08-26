"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, X } from "lucide-react";
import { isGoogleMapsConfigured, loadGoogleMaps } from "@/lib/googleMaps";

export interface LocationValue {
  description: string;
  lat?: number;
  lng?: number;
  placeId?: string;
}

interface LocationAutocompleteProps {
  label: string;
  placeholder: string;
  value: LocationValue;
  onChange: (val: LocationValue) => void;
  required?: boolean;
  error?: string;
  hint?: string;
  onSelectCoordinates?: (lat: number, lng: number) => void;
  icon?: React.ReactNode;
}

export default function LocationAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  required,
  error,
  hint,
  onSelectCoordinates,
  icon,
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value.description || "");


  useEffect(() => {
    setInputValue(value.description || "");
  }, [value.description]);

  useEffect(() => {
    if (!isGoogleMapsConfigured() || !inputRef.current) return;

    let autocomplete: any = null;

    loadGoogleMaps()
      .then(() => {
        if (!inputRef.current || !window.google?.maps?.places) return;

        autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: "in" },
          fields: ["place_id", "geometry", "formatted_address", "name"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place || !place.geometry) return;

          const desc = place.formatted_address || place.name || "";
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

          onChange({
            description: desc,
            placeId: place.place_id,
            lat,
            lng,
          });

          onSelectCoordinates?.(lat, lng);
        });
      })
      .catch(() => {
        // Fallback to manual text input silently
      });

    return () => {
      if (autocomplete && window.google?.maps?.event) {
        window.google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [onChange, onSelectCoordinates]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setInputValue(text);
    onChange({ description: text });
  }

  function handleClear() {
    setInputValue("");
    onChange({ description: "" });
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <label className="mb-2 block text-sm font-semibold text-white">
          {label} {required && <span className="text-emerald-400">*</span>}
        </label>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
          <MapPin size={16} className="text-emerald-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full rounded-xl border py-3 pl-10 pr-10 text-sm text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 ${
            error
              ? "border-rose-400 bg-rose-950/30 focus:ring-rose-500/40"
              : "border-blue-500/30 bg-slate-900/80 focus:border-emerald-400 focus:ring-emerald-400/30"
          }`}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
            aria-label="Clear location"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs font-medium text-rose-400">{error}</p>}
    </div>
  );
}
