"use client";

import { Shield, Users, Clock, Award, CheckCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { COMPANY, yearsInBusiness } from "@/lib/company";

export default function AboutPage() {
  return (
    <div className="relative py-16 sm:py-24" style={{ background: "var(--bg-base)" }}>
      {/* Aurora glow blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/3 top-20 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-emerald)" }} />
        <div className="absolute right-1/4 bottom-20 h-80 w-80 rounded-full opacity-15 blur-3xl" style={{ background: "var(--accent-gold)" }} />
      </div>

      <Container className="relative">
        <FadeIn>
          <SectionHeading
            eyebrow="Our Heritage"
            title="Four Decades of Trust on Telangana Roads"
            description={`Founded in ${COMPANY.foundedYear}, Guru Translines has evolved into one of Hyderabad's most trusted corporate and private transport partners.`}
          />
        </FadeIn>

        {/* Milestone stats banner */}
        <FadeIn delay={0.1} className="mt-14">
          <div
            className="grid gap-6 rounded-3xl p-8 sm:grid-cols-3 sm:p-10"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.12))",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div className="text-center sm:text-left">
              <p className="text-4xl font-black text-emerald-400 sm:text-5xl" style={{ fontFamily: "var(--font-mono)" }}>
                {yearsInBusiness()}+
              </p>
              <p className="mt-2 text-sm font-semibold text-white">Years Operating</p>
              <p className="text-xs text-slate-400 mt-0.5">Continuous safe passenger journeys</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-4xl font-black text-amber-400 sm:text-5xl" style={{ fontFamily: "var(--font-mono)" }}>
                {COMPANY.fleetSize}+
              </p>
              <p className="mt-2 text-sm font-semibold text-white">Modern Vehicles</p>
              <p className="text-xs text-slate-400 mt-0.5">Buses, tempo travellers, and sedans</p>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-4xl font-black text-cyan-400 sm:text-5xl" style={{ fontFamily: "var(--font-mono)" }}>
                50+
              </p>
              <p className="mt-2 text-sm font-semibold text-white">Enterprise Clients</p>
              <p className="text-xs text-slate-400 mt-0.5">Pharma, tech, and institutions</p>
            </div>
          </div>
        </FadeIn>

        {/* Vision & Values Pillars */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Uncompromising Safety",
              desc: "100% GPS monitored, verified professional chauffeurs, speed-governed engines, and regular safety audits.",
              color: "#34d399",
            },
            {
              icon: Clock,
              title: "Punctuality & Reliability",
              desc: "Over 99.4% on-time departure records for employee shifts and group outstation excursions.",
              color: "#fbbf24",
            },
            {
              icon: Award,
              title: "Transparent Standards",
              desc: "Clear upfront billing, no hidden fuel spikes, clean AC interiors, and 24/7 dedicated dispatch desks.",
              color: "#60a5fa",
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <FadeIn key={pillar.title} delay={i * 0.1}>
                <div
                  className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: `${pillar.color}20`, border: `1px solid ${pillar.color}40`, color: pillar.color }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {pillar.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
