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

  const goToLevels = () => {
    navigate("/levels");
  };
  const goToCategory = () => {
    navigate("/categories");
  };
  const goToRules = () => {
    navigate("/rules");
  };
  const goBack = (fallback: string = "/") => {
    if (globalThis.history.length > 1) {
      navigate(-1);
    } else {
      navigate(fallback);
    }
  };

  return {
    restartQuiz,
    goToProfile,
    goToSettings,
    returnToQuiz,
    goToCategory,
    goToLevels,
    goBack,
    goToRules,
  };
}
