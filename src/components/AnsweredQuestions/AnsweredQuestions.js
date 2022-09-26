import { Route, Routes, useLocation } from "react-router-dom";
import DUMMY_DATA from "../../Dummy";
import AnsweredQuestion from "./AnsweredQuestion";
import AnsweredQuestionDetail from "./AnsweredQuestionDetail";

const AnsweredQuestions = () => {
  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");
  return (
    <>
      <Routes>
        <Route
          path=""
          element={DUMMY_DATA.map((data) => (
            <AnsweredQuestion
              key={data.id}
              id={data.id}
              title={data.title}
              description={data.description}
            />
          ))}
        />
        <Route
          path=":Id"
          element={
            <AnsweredQuestionDetail pathname={pathname.slice(0, lastIndex)} />
          }
        />
      </Routes>
    </>
  );
};
export default AnsweredQuestions;
