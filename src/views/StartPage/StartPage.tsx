import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function StartPage() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate("/quiz");
  };

  return (
    <section className="startpage">
      <h1 className="startpage__headning">Quizzie</h1>
      <form className="startpage__form" onSubmit={handleSubmit}>
        <label htmlFor='name'>Skriv ditt namn</label>
        <input id='name' type='text'></input>
        <button type='submit'>Låt oss spela!</button>
      </form>
    </section>
  );
}
