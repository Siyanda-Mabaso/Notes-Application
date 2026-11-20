
import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/User";
import { getUsers, saveUsers } from "../services/userService";

interface AuthContextType {
  user: User | null;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => false,
  login: async () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Register a new user
  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const users = await getUsers();

    const existingUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    await saveUsers([...users, newUser]);

    setUser(newUser);

    return true;
  };

  // Login an existing user
  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const users = await getUsers();

    const foundUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    );

    if (!foundUser) {
      return false;
    }

    setUser(foundUser);

    return true;
  };

  // Logout user
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
