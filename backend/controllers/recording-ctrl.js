const Recording = require('../models/Recording')
const dbUtil = require("../db")
var bucket = dbUtil.getBucket();
var mongoose = require("mongoose");
var fs = require('fs');
var path = require("path")

const tempFolder = path.join('..','temp','recordings')
if (!fs.existsSync(tempFolder)){
    fs.mkdirSync(tempFolder, {recursive: true});
}

createRecording = (req, res) => {
    try {
        const file = path.join(tempFolder,req.params.fileName)
        fs.createReadStream(path.join(tempFolder,req.params.fileName)).pipe(
            bucket.openUploadStream(req.params.fileName, {
                chunkSizeBytes: 1048576,
            }).once('finish', function() {
                // Delete local file
                fs.unlink(file, (err) => {
                    if (err) {
                        throw err;
                    }
                    else{
                        console.log(file+" was deleted");
                    }
                })
                // update recording database
                const doc = {
                    "exam_id":parseInt(req.params.exam_id),
                    "user_id":parseInt(req.params.user_id),
                    "recording_id": req.params.fileName,
                }
                const recording = new Recording(doc);
                recording.save((err, result) => {
                    if (err) {
                        res.status(500).json(err)
                    } else{
                        res.json(result)
                    }
                })
                
            })
        )
        
    }
    catch (err){
        res.status(500).json(err);
    }
    
}

getRecording = async (req, res) => {
    const cursor = bucket.find({filename: req.params.fileName});
    var doc_id = undefined;
    await cursor.forEach(doc => {
        doc_id = new mongoose.Types.ObjectId(doc._id);
    });
    if (doc_id != undefined){
        const file = path.join(tempFolder, req.params.fileName)
        // Downloads from database to temp/recordings folder for fetching from front end. When the user stops interacting,
        // the front end code will need to delete it from storage.
        bucket.openDownloadStreamByName(req.params.fileName).pipe(
            fs.createWriteStream(file).once("finish", function(){
                res.json([file])
            })
        )
    }
    else{
        return res.status(400).json({
            error: 'This file does not exist in the server.',
        });
    }
    
}

deleteRecording = async (req, res) => {
    const cursor = bucket.find({filename: req.params.fileName});
    var doc_id;
    await cursor.forEach(doc => {
        doc_id = new mongoose.Types.ObjectId(doc._id);
    });
    try{
        bucket.delete(doc_id);
        Recording.deleteOne({
            recording_id: req.params.fileName
        },
        (err, result) => {
            if (err){
                res.status(500).join(err);
            }
            else{
                res.json(result)
            }
        })
    }
    catch(error){
        res.status(500).json(error)
    }
}

module.exports = {
    createRecording,
    getRecording,
    deleteRecording
}