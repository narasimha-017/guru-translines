"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2, Map as MapIcon, Navigation, X, Sparkles } from "lucide-react";
import { FLEET } from "@/data/fleet";
import {
  AcType,
  calculateLocalFare,
  calculateOutstationFare,
  vehicleSupportsAc,
} from "@/lib/rates";
import {
  getRouteInfo,
  getPlaceRegion,
  PlaceRegion,
  formatDurationMinutes,
  isGoogleMapsConfigured,
  loadGoogleMaps,
  RoutePoint,
} from "@/lib/googleMaps";
import { Button } from "@/components/shared/Button";
import LocationAutocomplete, { LocationValue } from "./LocationAutocomplete";
import FareResultCard from "./FareResultCard";

type TripType = "local" | "outstation";
type MapTarget = "pickup" | "drop";

// Secunderabad (company HQ) — sensible default map center before any
// location has been chosen.
const DEFAULT_MAP_CENTER = { lat: 17.4399, lng: 78.4983 };

const MARKER_STYLE: Record<MapTarget, { color: string; label: string }> = {
  pickup: { color: "#4F46E5", label: "P" }, // indigo
  drop: { color: "#9333EA", label: "D" }, // purple
};

// City names (lowercase) that should be treated as the same "local" metro
// area even though they're technically different localities — e.g.
// Hyderabad and Secunderabad are twin cities. Extend this list if more
// metro pairs need the same treatment.
const LOCAL_METRO_GROUPS: string[][] = [["hyderabad", "secunderabad"]];

function normalizeRegionName(name: string | null): string | null {
  return name ? name.trim().toLowerCase() : null;
}

function isSameMetroArea(cityA: string | null, cityB: string | null): boolean {
  const a = normalizeRegionName(cityA);
  const b = normalizeRegionName(cityB);
  if (!a || !b) return false;
  if (a === b) return true;
  return LOCAL_METRO_GROUPS.some((group) => group.includes(a) && group.includes(b));
}

/**
 * Classifies a trip as Local or Outstation using Places city/state data
 * rather than distance: different state -> Outstation; same state and same
 * city/metro area -> Local; same state but a different city -> Outstation
 * (e.g. Hyderabad -> Warangal).
 */
function classifyTripType(pickupRegion: PlaceRegion, dropRegion: PlaceRegion): TripType {
  if (!pickupRegion.state || !dropRegion.state) return "outstation";
  if (normalizeRegionName(pickupRegion.state) !== normalizeRegionName(dropRegion.state)) {
    return "outstation";
  }
  return isSameMetroArea(pickupRegion.city, dropRegion.city) ? "local" : "outstation";
}

/** Minimal shape of a Google Maps mouse/drag event — kept local so this file
 * has no dependency on the ambient google.maps namespace types. */
interface MapMouseEventLike {
  latLng: { lat: () => number; lng: () => number } | null;
}

function coordinateLabel(prefix: string, lat: number, lng: number) {
  return `${prefix} (${lat.toFixed(5)}, ${lng.toFixed(5)})`;
}

