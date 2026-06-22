'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('zion-result');
    if (!data) {
      router.push('/');
      return;
    }
    setMovie(JSON.parse(data));
  }, []);

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
        </div>
      </div>

      <button
        onClick={() => router.push('/')}
        className="border rounded-lg px-6 py-3 hover:bg-gray-100 hover:text-black transition"
      >
        Tentar novamente
      </button>
    </main>
  );
}