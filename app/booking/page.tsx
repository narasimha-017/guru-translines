import { Suspense } from "react";
import type { Metadata } from "next";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import BookingForm from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book a Trip",
  description:
    "Request corporate commute, group travel, airport transfer, or outstation transportation across India with Guru Translines.",
};

export default function BookingPage() {
  return (
    <div className="bg-slate-50/50 py-16 sm:py-24">
      <Container className="max-w-3xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Direct Reservation & Enquiry"
            title="Book Your Journey"
            description="Submit your travel requirements below. Our operations desk will check schedules and confirm your booking immediately."
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-10">
          <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading booking form...</div>}>
            <BookingForm />
          </Suspense>
        </FadeIn>
      </Container>
    </div>
  );
}
