"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatButton() {
  return (
    <Link
      href="/booking"
      aria-label="Enquire with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-900/20 transition-all duration-200 hover:scale-110 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={28} className="fill-white text-[#25D366]" />
      <span className="pointer-events-none absolute right-16 hidden whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:block group-hover:opacity-100">
        Enquire on WhatsApp
      </span>
    </Link>
  );
}
