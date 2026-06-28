import Hero from "@/components/home/Hero";
import ClientsStrip from "@/components/home/ClientsStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import FleetPreview from "@/components/home/FleetPreview";
import StatsCounter from "@/components/home/StatsCounter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsStrip />
      <ServicesGrid />
      <FleetPreview />
      <StatsCounter />
      <WhyChooseUs />
      <TestimonialSlider />
      <CTASection />
    </>
  );
}
