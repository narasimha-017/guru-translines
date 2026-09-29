import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import ContactForm from "@/components/contact/ContactForm";
import { COMPANY, buildTelLink } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Guru Translines — call, WhatsApp, email, or visit our operations desk in West Marredpally, Secunderabad.",
};

export default function ContactPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Get in Touch"
            title="We Are Here to Assist Your Travel"
            description="Reach out for custom corporate mobility packages, wedding & event logistics, or group travel bookings across India."
          />
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <FadeIn className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={buildTelLink()}
                className="group flex items-center gap-3.5 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Call Operations</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {COMPANY.contact.primaryPhoneDisplay}
                  </p>
                </div>
              </a>

              <Link
                href="/booking"
                className="group flex items-center gap-3.5 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">WhatsApp Desk</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    Book / Enquire &rarr;
                  </p>
                </div>
              </Link>

              <a
                href={`mailto:${COMPANY.contact.salesEmail}`}
                className="group flex items-center gap-3.5 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email Inquiries</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">{COMPANY.contact.salesEmail}</p>
                </div>
              </a>

              <div className="flex items-center gap-3.5 rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Head Office</p>
                  <p className="mt-0.5 text-sm font-bold text-gray-900">
                    {COMPANY.address.city}, {COMPANY.address.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Location Embed */}
            <div className="overflow-hidden rounded-3xl border border-gray-200/90 shadow-xs">
              <iframe
                title="Guru Translines location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  COMPANY.address.full
                )}&output=embed`}
                width="100%"
                height="290"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
