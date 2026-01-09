import { createContext, useContext, useState } from "react";
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
  const [user, setUser] = useState<User>(getUserSettings());

  const setUserName = (name: string) => {
    updateUserSettings({ name });
    setUser((prev) => ({ ...prev, name }));
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
