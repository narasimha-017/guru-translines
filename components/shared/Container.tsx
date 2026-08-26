import { ReactNode, CSSProperties } from "react";

export default function Container({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`} style={style}>{children}</div>;
}
