import styled from "styled-components";

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  height: 80%;
  width: 3px;
  background-color: black;
`;

const Hero = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-top: 25px;
  label {
    margin-bottom: 10px;
  }
`;

const Input = styled.input`
  font-size: 20px;
  width: 350px;
  padding: 10px;
  border-radius: 5px;
  outline: none;
`;

const Button = styled.button`
  font-size: 20px;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  align-self: center;
  padding: 5px;
`;

const Error = styled.div`
  color: red;
`;

export { Container, Divider, LoginContainer, Hero, Wrap, Input, Button, Error };
