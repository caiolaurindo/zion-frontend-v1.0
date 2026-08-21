import Link from "next/link";
import React from "react";

const VARIANTS = {
  primary:
    "bg-gradient-to-r from-[#6B2DFB] via-[#7C3AED] to-[#9B4DFF] " +
    "text-white border border-purple-400/30 " +
    "shadow-[0_0_25px_rgba(124,58,237,0.30)] " +
    "hover:brightness-110 hover:shadow-[0_0_40px_rgba(139,92,246,0.45)] " +
    "hover:-translate-y-0.5",

  outline:
    "bg-transparent text-[#C4B5FD] border border-[#7C3AED]/70 " +
    "shadow-[0_0_15px_rgba(124,58,237,0.08)] " +
    "hover:bg-[#7C3AED]/10 hover:text-white " +
    "hover:border-[#A855F7] " +
    "hover:shadow-[0_0_30px_rgba(139,92,246,0.20)] " +
    "hover:-translate-y-0.5",

  ghost:
    "bg-white/[0.03] text-slate-400 border border-white/10 " +
    "hover:bg-white/[0.06] hover:text-white " +
    "hover:border-purple-500/30",
} as const;

const SIZES = {
  sm: "min-h-[40px] px-4 text-sm",
  md: "min-h-[48px] px-6 text-base",
  lg: "min-h-[54px] px-8 text-lg",
} as const;

type ButtonVariant = keyof typeof VARIANTS;
type ButtonSize = keyof typeof SIZES;

interface GradientButtonProps {
  children: React.ReactNode;
  href: string;

  variant?: ButtonVariant;
  size?: ButtonSize;

  fullWidth?: boolean;
  className?: string;

  icon?: React.ReactNode;
}

export default function GradientButton({
  children,
  href,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  icon,
}: Readonly<GradientButtonProps>) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex w-fit items-center justify-center",
        "gap-2 rounded-full",
        "font-medium tracking-wide",
        "transition-all duration-200 ease-out",
        "select-none",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-[#A855F7]",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#08050F]",
        "active:translate-y-0",
        SIZES[size],
        VARIANTS[variant],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
    >
      {icon && (
        <span className="shrink-0 transition-transform duration-200 group-hover:scale-110">
          {icon}
        </span>
      )}

      <span>{children}</span>
    </Link>
  );
}
