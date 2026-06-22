'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';

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
    const data = localStorage.getItem('zion-result');
    if (!data) {
      router.push('/');
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
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${historyId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ liked: newLike }),
      });
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
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${historyId}/watched`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ watched: newWatched }),
      });
    }
  }

  if (!movie) return null;

  return (
    <main className="flex flex-col items-center min-h-screen gap-6 p-8">
      <h1 className="text-2xl font-bold">Seu filme é:</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-48 rounded-lg self-start"
        />

        <div className="flex flex-col gap-3">
          <h2 className="text-3xl font-bold">{movie.title}</h2>
          <p className="text-gray-400">{movie.year} · {movie.runtime} · ⭐ {movie.rating}</p>
          <p className="text-sm"><span className="font-semibold">Diretor:</span> {movie.director}</p>
          <p className="text-sm"><span className="font-semibold">Elenco:</span> {movie.actors.join(', ')}</p>
          <p className="text-sm mt-2">{movie.plot}</p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleLike(true)}
              className={`px-4 py-2 rounded-lg border transition ${liked === true ? 'bg-green-500 text-white border-green-500' : 'hover:bg-gray-100 hover:text-black'}`}
            >
              ❤️ Curtir
            </button>
            <button
              onClick={() => handleLike(false)}
              className={`px-4 py-2 rounded-lg border transition ${liked === false ? 'bg-red-500 text-white border-red-500' : 'hover:bg-gray-100 hover:text-black'}`}
            >
              👎 Não curtir
            </button>
            <button
              onClick={handleWatched}
              className={`px-4 py-2 rounded-lg border transition ${watched ? 'bg-blue-500 text-white border-blue-500' : 'hover:bg-gray-100 hover:text-black'}`}
            >
              {watched ? '✅ Assistido' : '🎬 Marcar como assistido'}
            </button>
          </div>

          {showLoginWarning && (
            <div className="flex flex-col gap-2 mt-2 p-4 border rounded-lg border-yellow-500">
              <p className="text-yellow-400 text-sm">Faça login para curtir e salvar seu histórico!</p>
              <button
                onClick={() => router.push('/login')}
                className="bg-white text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Fazer login
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => router.push('/quiz')}
          className="border rounded-lg px-6 py-3 hover:bg-gray-100 hover:text-black transition"
        >
          Tentar novamente
        </button>
        {session && (
          <button
            onClick={() => router.push('/home')}
            className="border rounded-lg px-6 py-3 hover:bg-gray-100 hover:text-black transition"
          >
            Ver histórico
          </button>
        )}
      </div>
    </main>
  );
}