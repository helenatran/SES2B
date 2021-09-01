const dbUtil = require("../db")
var db = dbUtil.getDb();
var bucket = dbUtil.getBucket();
var fs = require('fs');
var path = require("path")

const tempFolder = path.join('..','temp','recordings')

// CRUD

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
                        console.log(err);
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
                const result = db.collection("recording").insertOne(doc).then(() => {
                    res.status(400).json(["Success"]);
                });
                
            })
        )
        
    }
    catch (err){
        console.log(err);
        res.status(500).json(err);
    }
    
}

getRecording = (req, res) => {
    const file = path.join(tempFolder, req.params.fileName)
    // Downloads from database to temp/recordings folder for fetching from front end. When the user stops interacting,
    // the front end code will need to delete it from storage.
    bucket.openDownloadStreamByName(req.params.fileName).pipe(
        fs.createWriteStream(file).once("finish", function(){
            res.json([file])
        })
    )
}

deleteRecording = async (req, res) => {
    const cursor = bucket.find({filename: req.params.fileName});
    var doc_id;
    await cursor.forEach(doc => {
        console.log('1st');
        doc_id = doc._id;
    });
    bucket.delete(doc_id);

    const result = await db.collection("recording").deleteOne({recording_id: req.params.fileName});
    res.json(["Success"]);
}

module.exports = {
    createRecording,
    getRecording,
    deleteRecording
}