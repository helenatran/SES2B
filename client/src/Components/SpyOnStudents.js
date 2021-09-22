import React from "react";
import { io } from "socket.io-client";

import "./SpyOnStudents.css";

const VIDEO_ENDPOINT = "/video";
/**
 * Displays a grid of webcam feeds for each student in the given `examId`.
 */
const SpyOnStudents = ({ examId }) => {
  const [examFrames, setExamFrames] = React.useState({});
  React.useEffect(() => {
    // Request and listen to webcam frames being sent from server
    const socket = io(VIDEO_ENDPOINT);
    socket.emit("request-webcam-frames", examId);
    socket.on("send-frames", (serverExamFrames) => {
      // Merge with existing frames, since server won't repeat the same frames twice
      setExamFrames((examFrames) => ({ ...examFrames, ...serverExamFrames }));
    });
    return () => {
      socket.close();
    };
  }, [examId]);
  return (
    <>
      <h2>Exam {examId}</h2>
      <div class="student-video-grid">
        {Object.entries(examFrames).map(([userId, frame]) => (
          <span>
            <p class="student-video-name-overlay">{userId}</p>
            <img src={frame} alt={`Video for user ${userId}`} />
          </span>
        ))}
      </div>
    </>
  );
};

export default SpyOnStudents;
