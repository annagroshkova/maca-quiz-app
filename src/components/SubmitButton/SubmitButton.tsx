import "./SubmitButton.css";

interface SubmitButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
export default function SubmitButton({
  children,
  onClick,
  disabled,
}: SubmitButtonProps) {
  return (
    <button
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
