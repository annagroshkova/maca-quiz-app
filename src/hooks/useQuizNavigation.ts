import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function useQuizNavigation() {
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

  const restartQuiz = () => {
    resetQuiz();
    navigate("/categories");
  };

    const goToSettings = () => {
    navigate("/categories");
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
    goToSettings,
    returnToQuiz,
  };
}
