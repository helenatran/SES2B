const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//following mongoose schema for data entries
const examSchema = new Schema({
  exam_id: {
    type: Number,
    required: true,
  },
  user_ids: {
    type: Array,
    required: true,
  },
  exam_name: {
    type: String,
    required: true,
  },
  date_time: {
    type: String,
    default: 0,
  },
  exam_url: {
    type: String,
    required: true
  }
});

const ExamModel = mongoose.model("ExamModel", examSchema, "exam");

module.exports = ExamModel;
