"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./lib/auth-context";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  function handleComLogin() {
    if (user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }

  if (loading) return null;

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
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-6 md:px-12">
        {/* LOGO (Estilo fino e espaçado idêntico ao h1 principal) */}
        <div className="text-xl font-light tracking-[0.25em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-300 to-slate-400 font-sans select-none cursor-pointer">
          Zion
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleComLogin}
            className=" cursor-pointer flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border border-purple-400/30 text-purple-100 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:from-purple-500/25 hover:to-indigo-500/25 hover:border-purple-300/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300"
          >
            <svg
              className="w-3 h-3 text-white opacity-80"
              viewBox="0 0 24 24"
              fill="currentColor"
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
            LOGIN COM GOOGLE
          </button>
        </div>
      </nav>

      <div className="flex flex-col gap-4 mt-30">
        <h1 className="text-5xl md:text-9xl font-light tracking-[0.2em] uppercase bg-clip-text text-transparent bg-gradient-to-b from-indigo-200 via-purple-300 to-slate-500 font-sans select-none">
          Zion
        </h1>
        <p className="text-2xl md:text-3xl text-slate-400 font-normal max-w-xl mx-auto tracking-wide leading-relaxed">
          O filme certo para o{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-400">
            seu momento.
          </span>
        </p>
        <div className="flex flex-col gap-3 w-full max-w-xs mx-auto mt-2">
          <button
            onClick={() => router.push("/quiz")}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden"
          >
            <span className=" cursor-pointer absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span>Encontrar meu filme</span>
            <svg
              className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300 text-slate-400 group-hover:text-purple-300"
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
          </button>

          <button
            onClick={handleComLogin}
            className=" cursor-pointer inline-flex items-center justify-center px-8 py-3 text-xs font-medium tracking-[0.15em] uppercase rounded-full rounded-fullbg-gradient-to-r from-purple-500/15 to-indigo-500/15 border border-purple-400/30 text-purple-100 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:from-purple-500/25 hover:to-indigo-500/25 hover:border-purple-300/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300"
          >
            Entrar e salvar histórico
          </button>
        </div>
      </div>
      <div className="relative w-full max-w-5xl mx-auto my-8 overflow-hidden py-10 pointer-events-none z-10 select-none">
        {/* Container inclinado (Perspective e Rotate criam o efeito 3D da imagem) */}
        <div className="flex items-center justify-center gap-6 transform [transform:rotateX(16deg)_rotateY(-12deg)_rotateZ(4deg)] opacity-85">
          {/* Card 1*/}
          <div className="w-36 h-52 md:w-44 md:h-64 rounded-xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 relative group flex-shrink-0 backdrop-blur-md">
            <img
              src="truquedemestre.png"
              alt="Poster 1"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Card 2*/}
          <div className="w-36 h-52 md:w-44 md:h-64 rounded-xl bg-slate-900 border border-white/15 overflow-hidden shadow-2xl transition-all duration-300 relative group flex-shrink-0 backdrop-blur-md -translate-y-4">
            <img
              src="/bastardosInglorios.png"
              alt="Poster 2"
              className="w-full h-full object-cover group-hover:grayscale-0 transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Card 3*/}
          <div className="w-40 h-56 md:w-48 md:h-72 rounded-xl bg-slate-900 border border-purple-500/30 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] transition-all duration-300 relative group flex-shrink-0 backdrop-blur-md -translate-y-8 scale-105">
            <img
              src="diariodeumapaixao.png"
              alt="Poster Destaque"
              className="w-full h-full object-cover transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                escolha do zion
              </span>
            </div>
          </div>

          {/* Card 4*/}
          <div className="w-36 h-52 md:w-44 md:h-64 rounded-xl bg-slate-900 border border-white/15 overflow-hidden shadow-2xl transition-all duration-300 relative group flex-shrink-0 backdrop-blur-md -translate-y-4">
            <img
              src="tokio.png"
              alt="Poster 4"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Card 5*/}
          <div className="w-36 h-52 md:w-44 md:h-64 rounded-xl bg-slate-900 border border-white/10 overflow-hidden shadow-2xl transition-all duration-300 relative group flex-shrink-0 backdrop-blur-md">
            <img
              src="bolt.png"
              alt="Poster 5"
              className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        </div>
      </div>
      <h2 className="text-lg md:text-4xl font-bold tracking-wide uppercase text-slate-100 leading-snug">
        Pare de gastar tempo em catálogos. <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-400">
          Escolhemos seu filme em segundos.
        </span>
      </h2>
      {/* ─── BOTÃO PRINCIPAL (CTA: ENCONTRAR MEU FILME) ─── */}
      <div className="z-30 my-1 animate-fade-in">
        <button
          onClick={() => router.push("/quiz")}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden"
        >
          {/* Efeito de brilho/gradiente radial que segue o hover sutilmente no fundo */}
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Texto do Botão */}
          <span>Encontrar meu filme</span>

          {/* Ícone de Flecha Minimalista (Seta para a direita) */}
          <svg
            className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300 text-slate-400 group-hover:text-purple-300"
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
        </button>
      </div>
      
    </main>
  );
}
