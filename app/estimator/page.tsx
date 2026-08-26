"use client";

import { Suspense } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import FareEstimatorForm from "@/components/estimator/FareEstimatorForm";

export default function EstimatorPage() {
  return (
    <div className="relative py-16 sm:py-24" style={{ background: "var(--bg-base)" }}>
      {/* Background glow orbs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-12 h-96 w-96 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-emerald)" }} />
        <div className="absolute right-1/4 bottom-12 h-96 w-96 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-gold)" }} />
      </div>

      <Container className="relative">
        <FadeIn>
          <SectionHeading
            eyebrow="Smart Fare Estimator"
            title="Get Your Instant Fare in Seconds"
            description="Pick your trip type and vehicle below for a transparent, upfront estimate — no waiting on a callback."
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <div
            className="rounded-3xl p-6 sm:p-10"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading calculator...</div>}>
              <FareEstimatorForm />
            </Suspense>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
