const dbUtil = require("../db");
var db = dbUtil.getDb();
var mongoose = require("mongoose");

// Get a change log based on its ID
getChangeLog = (req, res) => {
    db.collection('change_log').findOne({_id: new ObjectId(req.params.id)}, (err, results) => {
        if (err) {
            res.status(500).json(err)
        }
        else {
            res.json(results)
        }
    });
}

// Creating a change log at time that change is made
createChangeLog = (req, res) => {
    const changeLogTest = {
        user_id: 7,
        date_time: 7077045416236476417,
        field_changed: "this one",
        original_value: "that one",
        new_value: "new value"
    };

    db.collection("change_log").insertOne(changeLogTest, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(result);
        }
    });
}

module.exports = {
    getChangeLog,
    createChangeLog
}