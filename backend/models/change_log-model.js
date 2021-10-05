const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const changeLogSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
    },
    date_time: {
        type: Date,
        required: true,
    },
    field_changed: {
        type: String,
        required: true,
    },
    original_value: {
        type: String,
        required: true,
    },
    new_value: {
        type: String,
        required: true,
    },
});

const ChangeLog = mongoose.model("ChangeLog", changeLogSchema, "change_log");

module.exports = ChangeLog;