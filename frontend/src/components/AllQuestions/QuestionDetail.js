import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

// Custom hook
import useFetch from "../../hooks/useFetch";

// Components
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Error from "../UI/Error/Error";

const QuestionDetail = (props) => {
  const { pathname: parentPath } = props;
  
  const [question, setQuestion] = useState({});
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();

  const { question_Id } = useParams();
  const { pathname } = useLocation();

  // const [params, setSearchParams] = useSearchParams()
  // console.log(params.get('page'))
  // setSearchParams('book=food') // This will cause infinite loop

  const {
    isLoading,
    error,
    closeError,
    fetchRequest: getQuestion,
  } = useFetch();

  useEffect(() => {
    const getQuestionFromRequest = (data) => {
      setQuestion(data.question);
    };

    getQuestion(
      {
        url: `${parentPath}/${question_Id}`,
        errorMessage: "Question does not exist",
      },
      getQuestionFromRequest
    );
  }, [question_Id, getQuestion]);

  const goBackHandler = () => {
    navigate(`${props.pathname}`);
  };

  const answerHandler = () => {
    navigate(`${pathname}/comments`);
    setClicked((prev) => !prev);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const closeErrorHandler = () => {
    closeError();
    navigate(`${props.pathname}`);
  };
  const deleteHandler = () => {
    const alertUser = prompt(`Are you sure? "Yes" to delete, "No" to go back"`);

    if (alertUser === "No") return;

    getQuestion(
      {
        url: `/frontend/all_questions/${question_Id}`,
        method: "DELETE",
        errorMessage: "Question does not exist",
      },
      // A fn to pass new questions to the parent.
      props.onDelete
    );

    if (!isLoading && !error.hasError) {
      navigate(`/frontend/all_questions`);
    }
  };
  console.log(question);

  return (
    <>
      <Button
        onClick={goBackHandler}
        type="button"
        className="question__detail--button"
      >
        Go back
      </Button>
      {!isLoading && error.hasError && (
        <Error onClick={closeErrorHandler} message={error.message} />
      )}
      {!error.hasError && (
        <Card className="question__detail--card">
          <h3>{question.title || "No title"}</h3>
          <p>{question.description || "No description"}</p>
          <figure>
            {question?.images?.map((image, index) => (
              <img key={index} src={`${image}`} alt={`Snapshot ${index}`} />
            )) || "No image"}
          </figure>
          <div className="question__detail--card-btn">
            <Button
              onClick={answerHandler}
              disabled={clicked}
              className="margin__right"
            >
              Answer
            </Button>
            <Button onClick={deleteHandler}>Delete</Button>
          </div>
        </Card>
      )}
      <Outlet />
    </>
  );
};
export default QuestionDetail;
