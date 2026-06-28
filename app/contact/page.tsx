import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import ContactForm from "@/components/contact/ContactForm";
import { COMPANY, buildTelLink, buildWhatsAppLink, buildWhatsAppQuoteMessage } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Guru Translines — call, WhatsApp, email, or visit us in West Marredpally, Secunderabad.",
};

export default function ContactPage() {
  const message = buildWhatsAppQuoteMessage({});

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Contact"
            title="We're here to help"
            description="Reach out for a quote, a booking, or just to ask a question — we typically respond within the hour during business hours."
          />
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <FadeIn className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={buildTelLink()}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 transition-colors hover:border-gray-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Call us</p>
                  <p className="text-sm font-medium text-gray-900">
                    {COMPANY.contact.primaryPhoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={buildWhatsAppLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 transition-colors hover:border-gray-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-teal-600">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">WhatsApp</p>
                  <p className="text-sm font-medium text-gray-900">
                    {COMPANY.contact.primaryPhoneDisplay}
                  </p>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY.contact.salesEmail}`}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-5 transition-colors hover:border-gray-200"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-900">{COMPANY.contact.salesEmail}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {COMPANY.address.city}, {COMPANY.address.state}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <iframe
                title="Guru Translines location map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  COMPANY.address.full
                )}&output=embed`}
                width="100%"
                height="280"
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
