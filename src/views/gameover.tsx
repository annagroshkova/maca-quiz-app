import { useNavigate } from "react-router-dom";
import { getUserSettings } from "../userSettings";

export default function GameOver() {
  const user = getUserSettings();
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate("/quiz");
  };
  return (
    <section className='startpage'>
      <h1 className='startpage__headning'>ya done goofed now</h1>
      <h3>Score: {user.lastScore}</h3>
      <h3>Best Score: {user.bestScore}</h3>
      <button type='submit' onClick={handleRetry}>
        Retry?
      </button>
    </section>
  );
}
