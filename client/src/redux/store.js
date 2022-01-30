import { configureStore } from "@reduxjs/toolkit";
import candidateReducer from "./candidate/candidateSlice";
import HRReducer from "./hr/HRSlice";

export default configureStore({
  reducer: {
    HRState: HRReducer,
    candidateState: candidateReducer,
  },
});
