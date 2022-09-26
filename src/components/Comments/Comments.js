import { COMMENTS } from "../../Dummy";
import Comment from "./Comment";
const Comments = () => {
  return (
    <>
      {COMMENTS.map((comment) => (
        <Comment
          name={comment.name}
          date={comment.date}
          comment={comment.comment}
        />
      ))}
    </>
  );
};
export default Comments;
