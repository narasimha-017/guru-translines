import { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "whatsapp" | "outline" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 active:scale-[0.98] shadow-sm shadow-indigo-200",
  whatsapp: "bg-white text-teal-700 border border-cyan-500 hover:bg-cyan-50 active:scale-[0.98]",
  outline: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 active:scale-[0.98]",
  ghost: "bg-transparent text-gray-700 hover:bg-gray-100 active:scale-[0.98]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-all duration-150";

export function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  href,
  external,
  onClick,
  type = "button",
}: BaseProps & { href?: string; external?: boolean; onClick?: () => void; type?: "button" | "submit" }) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {icon}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {icon}
      {children}
    </button>
  );
}
