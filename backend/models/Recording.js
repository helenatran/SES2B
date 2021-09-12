const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
  exam_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  recording_id: {
    type: String,
    required: true
  },
});

const Recording = mongoose.model("Recording", recordingSchema, "recording");

module.exports = Recording;
