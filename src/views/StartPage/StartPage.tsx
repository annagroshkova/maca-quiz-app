import { updateUserSettings } from "../../userSettings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      return; //stoppar om det inte finns ett namn
    }
    updateUserSettings({ name });
    setName("");
    navigate("/quiz");
  };

  return (
    <section className='startpage'>
      <h1 className='startpage__headning'>Quizzie</h1>
      <form className='startpage__form' onSubmit={handleNameSubmit}>
        <label htmlFor='name'>Enter your name to start!</label>
        <input
          id='name'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
          placeholder='Write your name...'
        ></input>
        {/* knapp disabled om det inte finns ett namn */}
        <button type='submit' disabled={!name}>
          Let's begin!
        </button>
      </form>
    </section>
  );
}
