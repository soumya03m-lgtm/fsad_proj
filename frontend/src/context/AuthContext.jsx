import { createContext, useEffect, useMemo, useState } from 'react';

export const AuthContext = createContext(null);

function normalizeRole(value) {
  const role = value?.toLowerCase();
  if (role === 'admin' || role === 'student') {
    return role;
  }
  return null;
}

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => normalizeRole(localStorage.getItem('role')));
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') || 'null');
    if (!savedUser) return null;
    return { ...savedUser, role: normalizeRole(savedUser.role) || normalizeRole(localStorage.getItem('role')) };
  });
  const [loading, setLoading] = useState(false);
  const [bootstrapping] = useState(false);

  useEffect(() => {
    if (!role) {
      setUser(null);
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      return;
    }
    localStorage.setItem('role', role);
    setUser((prev) => (prev ? { ...prev, role } : prev));
  }, [role]);

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
      const email = payload?.email?.trim() || '';
      const selectedRole = email.toLowerCase().includes('admin') ? 'admin' : 'student';
      const mockUser = {
        name: payload?.name?.trim() || (selectedRole === 'admin' ? 'Admin User' : 'Student User'),
        email,
        role: selectedRole
      };

      localStorage.setItem('role', selectedRole);
      setRole(selectedRole);
      setUser(mockUser);
      return { user: mockUser };
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    return login(payload);
  };

  const logout = async () => {
    localStorage.clear();
    setRole(null);
    setUser(null);
    window.location.assign('/');
  };

  const updateUser = (patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const value = useMemo(
    () => ({ role, user, loading, bootstrapping, isAuthenticated: Boolean(role), login, register, logout, updateUser }),
    [role, user, loading, bootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
