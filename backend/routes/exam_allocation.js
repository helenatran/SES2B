var express = require("express");
var router = express.Router();
const ExamAllocationCtrl = require("../controllers/exam_allocation-ctrl");

router.get("/create-exam-allocation", ExamAllocationCtrl.createExamAllocation);
router.get("/get-exam-allocations", ExamAllocationCtrl.getAllExamAllocations);
router.get("/get-exam-allocation/:user_id/:exam_id", ExamAllocationCtrl.getExamAllocation);
router.get("/update-exam-allocation/:user_id/:exam_id", ExamAllocationCtrl.updateExamAllocation);
router.get("/delete-exam-allocation/:user_id/:exam_id", ExamAllocationCtrl.deleteExamAllocation);
router.post("/log-misconduct/:user_id/:exam_id", ExamAllocationCtrl.logMisconduct)

module.exports = router;
