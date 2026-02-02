import Header from "../../components/Header/Header";
import { motion } from "motion/react";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import { asset } from "../../utils/asset";

export default function Rules() {
  const { goBack } = useQuizNavigation();
  return (
    <>
      <Header
        backButton
        backButtonProps={{
          onClick: () => goBack(),
        }}
      />
      <div className='rulesContainer'>
        <motion.div
          className='rulesInner shared-container'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className='rulesHeading'>Rules</h1>
          <div className='rulesChallenge'>
            <h3 className='rulesChallengeText'>
              Test your knowledge across a variety of topics! Can you get the
              highest score?
            </h3>
          </div>

          <div className='ruleCardContainer'>
            <div className='rulesBox'>
              <h2 className='rulesSmallHeadline'>How to Play</h2>
              <ul className='rulesList'>
                <li>Enter your name and press Let's Begin!</li>
                <li>
                  Answer each question by selecting one of the four options.
                </li>
                <li>Easy: +1 point • Medium: +2 points • Hard: +3 points</li>
                <li>Each incorrect answer costs one life.</li>
              </ul>
            </div>

            <div className='rulesBox'>
              <h2 className='rulesSmallHeadline'>Modifiers</h2>
              <div className='powerUpWrapper'>
                <div className='powerUpBox'>
                  <div className='powerUpHeadline'>
                    <img
                      className='rulesIcon'
                      alt='Fire Icon'
                      src={asset("fire.png")}
                    ></img>
                    <h3>Hot Streak</h3>
                  </div>
                  <p>
                    Stay sharp! 5 correct answers in a row boosts your score
                    multiplier (x2, x4, x8…)
                  </p>
                </div>
                <div className='powerUpBox'>
                  <div className='powerUpHeadline'>
                    <img
                      className='rulesIcon'
                      alt='Skull Icon'
                      src={asset("skull.png")}
                    ></img>

                    <h3>Survivor</h3>
                  </div>
                  <p>
                    One life. That’s it. Earn an extra life every 5 correct
                    answers — up to the usual 3.
                  </p>
                </div>
                <div className='powerUpBox'>
                  <div className='powerUpHeadline'>
                    <img
                      className='rulesIcon'
                      alt='Hourglass Icon'
                      src={asset("hourglass.png")}
                    ></img>
                    <h3>Time Limit</h3>
                  </div>
                  <p>
                    Think fast! You’ve got 10 seconds per question or you lose a
                    life.
                  </p>
                </div>
              </div>
            </div>

            <div className='rulesBox'>
              <h2 className='rulesSmallHeadline'>Power-Ups</h2>
              <div className='powerUpWrapper'>
                <div className='powerUpBox'>
                  <div className='powerUpHeadline'>
                    <img
                      alt='Shield Icon'
                      className='rulesIcon'
                      src={asset("shield.png")}
                    />
                    <h3>Shield</h3>
                  </div>
                  <p>Guess safely! No life lost if you get it wrong.</p>
                </div>
                <div className='powerUpBox'>
                  <div className='powerUpHeadline'>
                    <img
                      alt='Skip Icon'
                      className='rulesIcon'
                      src={asset("next.png")}
                    />
                    <h3>Skip</h3>
                  </div>
                  <p>Not feeling it? Jump straight to the next question.</p>
                </div>
                <div className='powerUpBox'>
                  <div className='powerUpHeadline'>
                    <img
                      alt='Hint Icon'
                      className='rulesIcon'
                      src={asset("hint.png")}
                    />
                    <h3>Hint</h3>
                  </div>
                  <p>
                    Narrow it down! Two wrong answers disappear, leaving just
                    two options.
                  </p>
                </div>
              </div>
            </div>

            <div className='rulesBox'>
              <h2 className='rulesSmallHeadline'>Tips & Tricks</h2>
              <ul className='rulesList'>
                <li>Focus on building streaks to maximize rewards.</li>
                <li>Hard questions give more points!</li>
                <li>
                  Keep an eye on your lives and plan your answers strategically.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
