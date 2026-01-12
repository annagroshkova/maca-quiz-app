import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export function useQuizNavigation() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

  const restartQuiz = () => {
    resetQuiz();
    navigate("/quiz-settings");
  };

  const goToProfile = () => {
    navigate("/userProfile");
  };

  const returnToQuiz = () => {
    navigate("/quiz");
  };

  return {
    restartQuiz,
    goToProfile,
    returnToQuiz,
  };
}
