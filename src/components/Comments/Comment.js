import Card from "../UI/Card/Card";

import "./Comment.scss";
const Comment = (props) => {
  return (
    <Card className='comment__card'>
      <div>
        {props.name}
        <span>{props.date}</span>
      </div>
      <p>{props.comment}</p>
    </Card>
  );
};

export default Comment;
