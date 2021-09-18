const express = require("express");
const socketIO = require("socket.io");
const io = socketIO(4200, { cors: "*" });

const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Video route working!");
});

let lastWebcamFrame; // Base64 encoded image
io.on("connection", (socket) => {
  socket.on("send-frame", (msg) => {
    if (!msg) return;
    lastWebcamFrame = msg;
  });
  socket.on("request-webcam-frames", () => {
    socket.join("webcam-stream");
  });
});

setInterval(() => {
  if (!lastWebcamFrame) return;
  io.to("webcam-stream").emit("send-frame", lastWebcamFrame);
}, 100);

module.exports = router;
