import { useState, useEffect } from "react";
import { Container, Flex, Card, Text, Button } from "@radix-ui/themes";
import { AnswerButton } from "../components/AnswerButton";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import "../App.css";

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
};


export default function Quiz() {
  const navigate = useNavigate();
  
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  
  const [lives, setLives] = useState(3);

  const handleAnswerClick = (answer: string) => {
    // Om man redan har svarat, gör ingenting (lås knapparna)
    if (selectedAnswer) return;

    setSelectedAnswer(answer);

    if (answer !== question?.correctAnswer) {
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
    const response = await fetch(
      "https://the-trivia-api.com/v2/questions?limit=1"
    );
    const data: ApiResponse = await response.json();
    const q = data[0]!;

    setQuestion({
      question: q.question.text,
      correctAnswer: q.correctAnswer,
      allAnswers: [...q.incorrectAnswers, q.correctAnswer].sort(
        () => Math.random() - 0.5
      ),
    });
  } catch (error){
      console.error("Error fetching question:", error);
  }
    setLoading(false);
  };
  
  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleNextStep = () => {
    if (lives === 0) {
      navigate ("/gameover");
    } else {
      fetchQuestion();
    }
  };

  return (
    <Container
      p='4'
      style={{ maxWidth: "95vw", marginTop: "2rem", marginBottom: "2rem" }}
    >
      <Flex direction='column' gap='5'>
        {/* Liv */}
        <Flex justify="end" gap="3" style={{padding: "0 10px"}}>
          {[1,2,3].map((heartIndex) => (
            <Text
              key={heartIndex}
              size='6'
              style={{cursor: "default", userSelect: "none"}}>
              {heartIndex <= (3 - lives) ? "🖤" : "❤️"}
            </Text>
          ))}
        </Flex>

        {/* Frågan */}
        {loading || !question ? (
          <Text size='5' weight='bold'>
            Loading question...
          </Text>
        ) : (
          <>
        <Card style={{ padding: "30px", textAlign: "center" }}>
          <Text size='5' weight='bold'>
            {question.question}
          </Text>
        </Card>

        {/* Svarsalternativ */}
        <Flex direction='column' gap='3'>
          <AnimatePresence>
            <Flex direction='column' gap='3'>
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
        {selectedAnswer && (
          <Button
            variant='solid'
            color={lives === 0 ? "ruby" : "indigo"}
            onClick={handleNextStep}
            style={{
              marginTop: "20px",
              cursor: "pointer",
              borderRadius: "9999px",
              padding: "1em 1.5em",
            }}
          >
            {lives === 0 ? "Game Over" : "Next Question"}
          </Button>
        )}
        </>
        )}
      </Flex>
    </Container>
  );
}
