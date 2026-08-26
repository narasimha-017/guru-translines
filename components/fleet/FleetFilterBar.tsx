"use client";

export type FleetFilter = "all" | "small" | "medium" | "large";

const FILTERS: { id: FleetFilter; label: string }[] = [
  { id: "all", label: "All vehicles" },
  { id: "small", label: "Up to 17 seats" },
  { id: "medium", label: "22–27 seats" },
  { id: "large", label: "40+ seats" },
];

export default function FleetFilterBar({
  active,
  onChange,
}: {
  active: FleetFilter;
  onChange: (filter: FleetFilter) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2.5">
      {FILTERS.map((f) => {
        const isActive = active === f.id;
        return (
          <button
            key={f.id}
            onClick={() => onChange(f.id)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200"
            style={{
              background: isActive
                ? "linear-gradient(135deg, #10b981, #059669)"
                : "rgba(15, 36, 71, 0.6)",
              border: isActive
                ? "1px solid rgba(52, 211, 153, 0.6)"
                : "1px solid rgba(255, 255, 255, 0.12)",
              color: isActive ? "#ffffff" : "var(--text-secondary)",
              boxShadow: isActive ? "0 0 20px rgba(16, 185, 129, 0.4)" : "none",
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}
