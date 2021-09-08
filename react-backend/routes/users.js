var express = require('express');
var router = express.Router();
const UserCtrl = require('../controllers/user-ctrl')

router.post('/create-user', UserCtrl.createUser);
router.get('/get-users', UserCtrl.getUsers);
router.get('/get-user/:email', UserCtrl.getUserByEmail);
router.post('/update-user/:email/:preferred_name/:mobile', UserCtrl.updateUser);

module.exports = router;