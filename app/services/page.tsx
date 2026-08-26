"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { SERVICES } from "@/data/services";

export default function ServicesPage() {
  return (
    <div className="relative py-16 sm:py-24" style={{ background: "var(--bg-base)" }}>
      {/* Aurora glow blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-1/4 top-10 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-emerald)" }} />
        <div className="absolute left-1/4 bottom-10 h-72 w-72 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-cyan)" }} />
      </div>

      <Container className="relative">
        <FadeIn>
          <SectionHeading
            eyebrow="Tailored Mobility"
            title="Comprehensive Transport Services"
            description="From daily enterprise staff commuting to multi-day wedding parties and pilgrimages across India."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.slug} delay={i * 0.08}>
                <div
                  className="flex h-full flex-col justify-between rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{ background: "rgba(16, 185, 129, 0.15)", border: "1px solid rgba(16, 185, 129, 0.35)", color: "#34d399" }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-xl font-bold text-white">{s.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {s.shortDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
                    >
                      Explore Service Details <ArrowRight size={15} />
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
