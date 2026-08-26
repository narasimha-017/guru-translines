"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink, yearsInBusiness } from "@/lib/company";
import { SERVICES } from "@/data/services";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, var(--bg-surface) 0%, #020208 100%)" }}
    >
      {/* Aurora top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(6,182,212,0.6), rgba(139,92,246,0.4), transparent)" }}
      />
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full opacity-10 blur-3xl" style={{ background: "var(--accent-indigo)" }} />
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full opacity-10 blur-3xl" style={{ background: "var(--accent-cyan)" }} />
      </div>
      <Container className="relative grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/brand/logo-white.svg" alt={COMPANY.name} width={36} height={36} className="h-9 w-9" />
            <span className="text-base font-semibold text-white">{COMPANY.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            {yearsInBusiness()}+ years of safe, reliable transportation across India.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium"
            style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "var(--accent-emerald)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GPS-tracked fleet
          </div>
        </div>
        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold text-white">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="text-sm transition-colors hover:text-cyan-400" style={{ color: "var(--text-muted)" }}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold text-white">Quick links</h3>
          <ul className="mt-4 space-y-2.5">
            {[
              { href: "/fleet", label: "Our fleet" },
              { href: "/estimator", label: "Fare estimator" },
              { href: "/booking", label: "Book a vehicle" },
              { href: "/about", label: "About us" },
              { href: "/privacy-policy", label: "Privacy policy" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm transition-colors hover:text-cyan-400" style={{ color: "var(--text-muted)" }}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
            <li className="flex items-start gap-2.5"><MapPin size={15} className="mt-0.5 shrink-0 opacity-60" />{COMPANY.address.full}</li>
            <li className="flex items-center gap-2.5"><Phone size={15} className="shrink-0 opacity-60" /><a href={buildTelLink()} className="hover:text-white">{COMPANY.contact.primaryPhoneDisplay}</a></li>
            <li className="flex items-center gap-2.5"><Mail size={15} className="shrink-0 opacity-60" /><a href={`mailto:${COMPANY.contact.salesEmail}`} className="hover:text-white">{COMPANY.contact.salesEmail}</a></li>
          </ul>
        </div>
      </Container>
      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row" style={{ color: "var(--text-subtle)" }}>
          <p>&copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          <p>Operating since {COMPANY.foundedYear} &middot; Secunderabad, Telangana</p>
        </Container>
      </div>
    </footer>
  );
}
