'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setError('');

    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/home');
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <h1 className="text-3xl font-bold">Zion</h1>
      <p className="text-gray-400">{isRegister ? 'Crie sua conta' : 'Entre na sua conta'}</p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleGoogle}
          className="border px-6 py-3 rounded-lg hover:bg-gray-100 hover:text-black transition flex items-center justify-center gap-2"
        >
          <span>G</span> Continuar com Google
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 border-t" />
          <span className="text-gray-400 text-sm">ou</span>
          <div className="flex-1 border-t" />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg px-4 py-3 bg-transparent"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg px-4 py-3 bg-transparent"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
        >
          {loading ? 'Carregando...' : isRegister ? 'Criar conta' : 'Entrar'}
        </button>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-gray-400 text-sm hover:text-white transition"
        >
          {isRegister ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar'}
        </button>
      </div>

      <button
        onClick={() => router.push('/')}
        className="text-gray-400 text-sm hover:text-white transition"
      >
        ← Voltar
      </button>
    </main>
  );
}