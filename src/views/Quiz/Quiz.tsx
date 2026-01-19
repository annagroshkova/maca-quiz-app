import { useState, useEffect } from "react";
import { Flex, Card, Text } from "@radix-ui/themes";
import { AnswerButton } from "../../components/AnswerButton";
import { AnimatePresence } from "motion/react";
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

  const {
    question,
    selectedAnswer,
    score,
    lives,
    correctAnswersStreak,
    lastRewardedPointCount,
    lastRewardedLifeCount,
    setQuestion,
    setSelectedAnswer,
    setScore,
    setLives,
    setCorrectAnswersStreak,
    setLastRewardedPointCount,
    setLastRewardedLifeCount,
  } = useQuiz();

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer === question?.correctAnswer) {
      let scorePoint = 1;
      if (question.difficulty === "medium") {
        scorePoint = 2;
      } else if (question.difficulty === "hard") {
        scorePoint = 3;
      }
      setScore((prevScore) => prevScore + scorePoint);

      setCorrectAnswersStreak((prevStreak) => {
        let newStreak = prevStreak + 1;

        const rewardLifeEarned = Math.floor(newStreak / 10);
        if (rewardLifeEarned > lastRewardedLifeCount) {
          setLives((prev) => prev + 1);
          setLastRewardedLifeCount(rewardLifeEarned);
        }
        const rewardPointsEarned = Math.floor(newStreak / 5);
        if (rewardPointsEarned > lastRewardedPointCount) {
          setScore((prev) => prev + 10);
          setLastRewardedPointCount(rewardPointsEarned);
        }

        return newStreak;
      });
    } else {
      setLives((lostLife) => lostLife - 1);
      setCorrectAnswersStreak(0);
    }
  };

  const fetchQuestion = async () => {
    try {
      const currentParams = new URLSearchParams(params);
      currentParams.set("limit", questionBatch.toString());

      const response = await fetch(
        `${baseUrl}/questions?${currentParams.toString()}`,
      );
      const data: ApiResponse = await response.json();

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
        .filter((q) => !usedQuestions.has(q.question));

      if (validQuestions.length === 0) {
        fetchQuestion();
        return;
      }

      setQuestionQueue((prev) => {
        const newQueue = [...prev, ...validQuestions];
        return newQueue;
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
      setUsedQuestions((prev) => new Set(prev).add(nextQuestion.question));

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
  };

  return (
    <>
      <Header
        backButton={true}
        backButtonProps={{
          onClick: () => {
            setLives(3);
            setScore(0);
            resetQuiz();
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
            
        <Flex className='quiz__inner'>
          <Flex justify='between' align='center' style={{ padding: "0 10px" }}>
            <Text size='5' weight='bold'>
              Score: <span className='quiz__score-number'>{score}</span>
            </Text>

            <Flex gap="3">
              {[1, 2, 3].map((heartIndex) => (
                <Text
                  key={heartIndex}
                  size="6"
                  style={{ cursor: "default", userSelect: "none" }}
                >
                  {heartIndex <= 3 - lives ? "🖤" : "❤️"}
                </Text>
              ))}
            </Flex>
          </Flex>
          {question && (
            <>
              <Card className="quiz__question-container" style={{}}>
                <Text size="5" weight="bold">
                  {question.question}
                </Text>
              </Card>

              <Flex direction="column" className="quiz__answers-container">
                <AnimatePresence>
                  <Flex direction="column" gap="3">
                    {question.allAnswers.map((answer, index) => {
                      let buttonState:
                        | "idle"
                        | "correct"
                        | "incorrect"
                        | "idle-round-over" = "idle";

                      if (selectedAnswer) {
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
                          disabled={!!selectedAnswer}
                        />
                      );
                    })}
                  </Flex>
                </AnimatePresence>
              </Flex>

              {/* Reset-knapp (visas bara när man svarat) */}
              <SubmitButton onClick={handleNextStep} disabled={!selectedAnswer}>
                <span>{lives === 0 ? "Game Over" : "Next Question"}</span>
              </SubmitButton>
            </>
          )}
        </Flex>
      </MainWrapper>

    </>
  );
}
