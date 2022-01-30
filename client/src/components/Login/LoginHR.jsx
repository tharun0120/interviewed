import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import {
  Container,
  Divider,
  LoginContainer,
  Hero,
  Wrap,
  Input,
  Button,
  Error,
} from "../utils/FormComponents";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Wrap>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </Wrap>
  );
};

const LoginHR = () => {
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(7, "Must be 7 characters or more")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}>
        <Container>
          <Hero>
            <h1>Interviewed.</h1>
          </Hero>
          <Divider></Divider>
          <LoginContainer>
            <h2>Login</h2>
            <Form>
              <MyTextInput
                label="Email"
                name="email"
                type="text"
                placeholder="example@mail.com"
              />
              <MyTextInput label="Password" name="password" type="password" />
              <Wrap>
                <Button type="submit">Login</Button>
              </Wrap>
            </Form>
            <Wrap>
              <span>
                New here? <Link to="/register">Register</Link>
              </span>
            </Wrap>
          </LoginContainer>
        </Container>
      </Formik>
    </>
  );
};

export default LoginHR;
