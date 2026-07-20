"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { MdStar } from "react-icons/md";
import PageBackdrop from "@/features/shared/components/PageBackdrop";
import { useResultStorage } from "@/features/shared/hooks/useResultStorage";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdOutlineLocalMovies, MdLocalMovies } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";

interface Movie {
  historyId?: string;
  title: string;
  poster: string;
  year: string;
  rating: string;
  director: string;
  runtime: string;
  plot: string;
  actors: string[];
  trailerUrl: string | null;
  streamingProviders: { name: string; logo: string }[];
}

export default function ResultadoRandomPage() {
  const router = useRouter();
  const { session } = useAuth();
  const { data, isReady } = useResultStorage<Movie>("zion-random");
  const [movie, setMovie] = useState<Movie | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [watched, setWatched] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!data) {
      router.replace("/sorteio");
      return;
    }

    setMovie(data);
  }, [data, isReady, router]);

  async function handleLike(value: boolean) {
    if (!session) {
      setShowLoginWarning(true);
      return;
    }
    const newLike = liked === value ? null : value;
    setLiked(newLike);
    if (movie?.historyId) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${movie.historyId}/like`,
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
    if (movie?.historyId) {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/history/${movie.historyId}/watched`,
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
    <main className="relative flex justify-center min-h-screen overflow-hidden bg-gradient-to-b from-[#12081f] via-[#0b0914] to-[#050507] font-sans sm:py-8">
      <PageBackdrop />
      <div className="relative w-full max-w-[430px] sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col">
        <button
          onClick={() => router.push("/sorteio")}
          className="flex items-center gap-2 text-gray-500 hover:text-zinc-300 transition p-5"
        >
          <IoArrowBack size={22} />
          <span>Voltar</span>
        </button>
        <h1 className="text-3xl font-light text-slate-100 leading-snug text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-400 font-semibold">
            Zion
          </span>{" "}
          Sorteou
        </h1>

        <div className="relative w-full aspect-[4/5] rounded-b-[2.5rem] overflow-hidden p-4 pt-6">
          <div className="absolute inset-0 p-3 pt-6">
            <div className="relative w-full h-full">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              />
              <div className="absolute inset-0 rounded-[1.7rem] bg-gradient-to-t from-[#221844] via-black/30 to-transparent" />
            </div>
          </div>

          <div className="absolute bottom-10 left-8 pr-8">
            <div className="flex flex-col items-start gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl font-extrabold text-[#DDD6FE] drop-shadow-md">
                {movie.title}
              </h1>
            </div>
            <p className="text-sm text-white/90 font-medium drop-shadow-md">
              {movie.year} • {movie.runtime} • {movie.rating}{" "}
              <MdStar className="inline text-[#DDD6FE] mb-1" />
            </p>
          </div>
        </div>

        <div className="flex-1 px-6 py-2 flex flex-col">
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            <button
              onClick={() => handleLike(true)}
              className={`flex items-center gap-2 rounded-full border border-white/5 bg-[#161618] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${liked === true ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40" : "text-slate-300 hover:border-violet-400 hover:text-white"}`}
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
              className={`flex items-center gap-2 rounded-full border border-white/5 bg-[#161618] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${liked === false ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40" : "text-slate-300 hover:border-violet-400 hover:text-white"}`}
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
              className={`flex items-center gap-2 rounded-full border border-white/5 bg-[#161618] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${watched ? "bg-violet-600 text-white shadow-lg shadow-violet-900/40" : "text-slate-300 hover:border-violet-400 hover:text-white"}`}
            >
              {watched ? (
                <MdLocalMovies className="w-3 h-3" />
              ) : (
                <MdOutlineLocalMovies className="w-3 h-3" />
              )}
              {watched ? "Assistido" : "Já assisti"}
            </button>
          </div>

          <h4 className="mt-4 text-lg font-semibold text-gray-300 leading-relaxed">
            Sinopse
          </h4>
          <p className="text-[13px] text-gray-300 leading-relaxed">
            {movie.plot}
          </p>

          <p className="mt-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
            DIRETOR: {movie.director} <br />
            ELENCO: {movie.actors?.join(", ") || "Não informado"}
          </p>

          {showLoginWarning && (
            <div className="mt-4 p-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 flex justify-between items-center">
              <span className="text-yellow-400 text-xs">
                Faça login para salvar!
              </span>
              <button
                onClick={() => router.push("/login")}
                className="text-xs font-bold text-yellow-400 underline"
              >
                Login
              </button>
            </div>
          )}
          <h4 className="mt-4 text-lg font-semibold text-gray-300 leading-relaxed">
            Trailer
          </h4>

          {movie.trailerUrl && (
            <div className="flex flex-col gap-2 mt-2">
              <div
                className="relative w-full max-w-[500px] rounded-xl overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${new URL(movie.trailerUrl).searchParams.get("v")}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-xl"
                />
              </div>
            </div>
          )}

          <h4 className="mt-4 text-lg font-semibold text-gray-300 leading-relaxed">
            Onde assistir
          </h4>

          <div className="flex items-center gap-2 mt-4 flex-wrap">
            {movie.streamingProviders?.map((p) => (
              <img
                key={p.name}
                src={p.logo}
                alt={p.name}
                title={p.name}
                className="w-8 h-8 rounded-md object-cover bg-white"
              />
            ))}
          </div>

          <div className="mt-6 mb-6 flex bg-[#161618] rounded-full p-1 border border-white/5 shadow-lg">
            <button
              onClick={() => router.push("/sorteio")}
              className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 rounded-full shadow-lg shadow-violet-900/40 transition-all active:scale-95"
            >
              Sortear Outro
            </button>

            <button
              onClick={() =>
                session ? router.push("/home") : setShowLoginWarning(true)
              }
              className="flex-1 text-violet-200 text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 rounded-full hover:bg-violet-500/20 hover:border-violet-400 hover:text-white transition-all"
            >
              Histórico
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
