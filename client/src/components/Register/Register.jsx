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
  // style={{ borderColor: `${border}` }}
  // const border = meta.error ? "red" : null;
  return (
    <Wrap>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </Wrap>
  );
};

const Register = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
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
            <h2>Register</h2>
            <Form>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder=""
              />
              <MyTextInput
                label="Email"
                name="email"
                type="text"
                placeholder="example@mail.com"
              />
              <MyTextInput label="Password" name="password" type="password" />
              <Wrap>
                <Button type="submit">Register</Button>
              </Wrap>
            </Form>
            <Wrap>
              <span>
                Already registered? <Link to="/login">Login</Link>
              </span>
            </Wrap>
          </LoginContainer>
        </Container>
      </Formik>
    </>
  );
};

export default Register;
