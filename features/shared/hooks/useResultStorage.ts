"use client";

import { useEffect, useMemo, useState } from "react";

export function useResultStorage<T>(storageKey: string) {
  const [data, setData] = useState<T | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);

    if (!raw) {
      setData(null);
      setIsReady(true);
      return;
    }

    try {
      setData(JSON.parse(raw) as T);
    } catch {
      setData(null);
    } finally {
      setIsReady(true);
    }
  }, [storageKey]);

  return useMemo(() => ({ data, isReady }), [data, isReady]);
}
