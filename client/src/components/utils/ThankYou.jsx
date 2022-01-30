import React from "react";
import styled from "styled-components";

const ThankYou = () => {
  return (
    <Container>
      <span style={{ fontSize: "40px" }}>Thank You!</span>
      <span>The intervieww has been submitted successfully.</span>
      <span>Please be patient. Hr will reach you through your mail.</span>
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

export default ThankYou;
