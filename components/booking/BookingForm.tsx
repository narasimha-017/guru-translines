"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Calendar,
  MessageCircle,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Users,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { getStoredUtmParams } from "@/lib/analytics";
import { COMPANY, buildTelLink } from "@/lib/company";

const SERVICE_OPTIONS = [
  "Corporate Transportation",
  "Staff Transportation",
  "School & College Transport",
  "Airport Transfers",
  "Local City Trips & Rentals",
  "Outstation Trips & Charters",
  "PAN India Tour / Pilgrimage",
  "Weddings & Event Logistics",
  "Picnics & Group Outings",
  "Other / Custom Requirement",
];

export default function BookingForm() {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "Corporate Transportation";

  // Calculate today's date in YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    tripType: "outstation", // 'local' | 'outstation' | 'round_trip' | 'one_way'
    pickup: "",
    drop: "",
    travelDate: "",
    returnDate: "",
    isRoundTrip: false,
    passengers: 10,
    vehicleRequirement: SERVICE_OPTIONS.includes(initialService) ? initialService : "Corporate Transportation",
    requirements: "",
    consentGiven: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<{ leadId: string; whatsappUrl: string } | null>(null);

  // Set default travelDate to tomorrow if empty
  useEffect(() => {
    if (!form.travelDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split("T")[0];
      setForm((f) => ({ ...f, travelDate: tomorrowStr }));
    }
  }, []);

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((f) => {
      const next = { ...f, [key]: value };
      // If tripType changes to round_trip, auto-enable return date
      if (key === "tripType" && value === "round_trip") {
        next.isRoundTrip = true;
      }
      return next;
    });
    // Clear error on change
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
    setErrorStatus(null);
  }

  function validate() {
    const errs: Record<string, string> = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }

    const cleanPhone = form.phone.replace(/[^\d]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!form.pickup.trim()) {
      errs.pickup = "Please enter pickup location or city.";
    }

    if (!form.drop.trim()) {
      errs.drop = "Please enter destination or drop city.";
    }

    if (!form.travelDate) {
      errs.travelDate = "Please select a travel date.";
    } else if (form.travelDate < todayStr) {
      errs.travelDate = "Travel date cannot be in the past.";
    }

    if (form.isRoundTrip && form.returnDate) {
      if (form.returnDate < form.travelDate) {
        errs.returnDate = "Return date must be on or after the travel date.";
      }
    }

    if (!form.passengers || form.passengers < 1) {
      errs.passengers = "Please enter at least 1 passenger.";
    }

    if (!form.consentGiven) {
      errs.consentGiven = "You must agree to the consent to submit your enquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    setErrorStatus(null);

    // Collect marketing & UTM parameters
    const utm = getStoredUtmParams();

    try {
      const payload = {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        tripType: form.tripType === "local" ? "Local City Trip" : form.tripType === "round_trip" ? "Round Trip Outstation" : "Outstation Trip",
        pickup: form.pickup.trim(),
        drop: form.drop.trim(),
        travelDate: form.travelDate,
        returnDate: form.isRoundTrip && form.returnDate ? form.returnDate : undefined,
        passengers: Number(form.passengers) || 1,
        vehicleRequirement: form.vehicleRequirement,
        requirements: form.requirements.trim() || undefined,
        utmSource: utm.utm_source || "direct",
        utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign,
        utmContent: utm.utm_content,
        utmTerm: utm.utm_term,
        landingPage: utm.landing_page || window.location.pathname,
        consentGiven: form.consentGiven,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "We couldn't save your enquiry right now. Please try again or contact us directly.");
      }

      // Success: Save lead recorded and trigger WhatsApp redirect
      setSuccessStatus({
        leadId: data.leadId,
        whatsappUrl: data.whatsappUrl,
      });

      // Automatically redirect to WhatsApp after a brief delay
      setTimeout(() => {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }, 700);
    } catch (err: unknown) {
      console.error("Enquiry submission failed:", err);
      const msg = err instanceof Error ? err.message : "We couldn't save your enquiry right now. Please try again or contact us directly.";
      setErrorStatus(msg);
    } finally {
      setLoading(false);
    }
  }

  // ── Success State Screen ──────────────────────────────────
  if (successStatus) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-lg sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-gray-900">Enquiry Successfully Submitted!</h3>
        <p className="mx-auto mt-2 max-w-md text-base text-gray-600">
          Your travel enquiry has been recorded in our system. We are opening WhatsApp with your pre-filled trip details now.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={successStatus.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700"
          >
            <MessageCircle size={18} /> Open WhatsApp Directly
          </a>
          <button
            onClick={() => {
              setSuccessStatus(null);
            }}
            className="rounded-xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-200/90 bg-white p-6 shadow-sm sm:p-10"
      noValidate
    >
      <div className="border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">Book Your Journey</h2>
        <p className="mt-1.5 text-sm text-gray-600">
          Enter your trip requirements. Our 24/7 operations desk will review schedules and confirm your vehicle immediately.
        </p>
      </div>

      {/* Error Alert Box if submission failed */}
      {errorStatus && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50/90 p-5 text-left">
          <div className="flex items-start gap-3">
            <AlertCircle size={22} className="text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-red-900">Submission Notice</h4>
              <p className="mt-1 text-sm text-red-700 leading-relaxed">{errorStatus}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={buildTelLink()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
                >
                  <Phone size={14} /> Call {COMPANY.contact.primaryPhoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {/* Full Name */}
        <Field label="Full Name *" error={errors.fullName}>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => update("fullName", e.target.value)}
            className={inputClass(!!errors.fullName)}
            placeholder="e.g. Rahul Sharma"
            required
          />
        </Field>

        {/* Phone Number */}
        <Field label="Mobile Number *" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            placeholder="10-digit mobile number"
            required
          />
        </Field>

        {/* Email Address */}
        <Field label="Email Address (Optional)" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(!!errors.email)}
            placeholder="corporate@company.com"
          />
        </Field>

        {/* Trip Type Selection */}
        <Field label="Trip Type *" error={undefined}>
          <select
            value={form.tripType}
            onChange={(e) => update("tripType", e.target.value)}
            className={inputClass(false)}
          >
            <option value="outstation">Outstation Trip (Inter-city)</option>
            <option value="round_trip">Round Trip (Multi-day Outstation)</option>
            <option value="local">Local City Rental / Daily Commute</option>
            <option value="one_way">One-Way Inter-city Drop</option>
          </select>
        </Field>

        {/* Pickup Location */}
        <Field label="Pickup Location / City *" error={errors.pickup}>
          <div className="relative">
            <MapPin size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              value={form.pickup}
              onChange={(e) => update("pickup", e.target.value)}
              className={`${inputClass(!!errors.pickup)} pl-10`}
              placeholder="e.g. Hyderabad / Secunderabad"
              required
            />
          </div>
        </Field>

        {/* Drop Destination */}
        <Field label="Drop Destination / City *" error={errors.drop}>
          <div className="relative">
            <MapPin size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              value={form.drop}
              onChange={(e) => update("drop", e.target.value)}
              className={`${inputClass(!!errors.drop)} pl-10`}
              placeholder="e.g. Warangal / Bengaluru / Airport"
              required
            />
          </div>
        </Field>

        {/* ── 🗓️ FIXED CLEAN DATE PICKER (Travel Date) ── */}
        <Field label="Date of Travel *" error={errors.travelDate}>
          <div className="relative">
            <input
              type="date"
              min={todayStr}
              value={form.travelDate}
              onChange={(e) => {
                update("travelDate", e.target.value);
                // If return date is earlier than new travel date, adjust it
                if (form.returnDate && form.returnDate < e.target.value) {
                  update("returnDate", e.target.value);
                }
              }}
              className={inputClass(!!errors.travelDate)}
              required
            />
          </div>
        </Field>

        {/* ── 🗓️ Return Date (Optional or conditional) ── */}
        <Field
          label={
            <div className="flex items-center justify-between">
              <span>Return Date {form.isRoundTrip ? "*" : "(Optional)"}</span>
              {!form.isRoundTrip && (
                <button
                  type="button"
                  onClick={() => update("isRoundTrip", true)}
                  className="text-xs font-semibold text-blue-600 hover:underline"
                >
                  + Add Return Date
                </button>
              )}
            </div>
          }
          error={errors.returnDate}
        >
          {form.isRoundTrip ? (
            <div className="relative">
              <input
                type="date"
                min={form.travelDate || todayStr}
                value={form.returnDate}
                onChange={(e) => update("returnDate", e.target.value)}
                className={inputClass(!!errors.returnDate)}
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                update("isRoundTrip", true);
                if (!form.returnDate) {
                  update("returnDate", form.travelDate || todayStr);
                }
              }}
              className="flex h-[44px] w-full items-center justify-between rounded-xl border border-dashed border-gray-300 bg-gray-50/60 px-4 text-xs font-medium text-gray-500 transition-colors hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-700"
            >
              <span>Single day / One-way trip</span>
              <span className="font-semibold text-blue-600">Click to add Return Date &rarr;</span>
            </button>
          )}
        </Field>

        {/* Number of Passengers */}
        <Field label="Estimated Number of Passengers *" error={errors.passengers}>
          <div className="relative">
            <Users size={17} className="pointer-events-none absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="number"
              min={1}
              max={1000}
              value={form.passengers}
              onChange={(e) => update("passengers", Math.max(1, Number(e.target.value) || 1))}
              className={`${inputClass(!!errors.passengers)} pl-10`}
              required
            />
          </div>
        </Field>

        {/* Service / Vehicle Requirement */}
        <Field label="Service / Travel Category *" error={undefined}>
          <select
            value={form.vehicleRequirement}
            onChange={(e) => update("vehicleRequirement", e.target.value)}
            className={inputClass(false)}
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Additional Details */}
      <div className="mt-6">
        <Field label="Special Requirements or Route Preferences (Optional)" error={undefined}>
          <textarea
            value={form.requirements}
            onChange={(e) => update("requirements", e.target.value)}
            rows={3}
            className={inputClass(false)}
            placeholder="Mention shift timings, pickup points, luggage volume, or special arrangements..."
          />
        </Field>
      </div>

      {/* ── 🔒 Mandatory Consent Checkbox & Privacy Statement ── */}
      <div className="mt-6 rounded-2xl bg-blue-50/60 border border-blue-100 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consentGiven}
            onChange={(e) => update("consentGiven", e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <div className="text-xs text-gray-700 leading-relaxed">
            <span className="font-semibold text-gray-900">
              I agree to Guru Translines using these details to contact me regarding my enquiry.
            </span>
            <p className="mt-0.5 text-gray-500">
              Your details will be used by Guru Translines to respond to your enquiry. We respect your privacy and never share your information.
            </p>
          </div>
        </label>
        {errors.consentGiven && (
          <p className="mt-1.5 text-xs font-medium text-red-600 pl-7">{errors.consentGiven}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Saving & Connecting to WhatsApp...
            </>
          ) : (
            <>
              <Send size={18} /> Submit Enquiry & Open WhatsApp
            </>
          )}
        </button>

        <p className="text-xs text-gray-500">
          Enquiry is securely saved before dispatching to our 24/7 WhatsApp operations desk.
        </p>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 bg-white placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
      : "border-gray-300 focus:border-blue-600 focus:ring-blue-100"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-gray-700">{label}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}
