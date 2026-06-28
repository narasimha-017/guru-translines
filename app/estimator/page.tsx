"use client";

import { Suspense } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import FareEstimatorForm from "@/components/estimator/FareEstimatorForm";

export default function EstimatorPage() {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Smart fare estimator"
            title="Get your instant fare in seconds"
            description="Pick your trip type and vehicle below for a transparent, upfront estimate — no waiting on a callback."
          />
        </FadeIn>

        <FadeIn delay={0.1} className="mt-12">
          <Suspense fallback={null}>
            <FareEstimatorForm />
          </Suspense>
        </FadeIn>
      </Container>
    </div>
  );
}
