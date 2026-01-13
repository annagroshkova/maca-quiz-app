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
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);

  const handleAnswerClick = (answer: string) => {
    // Om man redan har svarat, gör ingenting (lås knapparna)
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

  // // En enkel funktion för att nollställa testet
  // const resetTest = () => {
  //   fetchQuestion();
  // };

  const fetchQuestion = async () => {
    setLoading(true);
    setSelectedAnswer(null);
    try {
      const response = await fetch(`${baseUrl}/questions?${params.toString()}`);
      const data: ApiResponse = await response.json();
      const q = data[0]!;

      setQuestion({
        question: q.question.text,
        correctAnswer: q.correctAnswer,
        allAnswers: [...q.incorrectAnswers, q.correctAnswer].sort(
          () => Math.random() - 0.5
        ),
        difficulty: q.difficulty,
      });
    } catch (error) {
      console.error("Error fetching question:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleNextStep = () => {
    if (lives === 0) {
      finalizeGame();
      navigate("/gameover");
    } else {
      fetchQuestion();
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

        {/* Frågan */}
        {loading || !question ? (
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

            {/* Svarsalternativ */}
            <Flex direction="column" gap="3">
              <AnimatePresence>
                <Flex direction="column" gap="3">
                  {question.allAnswers.map((answer, index) => {
                    // --- BESTÄM KNAPPENS TILLSTÅND ---
                    let buttonState:
                      | "idle"
                      | "correct"
                      | "incorrect"
                      | "idle-round-over" = "idle";

                    // Om användaren har valt ett svar (rundan är "över" för denna fråga)
                    if (selectedAnswer) {
                      // Fall 1: Användaren klickade på DENNA knapp
                      if (answer === selectedAnswer) {
                        if (answer === question.correctAnswer) {
                          buttonState = "correct"; // Valde rätt -> Grön/Väx
                        } else {
                          buttonState = "incorrect"; // Valde fel -> Dyster ballong
                        }
                      }
                      // Fall 2: Användaren klickade INTE på denna knapp
                      else {
                        // Vi avslöjar inte svaret. Alla andra blir gråa och backar.
                        buttonState = "idle-round-over";
                      }
                    }

                    return (
                      <AnswerButton
                        key={answer}
                        index={index}
                        answerText={answer}
                        state={buttonState}
                        onClick={() => handleAnswerClick(answer)}
                        disabled={!!selectedAnswer} // Inaktivera knapparna om vi valt ett svar
                      />
                    );
                  })}
                </Flex>
              </AnimatePresence>
            </Flex>

            {/* Reset-knapp (visas bara när man svarat) */}
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
