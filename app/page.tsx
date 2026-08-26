import Hero from "@/components/home/Hero";
import FullPageBusJourney from "@/components/home/FullPageBusJourney";
import ClientsStrip from "@/components/home/ClientsStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import FleetPreview from "@/components/home/FleetPreview";
import StatsCounter from "@/components/home/StatsCounter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* 🛣️ Continuous Full-Page Highway Ribbon with Large Platinum/Azure Luxury Coach in Background */}
      <FullPageBusJourney />

      {/* Main Website Sections (Translucent backgrounds letting the 3D highway journey show through) */}
      <div className="relative z-10">
        <Hero />
        <ClientsStrip />
        <ServicesGrid />
        <FleetPreview />
        <StatsCounter />
        <WhyChooseUs />
        <TestimonialSlider />
        <CTASection />
      </div>
    </div>
  );
}
