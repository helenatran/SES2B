import React from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import SpyOnStudentsTest from "./SpyOnStudentsTest";

const VIDEO_ENDPOINT = `${window.location.hostname}:3001/video`;
const WebcamTest = () => {
  const webcamRef = React.useRef();
  React.useEffect(() => {
    const randomUserId = "TEST_USER_ID:" + Math.floor(Math.random() * 1000);
    const socket = io(VIDEO_ENDPOINT);
    const uploadInterval = setInterval(() => {
      if (!webcamRef.current) return;
      const currentFrame = webcamRef.current.getScreenshot({
        width: 640,
        height: 360,
      });
      socket.emit("send-frame", {
        frame: currentFrame,
        userId: randomUserId,
        examId: "TEST_EXAM_ID",
      });
    }, 1000 / 20);
    return () => {
      clearInterval(uploadInterval);
      socket.close();
    };
  }, []);
  return (
    <div>
      <h2>Direct webcam feed</h2>
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={{ aspectRatio: 16.0 / 9.0 }}
        screenshotQuality={0.3}
        onUserMediaError={(e) => alert(`Could not connect to webcam: ${e}`)}
      />
      <SpyOnStudentsTest />
    </div>
  );
};

export default WebcamTest;
