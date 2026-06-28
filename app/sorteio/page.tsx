'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';

const genres = [
  'Ação', 'Comédia', 'Terror', 'Romance', 'Drama',
  'Suspense', 'Ficção Científica', 'Animação', 'Documentário', 'Thriller',
];

export default function Sorteio() {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  async function handleSortear() {
    setLoading(true);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz/random`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ genre: selectedGenre ?? null }),
    });

    const data = await res.json();
    localStorage.setItem('zion-random', JSON.stringify(data));
    router.push('/resultado-random');
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-[#0a0a0c] overflow-hidden text-center">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-900/30 to-purple-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-purple-900/10 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg">
       

        <div className="flex flex-col gap-2">
          <p className="text-[25px] mt-[-20px] tracking-[0.3em] uppercase text-indigo-300/60">Modo aleatório</p>
          <h1 className="text-3xl font-light text-slate-100 leading-snug text-[40px]">
            Deixe o{' '}
            <span className="text-transparent   bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-400 font-semibold">
              Zion
            </span>{' '}
            decidir por você
          </h1>
          <p className="text-slate-500 text-[20px] mt-[-15px] leading-relaxed">
            Sem quiz, sem perguntas. Escolha um gênero se quiser, ou deixa completamente no acaso.
          </p>
        </div>

        {/* Gêneros */}
        <div className="flex flex-col gap-3 w-full">
          <p className="text-[10px] tracking-[0.2em] uppercase text-slate-600 text-left mt-2">
            Gênero <span className="text-indigo-400/50">(opcional)</span>
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(selectedGenre === genre ? null : genre)}
                className={`px-4 py-2 rounded-full text-xs border transition-all duration-300 ${
                  selectedGenre === genre
                    ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-500 hover:border-indigo-500/30 hover:text-slate-300'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
          {selectedGenre && (
            <p className="text-[10px] text-indigo-400/60 text-center">
              Sorteando em <span className="text-indigo-300">{selectedGenre}</span> — clique novamente para remover
            </p>
          )}
        </div>

        <button
          onClick={handleSortear}
          disabled={loading}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-[0.2em] uppercase rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-400/30 text-indigo-100 backdrop-blur-md shadow-[0_0_25px_rgba(99,102,241,0.2)] hover:from-indigo-500/25 hover:to-purple-500/25 hover:border-indigo-300/60 hover:shadow-[0_0_40px_rgba(99,102,241,0.35)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 border-indigo-300 border-t-transparent animate-spin" />
              Sorteando...
            </>
          ) : (
            <>{selectedGenre ? `Sortear em ${selectedGenre}` : 'Sortear qualquer filme'}</>
          )}
        </button>

        <button
          onClick={() => router.back()}
          className="text-white text-xs hover:text-slate-400 transition tracking-widest uppercase"
        >
          ← Voltar
        </button>
      </div>
    </main>
  );
}