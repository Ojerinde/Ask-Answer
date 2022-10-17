import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./ProfileSlice";

const store = configureStore({
    reducer: profileReducer
})

export default store