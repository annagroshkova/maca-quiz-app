export interface UserSettings {
  name?: string;
  lastScore?: number;
  bestScore?: number;
  category?: string;
  level?: string;
}

const key = "userSettings";

export function updateUserSettings(part: Partial<UserSettings>): void {
  const userSettings = getUserSettings();
  localStorage.setItem(
    key,
    JSON.stringify({
      ...userSettings,
      ...part,
    })
  );
}

export function getUserSettings(): UserSettings {
  return JSON.parse(localStorage.getItem(key) || "null") || {};
}
