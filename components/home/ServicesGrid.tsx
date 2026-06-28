import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { SERVICES } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="What we do"
            title="Transportation for every occasion"
            description="From a daily employee commute to a multi-day pilgrimage trip, we plan the vehicle and route around your need."
          />
        </FadeIn>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block h-full rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-100"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {service.shortDescription}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 opacity-0 transition-opacity group-hover:opacity-100">
                    Learn more <ArrowRight size={14} />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
