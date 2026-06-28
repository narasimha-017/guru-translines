import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import FleetCard from "@/components/fleet/FleetCard";
import { FLEET } from "@/data/fleet";

export default function FleetPreview() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Our fleet"
            title="A vehicle for every group size"
            description="Every vehicle is GPS-tracked, regularly serviced and driven by an experienced, vetted driver."
          />
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FLEET.slice(0, 4).map((vehicle, i) => (
            <FadeIn key={vehicle.id} delay={i * 0.05}>
              <FleetCard vehicle={vehicle} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View full fleet <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
