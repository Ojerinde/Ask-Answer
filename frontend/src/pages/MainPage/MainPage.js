import { Link, Route, Routes, useParams } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ImLock, ImKey, ImUnlocked, ImSpinner4 } from "react-icons/im";

import Header from "../../components/Header/Header";

const NewQuestion = lazy(() =>
  import("../../components/NewQuestion/NewQuestion")
);
const AllQuestions = lazy(() =>
  import("../../components/AllQuestions/AllQuestions")
);
const AnsweredQuestions = lazy(() =>
  import("../../components/AnsweredQuestions/AnsweredQuestions")
);

const MainPage = () => {
  const { track } = useParams();
  return (
    <>
      <Header track={track} />
      <Suspense
        fallback={
          <div className="fallback__box">
            <ImSpinner4 className="fallback__spinner" />
          </div>
        }
      >
        <Routes>
          <Route
            path=""
            exact
            element={
              <main className="main__page">
                <h2 className="typewriter">Welcome to {track} Engineering</h2>
                <h4>Open any of the links below to serve your needs</h4>
                <ul>
                  <li>
                    <ImLock className="icons" />
                    <Link to="add_question">
                     Ask
                    </Link>
                  </li>
                  <li>
                    <ImKey className="icons" />
                    <Link to="all_questions">
                     Answer
                    </Link>
                  </li>
                  <li>
                    <ImUnlocked className="icons" />
                    <Link to="answered_questions">
                     Answered
                    </Link>
                  </li>
                </ul>
              </main>
            }
          />
          <Route path="all_questions/*" element={<AllQuestions />} />
          <Route path="add_question" element={<NewQuestion />} />
          <Route path="answered_questions/*" element={<AnsweredQuestions />} />
        </Routes>
      </Suspense>
    </>
  );
};
export default MainPage;
