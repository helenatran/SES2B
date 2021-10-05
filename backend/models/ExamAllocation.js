const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const examAllocationSchema = new Schema({
  exam_id: {
    type: Number,
    required: true,
  },
  user_id: {
    type: Number,
    required: true,
  },
  seat: {
    type: Number,
  },
  warnings: {
    type: Number,
    default: 0,
  },
  misconduct_detection_times: {
    type: [Date],
  },
  started_at: {
    type: Date,
  },
  ended_at: {
    type: Date,
  },
});

const ExamAllocation = mongoose.model("ExamAllocation", examAllocationSchema, "exam_allocation");

module.exports = ExamAllocation;
