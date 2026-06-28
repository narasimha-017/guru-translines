"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink, buildWhatsAppQuoteMessage } from "@/lib/company";

export default function WhatsAppFloatButton() {
  const message = buildWhatsAppQuoteMessage({});

  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
    >
      <MessageCircle size={26} fill="white" className="text-[#25D366]" />
    </a>
  );
}
