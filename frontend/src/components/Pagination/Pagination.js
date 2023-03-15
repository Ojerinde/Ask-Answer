import { useState } from "react";
import { ImPrevious, ImNext } from "react-icons/im";
import Card from "../UI/Card/Card";


const Pagination = (props) => {
  const questionPerPage = props.questionPerPage;
  const totalQuestions = props.totalQuestions;
  
  const total_pages = Math.ceil(totalQuestions / questionPerPage);

  const [page, setPage] = useState(1);
  
  const prevHandler = () => {
    if (page === 1) return;
    setPage((page) => page - 1);
    props.onChange(page - 1);
  };
  const nextHandler = () => {
    if (page === total_pages) return;

    setPage((page) => page + 1);
    props.onChange(page + 1);
  };
  return (
    <Card className="pagination__card">
      <div className="pagination__icons--box">
        <ImPrevious
          onClick={prevHandler}
          className={`pagination__icons--prev ${
            page === 1 ? " not__allowed" : ""
          }`}
        />
        <p className="pagination__icons--paragraph">{page}</p>
        <ImNext
          onClick={nextHandler}
          className={`pagination__icons--next ${
            page === total_pages || total_pages < 1 ? " not__allowed" : ""
          }`}
        />
      </div>
      <div className="pagination__buttons">
        {Array.from({ length: total_pages }, (_, index) => index + 1).map(
          (each) => (
            <button
              key={each}
              onClick={() => {
                props.onChange(each);
                setPage((page) => each);
              }}
            >
              {each}
            </button>
          )
        )}
      </div>
    </Card>
  );
};
export default Pagination;
