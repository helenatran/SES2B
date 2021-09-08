import React from "react";
import { io } from "socket.io-client";

const SpyOnStudentTest = () => {
  const imgFrameRef = React.useRef();
  React.useEffect(() => {
    const socket = io(`${window.location.hostname}:4200`);
    socket.emit("request-webcam-frames");
    socket.on("send-frame", (imgSrc) => {
      if (!imgFrameRef.current) return;
      imgFrameRef.current.src = imgSrc;
    });
    return () => {
      socket.close();
    };
  }, []);
  return (
    <div>
      <h2>Webcam feed from server</h2>
      <img ref={imgFrameRef} />
    </div>
  );
};

export default SpyOnStudentTest;
