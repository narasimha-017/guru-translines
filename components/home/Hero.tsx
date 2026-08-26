"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, Sparkles, Shield, Compass } from "lucide-react";
import dynamic from "next/dynamic";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink, buildWhatsAppLink, buildWhatsAppQuoteMessage, yearsInBusiness } from "@/lib/company";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false, loading: () => null });

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STAGGER: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const message = buildWhatsAppQuoteMessage({});

  return (
    <section ref={ref} className="relative overflow-hidden pt-12 pb-20" style={{ minHeight: "92svh", background: "var(--bg-base)" }}>
      {/* Deep Midnight Aurora Mesh */}
      <div className="aurora-bg" />

      {/* 3D Interactive Telemetry & Fleet Universe Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-85">
        <HeroCanvas />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 45%, transparent 30%, rgba(4, 13, 30, 0.85) 100%)" }} />

      <motion.div style={{ opacity, y }} className="relative z-30 flex min-h-[78svh] flex-col items-center justify-center text-center">
        <Container className="flex flex-col items-center">
          {/* Executive Heritage Badge */}
          <motion.div
            custom={0} variants={STAGGER} initial="hidden" animate="show"
            className="mb-7 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{
              border: "1px solid rgba(52, 211, 153, 0.35)",
              background: "rgba(16, 185, 129, 0.12)",
              color: "var(--accent-emerald-light)",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)",
            }}
          >
            <Compass size={14} className="text-emerald-400" />
            <span>{yearsInBusiness()}+ Years Telangana Mobility Excellence</span>
            <span className="text-emerald-500">•</span>
            <span>{COMPANY.fleetSize}+ GPS Fleet</span>
            <span className="text-emerald-500">•</span>
            <span className="text-amber-400 font-bold">24/7 Dispatch Desk</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            custom={1} variants={STAGGER} initial="hidden" animate="show"
            className="max-w-4xl text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            style={{ letterSpacing: "-0.04em", textShadow: "0 4px 30px rgba(0, 0, 0, 0.7)" }}
          >
            Executive Travel{" "}
            <span className="gradient-text-emerald">Solutions</span>
            <br />
            <span className="gradient-text-gold">Across India</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2} variants={STAGGER} initial="hidden" animate="show"
            className="mt-6 max-w-2xl text-base leading-relaxed sm:text-lg lg:text-xl font-medium"
            style={{ color: "var(--text-secondary)", textShadow: "0 2px 10px rgba(0, 0, 0, 0.5)" }}
          >
            Premium corporate employee mobility, outstation charters, luxury buses, and tempo travellers. Trusted by 50+ leading enterprises since {COMPANY.foundedYear}.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            custom={3} variants={STAGGER} initial="hidden" animate="show"
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/estimator"
              className="group inline-flex items-center gap-2.5 rounded-xl px-7 py-4 text-sm font-bold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 45px rgba(16, 185, 129, 0.8)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(16, 185, 129, 0.5)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Instant Fare Estimator <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={buildWhatsAppLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-bold text-amber-300 transition-all duration-300"
              style={{
                border: "1px solid rgba(245, 158, 11, 0.4)",
                background: "rgba(245, 158, 11, 0.12)",
                boxShadow: "0 0 20px rgba(245, 158, 11, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245, 158, 11, 0.22)";
                e.currentTarget.style.boxShadow = "0 0 35px rgba(245, 158, 11, 0.5)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(245, 158, 11, 0.12)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(245, 158, 11, 0.2)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <MessageCircle size={16} className="text-emerald-400" /> WhatsApp Direct Desk
            </a>

            <a
              href={buildTelLink()}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-4 text-sm font-semibold text-white transition-all duration-300"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.16)",
                background: "rgba(15, 36, 71, 0.6)",
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(25, 55, 105, 0.85)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(15, 36, 71, 0.6)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <Phone size={16} className="text-cyan-400" /> {COMPANY.contact.primaryPhoneDisplay}
            </a>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            custom={4} variants={STAGGER} initial="hidden" animate="show"
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 w-full max-w-3xl"
          >
            {[
              { value: `${yearsInBusiness()}+`, label: "Years Experience", color: "var(--accent-emerald-light)" },
              { value: `${COMPANY.fleetSize}+`, label: "Fleet Vehicles", color: "var(--accent-gold-light)" },
              { value: "50+", label: "Corporate Clients", color: "var(--accent-cyan)" },
              { value: "100%", label: "GPS Tracking", color: "#60a5fa" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 text-center transition-all"
                style={{
                  background: "rgba(15, 36, 71, 0.55)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                }}
              >
                <p className="text-2xl font-black" style={{ color: stat.color, fontFamily: "var(--font-mono)" }}>
                  {stat.value}
                </p>
                <p className="mt-0.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}
