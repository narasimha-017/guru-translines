import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { SERVICES } from "@/data/services";

export const metadata = {
  title: "Transportation Services",
  description:
    "Comprehensive transportation solutions across India — corporate staff commutes, school transport, airport transfers, weddings, and long-distance outstation travel.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Our Offerings"
            title="Comprehensive Transport Solutions Across India"
            description="From daily enterprise staff commuting to corporate events, airport transfers, and long-distance outstation journeys across India."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.slug} delay={i * 0.05}>
                <div className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/5">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-gray-900">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {s.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
                    >
                      Explore Service <ArrowRight size={15} />
                    </Link>
                    <Link
                      href="/booking"
                      className="text-xs font-semibold text-gray-500 hover:text-blue-600"
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
    </div>
  );
}
