import React from "react";
import Webcam from "react-webcam";

const WebcamTest = () => {
  const webcamRef = React.useRef();
  return (
    <div>
      <Webcam ref={webcamRef} audio={false} />
      test
    </div>
  );
};

export default WebcamTest;
