"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import ContactForm from "@/components/contact/ContactForm";
import { COMPANY, buildTelLink, buildWhatsAppLink, buildWhatsAppQuoteMessage } from "@/lib/company";

export default function ContactPage() {
  const message = buildWhatsAppQuoteMessage({});

  return (
    <div className="relative py-16 sm:py-24" style={{ background: "var(--bg-base)" }}>
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-emerald)" }} />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-gold)" }} />
      </div>

      <Container className="relative">
        <FadeIn>
          <SectionHeading
            eyebrow="Direct Line"
            title="We're here to help"
            description="Reach out for an instant quotation, custom corporate contracts, or trip bookings — our team responds rapidly 24/7."
          />
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <FadeIn className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={buildTelLink()}
                className="group flex items-center gap-3.5 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid rgba(59, 130, 246, 0.25)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: "rgba(59, 130, 246, 0.15)", border: "1px solid rgba(59, 130, 246, 0.4)", color: "#60a5fa" }}>
                  <Phone size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Call Operations</p>
                  <p className="text-sm font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors">
                    {COMPANY.contact.primaryPhoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={buildWhatsAppLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3.5 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid rgba(16, 185, 129, 0.25)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.4)", color: "#34d399" }}>
                  <MessageCircle size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>WhatsApp 24/7</p>
                  <p className="text-sm font-bold text-white mt-0.5 group-hover:text-emerald-400 transition-colors">
                    {COMPANY.contact.primaryPhoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY.contact.salesEmail}`}
                className="group flex items-center gap-3.5 rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid rgba(245, 158, 11, 0.25)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: "rgba(245, 158, 11, 0.15)", border: "1px solid rgba(245, 158, 11, 0.4)", color: "#fbbf24" }}>
                  <Mail size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Sales Email</p>
                  <p className="text-sm font-bold text-white mt-0.5 group-hover:text-amber-400 transition-colors">
                    {COMPANY.contact.salesEmail}
                  </p>
                </div>
              </a>

              <div
                className="flex items-center gap-3.5 rounded-2xl p-5"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(16px)",
                }}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: "rgba(255, 255, 255, 0.08)", border: "1px solid rgba(255, 255, 255, 0.15)", color: "#cbd5e1" }}>
                  <MapPin size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Headquarters</p>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {COMPANY.address.city}, {COMPANY.address.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps View */}
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "rgba(59, 130, 246, 0.3)" }}>
              <iframe
                title="Guru Translines location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  COMPANY.address.full
                )}&output=embed`}
                width="100%"
                height="280"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
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
