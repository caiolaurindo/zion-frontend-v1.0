import type { PropsWithChildren } from "react";

interface GlassPanelProps extends PropsWithChildren {
  className?: string;
}

export default function GlassPanel({
  children,
  className = "",
}: GlassPanelProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
