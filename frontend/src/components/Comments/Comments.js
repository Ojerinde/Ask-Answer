import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import Error from "../UI/Error/Error";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

import Comment from "./Comment";

const Comments = (props) => {
  const [allComments, setAllComments] = useState({
    comments: [],
    total_comments: 0,
  });

  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");

  const {
    isLoading,
    error,
    closeError,
    fetchRequest: getComments,
  } = useFetch();

  useEffect(() => {
    const getCommentsFromRequest = (data) => {
      setAllComments({
        comments: data.comments,
        total_comments: data.total_comments,
      });
    };

    getComments(
      {
        url: `${pathname.slice(0, lastIndex)}/${props.id}/comments
          `,
        errorMessage: "Could not fetch comments",
      },
      getCommentsFromRequest
    );
  }, [getComments]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {!isLoading && error.hasError && (
        <Error onClose={closeError} message={error.message} />
      )}

      {allComments.comments?.map((comment) => (
        <Comment
          key={comment.id}
          name={comment.name}
          date={comment.date}
          comment={comment.answer}
        />
      ))}
    </>
  );
};
export default Comments;
