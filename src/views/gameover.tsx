import { useNavigate } from "react-router-dom";
import { getUserSettings } from "../userSettings";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import { useQuiz } from "../context/QuizContext";

export default function GameOver() {
  const user = getUserSettings();
  const navigate = useNavigate();
  const { resetQuiz } = useQuiz();

  const handleRestart = () => {
    resetQuiz();
    navigate("/quiz-settings");
  };
  const handleProfile = () => {
    navigate("/userProfile");
  };

  return (
    <section className="startpage">
      <h1 className="startpage__headning">ya done goofed now</h1>
      <h3>Score: {user.lastScore}</h3>
      <h3>Best Score: {user.bestScore}</h3>
      <SubmitButton onClick={handleProfile}>Change name</SubmitButton>
      <SubmitButton onClick={handleRestart} color="indigo">
        Play Again!
      </SubmitButton>
    </section>
  );
}
