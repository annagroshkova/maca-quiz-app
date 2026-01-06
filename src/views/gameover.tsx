import { useNavigate } from "react-router-dom";

export default function GameOver() {
    const navigate = useNavigate();

    const handleRetry = () => {
    navigate("/quiz");
  };
  return (
    <section className="startpage">
      <h1 className="startpage__headning">ya done goofed now</h1>
      <button type='submit' onClick={handleRetry}>Retry?</button>
    </section>
  );
}
