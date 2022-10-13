import React, { useEffect,  useState } from "react";

import { Route, Routes, useLocation } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import Error from "../UI/Error/Error";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

import AnsweredQuestion from "./AnsweredQuestion";
import AnsweredQuestionDetail from "./AnsweredQuestionDetail";

const AnsweredQuestions = () => {
  const { pathname } = useLocation();

  const [answered_questions, setAnsweredQuestion] = useState({
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
        url: `${pathname}`,
        errorMessage: "Could not fetch questions",
      },
      getData
    );
  }, []);

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

      {answered_questions.totalQuestions === 0 ? (
        <div className="no__question">No question(s) has been answered.</div>
      ) : (
        <Routes>
          <Route
            path=""
            element={answered_questions.questions?.map((data) => (
              <AnsweredQuestion
                key={data.id}
                id={data.id}
                title={data.title}
                description={data.description}
              />
            ))}
          />
          <Route path=":Id" element={<AnsweredQuestionDetail />} />
        </Routes>
      )}
    </>
  );
};
export default React.memo(AnsweredQuestions);
