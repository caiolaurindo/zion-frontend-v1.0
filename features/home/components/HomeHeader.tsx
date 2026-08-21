import React from "react";

interface HomeHeaderProps {
  email?: string | null;
  onSignOut: () => void;
  onLogoClick: () => void;
}

export default function HomeHeader({
  email,
  onSignOut,
  onLogoClick,
}: Readonly<HomeHeaderProps>) {
  return (
    <header className="flex items-center justify-between gap-2">
      <button
        type="button"
        onClick={onLogoClick}
        className="group flex cursor-pointer items-center"
        aria-label="Filme da vez"
      >
        <img
          src="/logoFilmeDaVez.svg"
          alt="Filme da vez"
          className="h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] md:h-20"
        />
      </button>

      <div className="flex min-w-0 items-center gap-2">
        <span className="min-w-0 truncate text-[10px] text-gray-400 sm:text-sm">
          {email}
        </span>

        <button
          type="button"
          onClick={onSignOut}
          className="shrink-0 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-purple-500/40 hover:text-white sm:px-4 sm:py-2"
        >
          Sair
        </button>
      </div>
    </header>
  );
}