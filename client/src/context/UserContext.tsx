import React, { createContext, ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import { User } from "../types/general";

interface ContextValue {
  Login: (user: User) => void;
  Logout: () => void;
  user: User;
  isLoading: boolean;
}

export const UserContext = createContext<ContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const { Login, Logout, user, isLoading } = useAuth();
  return (
    <UserContext.Provider value={{ Login, Logout, user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
