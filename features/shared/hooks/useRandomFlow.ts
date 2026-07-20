"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";
import { submitRandomRecommendation } from "@/features/shared/services/random";

export function useRandomFlow() {
  const router = useRouter();
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(
    async (genre: string | null) => {
      setLoading(true);

      try {
        const data = await submitRandomRecommendation(session?.access_token, {
          genre,
        });

        localStorage.setItem("zion-random", JSON.stringify(data));
        router.push("/resultado-random");
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
