"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { MdStar } from "react-icons/md";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { MdOutlineLocalMovies, MdLocalMovies } from "react-icons/md";
import GlassPanel from "@/features/shared/components/GlassPanel";
import { useAuthRedirect, useHomeHistory } from "@/features/shared/hooks";
import type { HistoryItem } from "@/features/shared/types/history";

export default function HomePage() {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  useAuthRedirect();
  const { history, loadingHistory, handleAction } = useHomeHistory();

  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [lastRandom, setLastRandom] = useState<HistoryItem["movie"] | null>(
    null,
  );
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [favoritePage, setFavoritePage] = useState(0);
  const [watchedPage, setWatchedPage] = useState(0);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);
  const [lastQuiz, setLastQuiz] = useState<{
    historyId: string;
    title: string;
    poster: string;
    year: string;
    runtime: string;
    rating: string;
    director: string;
    actors: string[];
    plot: string;
    liked: boolean | null;
    watched: boolean;
  } | null>(null);

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ??
    user?.email?.split("@")[0] ??
    "por aqui";

  useEffect(() => {
    const savedRandom = localStorage.getItem("zion-random");
    if (savedRandom) {
      try {
        setLastRandom(JSON.parse(savedRandom));
      } catch {
        setLastRandom(null);
      }
    }

    const savedQuiz = localStorage.getItem("zion-quiz-result");
    if (savedQuiz) {
      try {
        setLastQuiz(JSON.parse(savedQuiz));
      } catch {
        setLastQuiz(null);
      }
    }

    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  const latest = history[0] ?? null;
  const favorites = useMemo(
    () => history.filter((item) => item.liked === true),
    [history],
  );
  const visibleHistory = showFullHistory ? history : history.slice(0, 5);
  const watchedItems = history.filter((item) => item.watched);
  const favoritesPerView =
    viewportWidth !== null && viewportWidth < 640 ? 3 : 4;
  const watchedPerView = viewportWidth !== null && viewportWidth < 640 ? 3 : 4;
  const favoritePages = Math.max(
    1,
    Math.ceil(favorites.length / favoritesPerView),
  );
  const watchedPages = Math.max(
    1,
    Math.ceil(watchedItems.length / watchedPerView),
  );
  const visibleFavorites = favorites.slice(
    favoritePage * favoritesPerView,
    favoritePage * favoritesPerView + favoritesPerView,
  );
  const visibleWatchedItems = watchedItems.slice(
    watchedPage * watchedPerView,
    watchedPage * watchedPerView + watchedPerView,
  );

  useEffect(() => {
    if (favoritePage >= favoritePages) {
      setFavoritePage(Math.max(0, favoritePages - 1));
    }
  }, [favoritePage, favoritePages]);

  useEffect(() => {
    if (watchedPage >= watchedPages) {
      setWatchedPage(Math.max(0, watchedPages - 1));
    }
  }, [watchedPage, watchedPages]);

  if (loading) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0c] text-slate-100">
      <div className="pointer-events-none absolute left-[-12%] top-[-18%] h-120 w-120 rounded-full bg-purple-900/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-96 w-96 rounded-full bg-blue-900/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[30%] h-72 w-72 rounded-full bg-indigo-950/40 blur-[120px]" />

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />
          <div className="relative w-full max-w-md overflow-y-auto border-l border-purple-500/20 bg-[#0d0d10] p-6 shadow-[0_0_60px_rgba(168,85,247,0.1)]">
            <button
              onClick={() => setSelectedItem(null)}
              className="self-end text-slate-500 transition hover:text-slate-300"
            >
              ✕
            </button>
            <img
              src={selectedItem.movie.poster}
              alt={selectedItem.movie.title}
              className="mt-4 w-40 self-center rounded-xl shadow-2xl"
            />
            <h2 className="mt-4 text-xl font-bold text-slate-100">
              {selectedItem.movie.title}
            </h2>
            <p className="text-sm text-slate-500">
              {selectedItem.movie.year} · {selectedItem.movie.runtime} · ⭐{" "}
              {selectedItem.movie.rating}
            </p>
            <p className="mt-3 text-xs text-slate-500">
              <span className="text-slate-400">Diretor:</span>{" "}
              {selectedItem.movie.director}
            </p>
            <p className="text-xs text-slate-500">
              <span className="text-slate-400">Elenco:</span>{" "}
              {selectedItem.movie.actors?.join(", ")}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {selectedItem.movie.plot}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={() => {
                  handleAction(selectedItem.id, "like", selectedItem);
                  setSelectedItem((prev) =>
                    prev
                      ? { ...prev, liked: prev.liked === true ? null : true }
                      : null,
                  );
                }}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${selectedItem.liked === true ? "border-purple-500/50 bg-purple-500/20 text-purple-300" : "border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-purple-300"}`}
              >
                {selectedItem.liked === true ? (
                  <AiFillHeart className="h-3 w-3" />
                ) : (
                  <AiOutlineHeart className="h-3 w-3" />
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
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${selectedItem.liked === false ? "border-red-500/50 bg-red-500/20 text-red-300" : "border-white/10 text-slate-400 hover:border-red-500/30 hover:text-red-300"}`}
              >
                {selectedItem.liked === false ? (
                  <BiSolidDislike className="h-3 w-3" />
                ) : (
                  <BiDislike className="h-3 w-3" />
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
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${selectedItem.watched ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300" : "border-white/10 text-slate-400 hover:border-indigo-500/30 hover:text-indigo-300"}`}
              >
                {selectedItem.watched ? (
                  <MdLocalMovies className="h-3 w-3" />
                ) : (
                  <MdOutlineLocalMovies className="h-3 w-3" />
                )}
                {selectedItem.watched ? "Assistido" : "Marcar assistido"}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-row items-center justify-between gap-2 md:flex-row md:items-center md:justify-between">
          <div className="text-[30px] font-light tracking-[0.25em] uppercase bg-clip-text text-transparent bg-linear-to-r from-indigo-200 via-purple-300 to-slate-400 font-sans select-none">
            Zion
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <span className="min-w-0 truncate text-[10px] text-gray-400 sm:text-sm">
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="shrink-0 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-200 transition hover:border-white/40 hover:text-white sm:px-4 sm:py-2"
            >
              Sair
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-1">
          <h1 className="mt-[10px] text-2xl font-light tracking-wide text-slate-100 md:text-3xl">
            O que vamos assistir hoje,{" "}
            <span className="bg-linear-to-r from-indigo-200 via-purple-300 to-purple-400 bg-clip-text font-semibold text-transparent">
              {firstName}?
            </span>
          </h1>
          <p className="text-[20px] text-slate-500">
            Descubra um filme perfeito para seu humor.
          </p>
        </div>

        <div className="mt-[-8px] flex flex-row flex-wrap gap-2">
          <button
            onClick={() => router.push("/quiz")}
            className="group h-auto min-h-[44px] w-fit cursor-pointer rounded-full border border-purple-400/30 bg-linear-to-r from-purple-500/15 to-indigo-500/15 px-4 py-2 text-sm font-light tracking-wide text-purple-100 shadow-[0_0_25px_rgba(168,85,247,0.2)] transition hover:border-purple-300/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] sm:px-5 sm:text-lg"
          >
            Descobrir um filme
          </button>

          <button
            onClick={() => router.push("/sorteio")}
            className="group h-auto min-h-[44px] w-fit cursor-pointer rounded-full border border-white/10 bg-white/3 px-4 py-2 text-sm font-light tracking-wide text-slate-400 transition hover:border-purple-500/30 hover:text-slate-200 sm:px-5 sm:text-lg"
          >
            Surpreenda-me
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex flex-col gap-8">
            {lastQuiz && (
              <section className="flex flex-col gap-4">
                <p className="text-[20px] tracking-[0.3em] uppercase text-white">
                  Última escolha do zion
                </p>
                <div className="flex flex-col gap-6 rounded-2xl border border-purple-500/20 bg-linear-to-br from-purple-950/20 to-indigo-950/10 p-6 shadow-[0_0_40px_rgba(168,85,247,0.06)] backdrop-blur-md md:flex-row">
                  <img
                    src={lastQuiz.poster}
                    alt={lastQuiz.title}
                    className="w-full rounded-xl object-cover shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-52 md:flex-shrink-0"
                  />
                  <div className="flex flex-1 flex-col gap-3">
                    <h2 className="text-2xl font-bold text-slate-100">
                      {lastQuiz.title}
                    </h2>
                    <p className="flex items-center gap-1 text-sm text-slate-500">
                      <span>{lastQuiz.year}</span>
                      <span>·</span>
                      <span>{lastQuiz.runtime}</span>
                      <span>·</span>
                      <MdStar className="text-yellow-400" />
                      <span>{lastQuiz.rating}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="text-slate-400">Diretor:</span>{" "}
                      {lastQuiz.director}
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="text-slate-400">Elenco:</span>{" "}
                      {lastQuiz.actors?.join(", ")}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {lastQuiz.plot}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          handleAction(lastQuiz.historyId, "like", {
                            id: lastQuiz.historyId,
                            createdAt: new Date().toISOString(),
                            liked: lastQuiz.liked,
                            watched: lastQuiz.watched,
                            movie: lastQuiz,
                          });

                          setLastQuiz((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  liked: prev.liked === true ? null : true,
                                }
                              : prev,
                          );
                        }}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${lastQuiz.liked === true ? "border-purple-500/50 bg-purple-500/20 text-purple-300" : "border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-purple-300"}`}
                      >
                        {lastQuiz.liked === true ? (
                          <AiFillHeart className="h-3 w-3" />
                        ) : (
                          <AiOutlineHeart className="h-3 w-3" />
                        )}
                        Curtir
                      </button>

                      <button
                        onClick={() => {
                          handleAction(lastQuiz.historyId, "dislike", {
                            id: lastQuiz.historyId,
                            createdAt: new Date().toISOString(),
                            liked: lastQuiz.liked,
                            watched: lastQuiz.watched,
                            movie: lastQuiz,
                          });

                          setLastQuiz((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  liked: prev.liked === false ? null : false,
                                }
                              : prev,
                          );
                        }}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${lastQuiz.liked === false ? "border-red-500/50 bg-red-500/20 text-red-300" : "border-white/10 text-slate-400 hover:border-red-500/30 hover:text-red-300"}`}
                      >
                        {lastQuiz.liked === false ? (
                          <BiSolidDislike className="h-3 w-3" />
                        ) : (
                          <BiDislike className="h-3 w-3" />
                        )}
                        Não curtir
                      </button>

                      <button
                        onClick={() => {
                          handleAction(lastQuiz.historyId, "watched", {
                            id: lastQuiz.historyId,
                            createdAt: new Date().toISOString(),
                            liked: lastQuiz.liked,
                            watched: lastQuiz.watched,
                            movie: lastQuiz,
                          });

                          setLastQuiz((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  watched: !prev.watched,
                                }
                              : prev,
                          );
                        }}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-all duration-300 ${lastQuiz.watched ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300" : "border-white/10 text-slate-400 hover:border-indigo-500/30 hover:text-indigo-300"}`}
                      >
                        {lastQuiz.watched ? (
                          <MdLocalMovies className="h-3 w-3" />
                        ) : (
                          <MdOutlineLocalMovies className="h-3 w-3" />
                        )}
                        {lastQuiz.watched ? "Assistido" : "Marcar assistido"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[20px] tracking-[0.3em] uppercase text-white">
                  Favoritos
                </p>

                {favorites.length > favoritesPerView && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setFavoritePage((prev) => Math.max(0, prev - 1))
                      }
                      disabled={favoritePage === 0}
                      className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-purple-500/20 disabled:opacity-30"
                    >
                      ←
                    </button>
                    <button
                      onClick={() =>
                        setFavoritePage((prev) =>
                          Math.min(favoritePages - 1, prev + 1),
                        )
                      }
                      disabled={favoritePage === favoritePages - 1}
                      className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-purple-500/20 disabled:opacity-30"
                    >
                      →
                    </button>
                  </div>
                )}
              </div>

              {favorites.length === 0 ? (
                <p className="text-sm text-slate-600">
                  Nenhum favorito ainda — dê like nos filmes que curtir!
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {visibleFavorites.map((item) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={item.movie.poster}
                          alt={item.movie.title}
                          className="w-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
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
                    </div>
                  ))}
                </div>
              )}
            </section>

            {watchedItems.length > 0 && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[20px] tracking-[0.3em] uppercase text-white">
                    Últimos filmes assistidos
                  </p>

                  {watchedItems.length > watchedPerView && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setWatchedPage((prev) => Math.max(0, prev - 1))
                        }
                        disabled={watchedPage === 0}
                        className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-purple-500/20 disabled:opacity-30"
                      >
                        ←
                      </button>
                      <button
                        onClick={() =>
                          setWatchedPage((prev) =>
                            Math.min(watchedPages - 1, prev + 1),
                          )
                        }
                        disabled={watchedPage === watchedPages - 1}
                        className="h-9 w-9 rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-purple-500/20 disabled:opacity-30"
                      >
                        →
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {visibleWatchedItems.map((item) => (
                    <div
                      key={item.id}
                      className="group cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.movie.poster}
                          alt={item.movie.title}
                          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="flex flex-col gap-4">
            {lastRandom && (
              <div className="flex flex-col gap-3">
                <p className="mt-[10px] text-[15px] tracking-[0.3em] uppercase text-white">
                  Última escolha Aleatória
                </p>
                <div
                  className="flex cursor-pointer gap-3 rounded-xl border border-indigo-500/20 bg-linear-to-br from-indigo-950/30 to-purple-950/20 p-3 transition hover:border-indigo-500/40"
                  onClick={() => {
                    const fakeItem = {
                      id: "",
                      liked: null,
                      watched: false,
                      createdAt: "",
                      movie: lastRandom,
                    };
                    setSelectedItem(fakeItem as HistoryItem);
                  }}
                >
                  <img
                    src={lastRandom.poster}
                    alt={lastRandom.title}
                    className="w-[112px] shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-slate-300">
                      {lastRandom.title}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-600">
                      {lastRandom.year} · ⭐ {lastRandom.rating}
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-widest text-indigo-400/60">
                      Aleatório
                    </p>
                  </div>
                </div>
              </div>
            )}

            <GlassPanel className="flex flex-col gap-3">
              <p className="text-[20px] tracking-[0.3em] uppercase text-white">
                Histórico
              </p>
              <div
                className={`space-y-3 ${showFullHistory ? "max-h-[380px] overflow-y-auto pr-1" : ""}`}
              >
                {loadingHistory ? (
                  <p className="text-sm text-slate-600">Carregando...</p>
                ) : history.length === 0 ? (
                  <p className="text-sm text-slate-600">
                    Nenhum filme sugerido ainda.
                  </p>
                ) : (
                  visibleHistory.map((item) => (
                    <div
                      key={item.id}
                      className="flex cursor-pointer gap-3 rounded-xl border border-white/5 bg-purple-600/10 p-3 transition hover:border-purple-500/20"
                      onClick={() => setSelectedItem(item)}
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
                        <p className="mt-1 flex items-center gap-1 text-[10px]">
                          {item.liked === true ? (
                            <>
                              <AiFillHeart className="h-3 w-3 text-purple-400" />
                              <span className="text-purple-400">Curtido</span>
                            </>
                          ) : item.liked === false ? (
                            <>
                              <BiSolidDislike className="h-3 w-3 text-red-400" />
                              <span className="text-red-400">Não curtido</span>
                            </>
                          ) : item.watched ? (
                            <>
                              <MdLocalMovies className="h-3 w-3 text-indigo-400" />
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

              {!loadingHistory && history.length > 5 && (
                <button
                  onClick={() => setShowFullHistory((prev) => !prev)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:border-purple-500/30 hover:text-white"
                >
                  {showFullHistory ? "Ver menos" : "Ver histórico completo"}
                </button>
              )}
            </GlassPanel>
          </aside>
        </div>
      </main>
    </div>
  );
}
