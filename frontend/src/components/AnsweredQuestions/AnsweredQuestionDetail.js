import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Comments from "../Comments/Comments";

import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";
import Error from "../UI/Error/Error";

const AnsweredQuestionDetail = () => {
  const [question, setQuestion] = useState({});

  const navigate = useNavigate();
  const { Id } = useParams();

  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf('/')


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
        url: `${pathname}`,
        errorMessage: "Question does not exist",
      },
      getQuestionFromRequest
    );
  }, [getQuestion, pathname]);

  const goBackHandler = () => {
    navigate(`${pathname.slice(0, lastIndex)}`);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <Button
        onClick={goBackHandler}
        type="button"
        className="answered_question__detail--button"
      >
        Go back
      </Button>
      {!isLoading && error.hasError && (
        <Error onClose={closeError} message={error.message} />
      )}
      <Card className="answered_question__detail--card">
        <h3>{question.title || "No title"}</h3>
        <p>{question.description || "No description"}</p>
        <figure>
          {question?.images?.map((image, index) => (
            <img key={index} src={`${image}`} alt={`Snapshot ${index}`} />
          )) || "No image"}
        </figure>
        {/* All comments here: They shuold be paginated */}
      </Card>
      <Comments id={Id} />
    </>
  );
};
export default AnsweredQuestionDetail;
