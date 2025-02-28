import { handleFinish } from "./NextButton";
function FinishedStage({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      {" "}
      <p className="result">
        You scored {points} out of <strong>{maxPoints}</strong>(
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">HighScore: {highScore} points</p>
      <div>{handleFinish("restart", "Restart The Quiz", dispatch)}</div>
    </>
  );
}

export default FinishedStage;
