'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiDislike, BiSolidDislike } from 'react-icons/bi';
import { MdOutlineLocalMovies, MdLocalMovies } from 'react-icons/md';

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
}

export default function ResultadoRandom() {
  const router = useRouter();
  const { session } = useAuth();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [liked, setLiked] = useState<boolean | null>(null);
  const [watched, setWatched] = useState(false);
  const [showLoginWarning, setShowLoginWarning] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('zion-random');
    if (!data) { router.push('/sorteio'); return; }
    setMovie(JSON.parse(data));
  }, []);

  async function handleLike(value: boolean) {
    if (!session) { setShowLoginWarning(true); return; }
    const newLike = liked === value ? null : value;
    setLiked(newLike);
    if (movie?.historyId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${movie.historyId}/like`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ liked: newLike }),
      });
    }
  }

  async function handleWatched() {
    if (!session) { setShowLoginWarning(true); return; }
    const newWatched = !watched;
    setWatched(newWatched);
    if (movie?.historyId) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${movie.historyId}/watched`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ watched: newWatched }),
      });
    }
  }

  if (!movie) return null;

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-[#0a0a0c] overflow-hidden">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-900/30 to-purple-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-3xl">
        <div className="flex items-center justify-between w-full">
          <div
            className="text-xl font-light tracking-[0.25em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-300 to-slate-400 cursor-pointer"
            onClick={() => router.push('/')}
          >
            Zion
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-indigo-400/60">Sorteio aleatório</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 w-full p-6 rounded-2xl bg-gradient-to-br from-indigo-950/20 to-purple-950/10 border border-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.06)] backdrop-blur-md">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-44 rounded-xl self-start flex-shrink-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          />
          <div className="flex flex-col gap-3 flex-1">
            <h2 className="text-3xl font-bold text-slate-100">{movie.title}</h2>
            <p className="text-slate-500 text-sm">{movie.year} · {movie.runtime} · ⭐ {movie.rating}</p>
            <p className="text-xs text-slate-500"><span className="text-slate-400">Diretor:</span> {movie.director}</p>
            <p className="text-xs text-slate-500"><span className="text-slate-400">Elenco:</span> {movie.actors?.join(', ')}</p>
            <p className="text-xs text-slate-500 leading-relaxed mt-1">{movie.plot}</p>

            <div className="flex gap-2 mt-2 flex-wrap">
              <button
                onClick={() => handleLike(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${liked === true ? 'bg-purple-500/20 border-purple-500/50 text-purple-300' : 'border-white/10 text-slate-400 hover:border-purple-500/30 hover:text-purple-300'}`}
              >
                {liked === true ? <AiFillHeart className="w-3 h-3" /> : <AiOutlineHeart className="w-3 h-3" />}
                Curtir
              </button>
              <button
                onClick={() => handleLike(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${liked === false ? 'bg-red-500/20 border-red-500/50 text-red-300' : 'border-white/10 text-slate-400 hover:border-red-500/30 hover:text-red-300'}`}
              >
                {liked === false ? <BiSolidDislike className="w-3 h-3" /> : <BiDislike className="w-3 h-3" />}
                Não curtir
              </button>
              <button
                onClick={handleWatched}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs border transition-all duration-300 ${watched ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300' : 'border-white/10 text-slate-400 hover:border-indigo-500/30 hover:text-indigo-300'}`}
              >
                {watched ? <MdLocalMovies className="w-3 h-3" /> : <MdOutlineLocalMovies className="w-3 h-3" />}
                {watched ? 'Assistido' : 'Marcar assistido'}
              </button>
            </div>

            {showLoginWarning && (
              <div className="flex flex-col gap-2 mt-2 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5">
                <p className="text-yellow-400/80 text-xs">Faça login para curtir e salvar seu histórico!</p>
                <button
                  onClick={() => router.push('/login')}
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
            onClick={() => router.push('/sorteio')}
            className="group relative inline-flex items-center gap-3 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-indigo-500/40 text-slate-200 hover:text-white backdrop-blur-md hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            Sortear outro
          </button>
          {session && (
            <button
              onClick={() => router.push('/home')}
              className="group relative inline-flex items-center gap-3 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              Ver histórico
            </button>
          )}
        </div>
      </div>
    </main>
  );
}