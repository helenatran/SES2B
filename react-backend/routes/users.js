var express = require('express');
var router = express.Router();
const UserCtrl = require('../controllers/user-ctrl')

router.get('/get-users', UserCtrl.getUsers);

module.exports = router;