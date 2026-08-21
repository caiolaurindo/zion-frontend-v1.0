import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdLocalMovies, MdOutlineLocalMovies } from "react-icons/md";

export interface MovieActionItem {
  id: string;
  liked: boolean | null;
  watched: boolean;
}

interface MovieActionsProps {
  movie: MovieActionItem;
  onLike: () => void;
  onDislike: () => void;
  onWatched: () => void;
}

const BASE_BUTTON =
  "group inline-flex items-center justify-center " +
  "gap-2 rounded-full border px-4 py-2.5 " +
  "text-sm font-medium tracking-wide " +
  "transition-all duration-200 ease-out " +
  "select-none cursor-pointer " +
  "focus-visible:outline-none " +
  "focus-visible:ring-2 " +
  "focus-visible:ring-[#A855F7] " +
  "focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-[#08050F] " +
  "active:translate-y-0";

const ACTIVE_BUTTON =
  "border-purple-400/30 " +
  "bg-gradient-to-r from-[#6B2DFB] via-[#7C3AED] to-[#9B4DFF] " +
  "text-white " +
  "shadow-[0_0_25px_rgba(124,58,237,0.30)] " +
  "hover:brightness-110 " +
  "hover:shadow-[0_0_40px_rgba(139,92,246,0.45)] " +
  "hover:-translate-y-0.5";

const INACTIVE_BUTTON =
  "border-purple-500/30 " +
  "bg-transparent " +
  "text-slate-400 " +
  "hover:border-[#A855F7] " +
  "hover:bg-[#7C3AED]/10 " +
  "hover:text-white " +
  "hover:shadow-[0_0_30px_rgba(139,92,246,0.20)] " +
  "hover:-translate-y-0.5";

export default function MovieActions({
  movie,
  onLike,
  onDislike,
  onWatched,
}: Readonly<MovieActionsProps>) {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {/* CURTIR */}
      <button
        type="button"
        onClick={onLike}
        className={[
          BASE_BUTTON,
          movie.liked === true ? ACTIVE_BUTTON : INACTIVE_BUTTON,
        ].join(" ")}
        aria-label="Curtir filme"
      >
        {movie.liked === true ? (
          <AiFillHeart className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <AiOutlineHeart className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        )}

        <span>{movie.liked === true ? "Curtido" : "Curtir"}</span>
      </button>

      {/* NÃO CURTIR */}
      <button
        type="button"
        onClick={onDislike}
        className={[
          BASE_BUTTON,
          movie.liked === false ? ACTIVE_BUTTON : INACTIVE_BUTTON,
        ].join(" ")}
      >
        {movie.liked === false ? (
          <BiSolidDislike className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <BiDislike className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        )}

        <span>{movie.liked === false ? "Não curtido" : "Não curtir"}</span>
      </button>

      {/* ASSISTIDO */}
      <button
        type="button"
        onClick={onWatched}
        className={[
          BASE_BUTTON,
          movie.watched ? ACTIVE_BUTTON : INACTIVE_BUTTON,
        ].join(" ")}
      >
        {movie.watched ? (
          <MdLocalMovies className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <MdOutlineLocalMovies className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
        )}

        <span>{movie.watched ? "Assistido" : "Marcar assistido"}</span>
      </button>
    </div>
  );
}
