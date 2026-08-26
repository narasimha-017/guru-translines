"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink } from "@/lib/company";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet" },
  { href: "/estimator", label: "Fare Estimator" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(4,4,13,0.94)" : "rgba(4,4,13,0.65)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.1)"
          : "1px solid rgba(255,255,255,0.06)",
        boxShadow: scrolled
          ? "0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.05)"
          : "none",
      }}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 0px rgba(6,182,212,0))",
                "drop-shadow(0 0 12px rgba(6,182,212,0.7))",
                "drop-shadow(0 0 0px rgba(6,182,212,0))",
              ],
            }}
            transition={{ duration: 2.5, repeat: 2, ease: "easeInOut" }}
          >
            <Image
              src="/images/brand/logo-white.svg"
              alt={COMPANY.name}
              width={40}
              height={40}
              className="h-9 w-9 sm:h-10 sm:w-10"
              priority
            />
          </motion.div>
          <span className="text-base font-semibold text-white sm:text-lg">{COMPANY.name}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                style={{ color: isActive ? "var(--accent-cyan)" : "rgba(203,213,225,0.8)" }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={buildTelLink()}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-white"
            style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "var(--text-secondary)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <Phone size={15} /> {COMPANY.contact.primaryPhoneDisplay}
          </a>
          <Link
            href="/estimator"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, var(--accent-blue), #2563eb)",
              boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            }}
          >
            Get quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="rounded-lg p-2 lg:hidden"
          style={{ color: "var(--text-secondary)" }}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "x" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(4,4,13,0.98)" }}
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link, i) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium transition-colors"
                      style={{
                        color: isActive ? "var(--accent-cyan)" : "var(--text-secondary)",
                        background: isActive ? "rgba(6,182,212,0.08)" : "transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-3 flex flex-col gap-2 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <a
                  href={buildTelLink()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--text-secondary)", background: "rgba(255,255,255,0.04)" }}
                >
                  <Phone size={15} /> Call {COMPANY.contact.primaryPhoneDisplay}
                </a>
                <Link
                  href="/estimator"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, var(--accent-blue), #2563eb)" }}
                >
                  Get quote
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

