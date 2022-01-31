const useAuth = ({ from }) => {
  if (from === "candidate" && localStorage.getItem("candidateToken")) {
    return true;
  } else if (localStorage.getItem("token")) {
    return true;
  } else return false;
};

export default useAuth;
