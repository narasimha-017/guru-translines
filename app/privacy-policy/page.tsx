import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and terms of service for Guru Translines.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24" style={{ background: "var(--bg-base)" }}>
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-black text-white sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--accent-emerald-light)" }}>
          Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <p>
            {COMPANY.legalName} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting any personal information you share with us through our website.
          </p>

          <h2 className="text-lg font-bold text-white pt-4">1. Information We Collect</h2>
          <p>
            When you use our Fare Estimator or contact forms, we collect details such as your name, phone number, email address, pickup and drop locations, and travel dates to prepare quotations.
          </p>

          <h2 className="text-lg font-bold text-white pt-4">2. How We Use Information</h2>
          <p>
            Information collected is strictly used to fulfill trip requests, provide customer support, dispatch verified drivers, and manage invoices. We do not sell or rent personal information to third parties.
          </p>

          <h2 className="text-lg font-bold text-white pt-4">3. WhatsApp Communication</h2>
          <p>
            By initiating contact via WhatsApp or submitting booking requests, you agree to receive trip confirmations, quotations, and driver allocation notices via WhatsApp and SMS.
          </p>

          <h2 className="text-lg font-bold text-white pt-4">4. Contact Us</h2>
          <p>
            If you have questions regarding our privacy practices, please contact us at{" "}
            <a href={`mailto:${COMPANY.contact.salesEmail}`} className="text-emerald-400 underline">
              {COMPANY.contact.salesEmail}
            </a>.
          </p>
        </div>
      </Container>
    </div>
  );
}
