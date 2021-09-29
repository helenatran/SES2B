var express = require('express');
var router = express.Router();
const RecordingCtrl = require('../controllers/recording-ctrl')

router.get('/upload-recording/:fileName/:user_id/:exam_id', RecordingCtrl.createRecording);
router.get('/delete-recording/:fileName', RecordingCtrl.deleteRecording);
router.get('/get-recording/:fileName', RecordingCtrl.getRecording);

module.exports = router;