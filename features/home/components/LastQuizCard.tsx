"use client";

import React from "react";
import MovieActions from "../../shared/components/ActionsButtons";

interface LastQuiz {
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
}

interface LastQuizCardProps {
  quiz: LastQuiz;
  onAction: (
    id: string,
    action: "like" | "dislike" | "watched",
    movie: LastQuiz,
  ) => void;
  onChange: React.Dispatch<
    React.SetStateAction<LastQuiz | null>
  >;
}

export default function LastQuizCard({
  quiz,
  onAction,
  onChange,
}: Readonly<LastQuizCardProps>) {
  const handleLike = () => {
    onAction(quiz.historyId, "like", quiz);

    onChange((prev) =>
      prev
        ? {
            ...prev,
            liked: prev.liked === true ? null : true,
          }
        : null,
    );
  };

  const handleDislike = () => {
    onAction(quiz.historyId, "dislike", quiz);

    onChange((prev) =>
      prev
        ? {
            ...prev,
            liked: prev.liked === false ? null : false,
          }
        : null,
    );
  };

  const handleWatched = () => {
    onAction(quiz.historyId, "watched", quiz);

    onChange((prev) =>
      prev
        ? {
            ...prev,
            watched: !prev.watched,
          }
        : null,
    );
  };

  return (
    <section className="flex flex-col gap-4">
      <p className="text-[18px] uppercase tracking-[0.3em] text-white md:text-[20px]">
        Última escolha da vez
      </p>

      <div className="flex flex-col gap-6 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 to-indigo-950/10 p-6 shadow-[0_0_40px_rgba(168,85,247,0.08)] backdrop-blur-md md:flex-row">
        <img
          src={quiz.poster}
          alt={quiz.title}
          className="w-full rounded-xl object-cover shadow-[0_0_30px_rgba(0,0,0,0.5)] md:w-52"
        />

        <div className="flex flex-1 flex-col gap-3">
          <h2 className="text-2xl font-bold text-slate-100">
            {quiz.title}
          </h2>

          <p className="text-sm text-slate-500">
            {quiz.year} · {quiz.runtime} · ⭐ {quiz.rating}
          </p>

          <p className="text-xs text-slate-500">
            <span className="text-purple-300">
              Diretor:
            </span>{" "}
            {quiz.director}
          </p>

          <p className="text-xs text-slate-500">
            <span className="text-purple-300">
              Elenco:
            </span>{" "}
            {quiz.actors?.join(", ")}
          </p>

          <p className="text-xs leading-relaxed text-slate-500">
            {quiz.plot}
          </p>

          <MovieActions
            movie={{
              id: quiz.historyId,
              liked: quiz.liked,
              watched: quiz.watched,
            }}
            onLike={handleLike}
            onDislike={handleDislike}
            onWatched={handleWatched}
          />
        </div>
      </div>
    </section>
  );
}