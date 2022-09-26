import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

import DUMMY_DATA from "../../Dummy";

import "./QuestionDetail.scss";
import { useState } from "react";
const QuestionDetail = (props) => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const { question_Id } = useParams();
  const { pathname } = useLocation();

  const question = DUMMY_DATA.find((row) => row.id === +question_Id);

  const goBackHandler = () => {
    navigate(`${props.pathname}`);
  };

  const answerHandler = () => {
    navigate(`${pathname}/comments`);
    setClicked((prev) => !prev);
  };

  return (
    <>
      <Button
        onClick={goBackHandler}
        type="button"
        className="question__detail--button"
      >
        Go back
      </Button>
      <Card className="question__detail--card">
        <h3>{question.title || "No title"}</h3>
        <p>{question.description || "No description"}</p>
        <figure>
          {question?.images?.map((image, index) => (
            <img key={index} src={`${image}`} alt={`Snapshot ${index}`} />
          )) || "No image"}
        </figure>
        <div className="question__detail--card-btn">
          <Button onClick={answerHandler} disabled={clicked} className='margin__right'>
            Answer
          </Button>
          {/* Button to move to answered question page */}
          <Button>Answered?</Button>
        </div>
      </Card>
      <Outlet />
    </>
  );
};
export default QuestionDetail;
