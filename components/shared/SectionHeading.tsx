interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold uppercase tracking-wider"
          style={{
            background: "rgba(16, 185, 129, 0.12)",
            border: "1px solid rgba(16, 185, 129, 0.3)",
            color: "var(--accent-emerald-light)",
          }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-0.03em" }}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          {description}
        </p>
      )}
    </div>
  );
}
