import React, { useEffect } from "react";
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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCandidate,
  clearState,
  loginCandidate,
} from "../../redux/candidate/candidateSlice";

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

const LoginCandidate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { candidate, isSuccess, isError, error } = useSelector(selectCandidate);

  useEffect(() => {
    if (isSuccess) {
      if (candidate?.isInterviewComplete) {
        localStorage.removeItem("candidateToken");
        toast.info("You have completed your interview");
        dispatch(clearState());
      } else {
        toast.success("Logged in");
        navigate("/test");
      }
    } else if (isError) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isSuccess, isError, error]); //eslint-disable-line

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
          const body = {
            email: values.email,
            password: values.password,
          };
          dispatch(loginCandidate(body));
        }}>
        <Container>
          <Hero>
            <h1>All the Best!!</h1>
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
          </LoginContainer>
        </Container>
      </Formik>
    </>
  );
};

export default LoginCandidate;
