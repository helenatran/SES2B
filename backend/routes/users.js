var express = require('express');
var router = express.Router();
const UserCtrl = require('../controllers/user-ctrl')

router.get('/get-users', UserCtrl.getUsers);
router.get('/login-status', UserCtrl.loginStatus);
router.post('/handle-login', UserCtrl.handleLogin);
router.post('/logout', UserCtrl.handleLogout);

module.exports = router;