const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {type: String},
        password: {type: String},
        first_name: {type: String},
        last_name: {type: String},
        preferred_name: {type: String},
        user_type: {type: String},
        //face_id: fix this when face_id is figured out more
        id_number: {type: Number},
        mobile: {type: String}, //mongo numbers do not store leading 0's, so to bypass this string has to be used
    }
)

const User = mongoose.model("User", UserSchema, "users");

module.exports = User;