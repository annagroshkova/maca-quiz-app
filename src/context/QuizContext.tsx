import { createContext, useContext, useState, useMemo } from "react";
import type { ReactNode } from "react";
import type { QuizQuestion } from "../views/Quiz/Quiz";

interface QuizState {
  question: QuizQuestion | null;
  selectedAnswer: string | null;
  score: number;
  lives: number;
  correctAnswersStreak: number;
  lastRewardedPointCount: number;
  lastRewardedLifeCount: number;
  modifierHotStreak: boolean;
  setQuestion: (q: QuizQuestion | null) => void;
  setSelectedAnswer: (a: string | null) => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setCorrectAnswersStreak: React.Dispatch<React.SetStateAction<number>>;
  resetQuiz: () => void;
  usedQuestions: Set<string>;
  setUsedQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
  setLastRewardedPointCount: React.Dispatch<React.SetStateAction<number>>;
  setLastRewardedLifeCount: React.Dispatch<React.SetStateAction<number>>;
  setModifierHotStreak: (value: boolean) => void;
}

const QuizContext = createContext<QuizState | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [question, setQuestion] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [usedQuestions, setUsedQuestions] = useState<Set<string>>(new Set());
  const [correctAnswersStreak, setCorrectAnswersStreak] = useState(0);
  const [lastRewardedPointCount, setLastRewardedPointCount] = useState(0);
  const [lastRewardedLifeCount, setLastRewardedLifeCount] = useState(0);
  const [modifierHotStreak, setModifierHotStreak] = useState<boolean>(false);

  const resetQuiz = () => {
    setQuestion(null);
    setSelectedAnswer(null);
    setScore(0);
    setLives(3);
    setUsedQuestions(new Set());
    setCorrectAnswersStreak(0);
    setLastRewardedPointCount(0);
    setLastRewardedLifeCount(0);
  };
  const value = useMemo(
    () => ({
      question,
      selectedAnswer,
      score,
      lives,
      correctAnswersStreak,
      lastRewardedPointCount,
      lastRewardedLifeCount,
      modifierHotStreak,
      setQuestion,
      setSelectedAnswer,
      setScore,
      setLives,
      resetQuiz,
      usedQuestions,
      setUsedQuestions,
      setCorrectAnswersStreak,
      setLastRewardedPointCount,
      setLastRewardedLifeCount,
      setModifierHotStreak,
    }),
    [
      question,
      selectedAnswer,
      score,
      lives,
      usedQuestions,
      correctAnswersStreak,
      lastRewardedPointCount,
      lastRewardedLifeCount,
      modifierHotStreak,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
