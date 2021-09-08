const express = require("express");
const socketIO = require("socket.io");
const io = socketIO(4200, { cors: "*" });

const router = express.Router();

router.get("/", function (req, res, next) {
  res.send("Video route working!");
});

io.on("connection", (socket) => {
  console.log("New connection");
  socket.on("send-frame", (msg) => {
    if (!msg) return;
    console.log(`Video frame received: ~${msg.length / 1000} KB`);
  });
});

module.exports = router;
