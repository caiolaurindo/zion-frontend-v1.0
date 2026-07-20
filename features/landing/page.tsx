"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { useEffect, useState } from "react";

const posters = [
  "panico.png",
  "pulp.png",
  "diariodeumapaixao.png",
  "batman.png",
  "truquedemestre.png",
  "bastardosInglorios.png",
  "tokio.png",
  "bolt.png",
  "jogadorn1.png",
];

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [neonProgress, setNeonProgress] = useState(0);

  function handleComLogin() {
    if (user) {
      router.push("/home");
    } else {
      router.push("/login");
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setNeonProgress((prev) => (prev >= 100 ? 0 : prev + 0.8));
    }, 16);

    return () => clearInterval(interval);
  }, []);

  if (loading) return null;

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-12 p-8 text-center overflow-hidden bg-[#0a0a0c]">
      {/* Luzes animadas */}
      {/* Luzes estáticas */}
      <div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          top: "-120px",
          left: "-150px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          top: "25%",
          right: "-120px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div
        className="absolute rounded-full pointer-events-none z-0"
        style={{
          bottom: "-120px",
          left: "35%",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-6 md:px-12">
        <div className="text-xl font-light tracking-[0.25em] uppercase bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-purple-300 to-slate-400 font-sans select-none cursor-pointer">
          Zion
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleComLogin}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full bg-gradient-to-r from-purple-500/15 to-indigo-500/15 border border-purple-400/30 text-purple-100 backdrop-blur-md shadow-[0_0_25px_rgba(168,85,247,0.2)] hover:from-purple-500/25 hover:to-indigo-500/25 hover:border-purple-300/60 transition-all duration-300"
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

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center gap-4 mt-20">
        {/* Título com efeito neon da esquerda pra direita */}
        <div className="relative select-none">
          {/* Texto base apagado */}
          <h1 className="text-6xl md:text-9xl font-light tracking-[0.2em] uppercase text-slate-800 font-sans">
            Zion
          </h1>
          {/* Texto iluminado com clip animado */}
          <h1
            className="absolute inset-0 text-6xl md:text-9xl font-light tracking-[0.2em] uppercase font-sans bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(90deg, 
                #818cf8 0%, 
                #a78bfa ${neonProgress - 15}%, 
                #e2e8f0 ${neonProgress}%, 
                #a78bfa ${neonProgress + 15}%, 
                #4338ca 100%
              )`,
              backgroundSize: "200% 100%",
              filter: `drop-shadow(0 0 ${8 + Math.sin(neonProgress * 0.1) * 4}px rgba(139,92,246,0.8))`,
            }}
          >
            Zion
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-slate-400 font-normal max-w-xl mx-auto tracking-wide leading-relaxed">
          O filme certo para o{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-400">
            seu momento.
          </span>
        </p>

        <div className="flex gap-3 mt-2">
          <button
            onClick={() => router.push("/quiz")}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            className="cursor-pointer inline-flex items-center justify-center px-8 py-4 text-xs font-medium tracking-[0.15em] uppercase rounded-full border border-purple-400/30 text-purple-100 backdrop-blur-md hover:border-purple-300/60 hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition-all duration-300"
          >
            Entrar e salvar histórico
          </button>
        </div>
      </div>

      <div className="relative w-[1200px] overflow-hidden z-10 py-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none" />

        <div
          className="flex gap-4"
          style={{
            animation: "scrollLeft 40s linear infinite",
            width: "max-content",
          }}
        >
          {[...posters, ...posters].map((src, i) => {
            const isCenter = i === 2 || i === 2 + posters.length;
            return (
              <div
                key={i}
                className={`rounded-xl overflow-hidden flex-shrink-0 border shadow-2xl relative transition-all duration-300 ${
                  isCenter
                    ? "w-40 h-46 md:w-48 md:h-72 border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] scale-105 -translate-y-4"
                    : "w-32 h-48 md:w-36 md:h-52 border-white/10"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition"
                />
                <div
                  className={`absolute inset-0 ${isCenter ? "bg-gradient-to-t from-purple-950/90 via-black/20 to-transparent" : "bg-gradient-to-t from-black/80 via-transparent to-transparent"}`}
                />
                {isCenter && (
                  <div className="absolute bottom-3 left-3 right-3 text-left">
                    <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-medium tracking-widest uppercase">
                      escolha do zion
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <h2 className="text-2xl md:text-4xl font-bold tracking-wide uppercase text-slate-100 leading-snug">
          Pare de gastar tempo em catálogos. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-300 to-purple-400">
            Escolhemos seu filme em segundos.
          </span>
        </h2>

        <button
          onClick={() => router.push("/quiz")}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
      </div>

      {/* Keyframes */}
      <style>{`
       
        @keyframes scrollLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </main>
  );
}
