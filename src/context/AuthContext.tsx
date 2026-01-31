import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getMe } from '../api/api';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  refreshUser: async () => {} 
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const userData = await getMe();
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
    } catch {
      setUser(null);
      localStorage.removeItem('auth_user');
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const initAuth = async () => {
      // If we already have a user from localStorage, we don't strictly need to "load",
      // but we still want to fetch fresh data.
      // We can set loading to false immediately if we have cached data,
      // or keep it true if we want to wait for the verification.
      // To prevent flickering, we trust the cache initially and update in background.
      
      await refreshUser();
      if (isMounted) {
        setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [refreshUser]);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);