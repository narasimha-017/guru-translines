import Image from "next/image";
import Link from "next/link";
import { Users, Snowflake } from "lucide-react";
import { FleetVehicle } from "@/data/fleet";

export default function FleetCard({ vehicle }: { vehicle: FleetVehicle }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-900">{vehicle.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{vehicle.tagline}</p>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <span className="inline-flex items-center gap-1.5">
            <Users size={15} /> {vehicle.capacity} seats
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Snowflake size={15} /> {vehicle.acOptions.join(" / ")}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-400">Starting from</p>
            <p className="text-base font-semibold text-gray-900">
              &#8377;{vehicle.startingPrice.toLocaleString("en-IN")}
            </p>
          </div>
          <Link
            href={`/estimator?vehicle=${vehicle.id}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Book now
          </Link>
        </div>
      </div>
    </div>
  );
}
