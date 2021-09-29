const ChangeLog = require("../models/change_log-model");

// Creating a change log at time that change is made
createChangeLog = (req, res) => {
    console.log(req.body);
    const newChangeLog = new ChangeLog(req.body);
    newChangeLog.save((err, result) => {
        if (err) {
            res.status(500).json(err);
        }
    }); 
};

// A method that gets all the change logs of a specific user (can be used for filtering/ordering later)
getChangeLogByUserId = (req, res) => {
    ChangeLog.find({ user_id: parseInt(req.params.user_id) }, (err, results) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(results);
        }
    });
};

module.exports = {
    getChangeLogByUserId,
    createChangeLog
}