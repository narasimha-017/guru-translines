"use client";

import { motion } from "framer-motion";
import Container from "@/components/shared/Container";

// Exact logos provided by the user in the reference image
const CLIENT_LOGOS = [
  {
    name: "Crop Science",
    subtitle: "Bayer Group",
    render: () => (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] border border-cyan-400/40">
          BAYER
        </div>
        <span className="text-sm font-bold text-emerald-400">Crop Science</span>
      </div>
    ),
  },
  {
    name: "Hammond Power Solutions",
    subtitle: "HPS Inc.",
    render: () => (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <div className="flex items-center justify-center rounded bg-amber-900/40 px-1.5 py-0.5 border border-amber-600/40 font-black text-xs text-amber-300">
          HPS
        </div>
        <div className="text-left">
          <p className="text-xs font-bold text-white leading-tight">Hammond Power</p>
          <p className="text-[10px] text-slate-400 leading-tight">Solutions Inc.</p>
        </div>
      </div>
    ),
  },
  {
    name: "Indus International School",
    subtitle: "Hyderabad",
    render: () => (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-amber-300 font-serif font-black text-xs border border-amber-400/40">
          🏛️
        </div>
        <div className="text-left">
          <p className="text-xs font-black text-amber-300 tracking-wider">INDUS</p>
          <p className="text-[9px] text-slate-300 uppercase tracking-tight">International School</p>
        </div>
      </div>
    ),
  },
  {
    name: "Nunhems",
    subtitle: "The Global Specialist",
    render: () => (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <div className="flex items-center justify-center rounded bg-orange-600 px-2 py-0.5 text-white font-black text-xs">
          NZ
        </div>
        <div className="text-left">
          <p className="text-xs font-black text-orange-400">nunhems</p>
          <p className="text-[9px] text-slate-400">the global specialist</p>
        </div>
      </div>
    ),
  },
  {
    name: "KEP",
    subtitle: "Engineering Planning",
    render: () => (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-cyan-600 text-white font-black text-xs">
          ◆
        </div>
        <div className="text-left">
          <p className="text-xs font-black text-cyan-400 tracking-wider">KEP</p>
          <p className="text-[8px] text-slate-400">engineering planning</p>
        </div>
      </div>
    ),
  },
  {
    name: "Sagarasia",
    subtitle: "Industrial Group",
    render: () => (
      <div className="flex items-center gap-2 px-3 py-1.5">
        <div className="flex items-center justify-center rounded-lg bg-red-600 px-2.5 py-1 text-white font-serif font-bold text-xs shadow-md">
          Sa
        </div>
        <span className="text-xs font-bold text-rose-300 tracking-wide">Sagarasia</span>
      </div>
    ),
  },
];

export default function ClientsStrip() {
  return (
    <section
      className="relative py-14"
      style={{
        background: "rgba(7, 21, 46, 0.65)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(59, 130, 246, 0.15)",
        borderBottom: "1px solid rgba(59, 130, 246, 0.15)",
      }}
    >
      <Container>
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest" style={{ color: "var(--accent-emerald-light)" }}>
          Trusted By Industry Leaders & Institutions
        </p>

        {/* Client Logos Grid / Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {CLIENT_LOGOS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex items-center rounded-2xl p-1.5 transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(15, 36, 71, 0.75)",
                border: "1px solid rgba(96, 165, 250, 0.2)",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
            >
              {client.render()}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
