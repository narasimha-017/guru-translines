"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle, Send } from "lucide-react";
import { FLEET } from "@/data/fleet";
import { bookingSchema, BookingInput } from "@/lib/validations";
import { buildWhatsAppLink, buildWhatsAppQuoteMessage } from "@/lib/company";

const EMPTY: BookingInput = {
  name: "",
  phone: "",
  email: "",
  pickup: "",
  drop: "",
  date: "",
  vehicle: "",
  passengers: 1,
  tripType: "local",
  message: "",
};

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<BookingInput>({
    ...EMPTY,
    vehicle: searchParams.get("vehicle") ?? "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof BookingInput>(key: K, value: BookingInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = bookingSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof BookingInput;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const vehicleName = FLEET.find((v) => v.id === form.vehicle)?.name ?? form.vehicle;
    const message = buildWhatsAppQuoteMessage({
      vehicle: vehicleName,
      tripType: form.tripType === "local" ? "Local" : "Outstation",
      pickup: form.pickup,
      drop: form.drop,
      date: form.date,
      passengers: form.passengers,
    });

    setSubmitted(true);
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl p-8 text-center"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.2)",
        }}
      >
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            background: "rgba(16, 185, 129, 0.2)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            color: "#34d399",
          }}
        >
          <MessageCircle size={24} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">Booking Details Ready</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          WhatsApp has opened with your trip reservation details — just hit send and our dispatch desk will confirm availability and vehicle assignment.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            color: "var(--accent-emerald-light)",
          }}
        >
          Edit Details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="Your name"
          />
        </Field>

        <Field label="Phone number" error={errors.phone}>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            placeholder="10-digit mobile number"
          />
        </Field>

        <Field label="Email (optional)" error={errors.email}>
          <input
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
            placeholder="you@email.com"
          />
        </Field>

        <Field label="Trip type" error={undefined}>
          <select
            value={form.tripType}
            onChange={(e) => update("tripType", e.target.value as "local" | "outstation")}
            className={inputClass(false)}
          >
            <option value="local" className="bg-slate-900 text-white">Local (City / Rental)</option>
            <option value="outstation" className="bg-slate-900 text-white">Outstation (Inter-city)</option>
          </select>
        </Field>

        <Field label="Pickup location" error={errors.pickup}>
          <input
            value={form.pickup}
            onChange={(e) => update("pickup", e.target.value)}
            className={inputClass(!!errors.pickup)}
            placeholder="e.g. Secunderabad"
          />
        </Field>

        <Field label="Drop location" error={errors.drop}>
          <input
            value={form.drop}
            onChange={(e) => update("drop", e.target.value)}
            className={inputClass(!!errors.drop)}
            placeholder="e.g. Warangal / Airport"
          />
        </Field>

        <Field label="Date of travel" error={errors.date}>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update("date", e.target.value)}
            className={inputClass(!!errors.date)}
          />
        </Field>

        <Field label="Vehicle" error={errors.vehicle}>
          <select
            value={form.vehicle}
            onChange={(e) => update("vehicle", e.target.value)}
            className={inputClass(!!errors.vehicle)}
          >
            <option value="" className="bg-slate-900 text-white">Select a vehicle</option>
            {FLEET.map((v) => (
              <option key={v.id} value={v.id} className="bg-slate-900 text-white">
                {v.name} ({v.capacity} seater)
              </option>
            ))}
          </select>
        </Field>

        <Field label="Number of passengers" error={errors.passengers}>
          <input
            type="number"
            min={1}
            value={form.passengers}
            onChange={(e) => update("passengers", Number(e.target.value) || 1)}
            className={inputClass(!!errors.passengers)}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="Special Requirements or Message (Optional)" error={undefined}>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={3}
            className={inputClass(false)}
            placeholder="Tell us about baggage, stops, flight timings, or route preferences..."
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-sm font-bold text-white transition-all sm:w-auto"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
        }}
      >
        <MessageCircle size={17} /> Send Booking Request via WhatsApp
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder:text-slate-400 transition-all focus:outline-none focus:ring-2 ${
    hasError
      ? "border-rose-400 bg-rose-950/30 focus:ring-rose-500/40"
      : "border-blue-500/30 bg-slate-900/80 focus:border-emerald-400 focus:ring-emerald-400/30"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-white">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs font-medium text-rose-400">{error}</p>}
    </div>
  );
}
