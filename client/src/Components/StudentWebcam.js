import React from "react";
import Webcam from "react-webcam";
import { io } from "socket.io-client";
import "@tensorflow/tfjs-backend-webgl";
import * as bodyPix from "@tensorflow-models/body-pix";
import loadingSVG from "../Assets/loading-buffering.svg";

const VIDEO_ENDPOINT = "/video";

const UPLOAD_FPS = 20;
const RESOLUTION = {
  width: 640,
  height: 360,
};

const SEGMENTING_FPS = 10;
const BLUR_BACKGROUND_AMT = 12;
const BLUR_EDGES_AMT = 10;

/**
 * Component for testing webcam client-server connection.
 */
const StudentWebcam = ({ examId, userId }) => {
  const webcamRef = React.useRef();
  const canvasRef = React.useRef();
  const [net, setNet] = React.useState();

  React.useEffect(() => {
    if (!net) return;
    let unmounted = false; // Set to true when component is unmounted

    const socket = io(VIDEO_ENDPOINT);

    /**
     * Timestep for updating segment of person in video.
     * Determines what is "human" and what is "background".
     * This is expensive, so we run this at a lower framerate.
     */
    let segmentation; // PersonSegmentation object
    const updateSegment = async () => {
      if (unmounted) return;
      const startTime = performance.now();
      const webcamCanvas = webcamRef.current.getCanvas();
      segmentation = await net.segmentPerson(webcamCanvas, {
        segmentationThreshold: 0.7,
        maxDetections: 1,
        scoreThreshold: 1.0,
      });
      const deltaTime = performance.now() - startTime;
      const timestep = 1000 / SEGMENTING_FPS;
      window.setTimeout(updateSegment, Math.max(timestep - deltaTime, 0));
    };

    /**
     * Timestep for rendering the final video frame and sending it to the backend.
     * Uses the most recent `segmentation` to blur the background and not the student.
     */
    const updateAndUploadVideoFrame = async () => {
      if (unmounted) return;
      const startTime = performance.now();
      const webcamCanvas = webcamRef.current.getCanvas();
      if (segmentation) {
        // Render blurred background to canvas
        bodyPix.drawBokehEffect(
          canvasRef.current,
          webcamCanvas,
          segmentation,
          BLUR_BACKGROUND_AMT,
          BLUR_EDGES_AMT
        );
        // Render current canvas frame to base64 image string and upload to backend
        const currentFrame = canvasRef.current.toDataURL("image/jpeg", 0.4);
        socket.emit("send-frame", {
          frame: currentFrame,
          userId,
          examId,
        });
      }
      const deltaTime = performance.now() - startTime;
      const timestep = 1000 / UPLOAD_FPS;
      window.setTimeout(
        updateAndUploadVideoFrame,
        Math.max(timestep - deltaTime, 0)
      );
    };
    updateSegment();
    updateAndUploadVideoFrame();
    return () => {
      // Close socket and stop intervals when unmounted
      socket.close();
      unmounted = true;
    };
  }, [examId, userId, net]);
  return (
    <div>
      <h2>Direct webcam feed</h2>
      {/* Invisible canvas for rendering raw webcam image offscreen */}
      <Webcam
        ref={webcamRef}
        audio={false}
        videoConstraints={{ aspectRatio: RESOLUTION.width / RESOLUTION.height }}
        onUserMediaError={(e) => alert(`Could not connect to webcam: ${e}`)}
        onUserMedia={async () => {
          const net = await bodyPix.load({ architecture: "MobileNetV1" });
          setNet(net);
        }}
        style={{ visibility: "hidden", position: "absolute" }} // Needs to still have a width or else BodyPix gets angry
      />
      {/* Visible canvas for displaying final processed image */}
      <canvas
        ref={canvasRef}
        style={{
          width: RESOLUTION.width,
          height: RESOLUTION.height,
          backgroundImage: `url(${loadingSVG})`, // Show loading spinner behind webcam feed
          backgroundColor: "black",
          backgroundSize: "30%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
};

export default StudentWebcam;
