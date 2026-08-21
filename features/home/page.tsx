"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/lib/auth-context";
import { useAuthRedirect, useHomeHistory } from "@/features/shared/hooks";

import HomeHeader from "./components/HomeHeader";
import HomeHero from "./components/HomeHero";
import LastQuizCard from "./components/LastQuizCard";
import MovieGridSection from "./components/MovieGridSection";
import RandomMovieCard from "./components/RandomMovieCard";
import HistoryPanel from "./components/HistoryPanel";
import MovieDetailsDrawer from "./components/MovieDetailsDrawer";

export default function HomePage() {
  const router = useRouter();

  const { user, loading, signOut } = useAuth();
  useAuthRedirect();

  const { history, loadingHistory, handleAction } = useHomeHistory();

  const [selectedItem, setSelectedItem] = useState(null);
  const [lastRandom, setLastRandom] = useState(null);
  const [lastQuiz, setLastQuiz] = useState(null);
  const [showFullHistory, setShowFullHistory] = useState(false);

  useEffect(() => {
    const random = localStorage.getItem("zion-random");
    const quiz = localStorage.getItem("zion-quiz-result");

    if (random) {
      try {
        setLastRandom(JSON.parse(random));
      } catch {
        setLastRandom(null);
      }
    }

    if (quiz) {
      try {
        setLastQuiz(JSON.parse(quiz));
      } catch {
        setLastQuiz(null);
      }
    }
  }, []);

  const firstName =
    user?.name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "por aqui";

  const favorites = useMemo(
    () => history.filter((item) => item.liked === true),
    [history],
  );

  const watched = useMemo(
    () => history.filter((item) => item.watched),
    [history],
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#08050F] text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4 sm:p-6 lg:p-8">
        <HomeHeader
          email={user?.email}
          onSignOut={handleSignOut}
          onLogoClick={() => router.push("/")}
        />
        <HomeHero firstName={firstName} />

        <div className="grid gap-8 xl:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-8">
            {lastQuiz && (
              <LastQuizCard
                quiz={lastQuiz}
                onAction={handleAction}
                onChange={setLastQuiz}
              />
            )}

            <MovieGridSection
              title="Favoritos"
              items={favorites}
              onMovieClick={setSelectedItem}
              emptyMessage="Nenhum favorito ainda."
            />

            {watched.length > 0 && (
              <MovieGridSection
                title="Últimos filmes assistidos"
                items={watched}
                onMovieClick={setSelectedItem}
              />
            )}
          </div>

          <aside className="flex flex-col gap-4">
            {lastRandom && (
              <RandomMovieCard
                movie={lastRandom}
                onClick={() => setSelectedItem(lastRandom)}
              />
            )}

            <HistoryPanel
              history={history}
              loading={loadingHistory}
              showFullHistory={showFullHistory}
              onToggleHistory={() => setShowFullHistory((value) => !value)}
              onMovieClick={setSelectedItem}
            />
          </aside>
        </div>
      </div>

      {selectedItem && (
        <MovieDetailsDrawer
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAction={handleAction}
        />
      )}
    </main>
  );
}
