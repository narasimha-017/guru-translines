import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Target, Compass, MapPin, Users, Phone } from "lucide-react";
import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";
import { COMPANY, yearsInBusiness, buildTelLink } from "@/lib/company";

export const metadata: Metadata = {
  title: "About Us",
  description: `Guru Translines has provided premium transportation solutions across India since ${COMPANY.foundedYear}. Learn our heritage, vision, and mission.`,
};

export default function AboutPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <Container className="max-w-4xl">
        <FadeIn>
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
            About Guru Translines
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            {yearsInBusiness()}+ Years on the Road, Delivering Excellence Across India
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            A trusted mobility partner for leading enterprises, institutions, event planners, and travelers nationwide.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100 shadow-md">
          <Image
            src="/images/fleet/fleet-back.jpg"
            alt="Guru Translines transportation operations"
            fill
            className="object-cover"
          />
        </FadeIn>

        <FadeIn delay={0.15} className="mt-12 space-y-6 text-gray-700 leading-relaxed text-base">
          <h2 className="text-2xl font-bold text-gray-900">Our Heritage & Story</h2>
          <p>
            Guru Translines began in {COMPANY.foundedYear} as Guru Travels, a pioneering transportation
            operator in Secunderabad. Driven by a commitment to reliability, passenger safety, and exceptional
            customer service, the organization was formally restructured in {COMPANY.renamedYear} into {COMPANY.legalName}.
          </p>
          <p>
            Over the past four decades, we have evolved into a comprehensive transportation management company
            serving enterprise employee commutes, school and college transport, VIP airport transfers, large-scale
            wedding logistics, and customized group charters across India.
          </p>
        </FadeIn>

        {/* Pillars Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          <FadeIn delay={0.2}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Compass size={22} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">Our Vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                To be India&apos;s most dependable, safety-driven group and corporate transportation partner.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Target size={22} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">Our Mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                To ensure every passenger reaches their destination safely, punctually, and comfortably on every trip.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-xs">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-900">Our Standards</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                100% GPS live tracking, verified drivers, strict safety protocols, and statutory compliance.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Highlights Bar */}
        <FadeIn delay={0.35} className="mt-12 rounded-2xl bg-blue-50 border border-blue-100 p-8 text-center sm:p-10">
          <h3 className="text-xl font-bold text-gray-900 sm:text-2xl">Need Reliable Transportation?</h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-gray-600">
            Our 24/7 operations desk is ready to help you plan corporate commutes, group travel, or outstation tours.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <a
              href={buildTelLink()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
            >
              <Phone size={16} /> Call {COMPANY.contact.primaryPhoneDisplay}
            </a>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
