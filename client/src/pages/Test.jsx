import React, { useState, useRef, useEffect } from "react";
import RecordRTC, { invokeSaveAsDialog } from "recordrtc"; //eslint-disable-line
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { uploadBlob } from "../components/TakeTest/upload.service";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCandidate,
  selectCandidate,
} from "../redux/candidate/candidateSlice";

const Test = () => {
  const questions = [
    "Tell us about yourself?",
    "What are you passionate about?",
    "How are you seeing yourself in 5 years?",
    "Why should we hire you?",
    "What are your strengths and weaknesses?",
  ];
  const [nextQuestion, setNextQuestion] = useState(-1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, error } = useSelector(selectCandidate);

  const [stream, setStream] = useState(null);
  const [blob, setBlob] = useState(null); //eslint-disable-line
  const refVideo = useRef(null);
  const recorderRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const hasGetUserMedia = !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );

  const handleRecording = async () => {
    try {
      // const cameraStream = await navigator.mediaDevices.getUserMedia({
      //   video: true,
      //   audio: true,
      // });
      // setStream(cameraStream);
      recorderRef.current = new RecordRTC(cameraStream, { type: "video" });
      recorderRef.current.startRecording();
    } catch (error) {
      toast.error("Access to camera denied");
      toast.info("Start your camera and reload");
      setDisabled(true);
    }
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      stream.getTracks()[0].stop();
      setBlob(recorderRef.current.getBlob());
      // console.log(recorderRef.current.getBlob());
      handleUpload(recorderRef.current.getBlob());
    });
  };

  const handleUpload = async (blob) => {
    const reader = new FileReader();

    reader.addEventListener("load", async () => {
      const dataUrl = reader.result;
      const base64EncodedData = dataUrl.split(",")[2];
      // console.log(dataUrl);
      // console.log(base64EncodedData);
      const response = await toast.promise(uploadBlob(base64EncodedData), {
        pending: "Uploading Your Interview. Please wait...",
        success: {
          render({ data }) {
            // console.log(data);
            return `${data}`;
          },
        },
        error: {
          render({ data }) {
            return `${data}`;
          },
        },
      });
      if (response === "Uploaded Successfully") {
        navigate("/end");
        dispatch(updateCandidate({ isInterviewComplete: true }));
        if (isError) {
          toast.error(error);
          toast.info("Contact the HR through email!");
        }
        if (isSuccess) {
          toast.success("You can close this window.");
        }
      } else {
        toast.info("Contact the HR through email!");
      }
    });

    reader.readAsDataURL(blob);

    // blobToBase64();
    // console.log(blobData);
    // try {
    //   await uploadBlob(blobData).then((message) => {
    //     toast.success(message);
    //   });
    // } catch (error) {
    //   toast.error(error);
    // }
  };

  // const handleSave = () => {
  //   invokeSaveAsDialog(blob);
  //   navigate("/end");
  // };

  useEffect(() => {
    if (!hasGetUserMedia) {
      toast.warn(
        "Your browser cannot stream from your webcam. Please switch to Chrome or Firefox."
      );
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        setCameraStream(stream);
        refVideo.current.srcObject = stream;
        setDisabled(false);
      })
      .catch((error) => {
        toast.info("Allow access for the webcam and refresh");
        setDisabled(true);
      });
  }, [refVideo, hasGetUserMedia]);

  // useEffect(() => {
  //   if (!refVideo.current) {
  //     return;
  //   }
  //   refVideo.current.srcObject = stream;
  // }, [stream, refVideo]);

  return (
    <Container>
      <Wrapper>
        <QuestionSection>
          {nextQuestion === -1 ? (
            <span>Click start to start the interview</span>
          ) : (
            <span>{questions[nextQuestion]}</span>
          )}
        </QuestionSection>
        <VideoSection>
          {stream ? (
            <video
              playsInline
              muted
              ref={refVideo}
              autoPlay
              style={{ width: "100%", height: "90%" }}
            />
          ) : (
            <div
              style={{
                width: "90%",
                height: "90%",
                border: "2px dashed black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              Start Your Camera
            </div>
          )}
          <Controls>
            {nextQuestion === -1 ? (
              <Button
                disabled={disabled}
                onClick={() => {
                  handleRecording();
                  setNextQuestion(nextQuestion + 1);
                }}>
                Start
              </Button>
            ) : nextQuestion < 4 ? (
              <Button
                disabled={disabled}
                onClick={() => setNextQuestion(nextQuestion + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={handleStop}>End</Button>
            )}
            {/* <Button onClick={handleSave}>Save</Button> */}
          </Controls>
        </VideoSection>
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 90%;
  height: 80%;
  border: 3px solid black;
  border-radius: 6px;
  padding: 10px;
  display: flex;
`;

const QuestionSection = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  text-align: center;
`;
const VideoSection = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Controls = styled.div`
  display: flex;
  padding-top: 20px;
`;
const Button = styled.button`
  cursor: pointer;
  outline: none;
  color: white;
  background-color: black;
  width: 150px;
  height: 40px;
  font-size: 15px;
  margin: 0 15px;
  letter-spacing: 1px;
  border: none;
`;

export default Test;
