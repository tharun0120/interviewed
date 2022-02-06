import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginCandidate from "./components/Login/LoginCandidate";
import LoginHR from "./components/Login/LoginHR";
// import Test from "./components/TakeTest/Test";
import Test from "./pages/Test";
import Register from "./components/Register/Register";
import Schedule from "./components/Schedule/Schedule";
import ThankYou from "./components/utils/ThankYou";
import Loader from "./components/utils/Loader";
import PrivateRoute from "./components/utils/PrivateRoute";
import NotFound from "./components/utils/NotFound";
import MobileView from "./pages/MobileView";

const App = () => {
  const isMobile = navigator.userAgentData.mobile;
  return (
    <>
      <Router>
        <Routes>
          {isMobile ? (
            <Route path="*" element={<MobileView />} />
          ) : (
            <>
              <Route
                path="/"
                element={
                  <PrivateRoute from="hr">
                    <Schedule />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<LoginHR />} />
              <Route path="/register" element={<Register />} />
              <Route path="/candidate/login" element={<LoginCandidate />} />
              <Route
                path="/test"
                element={
                  <PrivateRoute from="candidate">
                    <Test />
                  </PrivateRoute>
                }
              />
              <Route path="/end" element={<ThankYou />} />
              <Route path="/load" element={<Loader />} />
              <Route path="/*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
