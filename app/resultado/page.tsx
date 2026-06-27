"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { MdStar } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdOutlineLocalMovies, MdLocalMovies } from "react-icons/md";

interface Movie {
  suggestedBy: string;
  title: string;
  poster: string;
  year: string;
  rating: string;
  director: string;
  runtime: string;
  plot: string;
  actors: string[];
}

export default function Resultado() {
  const router = useRouter();
  const { session } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [watched, setWatched] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("zion-result");
    if (!data) {
      router.push("/");
      return;
    }
    const parsed = JSON.parse(data);
    setMovie(parsed);
    setHistoryId(parsed.historyId ?? null);
  }, []);

  async function handleLike(value: boolean) {
    if (!session) {
      setShowLoginWarning(true);
      return;
    }

    const newLike = liked === value ? null : value;
    setLiked(newLike);

    if (historyId) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${historyId}/like`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ liked: newLike }),
        },
      );
    }
  }

  async function handleWatched() {
    if (!session) {
      setShowLoginWarning(true);
      return;
    }

    const newWatched = !watched;
    setWatched(newWatched);

    if (historyId) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${historyId}/watched`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ watched: newWatched }),
        },
      );
    }
  }

  if (!movie) return null;

  return (
    <main className="flex flex-col items-center min-h-screen gap-6 p-8  bg-[#0a0a0c]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/1 w-150 h-[600px] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-2/3 -translate-x-3/6 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />

      <h1 className="text-[30px] tracking-[0.3em] uppercase text-white mt-[100px]">
        Seu filme é:
      </h1>

      <div className="flex flex-col md:flex-row gap-8 p-6 w-full max-w-5xl mt-[20px]  rounded-2xl bg-gradient-to-br from-purple-950/20 to-indigo-950/10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.06)] hover:border-purple-500/40 hover:shadow-[0_0_50px_rgba(168,85,247,0.12)] transition-all duration-300 backdrop-blur-md">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-68 rounded-lg self-start"
        />

        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-bold text-slate-100">{movie.title}</h2>
          <p className="flex items-center gap-1 text-[18px] text-slate-500">
            <span>{movie.year}</span>
            <span>·</span>
            <span>{movie.runtime}</span>
            <span>·</span>
            <MdStar className="text-yellow-400" />
            <span>{movie.rating}</span>
          </p>
          <p className="text-[18px] text-slate-500 leading-relaxed mt-1 w-[600px]">
            {movie.plot}
          </p>
          <p className="text-[15px] text-slate-500">
            <span className="text-slate-400">Diretor:</span> {movie.director}
          </p>
          <p className="text-[15px] text-slate-500">
            <span className="text-slate-400">Elenco:</span>{" "}
            {movie.actors?.join(", ") || "Não informado"}
          </p>

          <div className="flex gap-2 mt-4 flex-wrap">
            <button
              onClick={() => handleLike(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${liked === true ? "bg-purple-500/20 border-purple-500/50 text-purple-300" : "border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-purple-300"}`}
            >
              {liked === true ? (
                <AiFillHeart className="w-3 h-3" />
              ) : (
                <AiOutlineHeart className="w-3 h-3" />
              )}
              Curtir
            </button>
            <button
              onClick={() => handleLike(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${liked === false ? "bg-red-500/20 border-red-500/50 text-red-300" : "border-white/10 text-slate-400 hover:border-red-500/30 hover:text-red-300"}`}
            >
              {liked === false ? (
                <BiSolidDislike className="w-3 h-3" />
              ) : (
                <BiDislike className="w-3 h-3" />
              )}
              Não curtir
            </button>
            <button
              onClick={handleWatched}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${watched ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" : "border-white/10 text-slate-400 hover:border-indigo-500/30 hover:text-indigo-300"}`}
            >
              {watched ? (
                <MdLocalMovies className="w-3 h-3" />
              ) : (
                <MdOutlineLocalMovies className="w-3 h-3" />
              )}
              {watched ? "Assistido" : "Marcar assistido"}
            </button>
          </div>

          {showLoginWarning && (
            <div className="flex flex-col gap-2 mt-2 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
              <p className="text-yellow-400/80 text-xs">
                Faça login para curtir e salvar seu histórico!
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-fit text-xs border border-white/10 px-4 py-2 rounded-full hover:border-purple-500/40 hover:text-purple-300 text-slate-400 transition-all duration-300"
              >
                Fazer login
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push("/quiz")}
          className="group relative inline-flex items-center gap-3 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          Tentar novamente
        </button>
        {session && (
          <button
            onClick={() => router.push("/home")}
            className="group relative inline-flex items-center gap-3 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            Ver histórico
          </button>
        )}
      </div>
    </main>
  );
}
