import BackButton from "../BackButton/BackButton";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Header.css";
import { useState, useEffect, type ReactNode } from "react";

interface Props {
  backButton: boolean;
  backButtonProps?: {
    onClick?: VoidFunction;
    children?: ReactNode;
  };
}

export default function Header({ backButton, backButtonProps = {} }: Props) {
  const { onClick, children } = backButtonProps;
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      {backButton ? (
        <BackButton onClick={onClick} children={children} />
      ) : (
        <div className="header__placeholder"></div>
      )}

      <h1 className="header__quiz-name">Quizzie</h1>
      <Link to="/userProfile" style={{ textDecoration: "none" }}>
        {user.name && (
          <Avatar name={user.name} size={40} bgColor={user.bgColor} />
        )}
      </Link>
    </header>
  );
}
