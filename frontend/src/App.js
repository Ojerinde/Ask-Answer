import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { ImSpinner4 } from "react-icons/im";
import "./App.scss";
// import Home from "./pages/Home/Home";
// import SignIn from "./pages/SignIn/SignIn";
// import MainPage from "./pages/MainPage/MainPage";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";

const Home = lazy(() => import("./pages/Home/Home"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="fallback__box">
          <ImSpinner4 className="fallback__spinner" />
        </div>
      }
    >
      <Routes>
        <Route path="/" exact element={<SignIn />} />
        <Route path="/home" exact element={<Home />} />

        {/* Tracks Pages */}
        <Route path="/:track/*" exact element={<MainPage />} />

        {/* Error Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
};
export default App;
