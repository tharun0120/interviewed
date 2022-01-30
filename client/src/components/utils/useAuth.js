import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearState, validateToken } from "../../redux/hr/HRSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateToken());
    return () => {
      dispatch(clearState());
    };
  }); //eslint-disable-line
  if (localStorage.getItem("candidateToken")) {
    return true;
  } else if (localStorage.getItem("token")) {
    return true;
  } else return false;
};

export default useAuth;
