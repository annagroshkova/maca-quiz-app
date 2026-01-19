import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

export default function Rules() {
  const navigate = useNavigate();
  return (
    <>
      <Header
        backButton
        backButtonProps={{
          onClick: () => navigate("/"),
          children: (
            <img
              src="go-back-icon-192-solid.svg"
              alt="Go back icon"
              style={{ height: "100%" }}
            />
          ),
        }}
      />
      <div className="rulesContainer">
        <h1 className="rulesHeading">How to play</h1>
        <h3 className="rulesChallenge">
          Test your knowledge across different topics! Answer questions
          correctly to score points, earn streak rewards, and keep your lives.
          Can you get the highest score?
        </h3>
      </div>
    </>
  );
}
