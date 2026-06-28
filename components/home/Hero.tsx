"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink, buildWhatsAppLink, buildWhatsAppQuoteMessage, yearsInBusiness } from "@/lib/company";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const message = buildWhatsAppQuoteMessage({});

  return (
    <section ref={ref} className="relative overflow-hidden bg-gray-900">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src="/images/fleet/hero-fleet-1.jpg"
          alt="Guru Translines fleet vehicle"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
      </motion.div>

      <Container className="relative z-10 flex min-h-[560px] flex-col items-center justify-center py-24 text-center sm:min-h-[620px]">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-indigo-200"
        >
          {yearsInBusiness()}+ years &middot; {COMPANY.fleetSize}-vehicle fleet &middot; GPS-tracked
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Premium travel solutions Across India
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-xl text-base text-gray-300 sm:text-lg"
        >
          Reliable local and outstation transportation services, trusted by companies across
          Hyderabad since {COMPANY.foundedYear}.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/estimator"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Get quote <ArrowRight size={16} />
          </a>
          <a
            href={buildWhatsAppLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/40 bg-white/5 px-6 py-3.5 text-sm font-medium text-cyan-300 transition-colors hover:bg-white/10"
          >
            <MessageCircle size={16} /> WhatsApp us
          </a>
          <a
            href={buildTelLink()}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            <Phone size={16} /> Call now
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
