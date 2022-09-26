import { useNavigate, useParams } from "react-router-dom";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

import DUMMY_DATA from "../../Dummy";

import "./AnsweredQuestionDetail.scss";
import Comments from "../Comments/Comments";
// There should be different styles here.
const AnsweredQuestionDetail = (props) => {
  const navigate = useNavigate();

  const { Id } = useParams();

  const question = DUMMY_DATA.find((row) => row.id === +Id);

  const goBackHandler = () => {
    navigate(`${props.pathname}`);
  };

  return (
    <>
      <Button
        onClick={goBackHandler}
        type="button"
        className="answered_question__detail--button"
      >
        Go back
      </Button>
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
      <Comments />
    </>
  );
};
export default AnsweredQuestionDetail;
