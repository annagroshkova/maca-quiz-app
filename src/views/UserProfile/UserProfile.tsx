import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";

export default function UserProfile() {
  const { user, setUserName } = useUser();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user.name ?? "");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName) return;
    setUserName(displayName);
  };

  const handleRetry = () => {
    navigate("/quiz");
  };
  const handleSettings = () => {
    navigate("/quiz-settings");
  };

  return (
    <section className="startpage">
      {user.name && <Avatar name={user.name} size={96} />}
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
        <button type="submit" disabled={!displayName}>
          Save
        </button>
      </form>

      <SubmitButton onClick={handleSettings}>Change Category</SubmitButton>
      <SubmitButton onClick={handleSettings}>Change Difficulty</SubmitButton>
      <SubmitButton onClick={handleRetry} color="indigo">
        Try again!
      </SubmitButton>
    </section>
  );
}
