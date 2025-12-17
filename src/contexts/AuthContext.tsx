import React, { createContext, useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  role: "student" | "staff" | "admin";
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (id: string, password: string) => User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (id: string, password: string): User | null => {
    let mockUser: User | null = null;

    // Mock Credentials
    const ADMIN_ID = "ADM_001";
    const ADMIN_PASSWORD = "adminpass";

    // 1. Admin Check
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      mockUser = { id: ADMIN_ID, name: "Lidet Kebede (Admin)", role: "admin" };
    }
    // 2. Student/Staff Check (Simulated)
    else if (id !== ADMIN_ID) {
      // In a real app, you'd check a database here
      mockUser = { id, name: `User ${id}`, role: "student" };
    }

    if (mockUser) {
      setUser(mockUser);
      localStorage.setItem("auth_user", JSON.stringify(mockUser));
      return mockUser; // Return the user object so we can check the role!
    } else {
      return null; // Login failed
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
