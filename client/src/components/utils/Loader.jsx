import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <Container>
      <Load />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  height: 5px;
  background-color: transparent;
  margin: 0;
  position: fixed;
`;

const Load = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    background-color: #03a9f4;
    animation: loader_one 1.5s infinite ease-out;
  }

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    background-color: #4fc3f7;
    animation: loader_two 1.5s infinite ease-in;
  }

  @keyframes loader_one {
    0% {
      left: -100%;
      width: 100%;
    }
    100% {
      left: 100%;
      width: 10%;
    }
  }

  @keyframes loader_two {
    0% {
      left: -150%;
      width: 100%;
    }
    100% {
      left: 100%;
      width: 10%;
    }
  }
`;

export default Loader;
