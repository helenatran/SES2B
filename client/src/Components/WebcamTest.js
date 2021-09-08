import React from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import SpyOnStudentTest from "./SpyOnStudentTest";

const WebcamTest = () => {
  const webcamRef = React.useRef();
  React.useEffect(() => {
    const socket = io(`${window.location.hostname}:4200`);
    const uploadInterval = setInterval(() => {
      if (!webcamRef.current) return;
      const currentFrame = webcamRef.current.getScreenshot({
        width: 640,
        height: 360,
      });
      socket.emit("send-frame", currentFrame);
    }, 1000 / 15);
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
        screenshotQuality={0.1}
      />
      <SpyOnStudentTest />
    </div>
  );
};

export default WebcamTest;
