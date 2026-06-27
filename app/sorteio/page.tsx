"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";
import { BsStars } from "react-icons/bs";
import { FaDice } from "react-icons/fa";

export default function SorteioPage() {
  const router = useRouter();
  const { session } = useAuth();

  const [loading, setLoading] = useState(false);

  async function handleSortear() {
    setLoading(true);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (session?.access_token) {
        headers.Authorization = `Bearer ${session.access_token}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz/random`,
        {
          method: "POST",
          headers,
        }
      );

      const data = await res.json();

      localStorage.setItem("zion-random", JSON.stringify(data));

      router.push("/resultado-random");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <main className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#0a0a0c] px-6">

      {/* Background */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-900/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[-10%] w-[450px] h-[450px] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-indigo-950/10 backdrop-blur-md shadow-[0_0_40px_rgba(168,85,247,0.08)] p-10 md:p-14">

        {/* Ícone */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-24 h-24 rounded-full border border-purple-500/20 bg-purple-500/10">
            <BsStars className="text-5xl text-purple-400 animate-pulse" />
          </div>
        </div>

        {/* Título */}
        <h1 className="mt-8 text-center text-[34px] tracking-[0.25em] uppercase text-white">
          Surpreenda-se
        </h1>

        {/* Texto */}
        <p className="mt-8 text-center text-slate-300 text-lg leading-8">
          O <span className="text-purple-400 font-semibold">Zion</span> vai
          escolher um filme completamente aleatório para você.
        </p>

        <p className="mt-5 text-center text-slate-500 leading-8 max-w-xl mx-auto">
          Nenhuma pergunta será feita.
          <br />
          Apenas clique no botão abaixo e deixe a sorte decidir sua próxima
          sessão de cinema.
        </p>

        {/* Botão */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleSortear}
            disabled={loading}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden disabled:opacity-60"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <FaDice className="relative text-lg" />

            <span className="relative text-xs font-semibold tracking-[0.2em] uppercase">
              {loading ? "Sorteando..." : "Sortear Filme"}
            </span>
          </button>
        </div>

        {/* Voltar */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.back()}
            className="text-sm tracking-[0.2em] uppercase text-slate-500 hover:text-purple-300 transition-all duration-300"
          >
            Voltar
          </button>
        </div>
      </div>
    </main>
  );
}