import Hero from "@/components/home/Hero";
import ClientsStrip from "@/components/home/ClientsStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import StatsCounter from "@/components/home/StatsCounter";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import CTASection from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      <Hero />
      <ClientsStrip />
      <ServicesGrid />
      <WhyChooseUs />
      <StatsCounter />
      <TestimonialSlider />
      <CTASection />
    </div>
  );
}
