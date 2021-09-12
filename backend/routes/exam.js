var express = require('express');
var router = express.Router();
const ExamCtrl = require('../controllers/exam-ctrl')
//routes used to access functions
router.get("/get-exams", ExamCtrl.getAllExams);
router.post("/create-exam", ExamCtrl.createExam);
router.get("/get-exam/:exam_id", ExamCtrl.getExam);
router.post("/delete-exam/:exam_id", ExamCtrl.deleteExam);
router.post("/update-exam/:exam_id", ExamCtrl.updateExam);

module.exports = router;