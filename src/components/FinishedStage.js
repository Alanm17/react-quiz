import { handleFinish } from "./NextButton";

function FinishedStage({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  const emoji =
    percentage === 100
      ? "🏆"
      : percentage >= 80
        ? "🎉"
        : percentage >= 60
          ? "👍"
          : percentage >= 40
            ? "😅"
            : "😬";

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of{" "}
        <strong>{maxPoints}</strong> ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">🏅 High Score: {highScore} points</p>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {handleFinish("restart", "↺ Restart Quiz", dispatch)}
      </div>
    </>
  );
}

export default FinishedStage;
