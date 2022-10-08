import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const AnsweredQuestion = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const buttonHandler = (e) => {
    navigate(`${pathname}/` + props.id);
  };
  return (
    <Card className="answered_question__card">
      <div className="answered_question__text">
        <h3>{props.title}</h3>
        <p>{props.description.slice(0, 100)}</p>
      </div>
      <div className="answered_question__button">
        <Button onClick={buttonHandler}>See more</Button>
      </div>
    </Card>
  );
};
export default AnsweredQuestion;
