import Image from "next/image";
import Link from "next/link";
import { Users, Snowflake } from "lucide-react";
import { FleetVehicle } from "@/data/fleet";

export default function FleetCard({ vehicle }: { vehicle: FleetVehicle }) {
  return (
    <div className="group overflow-hidden rounded-2xl transition-all duration-300" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)", backdropFilter: "blur(20px)" }}>
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
        <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: "linear-gradient(to top, rgba(4,4,13,0.6), transparent)" }} />
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-white">{vehicle.name}</h3>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>{vehicle.tagline}</p>
        <div className="mt-4 flex items-center gap-4 text-sm" style={{ color: "var(--text-secondary)" }}>
          <span className="inline-flex items-center gap-1.5"><Users size={14} style={{ color: "var(--accent-cyan)" }} /> {vehicle.capacity} seats</span>
          <span className="inline-flex items-center gap-1.5"><Snowflake size={14} style={{ color: "var(--accent-blue)" }} /> {vehicle.acOptions.join(" / ")}</span>
        </div>
        <div className="mt-5 flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Starting from</p>
            <p className="text-base font-semibold text-white">&#8377;{vehicle.startingPrice.toLocaleString("en-IN")}</p>
          </div>
          <Link href={`/estimator?vehicle=${vehicle.id}`} className="rounded-lg px-4 py-2 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, var(--accent-blue), #2563eb)", boxShadow: "0 0 12px rgba(59,130,246,0.3)" }}>Book now</Link>
        </div>
      </div>
    </div>
  );
}
