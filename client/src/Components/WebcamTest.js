import React from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import SpyOnStudents from "./SpyOnStudents";

const VIDEO_ENDPOINT = "/video";

const RESOLUTION = {
  width: 640,
  height: 360,
};

/**
 * Component for testing webcam client-server connection.
 */
const WebcamTest = ({ examId }) => {
  const webcamRef = React.useRef();
  React.useEffect(() => {
    const randomUserId = "TEST_USER_ID:" + Math.floor(Math.random() * 1000);
    const socket = io(VIDEO_ENDPOINT);
    const uploadInterval = setInterval(() => {
      if (!webcamRef.current) return;
      const currentFrame = webcamRef.current.getScreenshot(RESOLUTION);
      socket.emit("send-frame", {
        frame: currentFrame,
        userId: randomUserId,
        examId,
      });
    }, 1000 / 20);
    return () => {
      clearInterval(uploadInterval);
      socket.close();
    };
  }, [examId]);
  return (
    <div>
      <h2>Direct webcam feed</h2>
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={{ aspectRatio: RESOLUTION.width / RESOLUTION.height }}
        screenshotQuality={0.3}
        onUserMediaError={(e) => alert(`Could not connect to webcam: ${e}`)}
      />
      <SpyOnStudents examId={examId} />
    </div>
  );
};

export default WebcamTest;
