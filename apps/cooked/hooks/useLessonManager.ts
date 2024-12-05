import { trpc, Question } from "@/utils/trpc/client";
import { useEffect, useState, useReducer } from "react";

interface LessonManagerState {
  progress: number;
  questionList: Question[];
  currentQuestion: number;
  isComplete: boolean;
}

type LessonManagerAction =
  | { type: "CORRECT" }
  | { type: "INCORRECT" }
  | { type: "POPULATE"; questions: Question[] };

function convertDecimalToPercentage(decimal: number) {
  return Math.round(decimal * 100);
}

function lessonManagerReducer(
  state: LessonManagerState,
  action: LessonManagerAction,
): LessonManagerState {
  switch (action.type) {
    case "POPULATE":
      return {
        ...state,
        currentQuestion: 0,
        questionList: action.questions,
      };
    case "CORRECT":
      if (state.currentQuestion === state.questionList.length - 1) {
        return {
          ...state,
          isComplete: true,
        };
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        progress: convertDecimalToPercentage(
          state.currentQuestion + 1 / state.questionList.length,
        ),
      };
    case "INCORRECT":
      if (state.currentQuestion === 0) {
        return state;
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion - 1,
        progress: convertDecimalToPercentage(
          state.currentQuestion - 1 / state.questionList.length,
        ),
      };
  }
}

export function useLessonManager() {
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState("");
  const [{ progress, isComplete, currentQuestion, questionList }, dispatch] =
    useReducer(lessonManagerReducer, {
      questionList: [],
      progress: 0,
      currentQuestion: 0,
      isComplete: false,
    });

  const correct = () => dispatch({ type: "CORRECT" });
  const incorrect = () => dispatch({ type: "INCORRECT" });
  const updateQuestionList = (questions: Question[]) =>
    dispatch({ type: "POPULATE", questions });

  return {
    updateQuestionList,
    correct,
    incorrect,
    progress,
    isComplete,
    currentQuestion: questionList[currentQuestion],
    error,
  };
}
