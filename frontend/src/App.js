import { lazy, Suspense } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { ImSpinner4 } from "react-icons/im";
import "./App.scss";

// import Home from "./pages/Home/Home";
// import SignIn from "./pages/SignIn/SignIn";
// import MainPage from "./pages/MainPage/MainPage";
// import ErrorPage from "./pages/ErrorPage/ErrorPage";

// Dynamic Imports
const Home = lazy(() => import("./pages/Home/Home"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

// Error Boundary FallbackComponent
const ErrorFallback = (props) => {
  return (
    <div role="alert" className="boundary__error">
      <p>Something went wrong!</p>
      <pre>{props.error.message}</pre>
      <button onClick={props.resetErrorBoundary}>Try again</button>
    </div>
  );
};

const App = () => {

  const navigate = useNavigate()

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        navigate("/");
      }}
    >
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
    </ErrorBoundary>
  );
};
export default App;
