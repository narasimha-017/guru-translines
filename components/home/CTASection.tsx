import Link from "next/link";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";
import { COMPANY, buildTelLink } from "@/lib/company";

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-blue-50/50">
      <Container>
        <FadeIn>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-8 py-14 text-center text-white shadow-xl shadow-blue-600/15 sm:px-16 sm:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Plan Your Next Journey Across India?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
              Contact our 24/7 operations desk for tailored corporate commute plans, event guest logistics,
              airport transfers, or outstation tours.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-700 shadow-md transition-all hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98]"
              >
                Book Your Trip <ArrowRight size={16} />
              </Link>

              <Link
                href="/booking"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-emerald-600 hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle size={16} /> WhatsApp Enquiry
              </Link>

              <a
                href={buildTelLink()}
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition-all hover:bg-white/20"
              >
                <Phone size={16} /> Call {COMPANY.contact.primaryPhoneDisplay}
              </a>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
