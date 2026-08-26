"use client";

import { Suspense } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import BookingForm from "@/components/booking/BookingForm";

export default function BookingPage() {
  return (
    <div className="relative py-16 sm:py-24" style={{ background: "var(--bg-base)" }}>
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/3 top-10 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-emerald)" }} />
        <div className="absolute right-1/3 bottom-10 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-cyan)" }} />
      </div>

      <Container className="relative max-w-3xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Direct Reservation"
            title="Request a Booking"
            description="Fill in your trip details below — our operations desk will confirm availability and dispatch confirmation immediately."
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <div
            className="rounded-3xl p-6 sm:p-10"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading booking form...</div>}>
              <BookingForm />
            </Suspense>
          </div>
        </FadeIn>
      </Container>
    </div>
  );
}
