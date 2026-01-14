import { createContext, useContext, useState, useEffect } from "react";
import { getUserSettings, updateUserSettings } from "../userSettings";

interface User {
  name?: string;
  lastScore?: number;
  bestScore?: number;
}

interface UserContextType {
  user: User;
  setUserName: (name: string) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(getUserSettings() || {});
  useEffect(() => {
    const handleStorageChange = () => {
      const freshData = getUserSettings();
      if (!freshData) {
        setUser({}); // Reset state if storage was cleared
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const setUserName = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setUser((prevUser) => {
      const updatedUser: User = {
        name: trimmedName,
        lastScore: user.lastScore ?? 0,
        bestScore: user.bestScore ?? 0,
      };
      updateUserSettings(updatedUser);
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUserName }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
