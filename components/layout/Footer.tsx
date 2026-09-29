import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink, yearsInBusiness } from "@/lib/company";
import { SERVICES } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/brand/logo-white.svg"
              alt={COMPANY.name}
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-base font-bold text-white tracking-tight">{COMPANY.name}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            {yearsInBusiness()}+ years of safe, reliable, and premium transportation solutions across India.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-950/80 border border-blue-800/60 px-3 py-1 text-xs font-medium text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            100% GPS-Tracked Operations
          </div>
        </div>

        {/* Services List */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Services</h3>
          <ul className="mt-4 space-y-2.5">
            {SERVICES.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links (No Fleet / No Estimator) */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link href="/services" className="text-sm text-slate-400 transition-colors hover:text-white">
                All Services
              </Link>
            </li>
            <li>
              <Link href="/booking" className="text-sm text-slate-400 transition-colors hover:text-white">
                Book a Trip
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-slate-400 transition-colors hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-slate-400 transition-colors hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-slate-400 transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-sm font-semibold text-white tracking-wide uppercase">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-blue-400" />
              <span>{COMPANY.address.full}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="shrink-0 text-blue-400" />
              <a href={buildTelLink()} className="hover:text-white transition-colors">
                {COMPANY.contact.primaryPhoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={16} className="shrink-0 text-blue-400" />
              <a href={`mailto:${COMPANY.contact.salesEmail}`} className="hover:text-white transition-colors">
                {COMPANY.contact.salesEmail}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      {/* Copyright Bar */}
      <div className="border-t border-slate-800 py-6">
        <Container className="flex flex-col items-center justify-between gap-3 text-xs text-slate-400 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {COMPANY.legalName}. All rights reserved.</p>
          <p>Serving Corporate & Group Travel Since {COMPANY.foundedYear} &middot; PAN India Operations</p>
        </Container>
      </div>
    </footer>
  );
}
