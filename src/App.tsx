import type { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import StartPage from "./views/StartPage/StartPage";
import Categories from "./views/Categories/Categories";
import Levels from "./views/Levels/Levels";
import Quiz from "./views/Quiz/Quiz";
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
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/gameover' element={<GameOver />} />
      </Routes>
    </BrowserRouter>
  );
}
