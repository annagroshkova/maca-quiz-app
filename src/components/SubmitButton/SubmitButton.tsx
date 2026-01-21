import "./SubmitButton.css";

interface SubmitButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "game-over";
}
export default function SubmitButton({
  children,
  onClick,
  disabled,
  variant = "default",
}: SubmitButtonProps) {
  const className = `submit-button ${
    variant === "game-over" ? "submit-button--game-over" : ""
  }`;
  return (
    <button
      className={className}
      type="submit"
      // props
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
