import React, { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
import { useDispatch, useSelector } from "react-redux";
import { clearState, loginHR, selectHR } from "../../redux/hr/HRSlice";
import Loader from "../utils/Loader";

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
  const { isSuccess, isError, error, isLoggedIn, isFetching } =
    useSelector(selectHR);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Logged in");
      navigate("/");
    } else if (isError) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isSuccess, isError, error, isLoggedIn]); //eslint-disable-line

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <>
      {isFetching ? <Loader /> : <></>}
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
          const body = {
            email: values.email,
            password: values.password,
          };
          dispatch(loginHR(body));
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
