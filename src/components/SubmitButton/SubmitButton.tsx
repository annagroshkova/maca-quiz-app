import React from "react";
import "./SubmitButton.css";
import { Button } from "@radix-ui/themes";
import { motion, AnimatePresence, type Variants } from "motion/react";

const MotionButton = motion(Button);

interface SubmitButtonProps {
  children?: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  color?: "plum" | "ruby" | "indigo";
}
export default function SubmitButton({
  children,
  onClick,
  disabled,
  color = "plum",
}: SubmitButtonProps) {
  const buttonVariants: Variants = {
    hidden: {
      scale: 0.5,
      opacity: 0,
      y: 10,
    },
    visible: {
      scale: 0.95,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 35,
      },
    },
    exit: {
      scale: 0.5,
      opacity: 0,
      transition: { duration: 0.4 },
    },
    hover: {
      scale: 1.0,
      filter: "brightness(0.9)",
    },
    tap: {
      scale: 0.9,
      filter: "brightness(0.8)",
    },
  };

  return (
    <AnimatePresence>
      {!disabled && (
        <MotionButton
          className="submit-button"
          size="3"
          variant="solid"
          type="submit"
          // props
          onClick={onClick}
          color={color}
          //animation
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
        >
          {children}
        </MotionButton>
      )}
    </AnimatePresence>
  );
}
