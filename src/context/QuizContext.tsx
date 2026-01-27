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
  modifierHotStreak: boolean;
  modifierSurvivor: boolean;
  modifierTimeLimit: boolean;
  powerUpShieldActive: boolean;
  powerUpShieldUsed: boolean;
  powerUpHintActive: boolean;
  powerUpHintUsed: boolean;
  powerUpSkipActive: boolean;
  powerUpSkipUsed: boolean;

  setQuestion: (q: QuizQuestion | null) => void;
  setSelectedAnswer: (a: string | null) => void;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  setCorrectAnswersStreak: React.Dispatch<React.SetStateAction<number>>;
  resetQuiz: () => void;
  usedQuestions: Set<string>;
  setUsedQuestions: React.Dispatch<React.SetStateAction<Set<string>>>;
  setLastRewardedPointCount: React.Dispatch<React.SetStateAction<number>>;
  setModifierHotStreak: (value: boolean) => void;
  setModifierSurvivor: (value: boolean) => void;
  setModifierTimeLimit: (value: boolean) => void;
  setPowerUpShieldActive: (value: boolean) => void;
  setPowerUpShieldUsed: (value: boolean) => void;
  setPowerUpHintActive: (value: boolean) => void;
  setPowerUpHintUsed: (value: boolean) => void;
  setPowerUpSkipActive: (value: boolean) => void;
  setPowerUpSkipUsed: (value: boolean) => void;
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
  const [modifierHotStreak, setModifierHotStreak] = useState<boolean>(false);
  const [modifierSurvivor, setModifierSurvivor] = useState<boolean>(false);
  const [modifierTimeLimit, setModifierTimeLimit] = useState<boolean>(false);
  const [powerUpShieldActive, setPowerUpShieldActive] =
    useState<boolean>(false);
  const [powerUpShieldUsed, setPowerUpShieldUsed] = useState<boolean>(false);
  const [powerUpHintActive, setPowerUpHintActive] = useState<boolean>(false);
  const [powerUpHintUsed, setPowerUpHintUsed] = useState<boolean>(false);
  const [powerUpSkipActive, setPowerUpSkipActive] = useState<boolean>(false);
  const [powerUpSkipUsed, setPowerUpSkipUsed] = useState<boolean>(false);

  const resetQuiz = () => {
    setQuestion(null);
    setSelectedAnswer(null);
    setScore(0);
    setLives(3);
    setUsedQuestions(new Set());
    setCorrectAnswersStreak(0);
    setLastRewardedPointCount(0);
    setModifierHotStreak(false);
    setModifierSurvivor(false);
    setModifierTimeLimit(false);
    setPowerUpHintActive(false);
    setPowerUpHintUsed(false);
    setPowerUpShieldUsed(false);
    setPowerUpShieldActive(false);
    setPowerUpSkipActive(false);
    setPowerUpSkipUsed(false);
  };
  const value = useMemo(
    () => ({
      question,
      selectedAnswer,
      score,
      lives,
      correctAnswersStreak,
      lastRewardedPointCount,
      modifierHotStreak,
      modifierSurvivor,
      modifierTimeLimit,
      powerUpHintActive,
      powerUpHintUsed,
      powerUpShieldActive,
      powerUpShieldUsed,
      powerUpSkipActive,
      powerUpSkipUsed,
      setQuestion,
      setSelectedAnswer,
      setScore,
      setLives,
      resetQuiz,
      usedQuestions,
      setUsedQuestions,
      setCorrectAnswersStreak,
      setLastRewardedPointCount,
      setModifierHotStreak,
      setModifierSurvivor,
      setModifierTimeLimit,
      setPowerUpHintActive,
      setPowerUpHintUsed,
      setPowerUpShieldUsed,
      setPowerUpShieldActive,
      setPowerUpSkipActive,
      setPowerUpSkipUsed,
    }),
    [
      question,
      selectedAnswer,
      score,
      lives,
      usedQuestions,
      correctAnswersStreak,
      lastRewardedPointCount,
      modifierHotStreak,
      modifierSurvivor,
      modifierTimeLimit,
      powerUpHintActive,
      powerUpHintUsed,
      powerUpShieldActive,
      powerUpShieldUsed,
      powerUpSkipActive,
      powerUpSkipUsed,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
