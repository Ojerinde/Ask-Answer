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
  const [comment, setComment] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");
  const { Id } = useParams();

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
  }, []);

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
        <Button onClick={() => setComment((prev) => !prev)}>
          See all answers
        </Button>
      </Card>
      {comment ? <Comments id = {Id}/> : ""}
    </>
  );
};
export default AnsweredQuestionDetail;
