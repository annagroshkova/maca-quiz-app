import { Card, Flex, Text } from "@radix-ui/themes";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

export default function Rules() {
  const navigate = useNavigate();
  return (
    <>
      <Header
        backButton
        backButtonProps={{
          onClick: () => navigate(-1),
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
        <h1 className="rulesHeading">Rules</h1>

        <Flex className="rulesInner">
          <Card className="rulesChallenge">
            <Text align="center" style={{ textAlign: "center" }}>
              Test your knowledge across different topics! Answer questions
              correctly to score points, earn streak rewards, and keep your
              lives. Can you get the highest score?
            </Text>
          </Card>

          <div className="ruleCardContainer">
            <Card
              className="rulesBox"
              style={{
                borderRadius: "12px",
                backgroundColor: "#fcfcfc",
                padding: "12px",
              }}
            >
              <h3 className="rulesSmallHeadline">How to Play</h3>
              <ul className="mt-2 list-decimal list-inside">
                <li>Click “Start Quiz” to begin.</li>
                <li>
                  Answer each question by selecting one of the four options.
                </li>
                <li>
                  Earn points based on difficulty:
                  <ul className="list-disc list-inside ml-4">
                    <li>Easy: +1 point</li>
                    <li>Medium: +2 points</li>
                    <li>Hard: +3 points</li>
                  </ul>
                </li>
                <li>Each incorrect answer costs you one life.</li>
              </ul>
            </Card>

            {/* Rewards */}
            <Card
              className="rulesBox"
              style={{
                borderRadius: "12px",
                backgroundColor: "#fcfcfc",
                padding: "12px",
              }}
            >
              <h3 className="rulesSmallHeadline">Rewards</h3>
              <ul className="list-disc list-inside mt-2">
                <li>
                  Answer <strong>5 questions in a row</strong> correctly → +10
                  bonus points 🎉
                </li>
                <li>
                  Answer <strong>10 questions in a row</strong> correctly → gain
                  1 extra life ❤️
                </li>
                <li>Streak resets if you answer incorrectly.</li>
              </ul>
            </Card>

            <Card
              className="rulesBox"
              style={{
                borderRadius: "12px",
                backgroundColor: "#fcfcfc",
                padding: "12px",
              }}
            >
              <h3 className="rulesSmallHeadline">Tips & Tricks</h3>
              <ul className="list-disc list-inside mt-2">
                <li>Focus on building streaks to maximize rewards.</li>
                <li>Hard questions give more points!</li>
                <li>
                  Keep an eye on your lives and plan your answers strategically.
                </li>
              </ul>
            </Card>
          </div>
        </Flex>
      </div>
    </>
  );
}
