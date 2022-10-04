import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

import "./Question.scss";
const Question = (props) => {
  const {
 
    fetchRequest: deleteQuestion,
  } = useFetch();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const viewButtonHandler = (e) => {
    e.preventDefault();

    navigate(`${pathname}/` + props.id);
  };
  const deleteHandler = () => {
    const alertUser = prompt(`Are you sure? "Yes" to delete, "No" to go back"`);

    if (alertUser === "No") return;

    deleteQuestion(
      {
        url: `/frontend/all_questions/${props.id}`,
        method: "DELETE",
        errorMessage: "Question does not exist",
      },
      // A fn to pass new questions to the parent.
      props.onDelete
    );
  };

  const moveToAnsweredPageHandler = () => {
    deleteQuestion(
      {
        url: `/frontend/all_questions/${props.id}`,
        method: 'PATCH',
        errorMessage: "Request failed",
      },
      props.onDelete
    );
  }

  return (
    <Card className="question__card">
      <div className="question__text">
        <h3>{props.title}</h3>
        <p>{props.description.slice(0, 100)}</p>
      </div>
      <div className="question__button">
        <Button onClick={viewButtonHandler}>View</Button>
        <Button onClick={deleteHandler}>Delete</Button>
        {/* Button to move to answered question page */}
        <Button onClick={moveToAnsweredPageHandler}>Answered</Button>
      </div>
    </Card>
  );
};
export default Question;
