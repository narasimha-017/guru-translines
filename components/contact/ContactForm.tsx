"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { contactSchema, ContactInput } from "@/lib/validations";
import { buildWhatsAppLink } from "@/lib/company";

const EMPTY: ContactInput = { name: "", phone: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<ContactInput>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof ContactInput>(key: K, value: ContactInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactInput, string>> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof ContactInput;
        fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const message = `Hello Guru Translines,\n\nMy name is ${form.name}.\n\n${form.message}\n\nPhone: ${form.phone}${
      form.email ? `\nEmail: ${form.email}` : ""
    }`;
    setSubmitted(true);
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div className="rounded-2xl p-8 text-center"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.2)",
        }}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "rgba(16, 185, 129, 0.2)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#34d399" }}>
          <Mail size={24} />
        </div>
        <h3 className="mt-4 text-xl font-bold text-white">Message Ready To Dispatch</h3>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          WhatsApp has opened with your details. Press send and our operations dispatch desk will confirm right away.
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
          Edit Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl p-6 sm:p-8"
      style={{
        background: "var(--glass-bg)",
        border: "1px solid var(--glass-border)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-white">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="e.g. Rahul Sharma"
          />
          {errors.name && <p className="mt-1 text-xs font-medium text-rose-400">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-white">Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            placeholder="10-digit mobile number"
          />
          {errors.phone && <p className="mt-1 text-xs font-medium text-rose-400">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-white">Email Address (Optional)</label>
        <input
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass(!!errors.email)}
          placeholder="e.g. corporate@company.com"
        />
        {errors.email && <p className="mt-1 text-xs font-medium text-rose-400">{errors.email}</p>}
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-semibold text-white">Trip Requirements & Details</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className={inputClass(!!errors.message)}
          placeholder="Mention vehicle type, number of passengers, pickup point, dates..."
        />
        {errors.message && <p className="mt-1 text-xs font-medium text-rose-400">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-white transition-all sm:w-auto"
        style={{
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
        }}
      >
        <Send size={16} /> Send via WhatsApp
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
