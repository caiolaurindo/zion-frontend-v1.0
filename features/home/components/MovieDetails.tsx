import React from "react";
import { MdStar } from "react-icons/md";

import type { HistoryItem } from "@/features/shared/types/history";
import MovieActions from "../../shared/components/ActionsButtons";

interface MovieDetailsProps {
  item: HistoryItem;
  onLike: () => void;
  onDislike: () => void;
  onWatched: () => void;
}

export default function MovieDetails({
  item,
  onLike,
  onDislike,
  onWatched,
}: Readonly<MovieDetailsProps>) {
  const { movie } = item;

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 to-indigo-950/10 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)] backdrop-blur-md md:flex-row">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full rounded-xl object-cover shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-52 md:flex-shrink-0"
      />

      <div className="flex flex-1 flex-col gap-3">
        <h2 className="text-2xl font-bold text-slate-100">
          {movie.title}
        </h2>

        <p className="flex items-center gap-1 text-sm text-slate-500">
          <span>{movie.year}</span>
          <span>·</span>
          <span>{movie.runtime}</span>
          <span>·</span>

          <MdStar className="text-yellow-400" />

          <span>{movie.rating}</span>
        </p>

        <p className="text-xs text-slate-500">
          <span className="text-purple-300">Diretor:</span>{" "}
          {movie.director}
        </p>

        <p className="text-xs text-slate-500">
          <span className="text-purple-300">Elenco:</span>{" "}
          {movie.actors?.join(", ")}
        </p>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          {movie.plot}
        </p>

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
      </div>
    </div>
  );
}