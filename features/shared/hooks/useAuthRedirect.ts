import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/auth-context";

export function useAuthRedirect(redirectTo = "/login") {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectTo);
    }
  }, [loading, router, redirectTo, user]);
}
