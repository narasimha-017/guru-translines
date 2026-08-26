"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";

export default function CTASection() {
  return (
    <section className="relative py-20 sm:py-28 bg-transparent">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-20"
          style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(99,102,241,0.12) 50%, rgba(6,182,212,0.1) 100%)",
            border: "1px solid rgba(59,130,246,0.25)",
            boxShadow: "0 0 60px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Background glow orbs */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 h-48 w-48 rounded-full blur-3xl opacity-20" style={{ background: "var(--accent-blue)" }} />
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 h-32 w-32 rounded-full blur-3xl opacity-20" style={{ background: "var(--accent-cyan)" }} />
          </div>
          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-cyan)" }}>Instant pricing</span>
            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-0.03em" }}>
              Know your fare before you call
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-secondary)" }}>
              Use our smart fare estimator to get an instant price for your trip — no waiting on a callback.
            </p>
            <motion.a
              href="/estimator"
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)", boxShadow: "0 0 24px rgba(59,130,246,0.4)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(59,130,246,0.65)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get instant quote <ArrowRight size={16} />
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
