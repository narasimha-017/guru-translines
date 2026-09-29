"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink, yearsInBusiness } from "@/lib/company";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-white to-white py-16 sm:py-24 lg:py-28">
      {/* Subtle decorative background patterns */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-800 shadow-xs"
          >
            <ShieldCheck size={15} className="text-blue-600" />
            <span>{yearsInBusiness()}+ Years of Trusted Service</span>
            <span className="text-blue-300">•</span>
            <span>PAN India Reach</span>
            <span className="text-blue-300">•</span>
            <span className="text-blue-700 font-bold">24/7 Operations Desk</span>
          </motion.div>

          {/* Master Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Premium travel solutions{" "}
            <span className="text-blue-600">across India</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg"
          >
            Comprehensive corporate employee mobility, staff commuting, school transportation,
            airport transfers, weddings, and long-distance outstation journeys across India.
          </motion.p>

          {/* CTAs (Both Book a Trip and WhatsApp route into the Lead Flow) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
            >
              Book Your Trip <ArrowRight size={16} />
            </Link>

            <Link
              href="/booking"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/30"
            >
              <MessageCircle size={16} /> WhatsApp Enquiry
            </Link>

            <a
              href={buildTelLink()}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-800 shadow-xs transition-all hover:bg-gray-50 hover:border-gray-300"
            >
              <Phone size={16} className="text-blue-600" /> Call {COMPANY.contact.primaryPhoneDisplay}
            </a>
          </motion.div>

          {/* Trust Highlights Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-gray-600"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" />
              <span>100% GPS Live Tracking</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" />
              <span>Vetted & Experienced Drivers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" />
              <span>Punctual Schedules</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-blue-600" />
              <span>PAN India Coverage</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
