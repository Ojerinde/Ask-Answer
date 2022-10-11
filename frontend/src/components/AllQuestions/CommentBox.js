import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Error from "../UI/Error/Error";
// import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

const CommentBox = (props) => {
  const [inputState, setInputState] = useState({ answer: "", name: "" });

  const { isLoading, error, closeError, fetchRequest: AddComment } = useFetch();

  const params = useParams();

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const lastIndex = pathname.lastIndexOf("/");

  const answerInputHandler = (e) => {
    setInputState((prev) => {
      return {
        ...prev,
        answer: e.target.value,
      };
    });
  };

  const nameInputHandler = (e) => {
    setInputState((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  };

  const addCommentHandler = (e) => {
    e.preventDefault();

    AddComment(
      {
        url: `${pathname}`,
        method: "POST",
        body: { answer: inputState.answer, name: inputState.name },
        headers: {
          "Content-Type": "application/json",
        },
        errorMessage: "Failed to add comment",
      },
      (response) => {
        if (response) navigate(`${pathname.slice(0, lastIndex)}`);
      }
    );
  };
  const closeErrorHandler = () => {
    closeError();
  };
   
  return (
    <Card className="comment__box">
      {!isLoading && error.hasError && (
        <Error message={error.message} onClick={closeErrorHandler} />
      )}
      <form onSubmit={addCommentHandler}>
        <textarea
          onChange={answerInputHandler}
          className="comment__box--input"
          placeholder="Do well to explain in simple terms"
        ></textarea>
        <div className="comment__box--btn">
          <input
            onChange={nameInputHandler}
            type="text"
            placeholder="Enter your name"
          />
          <Button>Done</Button>
        </div>
      </form>
    </Card>
  );
};
export default CommentBox;
