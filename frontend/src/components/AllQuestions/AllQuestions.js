import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { HiOutlineSearchCircle } from "react-icons/hi";

import SearchBox from "./SearchBox";
import Question from "./Question";
import QuestionDetail from "./QuestionDetail";
import CommentBox from "./CommentBox";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Pagination from "../Pagination/Pagination";
import useFetch from "../../hooks/useFetch";
import Error from "../UI/Error/Error";

import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const QUESTION_PER_PAGE = 2;

const AllQuestion = (props) => {
  const [search, SetSearch] = useState(false);
  const { pathname } = useLocation();

  const [start, setStart] = useState(0);

  const [allQuestions, setAllQuestions] = useState({
    questions: [],
    total_questions: 0,
    answered_questions: 0,
  });

  const end = start + QUESTION_PER_PAGE;

  const getPageHandler = (page) => {
    setStart((pag) => page * QUESTION_PER_PAGE - QUESTION_PER_PAGE);
  };

  // useEffect(() => {
  //   const getQuestions = async () => {
  //     const response = await fetch(
  //       "http://localhost:3000/frontend/all_questions"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to send question");
  //     }
  //     const responseBody = await response.json();

  //     setAllQuestions({
  //       questions: responseBody.questions,
  //       total_questions: responseBody.total_questions,
  //     });
  //   };
  //   getQuestions().catch((err) => console.log(err));
  // }, []);

  const {
    isLoading,
    error,
    closeError,
    fetchRequest: getQuestions,
  } = useFetch();

  useEffect(() => {
    const getQuestionsFromRequest = (data) => {
      setAllQuestions({
        questions: data.questions,
        total_questions: data.total_questions,
        answered_questions: data.answered_questions,
      });
    };
    getQuestions(
      {
        url: `${pathname}`,
        errorMessage: "Could not fetch questions",
      },
      // The data will be passed to this function and then we can setAllquestion. Calling allQuestions here will cause infinte loop.
      getQuestionsFromRequest
    );
  }, []);

  const closeErrorHandler = () => {
    // A function to close the error. coming from useFetch
    closeError();
  };

  const onDeleteHandler = (data) => {
    setAllQuestions({
      questions: data.questions,
      total_questions: data.total_questions,
      answered_questions: data.answered_questions,
    });
  };

  return (
    <>
      <Routes>
        <Route
          path=""
          exact
          element={
            <>
              {!isLoading && error.hasError && (
                <Error message={error.message} onClick={closeErrorHandler} />
              )}
              {allQuestions.questions?.length > 0 ? (
                <div className="search__icon--box">
                  <HiOutlineSearchCircle
                    onClick={() => SetSearch((prev) => !prev)}
                    className="search__icon"
                  />
                  {search === false ? (
                    <p className="search__icon--paragraph-on">
                      Click on the search icon for search form
                    </p>
                  ) : (
                    <p className="search__icon--paragraph-off">
                      Click on the search icon to close form
                    </p>
                  )}
                </div>
              ) : (
                ""
              )}
              {search === true ? (
                <SearchBox
                  totalQuestions={allQuestions.total_questions}
                  answeredQuestions={allQuestions.answered_questions}
                  onSearch={onDeleteHandler}
                />
              ) : (
                ""
              )}
              {isLoading ? (
                <LoadingSpinner />
              ) : allQuestions.questions?.length > 0 ? (
                allQuestions.questions
                  .slice(start, end)
                  .map((data) => (
                    <Question
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      description={data.description}
                      onDelete={onDeleteHandler}
                    />
                  ))
              ) : (
                <p className="no__question--added">No question added yet.</p>
              )}
              <Pagination
                allQuestions={allQuestions.questions}
                totalQuestions={allQuestions.total_questions}
                questionPerPage={QUESTION_PER_PAGE}
                onChange={getPageHandler}
              />
            </>
          }
        />
        <Route
          path=":question_Id"
          element={<QuestionDetail onDelete={onDeleteHandler} />}
        >
          <Route path="comments" element={<CommentBox />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default AllQuestion;
