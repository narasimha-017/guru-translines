import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Browse the Guru Translines fleet — Tempo Traveller, SML Minibus, 17 Seater, 22 & 27 Seater Minibus, and 40 Seater DLX Bus. Capacity, AC/Non-AC options and starting prices.",
};

export default function FleetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
