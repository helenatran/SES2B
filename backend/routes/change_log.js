var express = require("express");
var router = express.Router();
const ChangelogCtrl = require("../controllers/change_log-ctrl");

router.post("/create-change-log", ChangelogCtrl.createChangeLog);
router.get("/get-change-log/:change_id", ChangelogCtrl.getChangeLogById);

module.exports = router;