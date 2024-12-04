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
        progress: state.progress + 1 / state.questionList.length,
      };
    case "INCORRECT":
      if (state.currentQuestion === 0) {
        return state;
      }
      return {
        ...state,
        currentQuestion: state.currentQuestion - 1,
        progress: state.progress - 1 / state.questionList.length,
      };
  }
}

export function useLessonManager(lessonID: string) {
  const questionListQuery = trpc.getLessonData.useQuery({ lessonID });
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState("");
  const [{ progress, isComplete, currentQuestion, questionList }, dispatch] =
    useReducer(lessonManagerReducer, {
      questionList: [],
      progress: 0,
      currentQuestion: 0,
      isComplete: false,
    });

  useEffect(() => {
    if (questionListQuery.isSuccess) {
      const filteredQuestions = questionListQuery.data.problems.filter(
        (problem): problem is Question => problem !== null,
      );

      dispatch({ type: "POPULATE", questions: filteredQuestions });
      setInitialized(true);
    } else if (questionListQuery.isError) {
      setError(
        "Error occurred while fetching questions: " +
          questionListQuery.error.message,
      );
    }
  }, [questionListQuery.data]);

  const correct = () => dispatch({ type: "CORRECT" });
  const incorrect = () => dispatch({ type: "INCORRECT" });
  const updateQuestionList = (questions: Question[]) =>
    dispatch({ type: "POPULATE", questions });

  return {
    initialized,
    updateQuestionList,
    correct,
    incorrect,
    progress,
    isComplete,
    currentQuestion: questionList[currentQuestion],
    error,
  };
}
