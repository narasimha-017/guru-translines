"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import FadeIn from "@/components/shared/FadeIn";
import { TESTIMONIALS } from "@/data/testimonials";

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;

  function next() {
    setIndex((i) => (i + 1) % total);
  }
  function prev() {
    setIndex((i) => (i - 1 + total) % total);
  }

  const t = TESTIMONIALS[index];

  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <FadeIn>
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by Businesses and Travelers"
            description="Read what our corporate clients, institutions, and travelers have to say about our transportation services."
          />
        </FadeIn>

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/80 bg-slate-50/70 p-8 sm:p-12 shadow-xs">
            <Quote className="text-blue-200" size={44} />
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                <div className="mt-4 flex gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-5 text-lg leading-relaxed text-gray-800 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <p className="text-base font-bold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-xs transition-colors hover:bg-gray-50"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-xs transition-colors hover:bg-gray-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
