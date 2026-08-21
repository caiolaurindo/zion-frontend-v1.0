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
    <main className="relative min-h-screen overflow-hidden bg-[#050507] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div
        className="pointer-events-none absolute -left-40 -top-40 z-0 h-[650px] w-[650px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.24) 0%, rgba(76,29,149,0.10) 35%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div
        className="pointer-events-none absolute -right-48 top-[18%] z-0 h-[700px] w-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(109,40,217,0.28) 0%, rgba(67,56,202,0.10) 40%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[-250px] left-[30%] z-0 h-[600px] w-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Glow atrás do logo */}
      <div
        className="pointer-events-none absolute right-[10%] top-[22%] z-0 h-[500px] w-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.30) 0%, rgba(109,40,217,0.12) 35%, transparent 70%)",
          filter: "blur(65px)",
        }}
      />

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* =========================================================
          NAVBAR
      ========================================================== */}

      <nav className="relative z-50 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6 md:px-10 lg:px-14">
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="group flex cursor-pointer items-center"
          aria-label="Filme da vez"
        >
          <img
            src="/logoFilmeDaVez.svg"
            alt="Filme da vez"
            className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] md:h-16"
          />
        </button>

        {/* Login */}
        <button
          onClick={handleComLogin}
          className="group flex cursor-pointer items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/[0.08] px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] text-purple-100 backdrop-blur-md transition-all duration-300 hover:border-purple-300/60 hover:bg-purple-500/[0.15] hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] md:px-5"
        >
          {/* Google */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
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

          <span className="hidden sm:inline">LOGIN COM GOOGLE</span>
          <span className="sm:hidden">LOGIN</span>
        </button>
      </nav>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-10 pt-10 md:px-10 lg:px-14 lg:pb-16 lg:pt-14">
        <div className="grid min-h-[580px] items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        
          {/* -----------------------------------------------------
              HERO TEXT
          ------------------------------------------------------ */}

          <div className="relative z-20 max-w-[750px]">
            {/* Título */}
            <h1 className="font-sans text-[52px] font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-[64px] md:text-[68px] lg:text-[62px] xl:text-[60px]">
              <span className="block">O Filme Certo</span>

              <span className="block">
                para o seu{" "}
                <span
                  className="bg-gradient-to-r from-purple-200 via-purple-400 to-violet-500 bg-clip-text text-transparent"
                  style={{
                    filter: `drop-shadow(0 0 ${
                      7 + Math.sin(neonProgress * 0.08) * 2
                    }px rgba(139,92,246,0.4))`,
                  }}
                >
                  momento
                </span>
              </span>
            </h1>

            <p className="mt-7 max-w-[550px] text-base leading-7 text-slate-400 md:text-lg">
              Descubra sugestões personalizadas e encontre o filme ideal para
              cada momento, sem perder tempo procurando em catálogos.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => router.push("/quiz")}
                className="group relative inline-flex h-[58px] cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-7 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_35px_rgba(124,58,237,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_45px_rgba(124,58,237,0.45)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <svg
                  className="relative z-10 h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                <span className="relative z-10">Encontrar meu filme</span>

                <svg
                  className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 5l7 7-7 7M20 12H4"
                  />
                </svg>
              </button>

              <button
                onClick={handleComLogin}
                className="inline-flex h-[58px] cursor-pointer items-center justify-center gap-3 rounded-xl border border-purple-400/30 bg-white/[0.025] px-7 text-xs font-semibold uppercase tracking-[0.12em] text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-purple-300/60 hover:bg-purple-500/[0.07] hover:text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.16)]"
              >
                <svg
                  className="h-4 w-4 text-purple-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.8}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 4.75A2.75 2.75 0 018.75 2h6.5A2.75 2.75 0 0118 4.75v16.5l-6-3-6 3V4.75z"
                  />
                </svg>
                Entrar e salvar histórico
              </button>
            </div>
          </div>

          {/* -----------------------------------------------------
              HERO LOGO / VISUAL
          ------------------------------------------------------ */}

          <div className="relative flex min-h-[420px] items-center justify-center lg:min-h-[560px]">
            {/* Glow principal */}
            <div
              className="absolute h-[340px] w-[340px] rounded-full md:h-[460px] md:w-[460px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.34) 0%, rgba(124,58,237,0.12) 35%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Logo */}
            <div className="relative z-10 flex items-center justify-center">
              <img
                src="/logoFilmeDaVez.svg"
                alt="Filme da vez"
                className="relative z-10 h-auto w-[300px] object-contain drop-shadow-[0_25px_50px_rgba(124,58,237,0.45)] sm:w-[360px] md:w-[440px] lg:w-[500px] xl:w-[560px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          POSTERS
          Mantidos do código original
      ========================================================== */}

      <section className="relative z-10 mx-auto mt-20 w-full max-w-[1400px] px-6 pb-20 md:px-10 lg:px-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">
              Para você
            </p>

            <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
              Alguns filmes que podem combinar com você
            </h2>
          </div>

          <button
            onClick={() => router.push("/home")}
            className="hidden text-xs font-semibold uppercase tracking-[0.14em] text-purple-300 transition-colors hover:text-purple-200 sm:block"
          >
            Ver catálogo →
          </button>
        </div>

        {/* Máscaras laterais */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#050507] to-transparent md:w-28" />

          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-[#050507] to-transparent md:w-28" />

          <div className="overflow-hidden">
            <div
              className="flex w-max gap-4"
              style={{
                animation: "postersScroll 45s linear infinite",
              }}
            >
              {[...posters, ...posters].map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="group relative h-[220px] w-[145px] flex-shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:border-purple-500/40 hover:shadow-[0_15px_45px_rgba(124,58,237,0.25)] sm:h-[260px] sm:w-[175px] md:h-[290px] md:w-[195px]"
                >
                  <img
                    src={`/${src}`}
                    alt=""
                    className="h-full w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-40" />

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-purple-950/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA FINAL
      ========================================================== */}

      <section className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-24 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/40 via-[#0b0715] to-[#07070a] px-7 py-12 text-center shadow-[0_0_80px_rgba(124,58,237,0.10)] md:px-12 md:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-purple-600/10 blur-[80px]" />

          <div className="relative z-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">
              Seu próximo filme está aqui
            </p>

            <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Pronto para encontrar o filme da{" "}
              <span className="bg-gradient-to-r from-purple-300 to-violet-500 bg-clip-text text-transparent">
                vez?
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
              Responda algumas perguntas e deixe a gente encontrar uma sugestão
              perfeita para o seu momento.
            </p>

            <button
              onClick={() => router.push("/quiz")}
              className="group mt-8 inline-flex h-14 cursor-pointer items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 px-7 text-xs font-bold uppercase tracking-[0.14em] text-white shadow-[0_10px_35px_rgba(124,58,237,0.30)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_50px_rgba(124,58,237,0.45)]"
            >
              Encontrar meu filme agora
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 5l7 7-7 7M20 12H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          FOOTER
      ========================================================== */}

      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-5 px-6 py-8 md:flex-row md:px-10 lg:px-14">
          <div className="flex items-center gap-3">
            <img
              src="/logoFilmeDaVez.svg"
              alt="Filme da vez"
              className="h-10 w-auto opacity-80"
            />

            <div className="hidden h-8 w-px bg-white/10 sm:block" />

            <span className="hidden text-xs text-slate-500 sm:block">
              Seu filme. Sua vez.
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-500">
            <button className="transition-colors hover:text-purple-300">
              Sobre
            </button>

            <button className="transition-colors hover:text-purple-300">
              Termos de Uso
            </button>

            <button className="transition-colors hover:text-purple-300">
              Privacidade
            </button>

            <button className="transition-colors hover:text-purple-300">
              Ajuda
            </button>
          </div>

          <span className="text-[11px] text-slate-600">
            © {new Date().getFullYear()} Filme da vez
          </span>
        </div>
      </footer>

      {/* =========================================================
          ANIMAÇÕES
      ========================================================== */}

      <style>{`
        @keyframes floatingLogo {
          0% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-12px) rotate(0.5deg);
          }

          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        @keyframes postersScroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}
