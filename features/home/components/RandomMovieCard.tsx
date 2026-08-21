import React from "react";

interface RandomMovie {
  title: string;
  poster: string;
  year: string;
  rating: string;
}

interface RandomMovieCardProps {
  movie: RandomMovie;
  onClick: () => void;
}

export default function RandomMovieCard({
  movie,
  onClick,
}: Readonly<RandomMovieCardProps>) {
  return (
    <section className="flex flex-col gap-3">
      <p className="text-[15px] uppercase tracking-[0.3em] text-white">
        Último aleatório da vez
      </p>

      <button
        type="button"
        onClick={onClick}
        className="flex cursor-pointer gap-3 rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-indigo-950/20 p-3 text-left transition hover:border-purple-500/50 hover:shadow-[0_0_25px_rgba(124,58,237,0.12)]"
      >
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-[112px] shrink-0 rounded-lg object-cover"
        />

        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-slate-300">
            {movie.title}
          </p>

          <p className="mt-1 text-[10px] text-slate-600">
            {movie.year} · ⭐ {movie.rating}
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-widest text-purple-400">
            Aleatório
          </p>
        </div>
      </button>
    </section>
  );
}