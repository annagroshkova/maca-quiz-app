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
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function BackButton({ children, onClick }: BackButtonProps) {
  return (
    <button
      className="back-button"
      onClick={onClick}
    >
      <div className="back-button__bg">
        {children}
      </div>
      
    </button>
  );
}
