import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <span style={{ fontSize: "40px" }}>Seems like You are lost!</span>
      <span>
        Reach Home Safely through here <Link to="/">Home .</Link>
      </span>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default NotFound;
