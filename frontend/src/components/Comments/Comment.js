import Card from "../UI/Card/Card";

const Comment = (props) => {
  return (
    <Card className='comment__card'>
      <div className='comment__card--div'>
        {props.name}
        <span>{props.date}</span>
      </div>
      <p className='comment__card--p'>{props.comment}</p>
    </Card>
  );
};

export default Comment;
