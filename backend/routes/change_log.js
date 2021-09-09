var express = require('express');
var router = express.Router();
const ChangelogCtrl = require('../controllers/change_log-ctrl');

router.get('/create-change-log', ChangelogCtrl.createChangeLog);
router.get('/get-change-log/:id', ChangelogCtrl.getChangeLog);

module.exports = router;