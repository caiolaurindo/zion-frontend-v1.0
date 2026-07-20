"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { submitQuizRecommendation } from "@/features/shared/services/quiz";

export function useQuizFlow() {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (payload: Record<string, string>) => {
      setLoading(true);

      try {
        const data = await submitQuizRecommendation(
          session?.access_token,
          payload,
        );

        localStorage.setItem("zion-result", JSON.stringify(data));
        localStorage.setItem("zion-quiz-result", JSON.stringify(data));
        router.push("/resultado");
      } finally {
        setLoading(false);
      }
    },
    [router, session?.access_token],
  );

  return useMemo(
    () => ({
      loading,
      submit,
    }),
    [loading, submit],
  );
}
