// Transmits and receives video from clients
module.exports = (io) => {
  // Key: examId, Value: Map<userId, lastWebcamFrame (as base64 string)>
  const webcamFrames = new Map();

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

  // Send frames to subscribed clients 20 times a second
  setInterval(() => {
    webcamFrames.forEach((examFrames, examId) => {
      io.to(`webcam-streams-${examId}`).emit(
        "send-frames",
        Object.fromEntries(examFrames) // Convert to JSON object, since Maps won't serialize properly
      );
    });
    webcamFrames.clear();
  }, 1000.0 / 20.0);
};
