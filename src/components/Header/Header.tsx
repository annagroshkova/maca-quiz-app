import BackButton from "../BackButton/BackButton";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Header.css"

export default function Header() {
  const { user } = useUser();
  return (
    <header className="header">
      <BackButton />
      <h1 className="header__quiz-name">Quizzie</h1>
      <Link to="/userProfile" style={{ textDecoration: "none" }}>
        {user.name && <Avatar name={user.name} size={40} />}
      </Link>
    </header>
  );
}
