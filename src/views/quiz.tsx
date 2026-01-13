import { useState, useEffect } from "react";
import { Container, Flex, Card, Text } from "@radix-ui/themes";
import { AnswerButton } from "../components/AnswerButton";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { getUserSettings, updateUserSettings } from "../userSettings";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import Header from "../components/Header/Header";

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

interface QuizQuestion {
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
  const params = new URLSearchParams({
    categories: user.category ?? "",
    limit: "1",
  });

  if (user.level !== undefined) {
    params.append("difficulties", user.level);
  }

  const navigate = useNavigate();

  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [questionQueue, setQuestionQueue] = useState<QuizQuestion[]>([]);
  const [isFetching, setIsFetching] = useState(false);

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
    } else {
      setLives((lostLife) => lostLife - 1);
    }
  };

  const fetchQuestion = async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const currentParams = new URLSearchParams(params);
      currentParams.set("limit", questionBatch.toString());

      const response = await fetch(
        `${baseUrl}/questions?${currentParams.toString()}`
      );
      const data: ApiResponse = await response.json();

      const validQuestions: QuizQuestion[] = data
        .map((q) => ({
          question: q.question.text,
          correctAnswer: q.correctAnswer,
          allAnswers: [...q.incorrectAnswers, q.correctAnswer].sort(
            () => Math.random() - 0.5
          ),
          difficulty: q.difficulty,
        }))
        .filter((q) => {
          return !q.allAnswers.some((ans) => ans.length > maxAnswerLength);
        });

      if (validQuestions.length === 0) {
        setIsFetching(false);
        fetchQuestion();
        return;
      }

      setQuestionQueue((prev) => {
        const newQueue = [...prev, ...validQuestions];
        return newQueue;
      });
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setIsFetching(false);
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
    }
  }, [questionQueue, question]);

  const handleNextStep = () => {
    if (lives === 0) {
      finalizeGame();
      setTimeout(() => navigate("/gameover"), 300);
    } else {
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
    }
  };

  const finalizeGame = () => {
    const user = getUserSettings();
    const lastScore = score;
    const bestScore = Math.max(user.bestScore ?? 0, score);
    updateUserSettings({
      lastScore,
      bestScore,
    });
  };

  return (
    <Container
      p="4"
      style={{ maxWidth: "95vw", marginTop: "2rem", marginBottom: "2rem" }}
    >
      <Header />
      <Flex direction="column" gap="5">
        <Flex justify="between" align="center" style={{ padding: "0 10px" }}>
          <Text size="5" weight="bold">
            Score: {score}
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

        {!question ? (
          <Text size="5" weight="bold">
            Loading question...
          </Text>
        ) : (
          <>
            <Card style={{ padding: "30px", textAlign: "center" }}>
              <Text size="5" weight="bold">
                {question.question}
              </Text>
            </Card>

            <Flex direction="column" gap="3">
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

            <SubmitButton
              onClick={handleNextStep}
              disabled={!selectedAnswer}
              color={lives === 0 ? "ruby" : "indigo"}
            >
              {lives === 0 ? "Game Over" : "Next Question"}
            </SubmitButton>
          </>
        )}
      </Flex>
    </Container>
  );
}
