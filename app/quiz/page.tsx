'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../lib/auth-context';

const questions = [
  {
    id: 'mood',
    question: 'Como você tá se sentindo agora?',
    options: ['Ação', 'Romance', 'Terror', 'Comédia', 'Drama', 'Suspense'],
  },
  {
    id: 'duration',
    question: 'Quanto tempo você tem?',
    options: ['Menos de 1h30', 'Até 2h', 'Pode ser longo'],
  },
  {
    id: 'company',
    question: 'Vai assistir com quem?',
    options: ['Sozinho', 'Com alguém especial', 'Com a família', 'Com amigos'],
  },
  {
    id: 'era',
    question: 'Prefere de qual época?',
    options: ['Clássico (antes de 90)', 'Anos 90-2000', 'Anos 2010', 'Atual'],
  },
  {
    id: 'depth',
    question: 'Que tipo de experiência quer?',
    options: ['Entretenimento puro', 'Algo que faça pensar', 'Baseado em fatos reais'],
  },
  {
    id: 'origin',
    question: 'Alguma preferência de origem?',
    options: ['Não importa', 'Hollywood', 'Cinema europeu', 'Anime', 'Cinema latino'],
  },
];

export default function Quiz() {
  const router = useRouter();
  const { session } = useAuth();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [extra, setExtra] = useState('');
  const [loading, setLoading] = useState(false);

  const current = questions[step];
  const isLastQuestion = step === questions.length - 1;

  function handleOption(value: string) {
    const updated = { ...answers, [current.id]: value };
    setAnswers(updated);

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
      'Content-Type': 'application/json',
    };

    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz/recommend`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    localStorage.setItem('zion-result', JSON.stringify(data));
    router.push('/resultado');
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Buscando o filme perfeito pra você...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8">
      <p className="text-sm text-gray-400">{step + 1} de {questions.length}</p>
      <h1 className="text-2xl font-bold text-center">{current.question}</h1>

      <div className="flex flex-col gap-3 w-full max-w-md">
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOption(option)}
            className="border rounded-lg px-4 py-3 text-left hover:bg-gray-100 hover:text-black transition"
          >
            {option}
          </button>
        ))}
      </div>

      {isLastQuestion && (
        <div className="w-full max-w-md flex flex-col gap-2">
          <p className="text-sm text-gray-400">Quer adicionar algo? (opcional)</p>
          <textarea
            className="border rounded-lg p-3 w-full text-sm bg-transparent"
            rows={3}
            placeholder="Ex: quero algo que me surpreenda no final..."
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={() => router.push('/')}
        className="text-gray-400 text-sm hover:text-white transition"
      >
        ← Voltar
      </button>
    </main>
  );
}