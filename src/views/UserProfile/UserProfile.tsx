import { useUser, avatarColors } from "../../context/UserContext";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import Avatar from "../../components/Avatar/Avatar";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import Header from "../../components/Header/Header";
import { useQuiz } from "../../context/QuizContext";

export default function UserProfile() {
  const { user, setUserName, setUserBgColor } = useUser();
  const { returnToQuiz } = useQuizNavigation();
  const { goToRules } = useQuizNavigation();
  const { resetQuiz } = useQuiz();

  const [displayName, setDisplayName] = useState(user.name ?? "");

  useEffect(() => {
    setDisplayName(user.name ?? "");
  }, [user.name]);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setUserName(displayName.trim());
  };

  const handleColorClick = (color: string) => {
    setUserBgColor(color);
  };

  return (
    <section className="startpage">
      <Header
        backButton={true}
        backButtonProps={{
          onClick: () => {
            returnToQuiz();
          },
          children: (
            <img
              src="go-back-icon-192-solid.svg"
              alt="Go back icon"
              style={{ height: "100%" }}
            />
          ),
        }}
      />
      <div className="userContainer">
        {user.name ? (
          <Avatar name={user.name} size={175} bgColor={user.bgColor} />
        ) : null}
        <div className="userInner">
          <h1 className="userName">{user.name}</h1>
          <div className="userColors">
            {avatarColors.map((color) => (
              <button
                key={color}
                style={{
                  backgroundColor: color,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  cursor: "pointer",
                  border: "none",
                }}
                aria-label={`Select color ${color}`}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
          <div className="userWrapper">
            <div className="userScore">
              <h3 className="scoreDisplay">Last Score: {user.lastScore}</h3>
              <h3 className="scoreDisplay">Best Score: {user.bestScore}</h3>
            </div>
            <form className="nameChangeForm" onSubmit={handleNameSubmit}>
              <label
                htmlFor="name"
                style={{ color: "#382B76", fontWeight: "bold" }}
              >
                Change name?
              </label>
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

          <SubmitButton variant="default" onClick={goToRules}>
            Rules
          </SubmitButton>
        </div>
        <div className="userButtons">
          <SubmitButton onClick={returnToQuiz}>Return</SubmitButton>
        </div>
      </div>
    </section>
  );
}
