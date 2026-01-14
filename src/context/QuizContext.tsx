import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import type { QuizQuestion } from "../views/Quiz/Quiz";

interface QuizState {
  question: QuizQuestion | null;
  selectedAnswer: string | null;
  score: number;
  lives: number;
  setQuestion: (q: QuizQuestion | null) => void;
  setSelectedAnswer: (a: string | null) => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  resetQuiz: () => void;
  usedQuestions: Set<string>;
  setUsedQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
}

const QuizContext = createContext<QuizState | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());

  const resetQuiz = () => {
    setQuestion(null);
    setSelectedAnswer(null);
    setScore(0);
    setLives(3);
    setUsedQuestions(new Set());
  };
  const value = useMemo(
    () => ({
      question,
      selectedAnswer,
      score,
      lives,
      setQuestion,
      setSelectedAnswer,
      setScore,
      setLives,
      resetQuiz,
      usedQuestions,
      setUsedQuestions,
    }),
    [question, selectedAnswer, score, lives, usedQuestions]
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
