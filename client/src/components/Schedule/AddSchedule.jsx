import React, { useEffect } from "react";
import styled from "styled-components";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import {
  LoginContainer,
  Wrap,
  Input,
  Button,
  Error,
} from "../utils/FormComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  registerCandidate,
  clearState,
  selectCandidate,
} from "../../redux/candidate/candidateSlice";
import { selectHR } from "../../redux/hr/HRSlice";
import { toast } from "react-toastify";

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

const AddSchedule = ({ setHome, setSchedule }) => {
  const dispatch = useDispatch();
  const { isSuccess, isError, error } = useSelector(selectCandidate);
  const { hr } = useSelector(selectHR);
  const password = Math.random().toString(36).slice(-7);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Scheduled Successfully");
      setHome(true);
      setSchedule(false);
    } else if (isError) {
      toast.error(error);
    }
    dispatch(clearState());
  }, [isSuccess, isError, error]); //eslint-disable-line

  return (
    <Container>
      <h2>Schedule an interview for a candidate</h2>
      <>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: `${password}`,
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
              hr_id: hr._id,
            };
            dispatch(registerCandidate(body));
          }}>
          <LoginContainer>
            <Form>
              <MyTextInput
                label="Name"
                name="name"
                type="text"
                placeholder="John Doe"
              />
              <MyTextInput
                label="Email"
                name="email"
                type="text"
                placeholder="example@mail.com"
              />
              <MyTextInput label="Password" name="password" type="text" />
              <Wrap>
                <Button type="submit">Schedule</Button>
              </Wrap>
            </Form>
          </LoginContainer>
        </Formik>
      </>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default AddSchedule;
