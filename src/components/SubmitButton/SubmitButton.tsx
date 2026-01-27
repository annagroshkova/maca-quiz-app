import "./SubmitButton.css";

interface SubmitButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "game-over";
  type?: "button" | "submit";
}
export default function SubmitButton({
  children,
  onClick,
  disabled,
  variant = "default",
  type = "submit",
}: SubmitButtonProps) {
  const className = `submit-button ${
    variant === "game-over" ? "submit-button--game-over" : ""
  }`;
  return (
    <button
      className={className}
      type={type}
      // props
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
