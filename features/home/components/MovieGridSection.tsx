import React from "react";

import type { HistoryItem } from "@/features/shared/types/history";
import MovieCard from "./MovieCard";

interface MovieGridSectionProps {
  title: string;
  items: HistoryItem[];
  emptyMessage?: string;
  onMovieClick: (item: HistoryItem) => void;

  page?: number;
  totalPages?: number;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function MovieGridSection({
  title,
  items,
  emptyMessage,
  onMovieClick,
  page = 0,
  totalPages = 1,
  onPrevious,
  onNext,
}: Readonly<MovieGridSectionProps>) {
  const hasPagination = totalPages > 1;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[18px] uppercase tracking-[0.3em] text-white md:text-[20px]">
          {title}
        </p>

        {hasPagination && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={page === 0}
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white transition hover:border-purple-500/40 hover:bg-purple-500/20 disabled:opacity-30"
            >
              ←
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={page === totalPages - 1}
              className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white transition hover:border-purple-500/40 hover:bg-purple-500/20 disabled:opacity-30"
            >
              →
            </button>
          </div>
        )}
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-600">
          {emptyMessage}
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {items.map((item) => (
            <MovieCard
              key={item.id}
              item={item}
              onClick={() => onMovieClick(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}