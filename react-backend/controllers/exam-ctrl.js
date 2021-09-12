const dbUtil = require("../db")
var db = dbUtil.getDb();
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
	// //gather data from client
	// const exam_id  = req.body.exam_id
	// const date_time  = req.body.date_time
	// const user_ids  = req.body.user_ids
	// const exam_name  = req.body.exam_name

	// //make default model
	// const exam= new examModel({exam_id: 12, date_time:"26/08/2021 9:30am", user_ids:[], exam_name: "test"});
	// try {
	// 	await exam.save(); //send data to db
	// 	res.send("inserted data");
	// }catch (err) {
	// 	console.log(err);
	// }


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