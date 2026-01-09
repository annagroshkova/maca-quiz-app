import { useNavigate } from "react-router-dom";
import { getUserSettings } from "../userSettings";
import SubmitButton from "../components/SubmitButton/SubmitButton";

export default function GameOver() {
  const user = getUserSettings();
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/quiz");
  };
  const handleProfile = () => {
    navigate("/userProfile");
  };
  const handleSettings = () => {
    navigate("/quiz-settings");
  };
  return (
    <section className="startpage">
      <h1 className="startpage__headning">ya done goofed now</h1>
      <h3>Score: {user.lastScore}</h3>
      <h3>Best Score: {user.bestScore}</h3>
      <SubmitButton onClick={handleProfile}>Change name</SubmitButton>
      <SubmitButton onClick={handleSettings}>Change difficulty</SubmitButton>
      <SubmitButton onClick={handleRetry} color="indigo">
        Retry?
      </SubmitButton>
    </section>
  );
}
