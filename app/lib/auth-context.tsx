'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';

interface AuthUser {
  email?: string;
  name?: string;
}

interface AuthSession {
  access_token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: AuthSession | null;
  loading: boolean;
  signOut: () => Promise<void>;
  setAuth: (sessionData: AuthSession, userData: AuthUser) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadInitialAuth() {
      const rawSession = localStorage.getItem('zion-session');
      const rawUser = localStorage.getItem('zion-user');

      if (rawSession && rawUser) {
        try {
          setSession(JSON.parse(rawSession) as AuthSession);
          setUser(JSON.parse(rawUser) as AuthUser);
        } catch {
          localStorage.removeItem('zion-session');
          localStorage.removeItem('zion-user');
        }
      }

      try {
        const { data: urlData } = await supabase.auth.getSessionFromUrl();
        let sessionData = urlData?.session ?? null;

        if (!sessionData) {
          const { data } = await supabase.auth.getSession();
          sessionData = data?.session ?? null;
        }

        if (sessionData?.access_token) {
          const authUser: AuthUser = {
            email: sessionData.user.email ?? undefined,
            name:
              sessionData.user.user_metadata?.name ??
              sessionData.user.user_metadata?.full_name ??
              sessionData.user.email?.split('@')[0],
          };

          const authSession: AuthSession = {
            access_token: sessionData.access_token,
          };

          if (mounted) {
            setSession(authSession);
            setUser(authUser);
            localStorage.setItem('zion-session', JSON.stringify(authSession));
            localStorage.setItem('zion-user', JSON.stringify(authUser));
          }
        }
      } catch {
        // Ignore session restoration failures and keep the fallback behavior.
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadInitialAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sessionData) => {
      if (sessionData?.access_token) {
        const authUser: AuthUser = {
          email: sessionData.user.email ?? undefined,
          name:
            sessionData.user.user_metadata?.name ??
            sessionData.user.user_metadata?.full_name ??
            sessionData.user.email?.split('@')[0],
        };

        const authSession: AuthSession = {
          access_token: sessionData.access_token,
        };

        setSession(authSession);
        setUser(authUser);
        localStorage.setItem('zion-session', JSON.stringify(authSession));
        localStorage.setItem('zion-user', JSON.stringify(authUser));
        return;
      }

      localStorage.removeItem('zion-session');
      localStorage.removeItem('zion-user');
      setSession(null);
      setUser(null);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    localStorage.removeItem('zion-session');
    localStorage.removeItem('zion-user');
    setSession(null);
    setUser(null);
  }

  function setAuth(sessionData: AuthSession, userData: AuthUser) {
    localStorage.setItem('zion-session', JSON.stringify(sessionData));
    localStorage.setItem('zion-user', JSON.stringify(userData));
    setSession(sessionData);
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signOut, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);