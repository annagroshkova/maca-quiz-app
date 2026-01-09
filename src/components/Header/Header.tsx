import BackButton from "../BackButton/BackButton";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { getUserSettings, updateUserSettings } from "../../userSettings";

export default function Header() {
  return (
    <header>
      <BackButton />
      <h1>Quizzie</h1>
      <Link to="/userProfile" style={{ textDecoration: "none" }}>
        <Avatar name={} size={40} />
      </Link>
    </header>
  );
}
