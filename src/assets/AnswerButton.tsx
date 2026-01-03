import "@radix-ui/themes/styles.css";
import { Button } from "@radix-ui/themes";
import { motion } from "motion/react"

interface AnswerButtonProps {
  answerText: string;
  state: 'idle' | 'correct' | 'incorrect' | 'idle-round-over';
  onClick: () => void;
  disabled?: boolean;
  index: number;
}

export const AnswerButton = ({ answerText, state, onClick, disabled = false, index }: AnswerButtonProps) => {
  
  let color: 'indigo' | 'grass' | 'ruby' = 'indigo';
  if (state === 'correct') color = 'grass';
  if (state === 'incorrect') color = 'ruby';

  // Om knappen är inaktiv (idle-round-over), gör den grå
  const isPassive = state === 'idle-round-over';

  const handleClick = () => {
    if (!disabled) onClick();
  };

  let variantToUse = "idle";
  if (state === 'correct') variantToUse = "correct";
  if (state === 'incorrect') variantToUse = "balloonPop";
  if (state === 'idle-round-over') variantToUse = "stepBack";

  return (
    <motion.div
      style={{ 
        width: "100%", 
        // Vi sätter en fast margin så de inte hoppar
        margin: "8px 0", 
        position: "relative",
        // Rätt svar läggs överst (z-index 10) så det kan växa över de andra utan att klippas
        zIndex: state === 'correct' ? 10 : 1 
      }} 
      
      initial="entrance" 
      animate={variantToUse}
      // Vi behåller exit, men den körs BARA när listan byts ut (nästa fråga)
      exit="exitPoof"
      
      transition={{ delay: index * 0.05 }} 

      variants={{
        // --- ENTRANCE ---
        entrance: { 
          opacity: 0, x: 0, 
          transition: { duration: 3, ease: "easeOut" } 
        },

        // --- EXIT (Poff vid nästa fråga) ---
        exitPoof: {
            scale: [1, 1.1, 0], 
            opacity: [1, 1, 0], 
            filter: "blur(5px)",
            transition: { duration: 3, ease: "backIn" }
        },

        // --- IDLE ---
        idle: { 
            opacity: 1, scale: 1, y: 0, x: 0, rotate: 0, filter: "grayscale(0%)",
            margin: "8px 0"
        },
        
        correct: {
          scaleX: 1.05,
          scaleY: 1.15,
          margin: "20px 0",
          opacity: 1, // <--- LÄGG TILL DENNA! Tvingar knappen att synas.
          y: 0,
          transition: { type: "spring", stiffness: 200, damping: 15 }
        },
        
        balloonPop: {
          scale: 1,      
          margin: "20px 0",  
          y: 5,            
          rotate: -2,       
          opacity: 0.7, // Denna är okej att ha lite lägre
          transition: { type: "spring", stiffness: 200, damping: 15 }
        },
        
        // --- ÖVRIGA (Backa undan men var synliga) ---
        stepBack: {
          scale: 0.95, 
          opacity: 0.5, // Lite tydligare än förut så man ser att knappen finns
          filter: "grayscale(100%)", 
          transition: {  type: "spring", stiffness: 200, damping: 15  }
        }
      }}
    >
      <Button
        size="4"
        variant="solid"
        color={isPassive ? 'gray' : color} 
        radius="full"
        onClick={handleClick}
        style={{
          width: '100%',
          cursor: disabled ? "default" : "pointer",
          borderRadius: "9999px",
          height: "auto",
          padding: "1em 1.5em",
          fontSize: "1rem",
          transition: "background-color 0.2s", 
        }}
      >
        {answerText}
      </Button>
    </motion.div>
  );
};