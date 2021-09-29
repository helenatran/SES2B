const ExamAllocation = require("../models/ExamAllocation");

module.exports = (io) => {

    var userId = "initialUserId";

    io.on("connection", (socket) => {
        socket.on("start-listening", (id) => {
            userId = id;
            console.log("Listening to "+ userId)
            socket.join(userId) //start listening to this id
        });

        ExamAllocation.watch([], {
            fullDocument: 'updateLookup'
        }).on('change', (change) => {
            // If the updated document matches the user watching
            if (change.fullDocument.user_id === userId){
                io.to(userId).emit("misconduct",change.fullDocument.misconduct_detection_times.length);
            }
        })
    })
    
        
}