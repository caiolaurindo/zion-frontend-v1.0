'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';

interface HistoryItem {
  id: string;
  liked: boolean | null;
  watched: boolean;
  movie: {
    title: string;
    poster: string;
    year: string;
    rating: string;
  };
}

export default function Home() {
  const router = useRouter();
  const { user, session, loading, signOut } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading]);

  useEffect(() => {
    if (!session) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoadingHistory(false);
      });
  }, [session]);

  async function handleSignOut() {
    await signOut();
    router.push('/');
  }

  if (loading) return null;

  const favorites = history.filter((h) => h.liked === true);

  return (
    <main className="flex flex-col min-h-screen p-8 gap-8 max-w-4xl mx-auto">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Zion</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-100 hover:text-black transition"
          >
            Sair
          </button>
        </div>
      </header>

      <button
        onClick={() => router.push('/quiz')}
        className="bg-white text-black font-semibold px-6 py-4 rounded-lg hover:bg-gray-200 transition text-lg"
      >
        🎬 Descobrir um filme
      </button>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Favoritos ❤️</h2>
        {favorites.length === 0 ? (
          <p className="text-gray-400">Nenhum favorito ainda — dê like nos filmes que curtir!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favorites.map((h) => (
              <div key={h.id} className="flex flex-col gap-2">
                <img src={h.movie.poster} alt={h.movie.title} className="rounded-lg w-full" />
                <p className="text-sm font-semibold">{h.movie.title}</p>
                <p className="text-xs text-gray-400">{h.movie.year} · ⭐ {h.movie.rating}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Histórico</h2>
        {loadingHistory ? (
          <p className="text-gray-400">Carregando...</p>
        ) : history.length === 0 ? (
          <p className="text-gray-400">Nenhum filme sugerido ainda.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {history.map((h) => (
              <div key={h.id} className="flex flex-col gap-2">
                <img src={h.movie.poster} alt={h.movie.title} className="rounded-lg w-full" />
                <p className="text-sm font-semibold">{h.movie.title}</p>
                <p className="text-xs text-gray-400">{h.movie.year} · ⭐ {h.movie.rating}</p>
                <p className="text-xs text-gray-400">{h.liked === true ? '❤️ Curtido' : h.liked === false ? '👎 Não curtido' : '—'}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}