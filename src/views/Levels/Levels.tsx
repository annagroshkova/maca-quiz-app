import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import {
  type UserSettings,
  getUserSettings,
  updateUserSettings,
} from "../../userSettings";
import { type Category, categories, levels } from "../../data";
import RadioOption from "../../components/RadioOption/RadioOption";
import Header from "../../components/Header/Header";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import MainWrapper from "../MainWrapper";
import { useQuiz } from "../../context/QuizContext";

export default function Levels() {
  const user: UserSettings = getUserSettings();
  const navigate = useNavigate();
  const { goToSettings } = useQuizNavigation();
  const { modifierHotStreak, setModifierHotStreak } = useQuiz();
  const { modifierSurvivor, setModifierSurvivor } = useQuiz();
  const { modifierTimeLimit, setModifierTimeLimit } = useQuiz();


  const [level, setLevel] = useState<
    "easy" | "medium" | "hard" | undefined | null
  >(null);

  const chosenCategory: string = user.category!;

  const categoryObj: Category = categories.find(
    (cat) => cat.apiQuery === chosenCategory,
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
      <Header
        backButton={true}
        backButtonProps={{
          onClick: goToSettings,
          children: (
            <img
              src="go-back-icon-192-solid.svg"
              alt="Go back icon"
              style={{ height: "100%" }}
            />
          ),
        }}
      />

      <MainWrapper>
        <div className="levels">
          <div className="levels__category-container">
            {/* <div className='levels__image-container'> */}
            <img
              src={`${categoryObj.apiQuery}.png`}
              alt={categoryObj.quizSubject}
              className="levels__category-image"
            />
            {/* </div> */}

            <p className="levels__category-name">{categoryObj.quizSubject}</p>
          </div>

          <div className="levels__modifiers-container">
            <button
              type="button"
              className={`modifierButton ${modifierHotStreak ? "active" : ""}`}
              onClick={() => setModifierHotStreak(!modifierHotStreak)}
            >
              Hot Streak
            </button>
            <button
              type="button"
              className={`modifierButton ${modifierSurvivor ? "active" : ""}`}
              onClick={() => setModifierSurvivor(!modifierSurvivor)}
            >
              Survivor
            </button>
            <button
              type="button"
              className={`modifierButton ${modifierTimeLimit ? "active" : ""}`}
              onClick={() => setModifierTimeLimit(!modifierTimeLimit)}
            >
              Time Limit
            </button>
          </div>

          <form className="levels__form" onSubmit={handleLevelsSubmit}>
            <fieldset className="levels__fieldset">
              <legend>Choose your level</legend>
              <div className="levels-container">
                {levels.map((l) => (
                  <RadioOption
                    key={l.level}
                    name="level"
                    text={l.level}
                    value={l.apiQuery}
                    onChange={() => setLevel(l.apiQuery)}
                    checked={level === l.apiQuery}
                  />
                ))}
              </div>
            </fieldset>
            <SubmitButton disabled={level === null}>
              <span>Let's play!</span>
            </SubmitButton>
          </form>
        </div>
      </MainWrapper>
    </>
  );
}
