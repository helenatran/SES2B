var express = require("express");
var router = express.Router();
const ExamAllocationCtrl = require("../controllers/exam_allocation-ctrl");

router.get("/create-exam-allocation", ExamAllocationCtrl.createExamAllocation);
router.get("/get-exam-allocations", ExamAllocationCtrl.getAllExamAllocations);
router.get("/get-exam-allocation/:id", ExamAllocationCtrl.getExamAllocation);
router.get("/update-exam-allocation/:id", ExamAllocationCtrl.updateExamAllocation);
router.get("/delete-exam-allocation/:id", ExamAllocationCtrl.deleteExamAllocation);

module.exports = router;
