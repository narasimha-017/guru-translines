import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${COMPANY.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <h1 className="text-3xl font-semibold text-gray-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: June 2026</p>

        <div className="prose mt-10 max-w-none text-sm leading-relaxed text-gray-700">
          <p>
            {COMPANY.legalName} (&quot;we&quot;, &quot;us&quot;) collects the information you
            submit through our booking, contact and fare-estimator forms — including your name,
            phone number, email address, and trip details — solely to respond to your inquiry,
            prepare a quote, and coordinate your booking.
          </p>
          <h2 className="mt-6 text-base font-semibold text-gray-900">How we use your information</h2>
          <p className="mt-2">
            Information submitted through this website is used only to communicate with you about
            your trip — over phone, WhatsApp or email — and is not sold or shared with third
            parties for marketing purposes.
          </p>
          <h2 className="mt-6 text-base font-semibold text-gray-900">WhatsApp communication</h2>
          <p className="mt-2">
            Where you choose to contact us via WhatsApp, your message and trip details are sent
            directly through WhatsApp&apos;s platform under WhatsApp&apos;s own privacy terms.
          </p>
          <h2 className="mt-6 text-base font-semibold text-gray-900">Contact us</h2>
          <p className="mt-2">
            For questions about this policy, contact us at{" "}
            <a href={`mailto:${COMPANY.contact.salesEmail}`} className="text-indigo-600">
              {COMPANY.contact.salesEmail}
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
