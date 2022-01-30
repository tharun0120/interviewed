import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { clearState, registerHR, selectHR } from "../../redux/hr/HRSlice";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Wrap>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Input {...field} {...props} />
      {meta.touched && meta.error ? <Error>{meta.error}</Error> : null}
    </Wrap>
  );
};

const Register = () => {
  const { isSuccess, isError, error, isLoggedIn } = useSelector(selectHR);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      toast.success("Registered Successfully");
      navigate("/");
    } else if (isError) {
      toast.error(error);
      dispatch(clearState());
    }
  }, [isSuccess, isError, error]); //eslint-disable-line

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
          const body = {
            name: values.name,
            email: values.email,
            password: values.password,
          };
          dispatch(registerHR(body));
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
