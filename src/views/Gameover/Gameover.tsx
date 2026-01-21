import { getUserSettings } from "../../userSettings";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

import useQuizNavigation from "../../hooks/useQuizNavigation";
import MainWrapper from "../MainWrapper";
import Header from "../../components/Header/Header";

export default function GameOver() {
  const user = getUserSettings();
  const { returnToQuiz, goToSettings } = useQuizNavigation();

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
        <section className="gameover">
          <h1 className="gameover__heading">You've done well</h1>
          <div className="gameover__score-container">
            <p className="gameover__score">
              Score: <span>{user.lastScore}</span>
            </p>
            <p className="gameover__score">
              Best Score: <span>{user.bestScore}</span>
            </p>
          </div>

          <div className="gameover__buttons-container">
            <SubmitButton onClick={goToSettings}>
              <span>Change settings</span>
            </SubmitButton>
            <SubmitButton onClick={returnToQuiz}>
              <span>Play again</span>
            </SubmitButton>
          </div>
        </section>
      </MainWrapper>
    </>
  );
}
