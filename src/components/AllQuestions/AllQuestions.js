import { Route, Routes, useLocation } from "react-router-dom";

import SearchBox from "./SearchBox";
import DUMMY_DATA from "../../Dummy";
import Question from "./Question";
import QuestionDetail from "./QuestionDetail";
import CommentBox from "./CommentBox";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

const AllQuestion = (props) => {
  const { pathname } = useLocation();
  const lastIndex = pathname.lastIndexOf("/");
 

  return (
    <>
      <Routes>
        <Route
          path=""
          exact
          element={
            <>
              <SearchBox />
              {DUMMY_DATA.map((data) => (
                <Question
                  key={data.id}
                  id={data.id}
                  title={data.title}
                  description={data.description}
                />
              ))}
            </>
          }
        />
        <Route
          path=":question_Id"
          element={<QuestionDetail pathname={pathname.slice(0, lastIndex)} />}
        >
          <Route path="comments" element={<CommentBox />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default AllQuestion;
