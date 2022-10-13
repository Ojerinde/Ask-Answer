import { useLocation } from "react-router-dom";

import Card from "../../components/UI/Card/Card";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import useFetch from "../../hooks/useFetch";

import { useRef } from "react";

const SearchBox = (props) => {

  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");

  const { fetchRequest: searchQuestions } = useFetch();

  const titleRef = useRef();
  const offsetRef = useRef();
  const limitRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const offset = offsetRef.current.value;
    const limit = limitRef.current.value;

    searchQuestions(
      {
        url: `${pathname.slice(0 , lastIndex)}/all_questions`,
        body: {
          title: title,
          offset: offset,
          limit: limit,
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        errorMessage: "No question matches search term(s)",
      },
      props.onSearch
    );
  };

  return (
    <Card className="search__card">
      <form onSubmit={submitHandler}>
        <Input
          label="Tag"
          placeholder="Can I know the paticular question you are lokking for?"
          type="text"
          ref={titleRef}
        />
        <div className="search__card--input">
          <Input
            label="Offset"
            placeholder="From where?"
            type="number"
            ref={offsetRef}
          />
          <Input
            label="Limit"
            placeholder="How many?"
            type="number"
            ref={limitRef}
          />
        </div>
        <div className="search__card--button">
          <div className="search__card--paragraph">
            <p>
              Unanswered questions:<span>{props.totalQuestions}</span>
            </p>
            <p>Answered questions: <span>{props.answeredQuestions}</span> </p>
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>
    </Card>
  );
};
export default SearchBox;
