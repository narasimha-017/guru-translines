import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, Target, Compass } from "lucide-react";
import Container from "@/components/shared/Container";
import FadeIn from "@/components/shared/FadeIn";
import { COMPANY, yearsInBusiness } from "@/lib/company";

export const metadata: Metadata = {
  title: "About Us",
  description: `Guru Translines has provided local and outstation transportation across Telangana since ${COMPANY.foundedYear}. Learn our story, vision and mission.`,
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-3xl">
        <FadeIn>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            About us
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            {yearsInBusiness()} years on the road, one trip at a time
          </h1>
        </FadeIn>

        <FadeIn delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src="/images/fleet/fleet-back.jpg"
            alt="Guru Translines fleet"
            fill
            className="object-cover"
          />
        </FadeIn>

        <FadeIn delay={0.15} className="prose mt-10 max-w-none text-gray-700">
          <h2 className="text-xl font-semibold text-gray-900">Our story</h2>
          <p className="mt-3 leading-relaxed">
            Guru Translines began in {COMPANY.foundedYear} as Guru Travels, a small transportation
            operator serving Secunderabad and the wider Hyderabad region. As demand grew from
            individual customers, schools and corporate clients alike, the company was
            restructured in {COMPANY.renamedYear} into {COMPANY.legalName} — a formal,
            professionally managed fleet operator built to serve that scale.
          </p>
          <p className="mt-4 leading-relaxed">
            Today, the fleet has grown to {COMPANY.fleetSize} vehicles ranging from Tempo
            Travellers to full-size DLX coaches, serving staff transportation contracts, school
            routes, weddings, pilgrimage trips and inter-city travel across Telangana.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <FadeIn delay={0.2}>
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <Compass className="text-indigo-600" size={22} />
              <h3 className="mt-4 text-base font-semibold text-gray-900">Our vision</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                To be Telangana&apos;s most trusted name in group transportation — known as much
                for reliability as for fleet size.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <Target className="text-indigo-600" size={22} />
              <h3 className="mt-4 text-base font-semibold text-gray-900">Our mission</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                To get every passenger to their destination safely, on time, and at a fair,
                transparent price — every single trip.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <ShieldCheck className="text-indigo-600" size={22} />
              <h3 className="mt-4 text-base font-semibold text-gray-900">Our standard</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                GPS-tracked vehicles, vetted and trained drivers, and staff covered under ESI and
                PF — safety isn&apos;t an add-on, it&apos;s the baseline.
              </p>
            </div>
          </FadeIn>
        </div>
      </Container>
    </div>
  );
}
