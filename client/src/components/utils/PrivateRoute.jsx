import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearState, validateToken } from "../../redux/hr/HRSlice";

const PrivateRoute = ({ children, from }) => {
  const auth = useAuth({ from });
  const dispatch = useDispatch();
  useEffect(() => {
    if (from === "hr") {
      dispatch(validateToken());
      return () => {
        dispatch(clearState());
      };
    }
  }); //eslint-disable-line
  if (from === "hr") return auth ? children : <Navigate to="/login" />;
  else if (from === "candidate")
    return auth ? children : <Navigate to="/candidate/login" />;
};

export default PrivateRoute;
