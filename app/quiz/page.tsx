"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../lib/auth-context";

const questions = [
  {
    id: "mood",
    question: "Como você tá se sentindo agora?",
    options: [
      "Animado e agitado",
      "Relaxado e tranquilo",
      "Melancólico e reflexivo",
      "Estressado e precisando de distração",
      "Curioso e com a cabeça aberta",
    ],
  },
  {
    id: "experience",
    question: "Que tipo de experiência você quer ter?",
    options: [
      "Gargalhar muito",
      "Sentir o coração acelerar",
      "Chorar ou me emocionar",
      "Sair pensando por dias",
      "Me surpreender com um plot twist",
      "Nivel Oscar",
    ],
  },
  {
    id: "company",
    question: "Vai assistir com quem?",
    options: ["Sozinho", "Com namorado(a)", "Com a família", "Com amigos"],
  },
  {
    id: "duration",
    question: "Quanto tempo você tem?",
    options: ["Menos de 1h30", "Até 2h", "Pode ser longo"],
  },
  {
    id: "depth",
    question: "Prefere algo mais...",
    options: [
      "Leve e fácil de assistir",
      "Intenso e envolvente",
      "Baseado em fatos reais",
      "Cult ou diferente do convencional",
    ],
  },
  {
    id: "origin",
    question: "Alguma preferência de origem?",
    options: [
      "Não importa",
      "Hollywood",
      "Cinema europeu ou asiático",
      "Anime",
      "Cinema latino ou brasileiro",
    ],
  },
  {
    id: "extra",
    question: "Quer dar alguma dica extra pro Zion? (opcional)",
    options: [],
  },
];

export default function Quiz() {
  const router = useRouter();
  const { session } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [extra, setExtra] = useState("");
  const [loading, setLoading] = useState(false);

  const current = questions[step];
  const isExtraStep = current.id === "extra";
  const isLastQuestion = step === questions.length - 1;

  function handleSelect(value: string) {
    setSelected(value);
  }

  function handleNext() {
    if (!isExtraStep && !selected) return;

    const updated = isExtraStep
      ? { ...answers }
      : { ...answers, [current.id]: selected! };

    setAnswers(updated);
    setSelected(null);

    if (isLastQuestion) {
      handleSubmit(updated);
    } else {
      setStep(step + 1);
    }
  }

  async function handleSubmit(finalAnswers: Record<string, string>) {
    setLoading(true);

    const payload = extra ? { ...finalAnswers, extra } : finalAnswers;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.access_token) {
      headers["Authorization"] = `Bearer ${session.access_token}`;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/recommend`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    localStorage.setItem("zion-result", JSON.stringify(data));
    localStorage.setItem("zion-quiz-result", JSON.stringify(data));
    router.push("/resultado");
  }

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[#0a0a0c]">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        <p className="text-slate-400 text-sm tracking-widest uppercase">
          Buscando o filme perfeito...
        </p>
      </main>
    );
  }

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen gap-6 p-8 bg-[#0a0a0c] overflow-hidden">
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-900/30 to-indigo-900/20 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center gap-6 w-full max-w-md">
        {/* Progress */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between text-[15px] text-slate-600 tracking-widest uppercase">
            <span>
              Pergunta {step + 1} de {questions.length}
            </span>
            {isExtraStep && (
              <span className="text-purple-400/60">Opcional</span>
            )}
          </div>
          <div className="w-full h-[4px] bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${((step + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Pergunta */}
        <h1 className="text-[28px] font-semibold text-center text-slate-100 leading-snug">
          {current.question}
        </h1>

        {/* Opções ou textarea */}
        {isExtraStep ? (
          <textarea
            className="w-full  border border-white/10 rounded-xl p-4 bg-white/[0.02] text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-purple-500/40 transition resize-none backdrop-blur-md"
            rows={4}
            placeholder="Ex: quero algo que me surpreenda no final, nada muito violento..."
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
          />
        ) : (
          <div className="flex flex-col gap-2 w-full">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className={`px-4 py-3 rounded-xl text-sm text-left border transition-all duration-300 backdrop-blur-md ${
                  selected === option
                    ? "bg-purple-500/20 border-purple-500/50 text-purple-200"
                    : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-purple-500/30 hover:text-slate-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Botão avançar */}
        <button
          onClick={handleNext}
          disabled={!isExtraStep && !selected}
          className="w-full group relative inline-flex items-center justify-center gap-3 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-white/[0.04] border border-white/10 hover:border-purple-500/40 text-slate-200 hover:text-white backdrop-blur-md hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 overflow-hidden disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span>{isLastQuestion ? "Encontrar meu filme" : "Próxima"}</span>
          <svg
            className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300 text-slate-400 group-hover:text-purple-300"
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
          onClick={() =>
            step === 0 ? router.push("/home") : setStep(step - 1)
          }
          className="text-slate-100 text-xs hover:text-slate-500 transition tracking-widest uppercase"
        >
          ← Voltar para home
        </button>
      </div>
    </main>
  );
}
