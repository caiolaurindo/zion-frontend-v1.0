import type { HistoryItem } from "@/features/shared/types/history";

export type HistoryActionType = "like" | "dislike" | "watched";

export async function fetchHistory(accessToken: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error("Não foi possível carregar o histórico.");
  }

  return (await response.json()) as HistoryItem[];
}

export async function updateHistoryAction(
  accessToken: string,
  id: string,
  type: HistoryActionType,
  current: HistoryItem,
) {
  if (type === "like" || type === "dislike") {
    const value = type === "like" ? true : false;
    const newLiked = current.liked === value ? null : value;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}/like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ liked: newLiked }),
    });

    return {
      ...current,
      liked: newLiked,
    } satisfies HistoryItem;
  }

  const newWatched = !current.watched;

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}/watched`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ watched: newWatched }),
  });

  return {
    ...current,
    watched: newWatched,
  } satisfies HistoryItem;
}
