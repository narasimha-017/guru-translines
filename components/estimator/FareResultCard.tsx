"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { LocalFareBreakdown, OutstationFareBreakdown } from "@/lib/rates";
import { buildWhatsAppLink, buildWhatsAppQuoteMessage } from "@/lib/company";
import { formatDurationMinutes } from "@/lib/googleMaps";

interface FareResultCardProps {
  vehicleName: string;
  ac: string;
  tripType: "local" | "outstation";
  pickup: string;
  drop: string;
  result: LocalFareBreakdown | OutstationFareBreakdown | null;
  /** Informational only — one-way drive time from Google Maps. Does not affect fare. */
  durationMinutes?: number | null;
}

function formatRupees(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function FareResultCard({
  vehicleName,
  ac,
  tripType,
  pickup,
  drop,
  result,
  durationMinutes,
}: FareResultCardProps) {
  const whatsappMessage = buildWhatsAppQuoteMessage({
    vehicle: `${vehicleName} (${ac})`,
    tripType: tripType === "local" ? "Local" : "Outstation",
    pickup: pickup || "-",
    drop: drop || "-",
    estimatedFare: result ? formatRupees(result.total) : undefined,
  });

  return (
    <div className="sticky top-24 self-start rounded-2xl bg-gray-900 p-6 text-white sm:p-8">
      <p className="text-xs font-medium uppercase tracking-wide text-indigo-300">
        Estimated fare
      </p>

      {result ? (
        <>
          <p className="mt-2 text-4xl font-semibold">{formatRupees(result.total)}</p>
          <p className="mt-1 text-sm text-gray-400">
            {vehicleName} &middot; {ac} &middot; {tripType === "local" ? "Local" : "Outstation"}
          </p>

          <div className="mt-6 space-y-2 border-t border-white/10 pt-6 text-sm text-gray-300">
            {result.type === "local" ? (
              <>
                <Row label="Base package (8 hrs / 80 km)" value={formatRupees(result.basicRate)} />
                <Row label="Extra hours" value={formatRupees(result.extraHourCharge)} />
                <Row label="Extra distance" value={formatRupees(result.extraKmCharge)} />
                {result.lateNightCharge > 0 && (
                  <Row label="Night travel charge" value={formatRupees(result.lateNightCharge)} />
                )}
              </>
            ) : (
              <>
                <Row
                  label={`Distance (${result.billableKm} km @ ${formatRupees(result.perKm)}/km)`}
                  value={formatRupees(result.kmCharge)}
                />
                <Row
                  label={`Driver allowance (${result.days} day${result.days > 1 ? "s" : ""})`}
                  value={formatRupees(result.driverBattaTotal)}
                />
              </>
            )}
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Tolls, parking and state tax are billed at actuals and are not included above.
          </p>
          {durationMinutes != null && (
            <p className="mt-1 text-xs text-gray-500">
              Estimated drive time: ~{formatDurationMinutes(durationMinutes)} (one-way)
            </p>
          )}
        </>
      ) : (
        <p className="mt-2 text-sm text-gray-400">
          Rates for this combination aren&apos;t available yet — message us directly for a quote.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href="/booking"
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Get final quote <ArrowRight size={16} />
        </Link>
        <a
          href={buildWhatsAppLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <MessageCircle size={16} /> WhatsApp inquiry
        </a>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="text-white">{value}</span>
    </div>
  );
}
