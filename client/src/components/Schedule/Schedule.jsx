import React from "react";
import styled from "styled-components";
// import { MdOutlineAccountCircle } from "react-icons/md";

const Schedule = () => {
  return (
    <Container>
      <Nav>
        <h2>Interviewed.</h2>
        <Wrap>
          <span>Scheudle</span>
          <span>View Candidates</span>
        </Wrap>
        <Button>Logout</Button>
      </Nav>
      <Main>
        <h2>Hello There!</h2>
        <p>Click Schedule to schedule interviews.</p>
        <p>Click view candidates to views the scheduled interviews.</p>
        <ScheduledList>{/* <MdOutlineAccountCircle /> */}</ScheduledList>
      </Main>
    </Container>
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
  /* width: 1132px; */
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
`;

const ScheduledList = styled.div``;

export default Schedule;
