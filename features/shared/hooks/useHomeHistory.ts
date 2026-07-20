"use client";

import { useAuth } from "@/app/lib/auth-context";
import { useCallback, useEffect, useState } from "react";
import {
  fetchHistory,
  updateHistoryAction,
  type HistoryActionType,
} from "@/features/shared/services/history";
import type { HistoryItem } from "@/features/shared/types/history";

export function useHomeHistory() {
  const { session } = useAuth();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  const refreshHistory = useCallback(async () => {
    if (!session?.access_token) {
      setLoadingHistory(false);
      return;
    }

    setLoadingHistory(true);

    try {
      const nextHistory = await fetchHistory(session.access_token);
      setHistory(nextHistory);
    } finally {
      setLoadingHistory(false);
    }
  }, [session?.access_token]);

  useEffect(() => {
    void refreshHistory();

    const handleFocus = () => {
      void refreshHistory();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshHistory]);

  const handleAction = useCallback(
    async (id: string, type: HistoryActionType, current: HistoryItem) => {
      if (!session?.access_token) {
        return;
      }

      const updated = await updateHistoryAction(
        session.access_token,
        id,
        type,
        current,
      );

      setHistory((prev) =>
        prev.map((item) => (item.id === id ? updated : item)),
      );
    },
    [session?.access_token],
  );

  return {
    history,
    loadingHistory,
    setHistory,
    handleAction,
    refreshHistory,
  };
}
