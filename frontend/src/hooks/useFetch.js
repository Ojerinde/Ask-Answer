import { useReducer, useCallback } from "react";

const initialState = {
  isLoading: false,
  error: { hasError: false, message: "" },
};

const fetchReducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, isLoading: action.value };
  }
  if (action.type === "ERROR") {
    return { ...state, error: action.value };
  }
  return initialState;
};

const useFetch = () => {
  const [fetchState, dispatchFn] = useReducer(fetchReducer, initialState);

  const closeError = () => {
    dispatchFn({ type: "ERROR", value: { hasError: false, message: "" } });
  };

  const fetchRequest = useCallback(
    async (requestConfig, getQuestionsFromRequest = () => {}) => {
      dispatchFn({ type: "LOADING", value: true });
      dispatchFn({ type: "ERROR", value: { hasError: false, message: "" } });
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        });
        if (!response.ok) {
          throw new Error(`${requestConfig.errorMessage}`);
        }
        const responseBody = await response.json();
        console.log(responseBody);
        getQuestionsFromRequest(responseBody);
      } catch (err) {
        dispatchFn({
          type: "ERROR",
          value: { hasError: true, message: err.message || "An error ocurred" },
        });
      }
      // After the request has been made
      dispatchFn({ type: "LOADING", value: false });
    },
    []
  );

  const { isLoading, error } = fetchState;
  return { isLoading, error, closeError, fetchRequest };
};
export default useFetch;
//
