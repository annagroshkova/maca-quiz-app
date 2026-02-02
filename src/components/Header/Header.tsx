import BackButton from "../BackButton/BackButton";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import "./Header.css";
import { useState, useEffect, type ReactNode } from "react";
import { asset } from "../../utils/asset";

interface Props {
  backButton: boolean;
  backButtonProps?: {
    onClick?: VoidFunction;
    src?: string;
    children?: ReactNode;
  };
}

export default function Header({ backButton, backButtonProps = {} }: Props) {
  const { onClick, src } = backButtonProps;
  const { user } = useUser();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
 /* const [avatarSize, setAvatarSize] = useState<number>(
    window.innerWidth >= 768 ? 50 : 40,
  ); */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    /* const handleResize = () => {
      setAvatarSize(window.innerWidth < 768 ? 40 : 50);
    }; */

    window.addEventListener("scroll", handleScroll);
   /* window.addEventListener("resize", handleResize); */
    return () => {
      window.removeEventListener("scroll", handleScroll);
     /* window.removeEventListener("resize", handleResize); */
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="header__inner">
        {backButton ? (
          <BackButton onClick={onClick} src={src} />
        ) : (
          <div className="header__placeholder"></div>
        )}

        <img
          className="header__gamelogo"
          alt="MindPop Logo"
          src={asset("mindpop_logo_text_only.png")}
        />
        <Link to="/userProfile" style={{ textDecoration: "none" }}>
          {user.name && (
            <div className="header__avatar">
            <Avatar name={user.name} /* size={avatarSize}*/ bgColor={user.bgColor} />
            </div>
          )} 
        </Link>
      </div>
    </header>
  );
}
