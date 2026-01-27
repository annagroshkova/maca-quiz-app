import { useState, useEffect } from "react";
import { Flex, Card, Text } from "@radix-ui/themes";
import { AnswerButton } from "../../components/AnswerButton/AnswerButton";
import { AnimatePresence, motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { getUserSettings, updateUserSettings } from "../../userSettings";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Header from "../../components/Header/Header";
import { useQuiz } from "../../context/QuizContext";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import "./Quiz.css";
import MainWrapper from "../MainWrapper";

type ApiResponse = ApiQuestion[];

interface ApiQuestion {
  correctAnswer: string;
  incorrectAnswers: string[];
  tags: string[];
  category: string;
  difficulty: string;
  question: {
    text: string;
  };
}

export interface QuizQuestion {
  question: string;
  correctAnswer: string;
  allAnswers: string[];
  difficulty: string;
}

const maxAnswerLength = 150;
const questionBatch = 10;
const prefetchThreshold = 3;

export default function Quiz() {
  const baseUrl = "https://the-trivia-api.com/v2";
  const user = getUserSettings();
  const { usedQuestions, setUsedQuestions } = useQuiz();
  const params = new URLSearchParams({
    categories: user.category ?? "",
  });

  if (user.level !== undefined) {
    params.append("difficulties", user.level);
  }

  const navigate = useNavigate();
  const { goToSettings } = useQuizNavigation();
  const { resetQuiz } = useQuiz();
  const [questionQueue, setQuestionQueue] = useState<QuizQuestion[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(10);
  const [shieldFeedback, setShieldFeedback] = useState<boolean>(false);
  const [disabledAnswers, setDisabledAnswers] = useState<string[]>([]);

  const {
    question,
    selectedAnswer,
    score,
    lives,
    //correctAnswersStreak,

    // lastRewardedLifeCount,
    setQuestion,
    setSelectedAnswer,
    setScore,
    setLives,
    setCorrectAnswersStreak,

    // setLastRewardedLifeCount,
    modifierHotStreak,
    modifierSurvivor,
    modifierTimeLimit,
    powerUpHintActive,
    powerUpHintUsed,
    powerUpShieldActive,
    powerUpShieldUsed,
    powerUpSkipActive,
    powerUpSkipUsed,
    setPowerUpHintActive,
    setPowerUpHintUsed,
    setPowerUpShieldActive,
    setPowerUpShieldUsed,
    setPowerUpSkipActive,
    setPowerUpSkipUsed,
  } = useQuiz();

  useEffect(() => {
    if (!modifierTimeLimit || !question || selectedAnswer || powerUpSkipActive)
      return;

    setTimeLeft(10);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [modifierTimeLimit, question, selectedAnswer, powerUpSkipActive]);

  useEffect(() => {
    if (timeLeft === 0 && question && modifierTimeLimit) {
      setSelectedAnswer("TIMEOUT");
      if (powerUpShieldActive) {
        setPowerUpShieldActive(false);
        setPowerUpShieldUsed(true);
      } else {
        setLives((prev) => prev - 1);
      }
      setCorrectAnswersStreak(0);
    }
  }, [timeLeft]);
  useEffect(() => {
    if (!question) return;
    setDisabledAnswers([]);
    setPowerUpHintActive(false);
    setPowerUpSkipActive(false);
  }, [question]);

  useEffect(() => {
    setQuestion(null);
    setQuestionQueue([]);
    setUsedQuestions(new Set());
    setLives(3);
    setScore(0);
  }, [user.category, user.level]);

  const activateHint = () => {
    if (!question) return;
    if (powerUpHintUsed || powerUpHintActive) return;
    if (selectedAnswer) return;

    const wrongAnswers = question.allAnswers.filter(
      (answer) => answer !== question.correctAnswer,
    );
    const answersToDisable = wrongAnswers
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    setDisabledAnswers(answersToDisable);
    setPowerUpHintActive(true);
    setPowerUpHintUsed(true);
  };

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === question?.correctAnswer) {
      setCorrectAnswersStreak((prevStreak) => {
        let newStreak = prevStreak + 1;

        let scorePoint = 1;
        if (question.difficulty === "medium") {
          scorePoint = 2;
        } else if (question.difficulty === "hard") {
          scorePoint = 3;
        }

        if (modifierHotStreak && newStreak >= 5) {
          const multiplier = Math.pow(2, Math.floor(newStreak / 5));
          scorePoint *= multiplier;
        }

        setScore((prevScore) => prevScore + scorePoint);
        if (modifierSurvivor) {
          if (newStreak > 0 && newStreak % 3 === 0) {
            setLives((prev) => (prev < 3 ? prev + 1 : prev));
          }
        }

        // const rewardLifeEarned = Math.floor(newStreak / 10);
        // if (rewardLifeEarned > lastRewardedLifeCount) {
        //   setLives((prev) => prev + 1);
        //   setLastRewardedLifeCount(rewardLifeEarned);
        // }

        return newStreak;
      });
    } else {
      if (powerUpShieldActive) {
        setPowerUpShieldActive(false);
        setPowerUpShieldUsed(true);
        setShieldFeedback(true);
        setTimeout(() => setShieldFeedback(false), 1200);
      } else {
        setLives((lostLife) => lostLife - 1);
      }

      setCorrectAnswersStreak(0);
    }
  };

  const fetchQuestion = async (retryCount = 0) => {
    if (retryCount>3) {
      return;
    }
    try {
      const currentParams = new URLSearchParams(params);
      currentParams.set("limit", questionBatch.toString());

      const response = await fetch(
        `${baseUrl}/questions?${currentParams.toString()}`,
      );
      const data: ApiResponse = await response.json();

      const currentUsed = new Set([
        ...usedQuestions,
        ...questionQueue.map((q) => q.question),
      ]);

      const validQuestions: QuizQuestion[] = data
        .map((q) => ({
          question: q.question.text,
          correctAnswer: q.correctAnswer,
          allAnswers: [...q.incorrectAnswers, q.correctAnswer].sort(
            () => Math.random() - 0.5,
          ),
          difficulty: q.difficulty,
        }))
        .filter(
          (q) => !q.allAnswers.some((ans) => ans.length > maxAnswerLength),
        )
        .filter((q) => !currentUsed.has(q.question));

      if (validQuestions.length === 0) {
        fetchQuestion(retryCount + 1);
        return;
      }

      setQuestionQueue((prev) => [...prev, ...validQuestions]);

      setUsedQuestions((prevSet) => {
          const updatedSet = new Set(prevSet);
          validQuestions.forEach((q) => updatedSet.add(q.question));
          return updatedSet;
        });

    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (!question && questionQueue.length > 0) {
      const [nextQ, ...rest] = questionQueue;
      setQuestion(nextQ);
      setQuestionQueue(rest);

      setUsedQuestions((prev) => new Set(prev).add(nextQ.question));
    }
  }, [questionQueue, question]);

  const handleNextStep = () => {
    if (lives === 0) {
      finalizeGame();
      navigate("/gameover");
    }

    setSelectedAnswer(null);

    if (questionQueue.length > 0) {
      const [nextQuestion, ...restQueue] = questionQueue;
      setQuestion(nextQuestion);
      setQuestionQueue(restQueue);

      if (restQueue.length < prefetchThreshold) {
        fetchQuestion();
      }
    } else {
      fetchQuestion();
    }
    console.log(usedQuestions);
  };

  const finalizeGame = () => {
    const user = getUserSettings();
    const lastScore = score;
    const bestScore = Math.max(user.bestScore ?? 0, score);
    updateUserSettings({
      lastScore,
      bestScore,
    });
    setLives(3);
    setScore(0);
    setPowerUpShieldActive(false);
    setPowerUpShieldUsed(false);
    setPowerUpHintActive(false);
    setPowerUpHintUsed(false);
    setPowerUpSkipActive(false);
    setPowerUpSkipUsed(false);
    setCorrectAnswersStreak(0);
  };

  const activateSkip = () => {
    setPowerUpSkipActive(true);
    setPowerUpSkipUsed(true);
    setCorrectAnswersStreak(0);
  };

  return (
    <>
      <Header
        backButton={true}
        backButtonProps={{
          onClick: () => {
            resetQuiz();
            setQuestionQueue([]);
            goToSettings();
          },
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
        <motion.div
          className="shared-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Flex justify="between" align="center" className="quiz__header">
            <Flex direction="column">
              <h3 className="scoreText">SCORE</h3>
              <Flex justify="center" align="center">
                <img className="scoreIcon" alt="Star Icon" src="/star.png" />
                <div className="quiz__score-number">{score}</div>
              </Flex>
            </Flex>
            {modifierTimeLimit && (
              <Text size="5" weight="bold">
                <span className="quiz__score-number">{timeLeft}</span>
              </Text>
            )}
            <Flex direction="column">
              <h3 className="lifeText">LIFE</h3>
              <Flex>
                {[1, 2, 3].map((heartIndex) => {
                  const isLost = heartIndex <= 3 - lives;
                  return (
                    <img
                      key={heartIndex}
                      src={isLost ? "/greyheart.png" : "/redheart.png"}
                      alt={isLost ? "Lost Life" : "Life"}
                      className="lifeIcon"
                    />
                  );
                })}
              </Flex>
            </Flex>
          </Flex>
          {question && (
            <>
              <Card className="quiz__question-container">
                <h3 className="questionText">{question.question}</h3>
              </Card>

              <Flex direction="column" className="quiz__answers-container">
                <AnimatePresence>
                  <Flex direction="column" gap="3">
                    {question.allAnswers.map((answer, index) => {
                      const isDisabledByHint = disabledAnswers.includes(answer);

                      let buttonState:
                        | "idle"
                        | "correct"
                        | "incorrect"
                        | "idle-round-over"
                        | "passive" = "idle";

                      if (powerUpSkipActive) {
                        buttonState = "passive";
                      } else if (isDisabledByHint) {
                        buttonState = "passive";
                      } else if (selectedAnswer) {
                        if (answer === selectedAnswer) {
                          if (answer === question.correctAnswer) {
                            buttonState = "correct";
                          } else {
                            buttonState = "incorrect";
                          }
                        } else {
                          buttonState = "idle-round-over";
                        }
                      }

                      return (
                        <AnswerButton
                          key={`${question.question}-${answer}`}
                          index={index}
                          answerText={answer}
                          state={buttonState}
                          onClick={() => handleAnswerClick(answer)}
                          disabled={
                            !!selectedAnswer ||
                            isDisabledByHint ||
                            powerUpSkipActive
                          }
                        />
                      );
                    })}
                  </Flex>
                </AnimatePresence>
              </Flex>
              <Flex direction="column">
                <AnimatePresence>
                  {!selectedAnswer && !powerUpSkipActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginBottom: "1rem",
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        overflow: "hidden",
                        marginBottom: 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Flex
                        justify="center"
                        gap="5"
                        align="center"
                        className="quiz__powerups"
                      >
                        <button
                          className="powerUpButton"
                          disabled={powerUpShieldUsed || powerUpShieldActive}
                          onClick={() => setPowerUpShieldActive(true)}
                        >
                          <img
                            className="powerUpIcon"
                            alt="Shield Icon"
                            src="/shield.png"
                          />
                        </button>
                        <button
                          className="powerUpButton"
                          disabled={powerUpSkipUsed}
                          onClick={activateSkip}
                        >
                          <img
                            className="powerUpIcon"
                            alt="Skip Icon"
                            src="/next.png"
                          />
                        </button>
                        <button
                          className="powerUpButton"
                          disabled={powerUpHintUsed}
                          onClick={activateHint}
                        >
                          <img
                            className="powerUpIcon"
                            alt="Hint Icon"
                            src="/hint.png"
                          />
                        </button>
                      </Flex>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {shieldFeedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                      className="shield-feedback"
                    >
                      <img
                        src="/shield.png"
                        alt="Shield Icon"
                        className="powerUpIcon"
                      />{" "}
                      Shield Saved You!
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Reset-knapp (visas bara när man svarat) */}
                <AnimatePresence>
                  {/* {(selectedAnswer || timeLeft === 0 || powerUpSkipActive) && ( */}
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: 20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="quiz__footer">
                      <SubmitButton
                        onClick={handleNextStep}
                        disabled={!selectedAnswer && !powerUpSkipActive}
                        variant={lives === 0 ? "game-over" : "default"}
                      >
                        <span>
                          {lives === 0 ? "Game Over" : "Next Question"}
                        </span>
                      </SubmitButton>
                    </div>
                  </motion.div>
                  {/* )} */}
                </AnimatePresence>
              </Flex>
            </>
          )}
        </motion.div>
      </MainWrapper>
    </>
  );
}
