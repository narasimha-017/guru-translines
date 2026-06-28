"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
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
      <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cyan-50 text-teal-600">
          <Mail size={22} />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-gray-900">Message ready to send</h3>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ve opened WhatsApp with your message — hit send and we&apos;ll get back to you
          shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-5 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          Edit message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(!!errors.name)}
            placeholder="Your name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone number</label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(!!errors.phone)}
            placeholder="10-digit mobile number"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Email (optional)</label>
        <input
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass(!!errors.email)}
          placeholder="you@email.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">Message</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={4}
          className={inputClass(!!errors.message)}
          placeholder="How can we help?"
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500 sm:w-auto"
      >
        Send message
      </button>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 ${
    hasError ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-indigo-500"
  }`;
}
