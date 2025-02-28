import React from "react";

export function handleFinish(type, status, dispatch) {
  return (
    <>
      <div>
        <button onClick={() => dispatch({ type: type })} className="btn btn-ui">
          {status}
        </button>
      </div>
    </>
  );
}

function NextButton({ dispatch, isLastQuestion, numQuestions, index }) {
  if (index < numQuestions - 1) {
    return <div>{handleFinish("next", "Next", dispatch)}</div>;
  }
  if (isLastQuestion) {
    return <div>{handleFinish("finish", "Finish", dispatch)}</div>;
  }
}

export default NextButton;
