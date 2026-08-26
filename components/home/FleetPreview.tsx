"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Container from "@/components/shared/Container";
import FleetCard from "@/components/fleet/FleetCard";
import { FLEET } from "@/data/fleet";

export default function FleetPreview() {
  return (
    <section className="relative py-20 sm:py-28 bg-transparent">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-8 blur-3xl" style={{ background: "var(--accent-blue)" }} />
      </div>
      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--accent-violet)" }}>Our fleet</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl" style={{ letterSpacing: "-0.03em" }}>
            A vehicle for every group size
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base" style={{ color: "var(--text-muted)" }}>
            Every vehicle is GPS-tracked, regularly serviced and driven by an experienced, vetted driver.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FLEET.slice(0, 4).map((vehicle, i) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-3d-wrapper"
            >
              <motion.div
                className="card-3d"
                whileHover={{ rotateX: -4, rotateY: 6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
              >
                <FleetCard vehicle={vehicle} />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/fleet"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200"
            style={{ border: "1px solid rgba(139,92,246,0.35)", background: "rgba(139,92,246,0.1)", color: "var(--accent-violet)" }}
          >
            View full fleet <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
