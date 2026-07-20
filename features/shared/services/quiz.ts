export interface QuizRecommendationPayload {
  [key: string]: string;
}

export async function submitQuizRecommendation(
  accessToken: string | undefined,
  payload: QuizRecommendationPayload,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quiz/recommend`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error("Não foi possível gerar a recomendação.");
  }

  return (await response.json()) as Record<string, unknown>;
}
