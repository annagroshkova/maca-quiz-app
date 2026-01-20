import { useUser } from "../../context/UserContext";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import Avatar from "../../components/Avatar/Avatar";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import Header from "../../components/Header/Header";

export default function UserProfile() {
  const { user, setUserName } = useUser();
  const { returnToQuiz } = useQuizNavigation();
  const { goToRules } = useQuizNavigation();

  const [displayName, setDisplayName] = useState(user.name ?? "");

  useEffect(() => {
    setDisplayName(user.name ?? "");
  }, [user.name]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setUserName(displayName.trim());
  };

  return (
    <section className="startpage">
      <header></header>
      <div className="userContainer">
        {user.name ? <Avatar name={user.name} size={200} /> : null}
        <div className="userInner">
          <h1 className="startpage__headning">{user.name}</h1>
          <div className="userWrapper">
            <div className="userScore">
              <h3 className="scoreDisplay">Last Score: {user.lastScore}</h3>
              <h3 className="scoreDisplay">Best Score: {user.bestScore}</h3>
            </div>
            <form className="nameChangeForm" onSubmit={handleNameSubmit}>
              <label htmlFor="name">Change name?</label>
              <input
                id="name"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter new name"
                className="userNameInput"
              />
              <button
                className="userNameButton"
                type="submit"
                disabled={!displayName.trim()}
              >
                Save
              </button>
            </form>
          </div>
          <SubmitButton onClick={goToRules}>Rules</SubmitButton>
        </div>
        <div className="userButtons">
          <SubmitButton onClick={returnToQuiz}>Return</SubmitButton>
        </div>
      </div>
    </section>
  );
}
