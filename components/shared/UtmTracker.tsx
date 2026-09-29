"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { storeUtmParamsFromUrl } from "@/lib/analytics";

export default function UtmTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    storeUtmParamsFromUrl(searchParams, pathname);
  }, [pathname, searchParams]);

  return null;
}
