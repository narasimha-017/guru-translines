"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
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
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-teal-600">
          <MessageCircle size={22} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Almost there</h3>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ve opened WhatsApp with your booking details filled in — just hit send and our
          team will confirm shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Edit details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
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
            <option value="local">Local</option>
            <option value="outstation">Outstation</option>
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
            placeholder="e.g. Warangal"
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
            <option value="">Select a vehicle</option>
            {FLEET.map((v) => (
              <option key={v.id} value={v.id}>
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
        <Field label="Message (optional)" error={undefined}>
          <textarea
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={3}
            className={inputClass(false)}
            placeholder="Any other details about your trip"
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
      >
        <MessageCircle size={16} /> Send booking request via WhatsApp
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 ${
    hasError ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-indigo-500"
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
      <label className="mb-1.5 block text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
