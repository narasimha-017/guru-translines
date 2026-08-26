"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Container from "@/components/shared/Container";
import { TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = TESTIMONIALS.length;

  function go(dir: number) {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
  }

  const t = TESTIMONIALS[index];
  const initials = t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <section className="relative py-20 sm:py-28 bg-transparent">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full opacity-8 blur-3xl" style={{ background: "var(--accent-indigo)" }} />
        <div className="absolute right-1/4 bottom-0 h-48 w-48 rounded-full opacity-8 blur-3xl" style={{ background: "var(--accent-cyan)" }} />
      </div>
      <Container className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-gold)" }}>What clients say</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            Trusted by businesses and families alike
          </h2>
        </motion.div>

        {/* Card */}
        <div className="mx-auto mt-14 max-w-2xl">
          {/* Stacked background cards */}
          <div className="relative" style={{ height: "280px" }}>
            {[-1, 1].map((offset) => (
              <div
                key={offset}
                className="absolute inset-x-4 glass rounded-2xl"
                style={{
                  top: "12px",
                  bottom: 0,
                  transform: `translateX(${offset * 8}px) scale(0.96)`,
                  opacity: 0.4,
                  zIndex: 0,
                }}
              />
            ))}

            {/* Main card */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 60, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d * -60, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 glass rounded-2xl p-8 sm:p-10"
                style={{ zIndex: 1, boxShadow: "0 0 40px rgba(99,102,241,0.12)" }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_: unknown, i: number) => (
                    <Star key={i} size={14} fill="#f59e0b" className="text-amber-400" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-5 text-base leading-relaxed text-white sm:text-lg">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  {/* Avatar */}
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: "linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))" }}
                  >
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Previous" className="flex h-10 w-10 items-center justify-center rounded-full glass glass-hover text-white transition-all">
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_: unknown, i: number) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                  aria-label={`Go to ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === index ? "24px" : "6px", background: i === index ? "var(--accent-cyan)" : "rgba(255,255,255,0.2)" }}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Next" className="flex h-10 w-10 items-center justify-center rounded-full glass glass-hover text-white transition-all">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
