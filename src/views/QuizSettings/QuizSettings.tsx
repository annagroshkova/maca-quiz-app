import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type UserSettings,
  getUserSettings,
  updateUserSettings,
} from "../../userSettings";
import { categories, levels } from "../../data";
import RadioOption from "../../components/RadioOption/RadioOption";

export default function QuizSettings() {
  const user: UserSettings = getUserSettings();
  const greeting: string = `Greetings, ${user.name}! Choose your options`;
  const navigate = useNavigate();

  const [category, setCategory] = useState<string | null>(null);
  const [level, setLevel] = useState<
    "easy" | "medium" | "hard" | undefined | null
  >(null);

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (category === null || level === null) {
      return;
    }
    updateUserSettings({ category, level });
    setLevel(null);
    setCategory(null);
    navigate("/quiz");
  };

  return (
    <section className='quiz-settings'>
      <p className='quiz-settings__greeting'>{greeting}</p>
      <form className='quiz-settings__form' onSubmit={handleSettingsSubmit}>
        <fieldset className='quiz-settings__categories'>
          <legend>Choose your level</legend>
          {levels.map((l) => (
            <RadioOption
              key={l.level}
              name='level'
              text={l.level}
              value={l.apiQuery}
              onChange={() => setLevel(l.apiQuery)}
              checked={level === l.apiQuery}
            />
          ))}
        </fieldset>

        <fieldset className='quiz-settings__categories'>
          <legend>Select a subject</legend>
          {categories.map((c) => (
            <RadioOption
              key={c.apiQuery}
              name='category'
              text={c.quizSubject}
              value={c.apiQuery}
              imageUrl={`${c.apiQuery}.png`}
              onChange={() => setCategory(c.apiQuery)}
              checked={category === c.apiQuery}
            />
          ))}
        </fieldset>
        <button type='submit' disabled={level === null || category === null}>
          Let's begin!
        </button>
      </form>
    </section>
  );
}
