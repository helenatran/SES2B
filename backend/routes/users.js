var express = require('express');
var router = express.Router();
const UserCtrl = require('../controllers/user-ctrl')

router.post('/create-user', UserCtrl.createUser);
router.get('/get-users', UserCtrl.getUsers);
router.get('/get-user/:email', UserCtrl.getUserByEmail);
router.post('/update-user', UserCtrl.updateUser);
router.get('/login-status', UserCtrl.loginStatus);
router.post('/handle-login', UserCtrl.handleLogin);
router.post('/logout', UserCtrl.handleLogout);
router.get("/get-current-user", UserCtrl.getLoggedInUser);
router.get("/user_id", UserCtrl.getLoggedInUserEmail);
module.exports = router;
