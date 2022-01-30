import React, { useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectHR, getCandidates } from "../../redux/hr/HRSlice";

const ListSchedule = () => {
  const dispatch = useDispatch();
  const { candidates, isSuccess, isError, error } = useSelector(selectHR);

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }
  }, [isSuccess, isError, error]);

  useEffect(() => {
    dispatch(getCandidates());
  }, []); //eslint-disable-line

  return (
    <Container>
      {candidates.length <= 0 ? (
        <div
          style={{
            textAlign: "center",
            alignSelf: "center",
          }}>
          <h3>No interviews scheduled yet.</h3>
          <h3>Click schedule to schedule one.</h3>
        </div>
      ) : (
        <>
          <h2>List of Scheduled Candidates</h2>
          <Table>
            <Row>
              <Item>
                <span>Name</span>
              </Item>
              <Item>
                <span>Email</span>
              </Item>
              <Item>
                <span>Status</span>
              </Item>
              <Item>
                <span>Assessment</span>
              </Item>
            </Row>
            {candidates.map((candidate) => {
              console.log(candidate);
              return (
                <Row>
                  <Item>
                    <span>{candidate?.name}</span>
                  </Item>
                  <Item>
                    <span>{candidate?.email}</span>
                  </Item>
                  <Item>
                    {candidate?.isInterviewComplete ? (
                      <Tag style={{ backgroundColor: "lightgreen" }}>
                        Complete
                      </Tag>
                    ) : (
                      <Tag style={{ backgroundColor: "lightblue" }}>
                        Didnt Start
                      </Tag>
                    )}
                  </Item>
                  <Item>
                    <span>blob download</span>
                  </Item>
                </Row>
              );
            })}
          </Table>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Table = styled.div`
  padding-top: 50px;
  width: 100%;
  border-collapse: collapse;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  width: 90%;
  display: flex;
  padding: 10px;
  align-items: center;
  justify-content: space-evenly;
  border-bottom: 2px solid black;
  border-left: none;
`;

const Item = styled.div`
  width: 100%;
  text-align: center;
  padding: 15px;
  border-right: 2px solid black;

  &:last-child {
    border-right: none;
  }
`;

const Tag = styled.div`
  padding: 5px 5px;
  border-radius: 4px;
  color: black;
`;

export default ListSchedule;
