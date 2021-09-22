import React from "react";
import { io } from "socket.io-client";

const VIDEO_ENDPOINT = "/video";
const SpyOnStudentsTest = () => {
  const [examFrames, setExamFrames] = React.useState({});
  const testExamId = "TEST_EXAM_ID";
  React.useEffect(() => {
    const socket = io(VIDEO_ENDPOINT);
    socket.emit("request-webcam-frames", testExamId);
    socket.on("send-frames", (serverExamFrames) => {
      // Merge with existing frames, since server won't repeat the same frames twice
      setExamFrames((examFrames) => ({ ...examFrames, ...serverExamFrames }));
    });
    return () => {
      socket.close();
    };
  }, []);
  return (
    <>
      <h2>Webcam feeds from server for exam ID "{testExamId}"</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.entries(examFrames).map(([userId, frame]) => (
          <span>
            <h3>{userId}</h3>
            <img src={frame} alt={`Video for user ${userId}`} />
          </span>
        ))}
      </div>
    </>
  );
};

export default SpyOnStudentsTest;
