import { getUserSettings } from "../userSettings";
import SubmitButton from "../components/SubmitButton/SubmitButton";

import useQuizNavigation  from "../hooks/useQuizNavigation";

export default function GameOver() {
  const user = getUserSettings();
  const { restartQuiz, goToProfile } = useQuizNavigation();

  return (
    <section className="startpage">
      <h1 className="startpage__headning">ya done goofed now</h1>
      <h3>Score: {user.lastScore}</h3>
      <h3>Best Score: {user.bestScore}</h3>
      <SubmitButton onClick={goToProfile}><span>Change name</span></SubmitButton>
      <SubmitButton onClick={restartQuiz}>
        <span>Play Again!</span>
      </SubmitButton>
    </section>
  );
}
