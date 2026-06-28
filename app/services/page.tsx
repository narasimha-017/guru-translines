import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Staff transportation, school transportation, picnics, weddings & events, pilgrimage trips, and inter & intra-city travel — Guru Translines' full range of services.",
};

export default function ServicesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Services"
            title="Transportation for every occasion"
            description="Whatever the occasion, we plan the vehicle, driver and route around it."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.slug} delay={i * 0.05}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-indigo-600">
                      <Icon size={18} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-gray-900">{service.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {service.shortDescription}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600">
                      Learn more <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
