import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AddSchedule from "./AddSchedule";
import ListSchedule from "./ListSchedule";
import { useDispatch, useSelector } from "react-redux";
import { logoutHR, selectHR, clearState } from "../../redux/hr/HRSlice";
import { selectCandidate } from "../../redux/candidate/candidateSlice";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const Schedule = () => {
  const [schedule, setSchedule] = useState(false);
  const [view, setView] = useState(false);
  const [home, setHome] = useState(true);
  const { hr, isSuccess, isError, isLoggedIn, error } = useSelector(selectHR);
  const { isFetching } = useSelector(selectCandidate);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setHome(!(schedule || view));
  }, [view, schedule]);

  useEffect(() => {
    if (!localStorage.getItem("token") && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]); //eslint-disable-line

  const logout = async () => {
    dispatch(logoutHR());
    if (isSuccess) {
      dispatch(clearState());
      toast.success("Logged Out");
      navigate("/login");
    } else if (isError) {
      toast.error(error);
      dispatch(clearState());
    }
  };

  return (
    <>
      {isFetching ? <Loader /> : <></>}
      <Container>
        <Nav>
          <h2>Interviewed.</h2>
          <Wrap>
            <Button
              onClick={() => {
                setSchedule(!schedule);
                setView(false);
              }}>
              Scheudle
            </Button>
            <Button
              onClick={() => {
                setView(!view);
                setSchedule(false);
              }}>
              View Candidates
            </Button>
          </Wrap>
          <Button onClick={() => logout()}>Logout</Button>
        </Nav>
        <Main>
          {home && (
            <>
              <h2>Hello There, {hr?.name}!</h2>
              <p>Click Schedule to schedule interviews.</p>
              <p>Click view candidates to views the scheduled interviews.</p>
            </>
          )}
          {schedule && (
            <AddSchedule setHome={setHome} setSchedule={setSchedule} />
          )}
          {view && <ListSchedule />}
        </Main>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: start;
`;
const Nav = styled.nav`
  width: 20%;
  height: 80%;
  border-right: 1.5px solid black;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const Main = styled.main`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 20px;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  padding: 5px;
  margin-top: 10px;
  width: 150px;
  border: none;
  background-color: black;
  color: white;
  align-self: center;
  padding: 10px 15px;
`;

export default Schedule;
