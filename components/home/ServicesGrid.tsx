"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { SERVICES } from "@/data/services";

const SERVICE_COLORS = [
  { front: "rgba(99,102,241,0.15)", border: "rgba(99,102,241,0.3)", glow: "rgba(99,102,241,0.2)", icon: "#6366f1" },
  { front: "rgba(6,182,212,0.15)", border: "rgba(6,182,212,0.3)", glow: "rgba(6,182,212,0.2)", icon: "#06b6d4" },
  { front: "rgba(16,185,129,0.15)", border: "rgba(16,185,129,0.3)", glow: "rgba(16,185,129,0.2)", icon: "#10b981" },
  { front: "rgba(245,158,11,0.15)", border: "rgba(245,158,11,0.3)", glow: "rgba(245,158,11,0.2)", icon: "#f59e0b" },
  { front: "rgba(244,63,94,0.15)", border: "rgba(244,63,94,0.3)", glow: "rgba(244,63,94,0.2)", icon: "#f43f5e" },
  { front: "rgba(139,92,246,0.15)", border: "rgba(139,92,246,0.3)", glow: "rgba(139,92,246,0.2)", icon: "#8b5cf6" },
];

export default function ServicesGrid() {
  return (
    <section className="relative py-20 sm:py-28 bg-transparent">
      {/* Section label */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-cyan)" }}>What we do</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-0.03em" }}>
            Transportation for every occasion
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-muted)" }}>
            From a daily employee commute to a multi-day pilgrimage trip — we plan the vehicle and route around your need.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            const colors = SERVICE_COLORS[i % SERVICE_COLORS.length];
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flip-card"
                style={{ height: "220px" }}
              >
                <div className="flip-card-inner">
                  {/* Front */}
                  <div
                    className="flip-card-front flex flex-col items-start justify-between p-6"
                    style={{
                      background: "var(--glass-bg)",
                      border: `1px solid ${colors.border}`,
                      backdropFilter: "blur(20px)",
                      boxShadow: `0 0 30px ${colors.glow}`,
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: colors.front, border: `1px solid ${colors.border}` }}>
                      <Icon size={22} style={{ color: colors.icon }} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{service.name}</h3>
                      <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>Hover to learn more</p>
                    </div>
                  </div>
                  {/* Back */}
                  <div
                    className="flip-card-back flex flex-col justify-between p-6"
                    style={{
                      background: `linear-gradient(135deg, ${colors.front}, rgba(4,4,13,0.9))`,
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <div>
                      <h3 className="text-base font-semibold text-white">{service.name}</h3>
                      <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{service.shortDescription}</p>
                    </div>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium transition-all hover:gap-2.5"
                      style={{ color: colors.icon }}
                    >
                      Learn more <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
