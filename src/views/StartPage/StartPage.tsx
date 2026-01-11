import {
  type UserSettings,
  updateUserSettings,
  getUserSettings,
} from "../../userSettings";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StartPage() {
  const navigate = useNavigate();
  const user: UserSettings = getUserSettings();
  console.log(user);
  const [name, setName] = useState("");

  // if (user.name) {
  //   navigate("/quiz-settings");
  // }

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      return; //stoppar om det inte finns ett namn
    }
    updateUserSettings({ name });
    setName("");
    navigate("/quiz-settings");
  };

  return (
    <section className='startpage'>
      <h1 className='startpage__headning'>Quizzie</h1>
      <div className='startpage__form-container'>
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
      </div>
    </section>
  );
}
