import { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  name: string;
  email: string;
  role: "student" | "teacher";
}
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  register: (
    email: string,
    password: string,
    role: "student" | "teacher"
  ) => void;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user").then((userStr) => {
      if (userStr) setUser(JSON.parse(userStr));
      setLoading(false);
    });
  }, []);
  function login(email: string, password: string) {
    const demoUser: User = {
      name: "Demo User",
      email,
      role: email.startsWith("t") ? "teacher" : "student",
    };
    setUser(demoUser);
    AsyncStorage.setItem("user", JSON.stringify(demoUser));
  }
  function register(
    email: string,
    password: string,
    role: "student" | "teacher"
  ) {
    const demoUser: User = { name: "Demo User", email, role };
    setUser(demoUser);
    AsyncStorage.setItem("user", JSON.stringify(demoUser));
  }
  function logout() {
    setUser(null);
    AsyncStorage.removeItem("user");
  }
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
