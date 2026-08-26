"use client";

import { ShieldCheck, Clock, Wrench, IndianRupee, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import { COMPANY } from "@/lib/company";

const POINTS = [
  { icon: UserCheck, title: "Professional drivers", description: "Every driver is vetted, trained and experienced with both city and highway routes.", color: "#3b82f6", glow: "rgba(59,130,246,0.25)" },
  { icon: Clock, title: "24/7 support", description: "Our operations team is reachable around the clock for booking changes or on-trip support.", color: "#06b6d4", glow: "rgba(6,182,212,0.25)" },
  { icon: ShieldCheck, title: "Safe travel", description: `GPS-tracked vehicles fitted with seat belts, fire extinguishers and first-aid kits.`, color: "#10b981", glow: "rgba(16,185,129,0.25)" },
  { icon: Wrench, title: "Well-maintained fleet", description: `A ${COMPANY.fleetSize}-vehicle fleet kept to a strict maintenance and servicing schedule.`, color: "#f59e0b", glow: "rgba(245,158,11,0.25)" },
  { icon: IndianRupee, title: "Transparent pricing", description: "Clear, upfront fares with no hidden charges — see exactly what you pay for.", color: "#8b5cf6", glow: "rgba(139,92,246,0.25)" },
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-28 bg-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>Why choose us</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            Built on four decades of trust
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {POINTS.map((point, i) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-3d-wrapper"
              >
                <motion.div
                  className="card-3d glass glass-hover rounded-2xl p-6 text-center"
                  whileHover={{ rotateX: -6, rotateY: 4, scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  style={{ boxShadow: `0 0 24px ${point.glow}`, minHeight: "200px" }}
                >
                  {/* 3D floating icon */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
                    style={{ background: `${point.glow}`, border: `1px solid ${point.color}40`, boxShadow: `0 0 16px ${point.glow}` }}
                  >
                    <Icon size={24} style={{ color: point.color }} />
                  </motion.div>
                  <h3 className="mt-5 text-sm font-semibold text-white">{point.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{point.description}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
