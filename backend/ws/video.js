const ffmpegPath = require("ffmpeg-static");
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

const fs = require("fs-extra");
const VIDEO_STORAGE_FOLDER = "./video_storage";
const VIDEO_FPS = 20.0;

const VIDEO_RECORDING_SEGMENT_SECONDS = 60.0;

// Transmits and receives video from clients
module.exports = (io) => {
  // Key: examId, Value: Map<userId, lastWebcamFrame (as base64 string)>
  const webcamFrames = new Map();
  // Key: examId__userId, Value: FfmpegCommand
  const openFolders = new Set();

  io.on("connection", (socket) => {
    // Called by students to send their current webcam frame
    socket.on("send-frame", ({ frame, userId, examId }) => {
      if (!webcamFrames.has(examId)) {
        webcamFrames.set(examId, new Map());
      }
      const examFrames = webcamFrames.get(examId);
      examFrames.set(userId, frame);
    });
    // Called by examiners when they want to start watching a stream
    socket.on("request-webcam-frames", (examId) => {
      socket.join(`webcam-streams-${examId}`); // Join room for requested streams
    });
  });

  // Key: `${examId}__${userId}`, Value: frameNumber
  const frameNumbers = new Map();
  let lastSegmentTime = Date.now();
  // Send frames to subscribed clients 20 times a second
  setInterval(() => {
    webcamFrames.forEach((examFrames, examId) => {
      // Send frames to observers
      io.to(`webcam-streams-${examId}`).emit(
        "send-frames",
        Object.fromEntries(examFrames) // Convert to JSON object, since Maps won't serialize properly
      );

      // Write frames to disk for recording
      examFrames.forEach(async (frame, userId) => {
        const key = `${examId}__${userId}`;
        const dir = `${VIDEO_STORAGE_FOLDER}/${key}`;
        openFolders.add(dir);
        const tempDir = `${dir}/tmp/${lastSegmentTime}`;
        const frameNumber = frameNumbers.has(key)
          ? frameNumbers.get(key) + 1
          : 0;
        frameNumbers.set(key, frameNumber);
        await fs.ensureDir(tempDir);
        await fs.writeFile(`${tempDir}/${frameNumber}.jpg`, frame, "base64");
      });
    });
  }, 1000.0 / VIDEO_FPS);

  setInterval(() => {
    openFolders.forEach((dir) => {
      const framesFolder = `${dir}/tmp/${lastSegmentTime}`;
      ffmpeg()
        .input(`${framesFolder}/%d.jpg`)
        .withInputFPS(VIDEO_FPS)
        .withOutputFPS(VIDEO_FPS)
        .on("end", () => {
          fs.remove(framesFolder);
        })
        .on("error", (e) => {
          console.error(
            "An error occurred when converting frames to video segment:",
            e
          );
        })
        .save(`${dir}/${Date.now()}.mp4`);
    });
    lastSegmentTime = Date.now();
    frameNumbers.clear();
  }, VIDEO_RECORDING_SEGMENT_SECONDS * 1000);
};
