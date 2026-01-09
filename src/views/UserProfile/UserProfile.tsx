import { useNavigate } from "react-router-dom";
import { getUserSettings, updateUserSettings } from "../../userSettings";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useState } from "react";
import Avatar from "../../components/Avatar/Avatar";

export default function UserProfile() {
  const user = getUserSettings();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name ?? "");
  const [displayName, setDisplayName] = useState(user.name ?? "");

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    updateUserSettings({ name });
    setDisplayName(name);
  };

  const handleRetry = () => {
    navigate("/quiz");
  };
  const handleSettings = () => {
    navigate("/quiz-settings");
  };

  return (
    <section className="startpage">
      {user.name && <Avatar name={displayName} size={96} />}
      <h1 className="startpage__headning">{displayName}</h1>
      <h3 className="scoreDisplay">Last Score: {user.lastScore}</h3>
      <h3 className="scoreDisplay">Best Score: {user.bestScore}</h3>

      <form className="nameChangeForm" onSubmit={handleNameSubmit}>
        <label htmlFor="name">Change name?</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new name"
        />
        <button type="submit" disabled={!name}>
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
