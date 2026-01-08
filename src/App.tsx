import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StartPage from "./views/StartPage/StartPage";
import Quiz from "./views/quiz";
import GameOver from "./views/gameover";
import UserProfile from "./views/UserProfile/UserProfile";

export default function App(): ReactNode {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/userProfile" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
