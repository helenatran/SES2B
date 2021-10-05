var express = require("express");
var router = express.Router();
const ExamAllocationCtrl = require("../controllers/exam_allocation-ctrl");

router.get("/create-exam-allocation", ExamAllocationCtrl.createExamAllocation);
router.get("/get-exam-allocations", ExamAllocationCtrl.getAllExamAllocations);
router.get("/get-exam-allocations-by-user/:user_id", ExamAllocationCtrl.getAllExamAllocationsByStudent);
router.get("/get-exam-allocations-by-exam/:exam_id", ExamAllocationCtrl.getAllExamAllocationsByExam);
router.get("/get-exam-allocation/:user_id/:exam_id", ExamAllocationCtrl.getExamAllocation);
router.get("/update-exam-allocation/:user_id/:exam_id", ExamAllocationCtrl.updateExamAllocation);
router.get("/delete-exam-allocation/:user_id/:exam_id", ExamAllocationCtrl.deleteExamAllocation);
router.patch("/write-start-time/:user_id/:exam_id", ExamAllocationCtrl.writeStartTime);
router.patch("/write-end-time/:user_id/:exam_id", ExamAllocationCtrl.writeEndTime);

module.exports = router;
