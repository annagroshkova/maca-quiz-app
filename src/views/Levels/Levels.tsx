import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type UserSettings,
  getUserSettings,
  updateUserSettings,
} from "../../userSettings";
import { type Category, categories, levels } from "../../data";
import RadioOption from "../../components/RadioOption/RadioOption";
import Header from "../../components/Header/Header";

export default function Levels() {
  const user: UserSettings = getUserSettings();
  const navigate = useNavigate();

  const [level, setLevel] = useState<
    "easy" | "medium" | "hard" | undefined | null
  >(null);

  const chosenCategory: string = user.category!;

  const categoryObj: Category = categories.find(
    (cat) => cat.apiQuery === chosenCategory
  )!;

  const handleLevelsSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (level === null) {
      return;
    }
    updateUserSettings({ level });
    setLevel(null);
    navigate("/quiz");
  };

  return (
    <>
      <Header />
      <section className='levels'>
        <div className='levels__category-container'>
          {/* <div className='levels__image-container'> */}
            <img
              src={`${categoryObj.apiQuery}.png`}
              alt={categoryObj.quizSubject}
              className='levels__category-image'
            />
          {/* </div> */}

          <p className='levels__category-name'>{categoryObj.quizSubject}</p>
        </div>

        <form className='levels__form' onSubmit={handleLevelsSubmit}>
          <fieldset className='levels__fieldset'>
            <legend>Choose your level</legend>
            <div className='levels-container'>
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
            </div>
          </fieldset>
          <button type='submit' disabled={level === null}>
            Let's begin!
          </button>
        </form>
      </section>
    </>
  );
}