export default function FareEstimatorForm() {
  const searchParams = useSearchParams();
  const presetVehicle = searchParams.get("vehicle");
  const [tripType, setTripType] = useState<TripType>("local");
  const [vehicleId, setVehicleId] = useState(
    FLEET.find((v) => v.id === presetVehicle)?.id ?? FLEET[2].id
  ); // default: 17 Seater
  const [ac, setAc] = useState<AcType>("AC");
  const [pickup, setPickup] = useState<LocationValue>({ description: "" });
  const [drop, setDrop] = useState<LocationValue>({ description: "" });
  const [autoDistanceKm, setAutoDistanceKm] = useState<number | null>(null);
  const [autoDurationMinutes, setAutoDurationMinutes] = useState<number | null>(null);
  const [manualDistanceKm, setManualDistanceKm] = useState<number>(80);
  const [distanceLoading, setDistanceLoading] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);
  const [hours, setHours] = useState(8);
  const [days, setDays] = useState(1);
  const [isNightTravel, setIsNightTravel] = useState(false);

  // --- Automatic trip type detection ---------------------------------------
  // `tripTypeOverridden` is true once the customer explicitly picks a trip
  // type via "Change trip type" for the *current* pickup/drop pair. It's
  // reset whenever pickup or drop changes, so a new route always gets a
  // fresh automatic detection unless overridden again.
  const [tripTypeOverridden, setTripTypeOverridden] = useState(false);
  const [regionLoading, setRegionLoading] = useState(false);
  const [regionError, setRegionError] = useState<string | null>(null);

  // --- Interactive map picker state ---------------------------------------
  const [showMap, setShowMap] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [nextMapTarget, setNextMapTarget] = useState<MapTarget>("pickup");
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // The Google Maps objects below are intentionally untyped (`any`-flavored
  // via window.google) for the same portability reason as lib/googleMaps.ts.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pickupMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dropMarkerRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const polylineRef = useRef<any>(null);
  const nextMapTargetRef = useRef<MapTarget>("pickup");

  useEffect(() => {
    nextMapTargetRef.current = nextMapTarget;
  }, [nextMapTarget]);

  const mapsConfigured = isGoogleMapsConfigured();

  // Resolve a usable Distance Matrix endpoint for each side — a placeId when
  // available (typed + selected from Autocomplete), otherwise a raw lat/lng
  // (map click, dragged marker, or current location).
  const pickupPoint: RoutePoint | null = pickup.placeId
    ? { placeId: pickup.placeId }
    : pickup.lat != null && pickup.lng != null
      ? { lat: pickup.lat, lng: pickup.lng }
      : null;
  const dropPoint: RoutePoint | null = drop.placeId
    ? { placeId: drop.placeId }
    : drop.lat != null && drop.lng != null
      ? { lat: drop.lat, lng: drop.lng }
      : null;

  const hasResolvedRoute = mapsConfigured && Boolean(pickupPoint) && Boolean(dropPoint);

  // Auto-calculate distance + duration once both pickup and drop resolve to
  // a usable point (placeId or coordinate).
  useEffect(() => {
    if (!hasResolvedRoute || !pickupPoint || !dropPoint) return;

    let cancelled = false;
    // Standard data-fetching-in-effect pattern: set loading state before
    // kicking off the async request, guarded by the `cancelled` flag below.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDistanceLoading(true);
    setDistanceError(null);

    getRouteInfo(pickupPoint, dropPoint)
      .then(({ distanceKm, durationMinutes }) => {
        if (cancelled) return;
        setAutoDistanceKm(distanceKm);
        setAutoDurationMinutes(durationMinutes);
        // Pre-fill a sensible "hours needed" starting point from drive time
        // for local trips — purely a default value, never the fare formula
        // itself, and still freely editable afterward.
        setHours((current) => {
          const suggested = Math.max(8, Math.ceil(durationMinutes / 60));
          return current === 8 ? suggested : current;
        });
      })
      .catch(() => {
        if (!cancelled) setDistanceError("Could not auto-calculate distance — enter it manually below.");
      })
      .finally(() => {
        if (!cancelled) setDistanceLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasResolvedRoute, pickup.placeId, pickup.lat, pickup.lng, drop.placeId, drop.lat, drop.lng]);

  // A new pickup/drop pair always gets a fresh automatic detection, even if
  // the previous pair had been manually overridden. This is an intentional
  // synchronous reset tied directly to the pickup/drop identity changing,
  // not async/race-prone data fetching, matching the pattern already used
  // elsewhere in this file.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTripTypeOverridden(false);
  }, [pickup.placeId, drop.placeId]);

  // Automatically classify Local vs Outstation from Places city/state data
  // once both ends resolve to an actual Place (map-clicked/dragged/geolocated
  // points have no placeId and fall back to the manual toggle below).
  useEffect(() => {
    if (tripTypeOverridden || !pickup.placeId || !drop.placeId) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRegionLoading(true);
    setRegionError(null);

    Promise.all([getPlaceRegion(pickup.placeId), getPlaceRegion(drop.placeId)])
      .then(([pickupRegion, dropRegion]) => {
        if (cancelled) return;
        setTripType(classifyTripType(pickupRegion, dropRegion));
      })
      .catch(() => {
        if (!cancelled) {
          setRegionError("Couldn't auto-detect trip type from these locations — please choose it manually.");
        }
      })
      .finally(() => {
        if (!cancelled) setRegionLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tripTypeOverridden, pickup.placeId, drop.placeId]);

  // Distance Matrix always returns one-way distance. Local trips bill the
  // one-way figure as-is; Outstation trips bill the round trip (one-way x 2)
  // per existing fare logic, which has always expected a round-trip total.
  const resolvedOneWayKm = hasResolvedRoute ? autoDistanceKm : null;
  const resolvedRoundTripKm = resolvedOneWayKm !== null ? resolvedOneWayKm * 2 : null;
  const resolvedDurationMinutes = hasResolvedRoute ? autoDurationMinutes : null;

  const effectiveDistanceKm =
    tripType === "local"
      ? resolvedOneWayKm ?? manualDistanceKm
      : resolvedRoundTripKm ?? manualDistanceKm;
  const needsManualDistance = tripType === "local" ? resolvedOneWayKm === null : resolvedRoundTripKm === null;

  // If the chosen vehicle doesn't offer the selected AC option for this trip
  // type, fall back to AC for fare calculation/display without forcing a
  // state update — the select itself stays controlled by `ac`.
  const effectiveAc = vehicleSupportsAc(vehicleId, tripType, ac) ? ac : "AC";

  const vehicle = FLEET.find((v) => v.id === vehicleId)!;

  const result = useMemo(() => {
    if (tripType === "local") {
      return calculateLocalFare(vehicleId, effectiveAc, hours, effectiveDistanceKm, isNightTravel);
    }
    return calculateOutstationFare(vehicleId, effectiveAc, effectiveDistanceKm, days);
  }, [tripType, vehicleId, effectiveAc, hours, effectiveDistanceKm, days, isNightTravel]);

  // --- Map initialization --------------------------------------------------
  useEffect(() => {
    if (!showMap || !mapsConfigured || !mapContainerRef.current) return;
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled || !mapContainerRef.current) return;

        if (!mapInstanceRef.current) {
          const initialCenter =
            pickup.lat != null && pickup.lng != null
              ? { lat: pickup.lat, lng: pickup.lng }
              : DEFAULT_MAP_CENTER;

          const map = new window.google.maps.Map(mapContainerRef.current, {
            center: initialCenter,
            zoom: 12,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            clickableIcons: false,
          });

          map.addListener("click", (event: MapMouseEventLike) => {
            if (!event.latLng) return;
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();
            const target = nextMapTargetRef.current;
            const label = coordinateLabel("Selected on map", lat, lng);

            if (target === "pickup") {
              setPickup({ description: label, lat, lng, placeId: undefined });
              setNextMapTarget("drop");
            } else {
              setDrop({ description: label, lat, lng, placeId: undefined });
              setNextMapTarget("pickup");
            }
          });

          mapInstanceRef.current = map;
        }

        setMapReady(true);
        setMapError(null);
      })
      .catch((error) => {
        console.error("[FareEstimatorForm] Failed to load Google Maps for the map picker:", error);
        setMapError("Couldn't load the map right now — you can still type pickup/drop above.");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMap, mapsConfigured]);

  // --- Marker + route line sync --------------------------------------------
  useEffect(() => {
    if (!mapReady || !mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    const hasPickupPoint = pickup.lat != null && pickup.lng != null;
    const hasDropPoint = drop.lat != null && drop.lng != null;

    function ensureMarker(
      target: MapTarget,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: { current: any },
      position: { lat: number; lng: number },
      onDragEnd: (lat: number, lng: number) => void
    ) {
      const style = MARKER_STYLE[target];
      if (!ref.current) {
        const marker = new window.google.maps.Marker({
          map,
          position,
          draggable: true,
          title: target === "pickup" ? "Pickup (drag to adjust)" : "Drop (drag to adjust)",
          label: { text: style.label, color: "#ffffff", fontSize: "11px", fontWeight: "700" },
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 11,
            fillColor: style.color,
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });
        marker.addListener("dragend", (event: MapMouseEventLike) => {
          if (!event.latLng) return;
          onDragEnd(event.latLng.lat(), event.latLng.lng());
        });
        ref.current = marker;
      } else {
        ref.current.setPosition(position);
      }
    }

    if (hasPickupPoint) {
      ensureMarker("pickup", pickupMarkerRef, { lat: pickup.lat!, lng: pickup.lng! }, (lat, lng) =>
        setPickup({ description: coordinateLabel("Pickup (dragged)", lat, lng), lat, lng, placeId: undefined })
      );
    }

    if (hasDropPoint) {
      ensureMarker("drop", dropMarkerRef, { lat: drop.lat!, lng: drop.lng! }, (lat, lng) =>
        setDrop({ description: coordinateLabel("Drop (dragged)", lat, lng), lat, lng, placeId: undefined })
      );
    }

    if (hasPickupPoint && hasDropPoint) {
      const path = [
        { lat: pickup.lat!, lng: pickup.lng! },
        { lat: drop.lat!, lng: drop.lng! },
      ];

      if (!polylineRef.current) {
        polylineRef.current = new window.google.maps.Polyline({
          map,
          path,
          strokeColor: "#4F46E5",
          strokeOpacity: 0.7,
          strokeWeight: 4,
          geodesic: true,
        });
      } else {
        polylineRef.current.setPath(path);
      }

      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(path[0]);
      bounds.extend(path[1]);
      map.fitBounds(bounds, 56);
    } else if (hasPickupPoint) {
      map.setCenter({ lat: pickup.lat!, lng: pickup.lng! });
      map.setZoom(13);
    } else if (hasDropPoint) {
      map.setCenter({ lat: drop.lat!, lng: drop.lng! });
      map.setZoom(13);
    }
  }, [mapReady, pickup.lat, pickup.lng, drop.lat, drop.lng]);

  function handleUseCurrentLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGeoError("Geolocation isn't supported by this browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPickup({
          description: coordinateLabel("Current location", latitude, longitude),
          lat: latitude,
          lng: longitude,
          placeId: undefined,
        });
        setNextMapTarget("drop");
        setGeoLoading(false);
      },
      () => {
        setGeoError("Couldn't get your location — check browser permissions and try again.");
        setGeoLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  // Whether we have both placeIds and auto-detection is active (not overridden).
  // Used to decide which trip-type UI variant to show.
  const isAutoDetecting = Boolean(pickup.placeId && drop.placeId && !tripTypeOverridden);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div className="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_8px_40px_-12px_rgba(79,70,229,0.18)] backdrop-blur-xl sm:p-8">
        {/* ── Trip type ────────────────────────────────────────────────────
            Two visual states:
            1. Auto-detecting (both placeIds present, not overridden):
               Shows the "Detected: …" pill with a "Change trip type" link.
               The detected label animates in/out as the classification
               resolves or changes (local ↔ outstation).
            2. Manual (no placeIds, or user clicked "Change trip type"):
               Shows the Local / Outstation pill toggle.

            AnimatePresence + motion.div handles the cross-fade between
            states so the swap feels natural with no jarring hard-cut.
        ─────────────────────────────────────────────────────────────── */}
        <div className="mb-6">
          <AnimatePresence mode="wait" initial={false}>
            {isAutoDetecting ? (
              <motion.div
                key="auto-banner"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-indigo-50/80 px-4 py-3"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-700">
                  {regionLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Detecting trip type…</span>
                    </>
                  ) : (
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={tripType}
                        initial={{ opacity: 0, x: 6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="flex items-center gap-2"
                      >
                        <Sparkles size={14} />
                        Detected:{" "}
                        <strong className="font-semibold">
                          {tripType === "local" ? "Local trip" : "Outstation trip"}
                        </strong>
                      </motion.span>
                    </AnimatePresence>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setTripTypeOverridden(true)}
                  className="text-xs font-medium text-indigo-600 hover:underline"
                >
                  Change trip type
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="manual-toggle"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-wrap items-center gap-3"
              >
                <div className="inline-flex rounded-full bg-gray-100/80 p-1">
                  {(["local", "outstation"] as TripType[]).map((t) => (
                    <motion.button
                      key={t}
                      onClick={() => {
                        setTripType(t);
                        setTripTypeOverridden(true);
                      }}
                      className={`rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                        tripType === t
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                      // Subtle scale nudge when the active button changes so
                      // the selection feels responsive even on auto-detection.
                      animate={
                        tripType === t
                          ? { scale: [1, 1.04, 1] }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    >
                      {t === "local" ? "Local" : "Outstation"}
                    </motion.button>
                  ))}
                </div>
                {pickup.placeId && drop.placeId && (
                  <button
                    type="button"
                    onClick={() => setTripTypeOverridden(false)}
                    className="text-xs font-medium text-indigo-600 hover:underline"
                  >
                    Auto-detect again
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {regionError && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1.5 text-xs text-amber-600"
            >
              {regionError}
            </motion.p>
          )}
        </div>

        {/* Vehicle + AC */}
        <div className="mb-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">Vehicle</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition-shadow focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {FLEET.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.capacity} seater)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">AC / Non-AC</label>
            <select
              value={effectiveAc}
              onChange={(e) => setAc(e.target.value as AcType)}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 transition-shadow focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {vehicle.acOptions.map((opt) => (
                <option key={opt} value={opt} disabled={!vehicleSupportsAc(vehicleId, tripType, opt)}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pickup / Drop */}
        <div className="mb-3 grid gap-4 sm:grid-cols-2">
          <LocationAutocomplete
            label="Pickup location"
            placeholder="e.g. Secunderabad"
            value={pickup}
            onChange={setPickup}
            icon={<MapPin size={16} />}
          />
          <LocationAutocomplete
            label="Drop location"
            placeholder="e.g. Warangal"
            value={drop}
            onChange={setDrop}
            icon={<MapPin size={16} />}
          />
        </div>

        {/* Alternative selection methods */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant={showMap ? "primary" : "outline"}
            icon={<MapIcon size={15} />}
            onClick={() => setShowMap((v) => !v)}
            className="px-4 py-2 text-xs"
          >
            {showMap ? "Hide map" : "Choose on map"}
          </Button>
          <Button
            type="button"
            variant="outline"
            icon={geoLoading ? <Loader2 size={15} className="animate-spin" /> : <Navigation size={15} />}
            onClick={handleUseCurrentLocation}
            className="px-4 py-2 text-xs"
          >
            Use my current location
          </Button>
          {!mapsConfigured && (
            <span className="text-xs text-gray-400">Connect Google Maps to enable the map picker.</span>
          )}
        </div>
        {geoError && <p className="-mt-3 mb-4 text-xs text-amber-600">{geoError}</p>}

        {/* Interactive map */}
        <AnimatePresence>
          {showMap && mapsConfigured && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mb-5 overflow-hidden"
            >
              <div className="mb-2 flex items-center justify-between rounded-xl bg-indigo-50/80 px-3 py-2 text-xs font-medium text-indigo-700">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: MARKER_STYLE[nextMapTarget].color }}
                  />
                  Tap the map to place: {nextMapTarget === "pickup" ? "Pickup" : "Drop"}
                </span>
                <button
                  type="button"
                  onClick={() => setShowMap(false)}
                  className="text-indigo-400 transition-colors hover:text-indigo-700"
                  aria-label="Close map"
                >
                  <X size={14} />
                </button>
              </div>
              <div
                ref={mapContainerRef}
                className="h-72 w-full rounded-2xl border border-gray-200 bg-gray-100 sm:h-80"
              />
              {mapError && <p className="mt-1.5 text-xs text-amber-600">{mapError}</p>}
              <p className="mt-1.5 text-xs text-gray-400">
                Drag either marker to fine-tune the exact point — distance and fare update
                automatically.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Distance */}
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Distance {tripType === "outstation" ? "(total, round trip)" : ""}
          </label>
          {distanceLoading && hasResolvedRoute ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2.5 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3 py-2.5 text-sm text-indigo-700"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="flex h-4 w-4 items-center justify-center"
              >
                <Loader2 size={14} />
              </motion.span>
              Calculating distance &amp; drive time...
            </motion.div>
          ) : needsManualDistance ? (
            <div>
              <input
                type="number"
                min={0}
                value={manualDistanceKm}
                onChange={(e) => setManualDistanceKm(Number(e.target.value) || 0)}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              />
              {distanceError && <p className="mt-1 text-xs text-amber-600">{distanceError}</p>}
              {!mapsConfigured && (
                <p className="mt-1 text-xs text-gray-400">
                  Connect Google Maps to auto-calculate this from pickup &amp; drop.
                </p>
              )}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
              <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900">
                {tripType === "local" ? (
                  <>
                    {resolvedOneWayKm} km <span className="text-gray-400">(auto-calculated)</span>
                  </>
                ) : (
                  <>
                    {resolvedOneWayKm} km one-way &middot; {resolvedRoundTripKm} km round trip{" "}
                    <span className="text-gray-400">(auto-calculated)</span>
                  </>
                )}
              </div>
              {resolvedDurationMinutes !== null && (
                <p className="mt-1 text-xs text-gray-400">
                  Estimated drive time: ~{formatDurationMinutes(resolvedDurationMinutes)} (one-way)
                </p>
              )}
            </motion.div>
          )}
        </div>

        {/* Conditional: hours/night vs days */}
        <AnimatePresence mode="wait">
          {tripType === "local" ? (
            <motion.div
              key="local-fields"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Hours needed
                </label>
                <input
                  type="number"
                  min={1}
                  value={hours}
                  onChange={(e) => setHours(Number(e.target.value) || 0)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Package covers 8 hrs / 80 km &middot; auto-suggested from drive time
                </p>
              </div>
              <div className="flex items-end pb-2.5">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={isNightTravel}
                    onChange={(e) => setIsNightTravel(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  Travel continues past 11 PM
                </label>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="outstation-fields"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="grid gap-4 sm:grid-cols-2"
            >
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Number of days
                </label>
                <input
                  type="number"
                  min={1}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value) || 1)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                />
                <p className="mt-1 text-xs text-gray-400">Billed on a 300 km/day minimum</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <FareResultCard
        vehicleName={vehicle.name}
        ac={effectiveAc}
        tripType={tripType}
        pickup={pickup.description}
        drop={drop.description}
        result={result}
        durationMinutes={resolvedDurationMinutes}
      />
    </div>
  );
}
