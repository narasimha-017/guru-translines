"use client";

import { Suspense } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import BookingForm from "@/components/booking/BookingForm";

export default function BookingPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container className="max-w-2xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Booking"
            title="Request a booking"
            description="Fill in your trip details below — we'll confirm availability and final pricing over WhatsApp."
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <Suspense fallback={null}>
            <BookingForm />
          </Suspense>
        </FadeIn>
      </Container>
    </div>
  );
}
