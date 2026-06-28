// Loads the Google Maps JavaScript API using the classic script-tag loader
// (NOT the new bootstrap/importLibrary system). Requires
// NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to be set in the environment.
//
// If no key is configured, callers should fall back to manual distance
// entry — see the manual-entry branch in FareEstimatorForm.tsx.
//
// `window.google` is intentionally typed as `any` and the Distance Matrix
// callback uses local minimal interfaces instead of the ambient
// `google.maps.*` namespace types. This keeps the file fully self-contained
// and compiles regardless of whether `@types/google.maps` is installed or
// how its namespace/value declarations are exposed in a given project.

const SCRIPT_ID = "google-maps-classic-loader";

let loadPromise: Promise<void> | null = null;

export function isGoogleMapsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
}

function librariesReady(): boolean {
  return Boolean(window.google?.maps?.places && window.google?.maps?.DistanceMatrixService);
}

function waitForLibraries(timeoutMs = 10000, intervalMs = 50): Promise<void> {
  return new Promise((resolve, reject) => {
    if (librariesReady()) {
      resolve();
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      if (librariesReady()) {
        clearInterval(interval);
        resolve();
        return;
      }
      if (Date.now() - start > timeoutMs) {
        clearInterval(interval);
        reject(
          new Error(
            "Timed out waiting for google.maps.places and google.maps.DistanceMatrixService to become available."
          )
        );
      }
    }, intervalMs);
  });
}

export function loadGoogleMaps(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("loadGoogleMaps can only run in the browser"));
  }

  // Already fully attached — safe to use immediately.
  if (librariesReady()) {
    return Promise.resolve();
  }

  if (loadPromise) {
    return loadPromise;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return Promise.reject(new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set"));
  }

  loadPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(SCRIPT_ID);

    if (existingScript) {
      // Script tag already injected by a previous mount — just wait for the
      // requested libraries to finish attaching to google.maps.
      waitForLibraries().then(resolve).catch(reject);
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // The classic loader's onload fires once the script has executed, but
      // we still explicitly confirm both libraries are attached before
      // resolving, to avoid any race condition.
      waitForLibraries().then(resolve).catch(reject);
    };
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load the Google Maps script — check the API key and network access."));
    };
    document.head.appendChild(script);
  }).catch((err) => {
    // Don't cache a failed load — let the next attempt retry from scratch.
    loadPromise = null;
    throw err instanceof Error ? err : new Error(String(err));
  });

  return loadPromise;
}

export interface RouteInfo {
  /** One-way driving distance, in km, rounded to the nearest whole km. */
  distanceKm: number;
  /** One-way driving duration, in minutes, rounded to the nearest minute. */
  durationMinutes: number;
}

/** A route endpoint — either a resolved Google Place, or a raw map coordinate
 * (e.g. from a map click, a dragged marker, or the browser's geolocation). */
export type RoutePoint = { placeId: string } | { lat: number; lng: number };

interface DistanceMatrixElementLike {
  status: string;
  distance: { value: number };
  duration: { value: number };
}

interface DistanceMatrixResponseLike {
  rows: { elements: DistanceMatrixElementLike[] }[];
}

/**
 * Fetches one-way distance + duration between two route points (each either
 * a resolved Google Place or a raw lat/lng coordinate) via the Distance
 * Matrix API. Outstation round-trip doubling is handled by the caller
 * (FareEstimatorForm) — this function always returns the raw one-way
 * figures.
 */
export function getRouteInfo(origin: RoutePoint, destination: RoutePoint): Promise<RouteInfo> {
  return loadGoogleMaps().then(
    () =>
      new Promise<RouteInfo>((resolve, reject) => {
        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin],
            destinations: [destination],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.METRIC,
          },
          (response: DistanceMatrixResponseLike | null, status: string) => {
            if (status !== "OK" || !response) {
              reject(new Error(`Distance Matrix request failed: ${status}`));
              return;
            }
            const element = response.rows[0]?.elements[0];
            if (!element || element.status !== "OK") {
              reject(new Error("Could not calculate distance for this route"));
              return;
            }
            resolve({
              distanceKm: Math.round(element.distance.value / 1000),
              durationMinutes: Math.round(element.duration.value / 60),
            });
          }
        );
      })
  );
}

