"use client";

export type FleetFilter = "all" | "small" | "medium" | "large";

const FILTERS: { id: FleetFilter; label: string }[] = [
  { id: "all", label: "All vehicles" },
  { id: "small", label: "Up to 17 seats" },
  { id: "medium", label: "22–27 seats" },
  { id: "large", label: "40 seats" },
];

export default function FleetFilterBar({
  active,
  onChange,
}: {
  active: FleetFilter;
  onChange: (filter: FleetFilter) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          onClick={() => onChange(f.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            active === f.id
              ? "bg-indigo-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
