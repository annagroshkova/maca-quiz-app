interface BackButtonProps {
  src?: string
  onClick?: () => void;
}

export default function BackButton({ src="go-back-icon-white.svg", onClick }: BackButtonProps) {
  return (
    <button
      className="back-button"
      onClick={onClick}
    >
      <div className="back-button__bg">
                    <img
              src={src}
              alt="Go back icon"
              style={{ height: "100%", display: "block" }}
            />
      </div>
      
    </button>
  );
}
