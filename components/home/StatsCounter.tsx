"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import Container from "@/components/shared/Container";
import { COMPANY, yearsInBusiness } from "@/lib/company";

const STATS = [
  { value: yearsInBusiness(), suffix: "+", label: "Years in business", color: "var(--accent-blue)", glow: "rgba(59,130,246,0.3)" },
  { value: COMPANY.fleetSize, suffix: "+", label: "Vehicles in fleet", color: "var(--accent-cyan)", glow: "rgba(6,182,212,0.3)" },
  { value: 50, suffix: "+", label: "Corporate clients", color: "var(--accent-gold)", glow: "rgba(245,158,11,0.3)" },
  { value: 24, suffix: "/7", label: "Operations support", color: "var(--accent-violet)", glow: "rgba(139,92,246,0.3)" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} style={{ fontFamily: "var(--font-mono)" }}>
      {display}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative py-20" style={{ background: "rgba(8, 23, 48, 0.45)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Subtle glow strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)" }} />
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-3d-wrapper"
            >
              <motion.div
                className="card-3d glass glass-hover rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.03, rotateX: -4, rotateY: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ boxShadow: `0 0 30px ${stat.glow}` }}
              >
                {/* Accent dot */}
                <div className="mx-auto mb-3 h-2 w-2 rounded-full" style={{ background: stat.color, boxShadow: `0 0 8px ${stat.color}` }} />
                <p className="text-4xl font-bold text-white sm:text-5xl" style={{ color: stat.color, textShadow: `0 0 20px ${stat.glow}` }}>
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-xs font-medium" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
