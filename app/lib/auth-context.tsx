'use client';

import { createContext, useContext, useEffect, useState } from 'react';

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
    const rawSession = localStorage.getItem('zion-session');
    const rawUser = localStorage.getItem('zion-user');

    if (rawSession) {
      try {
        setSession(JSON.parse(rawSession) as AuthSession);
      } catch {
        localStorage.removeItem('zion-session');
      }
    }

    if (rawUser) {
      try {
        setUser(JSON.parse(rawUser) as AuthUser);
      } catch {
        localStorage.removeItem('zion-user');
      }
    }

    setLoading(false);
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