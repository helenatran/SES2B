const dbUtil = require("../db");
const ObjectId = require("mongodb").ObjectId;
var db = dbUtil.getDb();

//TODO: replace testExamAllocation with received examAllocation
createExamAllocation = (req, res) => {
  const testExamAllocation = {
    exam_id: 1,
    user_id: 1,
    seat: 1,
    warnings: 1,
    break_start: Date.now(),
    break_end: Date.now() + 1,
    total_break: 0,
    misconductDetectionTimes: [],
  };

  db.collection("exam_allocation").insertOne(testExamAllocation, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
};

getAllExamAllocations = (req, res) => {
  db.collection("exam_allocation")
    .find()
    .toArray((err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(results);
      }
    });
};

getExamAllocation = (req, res) => {
  db.collection("exam_allocation").findOne({ _id: new ObjectId(req.params.id) }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
};

// TODO: replace $set
updateExamAllocation = (req, res) => {
  db.collection("exam_allocation").updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: { seat: 5 } },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};

deleteExamAllocation = (req, res) => {
  db.collection("exam_allocation").deleteOne(
    { _id: new ObjectId(req.params.id) },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = {
  createExamAllocation,
  getAllExamAllocations,
  getExamAllocation,
  updateExamAllocation,
  deleteExamAllocation,
};
