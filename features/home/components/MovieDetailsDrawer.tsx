import React from "react";

import MovieDetails from "./MovieDetails";
import MovieActions from "../../shared/components/ActionsButtons";

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  runtime: string;
  rating: string;
  director: string;
  actors?: string[];
  plot: string;
}

interface MovieDetailsItem {
  id: string;
  liked: boolean | null;
  watched: boolean;
  movie: Movie;
}

interface MovieDetailsDrawerProps {
  item: MovieDetailsItem;
  onClose: () => void;

  onLike: () => void;
  onDislike: () => void;
  onWatched: () => void;
}

export default function MovieDetailsDrawer({
  item,
  onClose,
  onLike,
  onDislike,
  onWatched,
}: Readonly<MovieDetailsDrawerProps>) {
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fechar detalhes"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/60 backdrop-blur-sm"
      />

      {/* Drawer */}
      <aside className="absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-purple-500/20 bg-[#0D0817] shadow-[-20px_0_60px_rgba(0,0,0,0.35)]">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-[#0D0817]/90 px-5 py-4 backdrop-blur-xl">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
            Detalhes do filme
          </span>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-slate-400 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
          >
            ×
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-5 sm:p-6">
          <MovieDetails
            movie={item.movie}
            actions={
              <MovieActions
                movie={{
                  id: item.id,
                  liked: item.liked,
                  watched: item.watched,
                }}
                onLike={onLike}
                onDislike={onDislike}
                onWatched={onWatched}
              />
            }
          />
        </div>
      </aside>
    </div>
  );
}