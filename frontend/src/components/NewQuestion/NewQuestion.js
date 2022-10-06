// React Router Hooks
import { useNavigate, useLocation } from "react-router-dom";

// React hooks
import { useState } from "react";

// Custom hook
import useFetch from "../../hooks/useFetch";

// Components
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import Input from "../UI/Input/Input";
import Error from "../UI/Error/Error";
import LoadingSpinner from "../UI/LoadingSpinner/LoadingSpinner";

// Style
import "./NewQuestion.scss";

const NewQuestion = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");

  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [images, setImages] = useState([]);

  const {
    isLoading,
    error,
    closeError,
    fetchRequest: AddQuestion,
  } = useFetch();

  const titleChangeHandler = (e) => {
    setTitle(e.target.value);
  };
  const questionChangeHandler = (e) => {
    setQuestion(e.target.value);
  };
  const imagesChangeHandler = (e) => {
    const images = [];
    const files = e.target.files;
    for (const file of files) {
      images.push(file.name);
    }
    setImages(images);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await AddQuestion({
      url: "/frontend/add_question",
      errorMessage: "Failed to create question",
      method: "POST",
      body: {
        title: title,
        question: question,
        images: images,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (isLoading || (!isLoading && error.hasError)) {
      console.log('okay')
      return;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const closeErrorHandler = () => {
    closeError();
  };

  return (
    <>
      {error.hasError && (
        <Error message={error.message} onClick={closeErrorHandler} />
      )}
      <Card className="new__question--card">
        <form onSubmit={submitHandler}>
          <Input
            label="Title"
            type="text"
            placeholder="Give your question a title"
            name="title"
            onChange={titleChangeHandler}
            value={title}
          />
          <Input
            field="textarea"
            label="Question"
            type="text"
            placeholder="Type your question here. Be detailed!"
            name="question"
            value={question}
            onChange={questionChangeHandler}
          />
          <Input
            label="Upload file(s)"
            type="file"
            multiple="multiple"
            name="images"
            onChange={imagesChangeHandler}
          />

          <div className="new__question--box">
            <Button type="submit">Ask!</Button>
          </div>
        </form>
      </Card>
    </>
  );
};
export default NewQuestion;
