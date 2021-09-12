const ExamModel = require("../models/Exam");

//Retrieve exams using the  model format
getAllExams = (req, res) => {
    ExamModel.find((err, results) => {
		if (err) {
			res.status(500).json(err)
		}
		else{
			res.json(results)
		}
	})
}
// Get a single exam allocaton using the exam ID
getExam = (req, res) => {
	ExamModel.findOne(
	  {
		exam_id: parseInt(req.params.exam_id),
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

//Create exam  with a list of entries that follow the schema
createExam = (req, res) => {
	const newExamModel = new ExamModel(req.body);
	newExamModel.save((err, result) => {
	  if (err) {
		res.status(500).json(err);
	  } else {
		res.json(result);
	  }
	});

};


// Delete an exam using exam ID aka nuke it
//in your front end, amke sure you pass the id only
deleteExam = (req, res) => {
	ExamModel.deleteOne(
	  {
		exam_id: parseInt(req.params.exam_id),
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


  // Update an exam using the exam ID
  //req will consist of all entries.
  //update the fields stated in examModel that are required
updateExam = (req, res) => {
	const updatedExamModel = {
	  user_ids: req.body.user_ids,
	  exam_name: req.body.exam_name,
	  date_time: req.body.date_time,
	};
	ExamModel.findOneAndUpdate(
	  {
		exam_id: parseInt(req.params.exam_id),
	  },
	  { $set: updatedExamModel },
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

module.exports = {
    getAllExams,
	createExam,
	getExam,
	deleteExam,
	updateExam

}