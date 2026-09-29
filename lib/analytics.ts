export interface UtmParams {
  utm_source: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
}

const STORAGE_KEY = "gt_utm_params";

export function storeUtmParamsFromUrl(searchParams: URLSearchParams, currentPath: string): void {
  if (typeof window === "undefined") return;

  const utm_source = searchParams.get("utm_source");
  const utm_medium = searchParams.get("utm_medium");
  const utm_campaign = searchParams.get("utm_campaign");
  const utm_content = searchParams.get("utm_content");
  const utm_term = searchParams.get("utm_term");

  const existingRaw = sessionStorage.getItem(STORAGE_KEY);
  let existing: Partial<UtmParams> = {};
  if (existingRaw) {
    try {
      existing = JSON.parse(existingRaw);
    } catch {
      existing = {};
    }
  }

  // If new UTM parameters are present, update them
  if (utm_source) {
    const params: UtmParams = {
      utm_source: utm_source.trim(),
      utm_medium: utm_medium?.trim() || undefined,
      utm_campaign: utm_campaign?.trim() || undefined,
      utm_content: utm_content?.trim() || undefined,
      utm_term: utm_term?.trim() || undefined,
      landing_page: existing.landing_page || currentPath || "/",
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  } else if (!existing.landing_page) {
    // Record first landing page if none stored
    const params: UtmParams = {
      utm_source: existing.utm_source || "direct",
      landing_page: currentPath || "/",
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(params));
  }
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") {
    return { utm_source: "direct", landing_page: "/" };
  }

  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      return {
        utm_source: parsed.utm_source || "direct",
        utm_medium: parsed.utm_medium,
        utm_campaign: parsed.utm_campaign,
        utm_content: parsed.utm_content,
        utm_term: parsed.utm_term,
        landing_page: parsed.landing_page || window.location.pathname,
      };
    } catch {
      // Fallback
    }
  }

  return {
    utm_source: "direct",
    landing_page: window.location.pathname || "/",
  };
}
