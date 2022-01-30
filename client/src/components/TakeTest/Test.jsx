import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Test = () => {
  //questions
  const questions = [
    "Tell us about yourself?",
    "What are you passionate about?",
    "How are you seeing yourself in 5 years?",
    "Why should we hire you?",
    "What are your strengths and weaknesses?",
  ];
  const [nextQuestion, setNextQuestion] = useState(-1);

  const [stream, setStream] = useState();
  const myVideo = useRef();
  let media_recorder = null;
  let blobs_recorded = [];
  const download_link = useRef();
  const [url, setUrl] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        myVideo.current.srcObject = stream;
      });
  }, []);

  const startRec = () => {
    setNextQuestion(nextQuestion + 1);
    // set MIME type of recording as video/webm
    media_recorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    // event : new recorded video blob available
    media_recorder.addEventListener("dataavailable", function (e) {
      blobs_recorded.push(e.data);
    });

    // event : recording stopped & all blobs sent
    media_recorder.addEventListener("stop", function () {
      // create local object URL from the recorded video blobs
      let video_local = URL.createObjectURL(
        new Blob(blobs_recorded, { type: "video/webm" })
      );
      let video = new Blob(blobs_recorded, { type: "video/webm" });
      console.log(video);
      // console.log(video_local);
      setUrl(video_local);
      sendBlobAsBase64(video);
    });

    // start recording with each recorded blob having 1 second video
    media_recorder.start(1000);
  };

  function sendBlobAsBase64(blob) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const dataUrl = reader.result;
      const base64EncodedData = dataUrl.split(",")[1];
      // console.log(base64EncodedData);
      sendDataToBackend(base64EncodedData);
    });

    reader.readAsDataURL(blob);
  }

  function sendDataToBackend(base64EncodedData) {
    const body = JSON.stringify({
      data: base64EncodedData,
    });
    fetch("/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => console.log(json));
  }

  const stopRec = () => {
    media_recorder.stop();
  };

  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  // const blob = b64toBlob(b64Data, contentType);
  // const blobUrl = URL.createObjectURL(blob);

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
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: "100%", height: "90%" }}
          />
          <Controls>
            {nextQuestion === -1 ? (
              <Button onClick={startRec}>Start</Button>
            ) : nextQuestion < 4 ? (
              <Button onClick={() => setNextQuestion(nextQuestion + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={stopRec}>End</Button>
            )}
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

{
  /* <a ref={download_link} download="test.webm" href={url}>
              Download Video
            </a> */
}
