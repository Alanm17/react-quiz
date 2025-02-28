import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedStage from "./FinishedStage";
import Footer from "./Footer";
import Timer from "./Timer";
import questionsData from "./questions.json";

const SecondsPerQuestion = 30;

const initialState = {
  questions: questionsData, // ✅ Use imported data directly
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: SecondsPerQuestion * questionsData.length, // ✅ Dynamically calculated
};

function reducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      if (!state.questions.length) return state; // If no questions, return state

      const question = state.questions[state.index] ?? {}; // Ensure it's always an object

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + (question.points ?? 0)
            : state.points,
      };

    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.points, state.highScore),
      };
    case "restart":
      return { ...initialState, highScore: state.highScore };
    case "tick":
      return {
        ...state,
        secondsRemaining: Math.max(0, state.secondsRemaining - 1),
        status: state.secondsRemaining <= 1 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const isLastQuestion = index >= numQuestions - 1;
  const maxPoints = Array.isArray(questions)
    ? questions.reduce((acc, curr) => acc + (curr.points || 0), 0)
    : 0;

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            {questions[index] ? ( // ✅ Check if question exists before rendering
              <Question
                questions={questions[index]}
                dispatch={dispatch}
                answer={answer}
              />
            ) : (
              <Error message="Question not found!" />
            )}
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                isLastQuestion={isLastQuestion}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishedStage
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
