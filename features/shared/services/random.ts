export interface RandomRecommendationPayload {
  genre: string | null;
}

export async function submitRandomRecommendation(
  accessToken: string | undefined,
  payload: RandomRecommendationPayload,
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/quiz/random`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    throw new Error("Não foi possível sortear o filme.");
  }

  return (await response.json()) as Record<string, unknown>;
}
