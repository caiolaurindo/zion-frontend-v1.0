'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from './lib/auth-context';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  function handleComLogin() {
    if (user) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }

  if (loading) return null;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-12 p-8 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold">Zion</h1>
        <p className="text-xl text-gray-400">Seu guia de filmes personalizado com IA</p>
      </div>

      <div className="flex flex-col gap-3 text-left max-w-md w-full">
        <h2 className="text-lg font-semibold text-center">Como funciona</h2>
        <div className="flex gap-3 items-start">
          <span className="text-2xl">🎯</span>
          <p className="text-gray-400">Responda um quiz rápido sobre seu humor e preferências</p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-2xl">🤖</span>
          <p className="text-gray-400">Nossa IA analisa suas respostas e sugere o filme perfeito</p>
        </div>
        <div className="flex gap-3 items-start">
          <span className="text-2xl">🎬</span>
          <p className="text-gray-400">Com login, salvamos seu histórico e melhoramos as sugestões</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleComLogin}
          className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          Entrar e usar com histórico
        </button>
        <button
          onClick={() => router.push('/quiz')}
          className="border px-6 py-3 rounded-lg hover:bg-gray-100 hover:text-black transition"
        >
          Usar sem login
        </button>
      </div>
    </main>
  );
}