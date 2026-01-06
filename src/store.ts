export interface UserInfo {
  name?: string;
  lastScore?: number;
  bestScore?: number;
}

const key = "userInfo";

export function saveUserInfo(user: UserInfo): void {
  localStorage.setItem(key, JSON.stringify(user));
}

export function getUserInfo(): UserInfo {
  return JSON.parse(localStorage.getItem(key) || "null") || {};
}
