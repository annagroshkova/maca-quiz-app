import type { ReactNode } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "./App.css";
import StartPage from "./views/StartPage/StartPage";
import Categories from "./views/Categories/Categories";
import Levels from "./views/Levels/Levels";
import Quiz from "./views/Quiz/Quiz";
import GameOver from "./views/Gameover/Gameover";
import UserProfile from "./views/UserProfile/UserProfile";
import Rules from "./views/Rules/Rules";
import BackgroundAnimated from "./components/BackgroundAnimated/BackgroundAnimated";
import { AnimatePresence } from "motion/react";
import { useUser } from "./context/UserContext";

const AnimatedRoutes = () => {
  const { user } = useUser();
  const location = useLocation();
  return (
    <AnimatePresence mode='wait' initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route
          path='/'
          element={
            !user.name ? (
              <Navigate to='/start' />
            ) : (
              <Navigate to='/categories' />
            )
          }
        />
        <Route path='/start' element={<StartPage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/levels' element={<Levels />} />
        <Route path='/quiz' element={<Quiz />} />
        <Route path='/userProfile' element={<UserProfile />} />
        <Route path='/gameover' element={<GameOver />} />
        <Route path='/rules' element={<Rules />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App(): ReactNode {
  return (
    <BrowserRouter>
      <BackgroundAnimated />
      <div className='app-content-wrapper'>
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
