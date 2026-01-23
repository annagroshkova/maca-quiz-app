import { motion } from "motion/react";
import "./AnswerButton.css";
import "@radix-ui/themes/styles.css";
import {Text} from "@radix-ui/themes"


interface AnswerButtonProps {
  answerText: string;
  state: "idle" | "correct" | "incorrect" | "idle-round-over" | "passive";
  onClick: () => void;
  disabled?: boolean;
  index: number;
}

export const AnswerButton = ({
  answerText,
  state,
  onClick,
  disabled = false,
  index,
}: AnswerButtonProps) => {
  let buttonClass = "answer-button ";
  if (state === "correct") buttonClass += "correct";
  if (state === "incorrect") buttonClass += "incorrect";
  if (state === "idle-round-over" || state === "passive")
    buttonClass += "passive";

  let variantToUse = "idle";
  if (state === "correct") variantToUse = "correct";
  if (state === "incorrect") variantToUse = "balloonPop";
  if (state === "idle-round-over" || state === "passive")
    variantToUse = "stepBack";

  // let background: "#fcfcfc" | "#8BD9A7" | "#FFB7C5" = "#fcfcfc";
  // let color: "white" | "black" | "#4a4a4aff" = "black";
  // if (state === "correct") {
  //   background = "#8BD9A7";
  //   color = "white";
  // }
  // if (state === "incorrect") {
  //   background = "#FFB7C5";
  //   color = "white";
  // }

  // // Om knappen är inaktiv (idle-round-over), gör den grå
  // const isPassive = state === "idle-round-over";

  const handleClick = () => {
    if (!disabled) onClick();
  };

  let variantToUse = "idle";
  if (state === "correct") variantToUse = "correct";
  if (state === "incorrect") variantToUse = "balloonPop";
  if (state === "idle-round-over") variantToUse = "stepBack";

  return (
    <motion.div
      className={`answer-button-wrapper ${state === "correct" ? "highlighted" : ""}`}
      initial="entrance"
      animate={variantToUse}
      exit="exitPoof"
      transition={{ delay: index * 0.05 }}
      variants={{
        // --- ENTRANCE ---
        entrance: {
          opacity: 0,
          x: 0,
          transition: { duration: 0.3, ease: "easeOut" },
        },

        // --- EXIT ---
        exitPoof: {
          scale: [1, 1.1, 0],
          opacity: [1, 1, 0],
          filter: "blur(0.3rem)",
          transition: { duration: 0.3, ease: "backIn" },
        },

        // --- IDLE ---
        idle: {
          opacity: 1,
          scale: 0.95,
          y: 0,
          x: 0,
          rotate: 0,
          filter: "grayscale(0%)",
          margin: "0.5rem 0",
        },

        correct: {
          scaleX: 1.0,
          scaleY: 1.05,
          margin: "1.25rem 0",
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 200, damping: 15 },
        },

        balloonPop: {
          scale: 0.95,
          margin: "1.25rem 0",
          y: 5,
          rotate: -2,
          opacity: 0.86,
          transition: { type: "spring", stiffness: 200, damping: 15 },
        },

        // --- PASSIVE ---
        stepBack: {
          scale: 0.9,
          opacity: 1,
          filter: "grayscale(100%)",
          transition: { type: "spring", stiffness: 200, damping: 15 },
        },
      }}
    >
      <button
        className={buttonClass}
        onClick={handleClick}
        disabled={disabled}
        aria-label={answerText}
      >
        {answerText}
      </button>
    </motion.div>
  );
};
