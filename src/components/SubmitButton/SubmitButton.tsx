import "./SubmitButton.css";

interface SubmitButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  bgColor?: string;
}
export default function SubmitButton({
  children,
  onClick,
  disabled,
  bgColor,
}: SubmitButtonProps) {
  return (
    <button
      style={{ backgroundColor: bgColor || "#6c63ff" }}
      className="submit-button"
      type="submit"
      // props
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
