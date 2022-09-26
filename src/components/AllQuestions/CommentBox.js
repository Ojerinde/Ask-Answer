import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

import "./CommentBox.scss";
const CommentBox = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");

  const doneHandler = () => {
    navigate(`${pathname.slice(0, lastIndex)}`);
  };
  return (
    <Card className="comment__card">
      <textarea
        className="comment__card--input"
        placeholder="Do well to explain in simple terms"
      ></textarea>
      <div className="comment__card--btn">
        <input type="text" placeholder="Enter your name" />
        <Button onClick={doneHandler}>Done</Button>
      </div>
    </Card>
  );
};
export default CommentBox;
