import { useLocation, useNavigate } from "react-router-dom";

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

import "./Question.scss";
const Question = (props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
 
  const buttonHandler = (e) => {
    e.preventDefault()
    
    navigate(`${pathname}/` + props.id);
  };
  return (
    <Card className="question__card">
      <div className="question__text">
        <h3>{props.title}</h3>
        <p>{props.description.slice(0, 100)}</p>
      </div>
      <div className="question__button">
        <Button onClick={buttonHandler}>View</Button>
        <Button onClick={buttonHandler}>Delete</Button>
      </div>
    </Card>
  );
};
export default Question;
