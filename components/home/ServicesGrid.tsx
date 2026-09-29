import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { SERVICES } from "@/data/services";

export default function ServicesGrid() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Our Services"
            title="Comprehensive Travel Solutions Across India"
            description="From daily enterprise staff commuting to corporate events, airport transfers, and long-distance outstation journeys across India."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.slug} delay={i * 0.04}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-gray-900">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                    <Link
                      href="/booking"
                      className="text-xs font-medium text-gray-500 hover:text-blue-600"
                    >
                      Book Now &rarr;
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
