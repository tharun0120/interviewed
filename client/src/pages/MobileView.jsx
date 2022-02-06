import React from "react";
import styled from "styled-components";

const MobileView = () => {
  return (
    <Container>
      <span style={{ fontSize: "40px" }}>Sorry for the Inconvenience</span>
      <span>This site is not available on mobile devices.</span>
      <span>Please access the site from a suitable device.</span>
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
  text-align: center;
`;

export default MobileView;
