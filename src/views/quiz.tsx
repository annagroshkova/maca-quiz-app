import { useState } from "react";
import { Container, Flex, Card, Text, Button } from "@radix-ui/themes";
import { AnswerButton } from "../assets/AnswerButton";
import { AnimatePresence } from "motion/react";
import "../App.css";

export default function Quiz() {
  const mockQuestion = {
    question: "Vilken färg får man om man blandar blått och gult?",
    correctAnswer: "Grön",
    // Vi skriver alternativen manuellt här så vi slipper blanda-funktionen just nu
    allAnswers: ["Lila", "Grön", "Orange", "Brun"] 
  };

  // 2. STATE (Bara det absolut nödvändigaste)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // 3. LOGIK
  const handleAnswerClick = (answer: string) => {
    // Om man redan har svarat, gör ingenting (lås knapparna)
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
  };

  // En enkel funktion för att nollställa testet
  const resetTest = () => {
    setSelectedAnswer(null);
  };

  return (
    <Container p="4" style={{ maxWidth: '95vw', marginTop: '2rem' ,marginBottom: '2rem'}}>
      <Flex direction="column" gap="5">
        
        {/* Frågan */}
        <Card  style={{ padding: '30px', textAlign: 'center' }}>
          <Text size="5" weight="bold">{mockQuestion.question}</Text>
        </Card>

        {/* Svarsalternativ */}
        <Flex direction="column" gap="3">
          <AnimatePresence>
            <Flex direction="column" gap="3">
              {mockQuestion.allAnswers.map((answer, index) => {
                
                // --- BESTÄM KNAPPENS TILLSTÅND ---
                let buttonState: "idle" | "correct" | "incorrect" | "idle-round-over" = "idle";
                
                // Om användaren har valt ett svar (rundan är "över" för denna fråga)
                if (selectedAnswer) {
                  // Fall 1: Användaren klickade på DENNA knapp
                  if (answer === selectedAnswer) {
                    if (answer === mockQuestion.correctAnswer) {
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
            variant="solid" 
            onClick={resetTest}
            style={{ marginTop: '20px', cursor: 'pointer', borderRadius: "9999px" ,padding: "1em 1.5em"}}
          >
            Testa igen 
          </Button>
        )}

      </Flex>
    </Container>
  );
}