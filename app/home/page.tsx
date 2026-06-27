"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { MdStar } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdOutlineLocalMovies, MdLocalMovies } from "react-icons/md";

interface HistoryItem {
  id: string;
  liked: boolean | null;
  watched: boolean;
  movie: {
    title: string;
    poster: string;
    year: string;
    rating: string;
    director: string;
    runtime: string;
    plot: string;
    actors: string[];
  };
}

export default function Home() {
  const router = useRouter();
  const { user, session, loading, signOut } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "por aqui";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
  if (!session) return;

  function fetchHistory() {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      headers: { Authorization: `Bearer ${session!.access_token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoadingHistory(false);
      });
  }

  fetchHistory();
  window.addEventListener('focus', fetchHistory);
  return () => window.removeEventListener('focus', fetchHistory);
}, [session]);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  async function handleAction(
    id: string,
    type: "like" | "dislike" | "watched",
    current: HistoryItem,
  ) {
    if (!session) return;

    if (type === "like" || type === "dislike") {
      const value = type === "like" ? true : false;
      const newLiked = current.liked === value ? null : value;
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ liked: newLiked }),
      });
      setHistory((prev) =>
        prev.map((h) => (h.id === id ? { ...h, liked: newLiked } : h)),
      );
    }

    if (type === "watched") {
      const newWatched = !current.watched;
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}/watched`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ watched: newWatched }),
      });
      setHistory((prev) =>
        prev.map((h) => (h.id === id ? { ...h, watched: newWatched } : h)),
      );
    }
  }

  const latest = history[0] ?? null;

  const favorites = history.filter((h) => h.liked === true);

  const [favoriteIndex, setFavoriteIndex] = useState(0);

  const visibleFavorites = favorites.slice(favoriteIndex, favoriteIndex + 4);

  const nextFavorites = () => {
    if (favoriteIndex + 4 < favorites.length) {
      setFavoriteIndex((prev) => prev + 4);
    }
  };

  const prevFavorites = () => {
    if (favoriteIndex > 0) {
      setFavoriteIndex((prev) => Math.max(0, prev - 4));
    }
  };

  if (loading) return null;

  return (
    <div className=" bg-[#0a0a0c]">
      {/* Drawer lateral */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />
          {/* Painel */}
          <div className="relative w-full max-w-md bg-[#0d0d10] border-l border-purple-500/20 p-6 overflow-y-auto flex flex-col gap-4 shadow-[0_0_60px_rgba(168,85,247,0.1)]">
            <button
              onClick={() => setSelectedItem(null)}
              className="self-end text-slate-500 hover:text-slate-300 transition"
            >
              ✕
            </button>
            <img
              src={selectedItem.movie.poster}
              alt={selectedItem.movie.title}
              className="w-40 rounded-xl self-center shadow-2xl"
            />
            <h2 className="text-xl font-bold text-slate-100">
              {selectedItem.movie.title}
            </h2>
            <p className="text-slate-500 text-sm">
              {selectedItem.movie.year} · {selectedItem.movie.runtime} · ⭐{" "}
              {selectedItem.movie.rating}
            </p>
            <p className="text-xs text-slate-500">
              <span className="text-slate-400">Diretor:</span>{" "}
              {selectedItem.movie.director}
            </p>
            <p className="text-xs text-slate-500">
              <span className="text-slate-400">Elenco:</span>{" "}
              {selectedItem.movie.actors?.join(", ")}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              {selectedItem.movie.plot}
            </p>
            <div className="flex gap-2 flex-wrap mt-2">
              <button
                onClick={() => {
                  handleAction(selectedItem.id, "like", selectedItem);
                  setSelectedItem((prev) =>
                    prev
                      ? { ...prev, liked: prev.liked === true ? null : true }
                      : null,
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${selectedItem.liked === true ? "bg-purple-500/20 border-purple-500/50 text-purple-300" : "border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-purple-300"}`}
              >
                {selectedItem.liked === true ? (
                  <AiFillHeart className="w-3 h-3" />
                ) : (
                  <AiOutlineHeart className="w-3 h-3" />
                )}
                Curtir
              </button>

              <button
                onClick={() => {
                  handleAction(selectedItem.id, "dislike", selectedItem);
                  setSelectedItem((prev) =>
                    prev
                      ? { ...prev, liked: prev.liked === false ? null : false }
                      : null,
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${selectedItem.liked === false ? "bg-red-500/20 border-red-500/50 text-red-300" : "border-white/10 text-slate-400 hover:border-red-500/30 hover:text-red-300"}`}
              >
                {selectedItem.liked === false ? (
                  <BiSolidDislike className="w-3 h-3" />
                ) : (
                  <BiDislike className="w-3 h-3" />
                )}
                Não curtir
              </button>

              <button
                onClick={() => {
                  handleAction(selectedItem.id, "watched", selectedItem);
                  setSelectedItem((prev) =>
                    prev ? { ...prev, watched: !prev.watched } : null,
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${selectedItem.watched ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" : "border-white/10 text-slate-400 hover:border-indigo-500/30 hover:text-indigo-300"}`}
              >
                {selectedItem.watched ? (
                  <MdLocalMovies className="w-3 h-3" />
                ) : (
                  <MdOutlineLocalMovies className="w-3 h-3" />
                )}
                {selectedItem.watched ? "Assistido" : "Marcar assistido"}
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="flex flex-col min-h-screen p-8 gap-8 max-w-7xl mx-auto">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/1 w-150 h-[600px] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none z-0" />
        <div className="absolute top-[30%] left-2/3 -translate-x-3/6 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />

        <header className="flex justify-between items-center">
          <div className="text-[30px] font-light tracking-[0.25em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-300 to-slate-400 font-sans select-none cursor-pointer">
            Zion
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="group relative inline-flex w-full h-[10px] items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-white-500/40 text-slate-200 hover:text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sair
            </button>
          </div>
        </header>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl md:text-3xl font-light tracking-wide text-slate-100 mt-[10px]">
            O que vamos assistir hoje,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-400 font-semibold">
              {firstName}?
            </span>
          </h1>
          <p className="text-slate-500 text-[20px]">
            Descubra um filme perfeito para seu humor.
          </p>
        </div>

        <button
          onClick={() => router.push("/quiz")}
          className="group cursor-pointer w-fit h-[50px] text-2xl mt-[-20px] font-light tracking-wide inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border border-purple-400/30 text-purple-100 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:from-purple-500/25 hover:to-indigo-500/25 hover:border-purple-300/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300"
        >
          Descobrir um filme
        </button>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex flex-col gap-8 flex-1">
            {latest && (
              <section className="flex flex-col gap-4">
                <p className="text-[20px] tracking-[0.3em] uppercase text-white">
                  Última escolha do zion
                </p>
                <div className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-gradient-to-br from-purple-950/20 to-indigo-950/10 border border-purple-500/20 shadow-[0_0_40px_rgba(168,85,247,0.06)] hover:border-purple-500/40 hover:shadow-[0_0_50px_rgba(168,85,247,0.12)] transition-all duration-300 backdrop-blur-md">
                  <img
                    src={latest.movie.poster}
                    alt={latest.movie.title}
                    className="w-50 rounded-xl self-start flex-shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                  />
                  <div className="flex flex-col gap-3 flex-1">
                    <h2 className="text-2xl font-bold text-slate-100">
                      {latest.movie.title}
                    </h2>
                    <p className="flex items-center gap-1 text-sm text-slate-500">
                      <span>{latest.movie.year}</span>
                      <span>·</span>
                      <span>{latest.movie.runtime}</span>
                      <span>·</span>
                      <MdStar className="text-yellow-400" />
                      <span>{latest.movie.rating}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="text-slate-400">Diretor:</span>{" "}
                      {latest.movie.director}
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="text-slate-400">Elenco:</span>{" "}
                      {latest.movie.actors?.join(", ")}
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed mt-1">
                      {latest.movie.plot}
                    </p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <button
                        onClick={() => handleAction(latest.id, "like", latest)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${latest.liked === true ? "bg-purple-500/20 border-purple-500/50 text-purple-300" : "border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-purple-300"}`}
                      >
                        {latest.liked === true ? (
                          <AiFillHeart className="w-3 h-3" />
                        ) : (
                          <AiOutlineHeart className="w-3 h-3" />
                        )}
                        Curtir
                      </button>

                      <button
                        onClick={() =>
                          handleAction(latest.id, "dislike", latest)
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${latest.liked === false ? "bg-red-500/20 border-red-500/50 text-red-300" : "border-white/10 text-slate-400 hover:border-red-500/30 hover:text-red-300"}`}
                      >
                        {latest.liked === false ? (
                          <BiSolidDislike className="w-3 h-3" />
                        ) : (
                          <BiDislike className="w-3 h-3" />
                        )}
                        Não curtir
                      </button>

                      <button
                        onClick={() =>
                          handleAction(latest.id, "watched", latest)
                        }
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${latest.watched ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300" : "border-white/10 text-slate-400 hover:border-indigo-500/30 hover:text-indigo-300"}`}
                      >
                        {latest.watched ? (
                          <MdLocalMovies className="w-3 h-3" />
                        ) : (
                          <MdOutlineLocalMovies className="w-3 h-3" />
                        )}
                        {latest.watched ? "Assistido" : "Marcar assistido"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}
            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-[20px] tracking-[0.3em] uppercase text-white">
                  Favoritos
                </p>

                {favorites.length > 4 && (
                  <div className="flex gap-2">
                    <button
                      onClick={prevFavorites}
                      disabled={favoriteIndex === 0}
                      className="w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white hover:bg-purple-500/20 disabled:opacity-30 transition"
                    >
                      ←
                    </button>

                    <button
                      onClick={nextFavorites}
                      disabled={favoriteIndex + 4 >= favorites.length}
                      className="w-9 h-9 rounded-full border border-white/10 bg-white/5 text-white hover:bg-purple-500/20 disabled:opacity-30 transition"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>

              {favorites.length === 0 ? (
                <p className="text-slate-600 text-sm">
                  Nenhum favorito ainda — dê like nos filmes que curtir!
                </p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {visibleFavorites.map((h) => (
                    <div
                      key={h.id}
                      className="flex flex-col gap-2 group cursor-pointer"
                      onClick={() => setSelectedItem(h)}
                    >
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={h.movie.poster}
                          alt={h.movie.title}
                          className="w-full rounded-xl group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </div>

                      <p className="text-xs font-semibold text-slate-300 truncate">
                        {h.movie.title}
                      </p>

                      <p className="flex items-center gap-1 text-[10px] text-slate-600">
                        <span>{h.movie.year}</span>
                        <span>·</span>
                        <MdStar className="text-yellow-400" />
                        <span>{h.movie.rating}</span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
            {history.filter((h) => h.watched).length > 0 && (
              <section className="flex flex-col gap-4">
                <p className="text-[20px] tracking-[0.3em] uppercase text-white">
                  Últimos filmes assistidos
                </p>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-zion">
                  {history
                    .filter((h) => h.watched)
                    .slice(0, 8)
                    .map((h) => (
                      <div
                        key={h.id}
                        className="flex-shrink-0 w-24 group cursor-pointer"
                        onClick={() => setSelectedItem(h)}
                      >
                        <div className="relative rounded-lg overflow-hidden">
                          <img
                            src={h.movie.poster}
                            alt={h.movie.title}
                            className="w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}
          </div>

          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
            <p className="text-[20px] tracking-[0.3em] uppercase text-white">
              Histórico
            </p>
            <div className="flex flex-col gap-3 max-h-[770px] overflow-y-auto pr-1 scrollbar-zion">
              {loadingHistory ? (
                <p className="text-slate-600 text-sm">Carregando...</p>
              ) : history.length === 0 ? (
                <p className="text-slate-600 text-sm">
                  Nenhum filme sugerido ainda.
                </p>
              ) : (
                history.map((h) => (
                  <div
                    key={h.id}
                    className="flex gap-3 p-3 rounded-xl bg-purple-600/10 border border-white/[0.05] hover:border-purple-500/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedItem(h)}
                  >
                    <img
                      src={h.movie.poster}
                      alt={h.movie.title}
                      className="w-12 rounded-lg flex-shrink-0 object-cover"
                    />
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-300 truncate">
                        {h.movie.title}
                      </p>
                      <p className="flex items-center gap-1 text-[10px] text-slate-600">
                        <span>{h.movie.year}</span> <span>·</span>{" "}
                        <MdStar className="text-yellow-400" />{" "}
                        <span>{h.movie.rating}</span>
                      </p>
                      <p className="text-[10px] text-slate-600">
                        {new Date(h.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-[10px] flex items-center gap-1">
                        {h.liked === true ? (
                          <>
                            <AiFillHeart className="text-purple-400 w-3 h-3" />{" "}
                            <span className="text-purple-400">Curtido</span>
                          </>
                        ) : h.liked === false ? (
                          <>
                            <BiSolidDislike className="text-red-400 w-3 h-3" />{" "}
                            <span className="text-red-400">Não curtido</span>
                          </>
                        ) : h.watched ? (
                          <>
                            <MdLocalMovies className="text-indigo-400 w-3 h-3" />{" "}
                            <span className="text-indigo-400">Assistido</span>
                          </>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
