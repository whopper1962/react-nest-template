import { createContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  profileImage: string;
};

interface AuthContext {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContext);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/user");
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    await getCurrentUser();
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const authContextValue = {
    user,
    loading,
    refresh,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
