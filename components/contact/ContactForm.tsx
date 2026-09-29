"use client";

import { useState } from "react";
import { MessageCircle, CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { getStoredUtmParams } from "@/lib/analytics";
import { COMPANY, buildTelLink } from "@/lib/company";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    consentGiven: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [successStatus, setSuccessStatus] = useState<{ whatsappUrl: string } | null>(null);

  function update<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
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

    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Please enter your full name.";
    }

    const cleanPhone = form.phone.replace(/[^\d]/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!form.message.trim() || form.message.trim().length < 5) {
      errs.message = "Please enter your travel requirements or message.";
    }

    if (!form.consentGiven) {
      errs.consentGiven = "You must agree to the consent to submit.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || loading) return;

    setLoading(true);
    setErrorStatus(null);

    const utm = getStoredUtmParams();

    try {
      const payload = {
        fullName: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        tripType: "General Contact / Enquiry",
        pickup: "As per message",
        drop: "As per message",
        travelDate: new Date().toISOString().split("T")[0],
        passengers: 1,
        vehicleRequirement: "General Enquiry",
        requirements: form.message.trim(),
        utmSource: utm.utm_source || "direct",
        utmMedium: utm.utm_medium,
        utmCampaign: utm.utm_campaign,
        utmContent: utm.utm_content,
        utmTerm: utm.utm_term,
        landingPage: utm.landing_page || "/contact",
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

      setSuccessStatus({ whatsappUrl: data.whatsappUrl });

      // Automatically redirect to WhatsApp after a brief delay
      setTimeout(() => {
        window.open(data.whatsappUrl, "_blank", "noopener,noreferrer");
      }, 700);
    } catch (err: unknown) {
      console.error("Contact form error:", err);
      const msg = err instanceof Error ? err.message : "We couldn't save your enquiry right now. Please try again or contact us directly.";
      setErrorStatus(msg);
    } finally {
      setLoading(false);
    }
  }

  if (successStatus) {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-900">Enquiry Recorded!</h3>
        <p className="mt-2 text-sm text-gray-600 leading-relaxed">
          Your enquiry has been saved and WhatsApp has opened with your message.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <a
            href={successStatus.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
          >
            <MessageCircle size={16} /> Open WhatsApp
          </a>
          <button
            onClick={() => setSuccessStatus(null)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-200/90 bg-white p-6 shadow-sm sm:p-8"
      noValidate
    >
      <h3 className="text-xl font-bold text-gray-900">Send an Enquiry</h3>
      <p className="mt-1 text-sm text-gray-500">
        We typically respond within 15 minutes during business hours.
      </p>

      {errorStatus && (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50/90 p-4 text-left">
          <div className="flex items-start gap-2.5">
            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-red-900">Notice</p>
              <p className="mt-0.5 text-xs text-red-700">{errorStatus}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Full Name *</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="e.g. Rahul Sharma"
            required
          />
          {errors.name && <p className="mt-1 text-xs font-medium text-red-500">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-gray-700">Phone Number *</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            placeholder="10-digit mobile number"
            required
          />
          {errors.phone && <p className="mt-1 text-xs font-medium text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Email Address (Optional)</label>
        <input
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass(!!errors.email)}
          placeholder="corporate@company.com"
        />
        {errors.email && <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>}
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-semibold text-gray-700">Message / Travel Details *</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className={inputClass(!!errors.message)}
          placeholder="Tell us about passenger count, routes, dates, or corporate contract requirements..."
          required
        />
        {errors.message && <p className="mt-1 text-xs font-medium text-red-500">{errors.message}</p>}
      </div>

      <div className="mt-5 rounded-xl bg-blue-50/60 border border-blue-100 p-3.5">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={form.consentGiven}
            onChange={(e) => update("consentGiven", e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            required
          />
          <span className="text-xs text-gray-700">
            I agree to Guru Translines using these details to contact me regarding my enquiry.
          </span>
        </label>
        {errors.consentGiven && (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.consentGiven}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 disabled:opacity-75 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Saving & Connecting...
          </>
        ) : (
          <>
            <Send size={16} /> Send Enquiry & Open WhatsApp
          </>
        )}
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border px-3.5 py-2.5 text-sm text-gray-900 bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-300 focus:border-red-500 focus:ring-red-100"
      : "border-gray-300 focus:border-blue-600 focus:ring-blue-100"
  }`;
}
