const ExamAllocation = require("../models/ExamAllocation");

createExamAllocation = (req, res) => {
  const newExamAllocation = new ExamAllocation(req.body);
  newExamAllocation.save((err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
};

getAllExamAllocations = (req, res) => {
  ExamAllocation.find((err, results) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
};

// Get an exam allocaton given the exam and student IDs
getExamAllocation = (req, res) => {
  ExamAllocation.findOne(
    {
      exam_id: parseInt(req.params.exam_id),
      user_id: parseInt(req.params.user_id),
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};

// Update an exam allocation given the exam and student IDs
updateExamAllocation = (req, res) => {
  const updatedExamAllocation = {
    seat: req.body.seat,
    warnings: req.body.warnings,
    misconduct_detection_times: req.body.misconduct_detection_times,
  };
  ExamAllocation.findOneAndUpdate(
    {
      exam_id: parseInt(req.params.exam_id),
      user_id: parseInt(req.params.user_id),
    },
    { $set: updatedExamAllocation },
    { new: true },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};

// Delete an exam allocation given the exam and student IDs
deleteExamAllocation = (req, res) => {
  ExamAllocation.deleteOne(
    {
      exam_id: parseInt(req.params.exam_id),
      user_id: parseInt(req.params.user_id),
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    }
  );
};

logMisconduct = (req, res) => {
  ExamAllocation.findOne(
    {
      exam_id: parseInt(req.params.exam_id),
      user_id: parseInt(req.params.user_id),
    },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        let misConductArray = result.misconduct_detection_times
        let tempDate = new Date()
        array.push(tempDate)

        if(misConductArray.length == 2) {
          let updatedExamAllocation = {
            misconduct_detection_times: misConductArray,
            ended_at: new Date(),
          };

        } else {
          let updatedExamAllocation = {
            misconduct_detection_times: misConductArray,
          };
        }
        ExamAllocation.findOneAndUpdate(
          {
            exam_id: parseInt(req.params.exam_id),
            user_id: parseInt(req.params.user_id),
          },
          { $set: updatedExamAllocation },
          { new: true },
          (err, result) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.json(result.misconduct_detection_times.length);
            }
          }
        );
      }
    }
  )

}

module.exports = {
  createExamAllocation,
  getAllExamAllocations,
  getExamAllocation,
  updateExamAllocation,
  deleteExamAllocation,
  logMisconduct
};
