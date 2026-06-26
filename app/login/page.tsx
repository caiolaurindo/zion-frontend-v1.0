"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setError("");

    const { error } = isRegister
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/home");
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-12 p-8 text-center overflow-hidden bg-[#0a0a0c]">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/1 w-150 h-[600px] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-2/3 -translate-x-3/6 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <h1 className="text-5xl md:text-5xl font-light tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-b from-indigo-200 via-purple-300 to-slate-500 font-sans select-none">
        Zion
      </h1>
      <p className="text-gray-400">
        {isRegister ? "Crie sua conta" : "Entre na sua conta"}
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={handleGoogle}
          className="group cursor-pointer inline-flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border border-purple-400/30 text-purple-100 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:from-purple-500/25 hover:to-indigo-500/25 hover:border-purple-300/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              fill="#EA4335"
            />
          </svg>

          <span className="text-xs font-semibold tracking-[0.18em] uppercase">
            Continuar com Google
          </span>
        </button>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
            ou
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
        </div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-slate-100 placeholder:text-slate-500 backdrop-blur-md outline-none transition-all duration-300 focus:border-purple-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(168,85,247,.15)]"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-slate-100 placeholder:text-slate-500 backdrop-blur-md outline-none transition-all duration-300 focus:border-purple-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_25px_rgba(168,85,247,.15)]"
        />

        {error && (
          <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="group relative inline-flex w-full items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <span className="relative z-10">
            {loading ? "Carregando..." : isRegister ? "Criar conta" : "Entrar"}
          </span>

          {!loading && (
            <svg
              className="relative z-10 w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300 text-slate-400 group-hover:text-purple-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          )}
        </button>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-sm text-slate-400 transition-colors duration-300 hover:text-purple-300"
        >
          {isRegister
            ? "Já possui uma conta? Entrar"
            : "Não possui uma conta? Criar conta"}
        </button>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors duration-300 hover:text-purple-300"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Voltar para o início
      </button>
    </main>
  );
}
