import React from "react";
import { MdStar } from "react-icons/md";

import type { HistoryItem } from "@/features/shared/types/history";

interface MovieCardProps {
  item: HistoryItem;
  onClick: () => void;
}

export default function MovieCard({
  item,
  onClick,
}: Readonly<MovieCardProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group cursor-pointer text-left"
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={item.movie.poster}
          alt={item.movie.title}
          className="w-full rounded-xl transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <p className="mt-2 truncate text-xs font-semibold text-slate-300">
        {item.movie.title}
      </p>

      <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-600">
        <span>{item.movie.year}</span>
        <span>·</span>

        <MdStar className="text-yellow-400" />

        <span>{item.movie.rating}</span>
      </p>
    </button>
  );
}