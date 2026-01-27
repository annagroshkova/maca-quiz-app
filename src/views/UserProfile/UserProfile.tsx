import { useUser, avatarColors } from "../../context/UserContext";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useState, useEffect } from "react";
import Avatar from "../../components/Avatar/Avatar";
import MainWrapper from "../MainWrapper";
import useQuizNavigation from "../../hooks/useQuizNavigation";
import { motion } from "motion/react";
import Header from "../../components/Header/Header";

export default function UserProfile() {
  const { user, setUserName, setUserBgColor } = useUser();
  const { goToRules } = useQuizNavigation();
  const { goBack } = useQuizNavigation();

  const [displayName, setDisplayName] = useState(user.name ?? "");
  const [avatarSize, setAvatarSize] = useState(window.innerWidth < 768 ? 80 : 120);

  useEffect(() => {
    setDisplayName(user.name ?? "");
  }, [user.name]);

  useEffect(() => {
    const handleResize = () => {
      setAvatarSize(window.innerWidth >= 768 ? 120 : 80);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) return;
    setUserName(displayName.trim());
  };

  const handleColorClick = (color: string) => {
    setUserBgColor(color);
  };

  return (
    <>
      <Header
        backButton={true}
        backButtonProps={{
          onClick: () => {
            goBack();
          },
          children: (
            <img
              src='go-back-icon-192-solid.svg'
              alt='Go back icon'
              style={{ height: "100%" }}
            />
          ),
        }}
      />
      <MainWrapper>
        <div className='userInner'>
          {user.name ? (
            <Avatar name={user.name} size={avatarSize} bgColor={user.bgColor} />
          ) : null}
          <h1 className='userName'>{user.name}</h1>
          <div className='userColors'>
            {avatarColors.map((color) => (
              <button
                key={color}
                className="user__color-button"
                style={{
                  backgroundColor: color
                }}
                aria-label={`Select color ${color}`}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
          <div className='userWrapper'>
            <div className='user__info userScore'>
              <h3 className='scoreDisplay'>Last Score: {user.lastScore}</h3>
              <h3 className='scoreDisplay'>Best Score: {user.bestScore}</h3>
            </div>
            <form className='user__info nameChangeForm' onSubmit={handleNameSubmit}>
              <label
                htmlFor='name'
                style={{ color: "#382B76", fontWeight: "bold" }}
              >
                Change name?
              </label>
              <input
                id='name'
                type='text'
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder='Enter new name'
                className='userNameInput'
              />
              <button
                className='userNameButton'
                type='submit'
                disabled={!displayName.trim()}
              >
                Save
              </button>
            </form>
          </div>

          <SubmitButton variant='default' onClick={goToRules}>
            Rules
          </SubmitButton>
        </div>
      </MainWrapper>
    </>
  );
}
