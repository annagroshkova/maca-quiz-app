import { useUser } from "../../context/UserContext";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import Avatar from "../../components/Avatar/Avatar";
import useQuizNavigation from "../../hooks/useQuizNavigation";

export default function UserProfile() {
  const { user, setUserName } = useUser();
  const { returnToQuiz } = useQuizNavigation();

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
      {user.name ? <Avatar name={user.name} size={96} /> : null}
      <h1 className="startpage__headning">{user.name}</h1>
      <h3 className="scoreDisplay">Last Score: {user.lastScore}</h3>
      <h3 className="scoreDisplay">Best Score: {user.bestScore}</h3>

      <form className="nameChangeForm" onSubmit={handleNameSubmit}>
        <label htmlFor="name">Change name?</label>
        <input
          id="name"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Enter new name"
        />
        <button type="submit" disabled={!displayName.trim()}>
          Save
        </button>
      </form>
      <SubmitButton onClick={returnToQuiz}>Return</SubmitButton>
    </section>
  );
}
