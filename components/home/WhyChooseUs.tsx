import { ShieldCheck, Clock, Wrench, IndianRupee, UserCheck } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { COMPANY } from "@/lib/company";

const POINTS = [
  {
    icon: UserCheck,
    title: "Professional drivers",
    description: "Every driver is vetted, trained and experienced with both city and highway routes.",
  },
  {
    icon: Clock,
    title: "24/7 support",
    description: "Our operations team is reachable around the clock for booking changes or on-trip support.",
  },
  {
    icon: ShieldCheck,
    title: "Safe travel",
    description: "GPS-tracked vehicles fitted with seat belts, fire extinguishers and first-aid kits.",
  },
  {
    icon: Wrench,
    title: "Well-maintained fleet",
    description: `A ${COMPANY.fleetSize}-vehicle fleet kept to a strict maintenance and servicing schedule.`,
  },
  {
    icon: IndianRupee,
    title: "Transparent pricing",
    description: "Clear, upfront fares with no hidden charges — see exactly what you pay for.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading eyebrow="Why choose us" title="Built on four decades of trust" />
        </FadeIn>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <FadeIn key={point.title} delay={i * 0.05} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                  <Icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{point.description}</p>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
