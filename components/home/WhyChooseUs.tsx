import { ShieldCheck, Clock, MapPin, UserCheck, CheckCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";

const POINTS = [
  {
    icon: UserCheck,
    title: "Professional Drivers",
    description: "Every driver is thoroughly vetted, experienced with city and interstate routes, and trained in defensive driving.",
  },
  {
    icon: MapPin,
    title: "PAN India Coverage",
    description: "Seamless travel network connecting major cities, commercial hubs, airport terminals, and tourist circuits across India.",
  },
  {
    icon: ShieldCheck,
    title: "100% GPS & Safety",
    description: "Real-time vehicle tracking, emergency safety provisions, first-aid kits, and statutory passenger compliance.",
  },
  {
    icon: Clock,
    title: "24/7 Operations Support",
    description: "Our dedicated dispatch and support team is available round the clock for live trip coordination and immediate booking assistance.",
  },
  {
    icon: CheckCircle,
    title: "Punctual & Dependable",
    description: "Over 40 years of trusted on-time service tailored for strict corporate shift schedules, flights, and event timings.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built on Four Decades of Trust & Excellence"
            description="Leading businesses, educational institutions, and travelers rely on Guru Translines for safe, reliable mobility."
          />
        </FadeIn>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <FadeIn key={point.title} delay={i * 0.05} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-blue-100 text-blue-600 shadow-xs">
                  <Icon size={26} />
                </div>
                <h3 className="mt-4 text-base font-bold text-gray-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{point.description}</p>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
