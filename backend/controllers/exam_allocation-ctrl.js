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

writeStartTime = (req, res) => {
  var updatedExamAllocation = {
    started_at: new Date(),
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

writeEndTime = (req, res) => {
  var updatedExamAllocation = {
    ended_at: new Date(),
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
        var array = result.misconduct_detection_times
        var temp = new Date()
        array.push(temp)
        
        const updatedExamAllocation = {
          misconduct_detection_times: array,
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
  logMisconduct,
  writeStartTime,
  writeEndTime
};
