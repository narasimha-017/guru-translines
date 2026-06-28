"use client";

import { useMemo, useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import FleetCard from "@/components/fleet/FleetCard";
import FleetFilterBar, { FleetFilter } from "@/components/fleet/FleetFilterBar";
import { FLEET } from "@/data/fleet";

export default function FleetPage() {
  const [filter, setFilter] = useState<FleetFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return FLEET;
    if (filter === "small") return FLEET.filter((v) => v.capacity <= 17);
    if (filter === "medium") return FLEET.filter((v) => v.capacity >= 22 && v.capacity <= 27);
    return FLEET.filter((v) => v.capacity >= 40);
  }, [filter]);

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Our fleet"
            title="Six vehicles. One reliable standard."
            description="Every vehicle is GPS-tracked, regularly serviced, and comes with an experienced driver. Pick the size that fits your group, then get an instant fare in our estimator."
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <FleetFilterBar active={filter} onChange={setFilter} />
        </FadeIn>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((vehicle, i) => (
            <FadeIn key={vehicle.id} delay={i * 0.05}>
              <FleetCard vehicle={vehicle} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-14 rounded-2xl border border-gray-100 bg-gray-50 p-8 text-center">
          <h3 className="text-lg font-semibold text-gray-900">Need a vehicle outside this list?</h3>
          <p className="mt-2 text-sm text-gray-600">
            Sedans, Innova Crysta and larger coaches are available on request — message us
            directly for a custom quote.
          </p>
          <a
            href="/contact"
            className="mt-5 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Contact us
          </a>
        </FadeIn>
      </Container>
    </div>
  );
}
