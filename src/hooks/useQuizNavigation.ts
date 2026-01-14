import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export function useQuizNavigation() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

  const restartQuiz = () => {
    resetQuiz();
    navigate("/categories");
  };

  const goToProfile = () => {
    navigate("/userProfile");
  };

  const returnToQuiz = () => {
    navigate("/quiz");
  };

  const goToLevels = () => {
    navigate("/levels");
  };
  const goToCategory = () => {
    navigate("/categories");
  };

  return {
    restartQuiz,
    goToProfile,
    returnToQuiz,
    goToCategory,
    goToLevels,
  };
}
