const ExamAllocation = require("../models/ExamAllocation");

module.exports = (io) => {
    ExamAllocation.watch([], {
        fullDocument: 'updateLookup'
    }).on('change', (change) => {
          const userId = change.fullDocument.user_id;
          io.to(userId).emit("misconduct", change.fullDocument.misconduct_detection_times.length);
    });
    io.on("connection", (socket) => {
        socket.on("start-listening", (userId) => {
            console.log("Listening to " + userId)
            socket.join(userId) //start listening to this id
        });
    })
}
