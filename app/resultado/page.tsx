"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { MdStar, MdOutlinePlayCircleOutline } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdOutlineLocalMovies, MdLocalMovies } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";

interface Movie {
  suggestedBy: string;
  title: string;
  originalTitle: string;
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
  }, [router]);

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
    <main className="relative flex justify-center min-h-screen overflow-hidden bg-[#0a0a0c] font-sans sm:py-8">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[280px] h-[280px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none z-0" />

      {/* Container principal simulando a tela do mobile da imagem */}
      <div className="relative w-full max-w-[430px]  sm:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col ">
        {/* Pôster e Informações Sobrepostas */}
        <div className="relative w-full aspect-[4/5] rounded-b-[2.5rem] overflow-hidden p-4 pt-6">
          <div className="absolute inset-0 p-3 pt-6">
            <div className="relative w-full h-full">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover rounded-[2rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
              />

              {/* Overlay somente na imagem */}
              <div className="absolute inset-0 rounded-[1.7rem] bg-gradient-to-t from-[#221844] via-black/30 to-transparent" />
            </div>
          </div>

         {/*  {/* Botões Flutuantes (Direita Topo) compartilhar
          <div className="absolute top-10 right-6 flex flex-col gap-3">
            <button
              onClick={() => handleLike(true)}
              className="w-14 h-14 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center transition-all hover:bg-black/60"
            >
             <IoShareSocialSharp className="w-8 h-9  text-[#DDD6FE] " />
            </button>
          </div> */}

          {/* Título e Metadados (Esquerda Base do Pôster) */}
          <div className="absolute bottom-10 left-8 pr-8">
            <div className="flex flex-col items-start gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl font-extrabold text-[#DDD6FE] drop-shadow-md">
                {movie.title}
              </h1>
              {movie.originalTitle !== movie.title && (
                <span className="text-sm text-white/60 border border-white/30 px-3 py-1 rounded-sm mb-1 uppercase tracking-widest bg-black/40 backdrop-blur-sm">
                  {movie.originalTitle}
                </span>
              )}
            </div>
            <p className="text-sm text-white/90 font-medium drop-shadow-md">
              {movie.year} • {movie.runtime} • {movie.rating}{" "}
              <MdStar className="inline text-[#DDD6FE] mb-1" />
            </p>
          </div>
        </div>
        {/* Conteúdo Abaixo do Pôster */}
        <div className="flex-1 px-6 py-2 flex flex-col">
          {/* Botões de Ação Secundários */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
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
              {watched ? "Assistido" : "Já assisti"}
            </button>
          </div>

          <h4 className="mt-4 text-lg font-semibold text-gray-300 leading-relaxed">
            Sinopse
          </h4>

          {/* Sinopse */}
          <p className="text-[13px] text-gray-300 leading-relaxed">
            {movie.plot}
          </p>

          {/* Elenco / Diretor */}
          <p className="mt-4 text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-loose">
            DIRETOR: {movie.director} <br />
            ELENCO: {movie.actors?.join(", ") || "Não informado"}
          </p>

          {/* Aviso de Login */}
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

          {/* Provedores e Tags */}
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

          {/* Espaçador flexível para empurrar as abas para baixo */}
          <div className="flex-1 min-h-[2rem]" />

          {/* Abas Inferiores (Navegação/Ações Principais) */}
          <div className="mt-auto mb-6 flex bg-[#161618] rounded-full p-1 border border-white/5 shadow-lg">
            <button
              onClick={() => router.push("/quiz")}
              className="flex-1 bg-violet-600 hover:bg-violet-500 text-white text-[11px] font-bold uppercase tracking-[0.2em] py-3.5 rounded-full shadow-lg shadow-violet-900/40 transition-all active:scale-95"
            >
              Nova Busca
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