/** Formats a duration in minutes as e.g. "1h 25m" or "45m" for display. */
export function formatDurationMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}m` : `${hours}h`;
}

export interface PlaceRegion {
  /** City/locality name, e.g. "Hyderabad". Null if Google didn't return one. */
  city: string | null;
  /** State / top-level administrative area, e.g. "Telangana". */
  state: string | null;
  /** Country, e.g. "India". */
  country: string | null;
}

interface AddressComponentLike {
  long_name: string;
  types: string[];
}

interface PlaceDetailsResultLike {
  address_components?: AddressComponentLike[];
}

// ---------------------------------------------------------------------------
// Shared helper — parses a raw address_components array into a PlaceRegion.
// Used by both getPlaceRegion() (Place Details) and getRegionFromCoords()
// (Geocoding API) so the interpretation logic is never duplicated.
// ---------------------------------------------------------------------------
function regionFromComponents(components: AddressComponentLike[]): PlaceRegion {
  const find = (type: string) =>
    components.find((c) => c.types.includes(type))?.long_name ?? null;

  return {
    city: find("locality") ?? find("administrative_area_level_2"),
    state: find("administrative_area_level_1"),
    country: find("country"),
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let placesServiceSingleton: any = null;

function getPlacesService() {
  if (!placesServiceSingleton) {
    // PlacesService requires a Map or an HTMLDivElement to construct, even
    // for non-visual calls like getDetails — a detached div is the standard
    // pattern for using it purely as a data service.
    placesServiceSingleton = new window.google.maps.places.PlacesService(document.createElement("div"));
  }
  return placesServiceSingleton;
}

const placeRegionCache = new Map<string, PlaceRegion>();

/**
 * Looks up the city/state/country for a resolved Google Place via Place
 * Details (address_components) — used to automatically classify a trip as
 * Local or Outstation instead of relying on distance alone. Uses the
 * existing Places API/library only; no additional Google Cloud API.
 */
export function getPlaceRegion(placeId: string): Promise<PlaceRegion> {
  const cached = placeRegionCache.get(placeId);
  if (cached) return Promise.resolve(cached);

  return loadGoogleMaps().then(
    () =>
      new Promise<PlaceRegion>((resolve, reject) => {
        const service = getPlacesService();
        service.getDetails(
          { placeId, fields: ["address_components"] },
          (result: PlaceDetailsResultLike | null, status: string) => {
            if (status !== "OK" || !result) {
              reject(new Error(`Place Details request failed: ${status}`));
              return;
            }

            const region = regionFromComponents(result.address_components ?? []);
            placeRegionCache.set(placeId, region);
            resolve(region);
          }
        );
      })
  );
}

// ---------------------------------------------------------------------------
// Reverse-geocoding cache — keyed by "lat,lng" rounded to 4 decimal places
// (~11 m precision) so that minor marker drags within the same city block
// don't each fire a separate Geocoding API call.
//
// NOTE: getRegionFromCoords() uses the Google Geocoding API, which is a
// separate billable product (~$5 / 1 000 requests). It is called only when a
// location is set via current-location, map click, or marker drag (i.e. when
// no placeId is available). The cache prevents redundant calls for repeated
// fine-tuning of the same point.
// ---------------------------------------------------------------------------
const coordRegionCache = new Map<string, PlaceRegion>();

interface GeocoderResultLike {
  address_components: AddressComponentLike[];
}

/**
 * Reverse-geocodes a lat/lng coordinate into a PlaceRegion (city, state,
 * country) using the Google Geocoding API. This extends automatic Local /
 * Outstation detection to locations chosen via "Use current location",
 * map clicks, and dragged markers — all of which provide only coordinates,
 * not a placeId.
 *
 * Requires the Geocoding API to be enabled for the project's API key.
 * Results are cached by rounded coordinate to minimise billable calls.
 */
export function getRegionFromCoords(lat: number, lng: number): Promise<PlaceRegion> {
  // Round to 4 dp (~11 m) for cache key stability across minor drags.
  const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
  const cached = coordRegionCache.get(key);
  if (cached) return Promise.resolve(cached);

  return loadGoogleMaps().then(
    () =>
      new Promise<PlaceRegion>((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { location: { lat, lng } },
          (results: GeocoderResultLike[] | null, status: string) => {
            if (status !== "OK" || !results || results.length === 0) {
              reject(new Error(`Geocoding request failed: ${status}`));
              return;
            }

            // The Geocoder returns results from most-specific to least-specific.
            // The first result is typically the street address; we want the one
            // that carries administrative_area_level_1 (state) for reliable
            // Local/Outstation classification. Walk the results until we find
            // one with at least a state component, falling back to result[0]
            // if none has one (e.g. ocean coordinates — unlikely in this app).
            const best =
              results.find((r) =>
                r.address_components.some((c) => c.types.includes("administrative_area_level_1"))
              ) ?? results[0];

            const region = regionFromComponents(best.address_components);
            coordRegionCache.set(key, region);
            resolve(region);
          }
        );
      })
  );
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any;
  }
}