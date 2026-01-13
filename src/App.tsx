import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StartPage from "./views/StartPage/StartPage";
import Categories from "./views/Categories/Categories";
import Levels from "./views/Levels/Levels"
import Quiz from "./views/quiz";
import QuizSettings from "./views/QuizSettings/QuizSettings";
import GameOver from "./views/gameover";
import UserProfile from "./views/UserProfile/UserProfile";

export default function App(): ReactNode {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartPage />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/levels' element={<Levels />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/quiz-settings' element={<QuizSettings />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/gameover' element={<GameOver />} />
        </Routes>
      </BrowserRouter>
  );
}
