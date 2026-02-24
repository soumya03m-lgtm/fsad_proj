import { createContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/authService';
import { getAccessToken, setAccessToken } from '../services/apiClient';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getAccessToken());
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [loading, setLoading] = useState(false);
  const [bootstrapping, setBootstrapping] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function bootstrapSession() {
      try {
        const hasLocalToken = Boolean(getAccessToken());

        if (!hasLocalToken) {
          const refreshed = await authService.refresh();
          setAccessToken(refreshed.token);
          if (mounted) setToken(refreshed.token);
        }

        const profile = await authService.me();
        if (mounted) setUser(profile);
      } catch {
        setAccessToken(null);
        if (mounted) {
          setToken(null);
          setUser(null);
        }
      } finally {
        if (mounted) setBootstrapping(false);
      }
    }

    bootstrapSession();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    setAccessToken(token);
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.login(payload);
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await authService.register(payload);
      setToken(data.token);
      setUser(data.user);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const updateUser = (patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const value = useMemo(
    () => ({ token, user, loading, bootstrapping, isAuthenticated: Boolean(token), login, register, logout, updateUser }),
    [token, user, loading, bootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
