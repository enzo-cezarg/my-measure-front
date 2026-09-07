import { createContext, useEffect, useState, type ReactNode } from 'react';
import { api, setUnauthorizedHandler } from '../api/client';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  status: 'carregando' | 'autenticado' | 'nao-autenticado';
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'carregando' | 'autenticado' | 'nao-autenticado'>(
    'carregando',
  );

  async function refreshUser() {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data);
      setStatus('autenticado');
    } catch {
      setUser(null);
      setStatus('nao-autenticado');
    }
  }

  useEffect(() => {
    refreshUser();

    setUnauthorizedHandler(() => {
      setUser(null);
      setStatus('nao-autenticado');
    });
  }, []);

  async function logout() {
    await api.post('/auth/logout');
    setUser(null);
    setStatus('nao-autenticado');
  }

  return (
    <AuthContext.Provider value={{ user, status, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}