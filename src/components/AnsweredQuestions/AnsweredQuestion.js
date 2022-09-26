import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

import "./AnsweredQuestion.scss";
const AnsweredQuestion = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const buttonHandler = (e) => {
    navigate(`${pathname}/` + props.id);
  };
  return (
    <Card className="answered_question__card">
      <div className="question__text">
        <h3>{props.title}</h3>
        <p>{props.description.slice(0, 100)}</p>
      </div>
      <div className="question__button">
        <Button onClick={buttonHandler}>See more</Button>
      </div>
    </Card>
  );
};
export default AnsweredQuestion;
