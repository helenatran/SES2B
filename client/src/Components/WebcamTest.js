import React from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";

const WebcamTest = () => {
  const webcamRef = React.useRef();
  const imgFrameRef = React.useRef();
  React.useEffect(() => {
    const socket = io(`${window.location.hostname}:4200`);
    const uploadInterval = setInterval(() => {
      if (!webcamRef.current || !imgFrameRef.current) return;
      const currentFrame = webcamRef.current.getScreenshot({
        width: 640,
        height: 360,
      });
      socket.emit("send-frame", currentFrame);
      imgFrameRef.current.src = currentFrame;
    }, 100);
    return () => {
      clearInterval(uploadInterval);
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
      <h2>Last frame sent to server</h2>
      <img ref={imgFrameRef} />
    </div>
  );
};

export default WebcamTest;
