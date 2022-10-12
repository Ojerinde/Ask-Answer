import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const Question = (props) => {
  
  const { fetchRequest: moveQuestion } = useFetch();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const viewButtonHandler = (e) => {
    e.preventDefault();

    navigate(`${pathname}/` + props.id);
  };

  const moveToAnsweredPageHandler = () => {
    moveQuestion(
      {
        url: `${pathname}/${props.id}`,
        method: "PATCH",
        errorMessage: "Request failed",
      },
      props.onDelete
    );
  };

  return (
    <Card className="question__card">
      <div className="question__text">
        <h3>{props.title}</h3>
        <p>{props.description.slice(0, 100)}</p>
      </div>
      <div className="question__button">
        <Button onClick={viewButtonHandler}>View</Button>
        {/* Button to move to answered question page */}
        <Button onClick={moveToAnsweredPageHandler}>Answered</Button>
      </div>
    </Card>
  );
};
export default Question;
