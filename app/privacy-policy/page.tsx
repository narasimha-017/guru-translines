import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${COMPANY.name}.`,
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: June 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-gray-700">
          <p>
            {COMPANY.legalName} (&quot;we&quot;, &quot;us&quot;) collects the information you
            submit through our booking, enquiry, and contact forms — including your name,
            phone number, email address, and travel details — solely to respond to your inquiry,
            prepare quotes, and coordinate your trip.
          </p>

          <h2 className="text-lg font-bold text-gray-900">How We Use Your Information</h2>
          <p>
            Information submitted through this website is used solely to communicate with you about
            your travel requirements — over phone, WhatsApp, or email. We never sell, rent, or share
            your contact details with third-party marketers.
          </p>

          <h2 className="text-lg font-bold text-gray-900">WhatsApp Communication</h2>
          <p>
            When you choose to contact us via WhatsApp, your message and trip details are transmitted
            directly through WhatsApp&apos;s platform under WhatsApp&apos;s privacy terms and end-to-end encryption.
          </p>

          <h2 className="text-lg font-bold text-gray-900">Contact Us</h2>
          <p>
            For any questions or data requests regarding this privacy policy, please contact us at{" "}
            <a href={`mailto:${COMPANY.contact.salesEmail}`} className="font-semibold text-blue-600 hover:underline">
              {COMPANY.contact.salesEmail}
            </a>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
