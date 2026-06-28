import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Vehicle",
  description:
    "Request a booking with Guru Translines — fill in your trip details and we'll confirm availability over WhatsApp.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
