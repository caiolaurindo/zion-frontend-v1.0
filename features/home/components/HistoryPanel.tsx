import React from "react";
import {
  AiFillHeart,
} from "react-icons/ai";
import {
  BiSolidDislike,
} from "react-icons/bi";
import {
  MdLocalMovies,
  MdStar,
} from "react-icons/md";

import GlassPanel from "@/features/shared/components/GlassPanel";
import type { HistoryItem } from "@/features/shared/types/history";

interface HistoryPanelProps {
  history: HistoryItem[];
  loading: boolean;
  showFullHistory: boolean;
  onToggleHistory: () => void;
  onMovieClick: (item: HistoryItem) => void;
}

export default function HistoryPanel({
  history,
  loading,
  showFullHistory,
  onToggleHistory,
  onMovieClick,
}: Readonly<HistoryPanelProps>) {
  const visibleHistory = showFullHistory
    ? history
    : history.slice(0, 5);

  return (
    <GlassPanel className="flex flex-col gap-3">
      <p className="text-[20px] uppercase tracking-[0.3em] text-white">
        Histórico
      </p>

      <div
        className={
          showFullHistory
            ? "max-h-[380px] space-y-3 overflow-y-auto pr-1"
            : "space-y-3"
        }
      >
        {loading ? (
          <p className="text-sm text-slate-600">
            Carregando...
          </p>
        ) : history.length === 0 ? (
          <p className="text-sm text-slate-600">
            Nenhum filme sugerido ainda.
          </p>
        ) : (
          visibleHistory.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onMovieClick(item)}
              className="flex w-full cursor-pointer gap-3 rounded-xl border border-white/5 bg-purple-600/10 p-3 text-left transition hover:border-purple-500/30"
            >
              <img
                src={item.movie.poster}
                alt={item.movie.title}
                className="h-12 w-12 shrink-0 rounded-lg object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-slate-300">
                  {item.movie.title}
                </p>

                <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-600">
                  <span>{item.movie.year}</span>
                  <span>·</span>

                  <MdStar className="text-yellow-400" />

                  <span>{item.movie.rating}</span>
                </p>

                <p className="mt-1 text-[10px] text-slate-600">
                  {new Date(item.createdAt).toLocaleDateString("pt-BR")}
                </p>

                <div className="mt-1 flex items-center gap-1 text-[10px]">
                  {item.liked === true ? (
                    <>
                      <AiFillHeart className="h-3 w-3 text-purple-400" />
                      <span className="text-purple-400">
                        Curtido
                      </span>
                    </>
                  ) : item.liked === false ? (
                    <>
                      <BiSolidDislike className="h-3 w-3 text-red-400" />
                      <span className="text-red-400">
                        Não curtido
                      </span>
                    </>
                  ) : item.watched ? (
                    <>
                      <MdLocalMovies className="h-3 w-3 text-purple-400" />
                      <span className="text-purple-400">
                        Assistido
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {!loading && history.length > 5 && (
        <button
          type="button"
          onClick={onToggleHistory}
          className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
        >
          {showFullHistory
            ? "Ver menos"
            : "Ver histórico completo"}
        </button>
      )}
    </GlassPanel>
  );
}