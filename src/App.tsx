import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StartPage from "./views/StartPage/StartPage";
import Categories from "./views/Categories/Categories";
import Levels from "./views/Levels/Levels";
import Quiz from "./views/Quiz/Quiz";
import GameOver from "./views/Gameover/Gameover";
import UserProfile from "./views/UserProfile/UserProfile";
import Rules from "./views/Rules/Rules";
import BackgroundAnimated from "./components/BackgroundAnimated/BackgroundAnimated";

export default function App(): ReactNode {
  return (
    <BrowserRouter>
    <BackgroundAnimated />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/gameover" element={<GameOver />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </BrowserRouter>
  );
}
