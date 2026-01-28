// export default function BackButton({ fallback = "/" }) {
//   const navigate = useNavigate();

//   const handleBack = () => {
//     if (globalThis.history.length > 1) {
//       navigate(-1);
//     } else {
//       navigate(fallback);
//     }
//   };
//   return (
//     <button className="backButton" onClick={handleBack}>
//       Back
//     </button>
//   );
// }

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
