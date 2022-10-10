import React, { useEffect, useMemo, useState } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import Error from "../UI/Error/Error";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

import AnsweredQuestion from "./AnsweredQuestion";
import AnsweredQuestionDetail from "./AnsweredQuestionDetail";

const AnsweredQuestions = () => {
  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");

  const [answeredQuestions, setAnsweredQuestion] = useState({
    questions: [],
    totalQuestions: 0,
  });

  const {
    isLoading,
    error,
    closeError,
    fetchRequest: getAnsweredQuestions,
  } = useFetch();

  useEffect(() => {
    const getData = (data) => {
      setAnsweredQuestion({
        questions: data.questions,
        totalQuestions: data.total_questions,
      });
    };

    getAnsweredQuestions(
      {
        url: `${pathname.slice(0 , lastIndex)}/answered_questions`,
        errorMessage: "Could not fetch questions",
      },
      getData
    );
  }, [getAnsweredQuestions, pathname, lastIndex]);

  const closeErrorHandler = () => {
    closeError();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {!isLoading && error.hasError && (
        <Error message={error.message} onClick={closeErrorHandler} />
      )}

      {answeredQuestions.totalQuestions === 0 ? (
        <div className="no__question">No question(s) has been answered.</div>
      ) : (
        <Routes>
          <Route
            path=""
            element={answeredQuestions.questions.map((data) => (
              <AnsweredQuestion
                key={data.id}
                id={data.id}
                title={data.title}
                description={data.description}
              />
            ))}
          />
          <Route
            path=":Id"
            element={
              <AnsweredQuestionDetail pathname={pathname.slice(0, lastIndex)} />
            }
          />
        </Routes>
      )}
    </>
  );
};
export default React.memo(AnsweredQuestions);
