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
    <div className="relative py-16 sm:py-24" style={{ background: "var(--bg-base)" }}>
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-10 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-emerald)" }} />
        <div className="absolute right-1/4 bottom-10 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-gold)" }} />
      </div>

      <Container className="relative">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Fleet"
            title="Six Vehicles. One Reliable Standard."
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

        <FadeIn delay={0.1} className="mt-14 rounded-3xl p-8 sm:p-10 text-center"
          style={{
            background: "var(--glass-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(16px)",
          }}
        >
          <h3 className="text-xl font-bold text-white">Need a vehicle outside this list?</h3>
          <p className="mt-2 text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Sedans, Innova Crysta, premium Volvo and BharatBenz luxury coaches are available on request — contact our desk directly for a customized quote.
          </p>
          <a
            href="/contact"
            className="mt-6 inline-flex items-center justify-center rounded-xl px-7 py-3.5 text-sm font-bold text-white transition-all"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              boxShadow: "0 0 25px rgba(16, 185, 129, 0.35)",
            }}
          >
            Contact Operations Desk
          </a>
        </FadeIn>
      </Container>
    </div>
  );
}
