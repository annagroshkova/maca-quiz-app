import { createContext, useContext, useState } from "react";
import {
  getUserSettings,
  updateUserSettings,
  type User,
} from "../userSettings";

interface UserContextType {
  user: User;
  setUserName: (name: string) => void;
  setUserBgColor: (color: string) => void;
  setUserCategory: (category: string) => void;
  setUserLevel: (level: string) => void;
  updateScores: (score: number) => void;
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
  const [user, setUser] = useState<User>(getInitialUser);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const freshData = getUserSettings();
  //     if (!freshData) {
  //       setUser({});
  //     }
  //   };

  //   window.addEventListener("storage", handleStorageChange);
  //   return () => window.removeEventListener("storage", handleStorageChange);
  // }, []);

  const setUserName = (name: string) => {
    const trimmedName = name.trim();
    if (!trimmedName) return;

    setUser((prevUser) => {
      const updatedUser: User = {
        ...prevUser,
        name: trimmedName,
        // lastScore: prevUser.lastScore ?? 0,
        // bestScore: prevUser.bestScore ?? 0,
      };
      updateUserSettings(updatedUser);
      return updatedUser;
    });
  };

  const updateScores = (score: number) => {
    setUser((prevUser) => {
      const bestScore = Math.max(prevUser.bestScore ?? 0, score);
      const updatedUser: User = {
        ...prevUser,
        lastScore: score,
        bestScore,
      };
      updateUserSettings(updatedUser);
      return updatedUser;
    });
  };

  const patchUser = (prop: keyof User, value: string | number | undefined) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, [prop]: value };
      updateUserSettings(updatedUser);
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserName,
        setUserBgColor: (value) => patchUser("bgColor", value),
        setUserCategory: (value) => patchUser("category", value),
        setUserLevel: (value) => patchUser("level", value),
        updateScores,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function getInitialUser(): User {
  const user = getUserSettings();
  user.bgColor = user.bgColor || getRandomColor();
  return user;
}

function getRandomColor(): string {
  return avatarColors[Math.floor(Math.random() * avatarColors.length)];
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
