import SubmitButton from "../../components/SubmitButton/SubmitButton";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import MainWrapper from "../MainWrapper";
import Header from "../../components/Header/Header";
import { useUser } from "../../context/UserContext";
import { motion } from "motion/react";

export default function GameOver() {
  const { user } = useUser();
  const { returnToQuiz, goToSettings } = useQuizNavigation();

  return (
    <>
      <Header
        backButton={true}
        backButtonProps={{
          onClick: goToSettings,
        }}
      />
      <MainWrapper>
        <motion.section
          className='gameover shared-container'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className='gameover__heading'>Game Over!</h1>
          <div className='gameover__score-container'>
            <p className='gameover__score'>
              Score: <span>{user.lastScore}</span>
            </p>
            <p className='gameover__score'>
              Best Score: <span>{user.bestScore}</span>
            </p>
          </div>

          <div className='gameover__buttons-container'>
            <SubmitButton onClick={goToSettings}>
              <span>Change settings</span>
            </SubmitButton>
            <SubmitButton onClick={returnToQuiz}>
              <span>Play again</span>
            </SubmitButton>
          </div>
        </motion.section>
      </MainWrapper>
    </>
  );
}
