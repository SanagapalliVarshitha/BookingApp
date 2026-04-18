import { createContext, useContext, useState, useEffect } from "react";
type User = { token: string; role: string; name: string; };
type AuthContextType = { user: User | null; login: (data: User) => void; logout: () => void; };
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("cinebook_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);
  const login = (data: User) => { setUser(data); localStorage.setItem("cinebook_user", JSON.stringify(data)); };
  const logout = () => { setUser(null); localStorage.removeItem("cinebook_user"); };
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);
