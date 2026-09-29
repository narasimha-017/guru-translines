"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/shared/Container";
import { COMPANY, buildTelLink } from "@/lib/company";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book Trip" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md transition-all shadow-xs">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/brand/logo.svg"
            alt={COMPANY.name}
            width={40}
            height={40}
            className="h-9 w-9 sm:h-10 sm:w-10"
            priority
          />
          <span className="text-base font-bold text-gray-900 sm:text-lg tracking-tight">
            {COMPANY.name}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Contact CTA (Routes to /booking enquiry flow, keeps Phone number) */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-3.5 py-2 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
          >
            <MessageCircle size={15} className="text-emerald-600" /> WhatsApp Enquiry
          </Link>
          <a
            href={buildTelLink()}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
          >
            <Phone size={15} className="text-blue-600" /> {COMPANY.contact.primaryPhoneDisplay}
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="border-t border-gray-100 bg-white shadow-lg lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-4">
              <a
                href={buildTelLink()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-50 border border-blue-100 px-4 py-2.5 text-sm font-semibold text-blue-700"
              >
                <Phone size={15} /> Call {COMPANY.contact.primaryPhoneDisplay}
              </a>
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                <MessageCircle size={15} /> WhatsApp Enquiry
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
