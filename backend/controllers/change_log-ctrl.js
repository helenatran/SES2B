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

// Get a change log based on its ID
getChangeLogById = (req, res) => {
    ChangeLog.findOne({ change_id: parseInt(req.params.change_id) }, (err, result) => {
        if (err) {
            res.status(500).json(err);
        }
        else {
            res.json(result);
        }
    });
};

//TODO: Add a method that gets all the change logs of a specific user

module.exports = {
    getChangeLogById,
    createChangeLog
}