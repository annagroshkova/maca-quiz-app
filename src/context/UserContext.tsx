import { createContext, useContext, useState, useEffect } from "react";
import { getUserSettings, updateUserSettings } from "../userSettings";

interface User {
  name?: string;
  lastScore?: number;
  bestScore?: number;
  bgColor?: string;
}

interface UserContextType {
  user: User;
  setUserName: (name: string) => void;
  setUserBgColor: (color: string) => void;
}

export const avatarColors = [
  "#7366d0",
  "#d08cd0",
  "#5aa2c9",
  "#e68ca7",
  "#f2b94c",
  "#68b783",
];
const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const savedUser = getUserSettings() || {};
    if (!savedUser.bgColor) {
      const randomColor =
        avatarColors[Math.floor(Math.random() * avatarColors.length)];

      const updatedUser = {
        ...savedUser,
        bgColor: randomColor,
      };
      return updatedUser;
    }
    return savedUser;
  });
  useEffect(() => {
    const handleStorageChange = () => {
      const freshData = getUserSettings();
      if (!freshData) {
        setUser({});
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
        ...prevUser,
        name: trimmedName,
        lastScore: prevUser.lastScore ?? 0,
        bestScore: prevUser.bestScore ?? 0,
      };
      updateUserSettings(updatedUser);
      return updatedUser;
    });
  };

  const setUserBgColor = (color: string) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, bgColor: color };
      updateUserSettings(updatedUser);
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUserName, setUserBgColor }}>
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
