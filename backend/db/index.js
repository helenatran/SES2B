var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"; //Connection String
const MongoClient = require('mongodb').MongoClient;
const mongodb = require("mongodb");
const dbName = 'SES2B'; //MongoDB specified Library Cluster

var _db;
var _bucket;

module.exports = {
    connectToServer: function( callback ) {
        MongoClient.connect( url,  { useNewUrlParser: true, useUnifiedTopology: true }, function( err, client ) {
            _db  = client.db(dbName);
            return callback( err );
        });
    },

    createGridBucket: function(callback) {
        try {
            _bucket = new mongodb.GridFSBucket(_db, { bucketName: 'videoStorageBucket'});
            return(callback(null))
        }
        catch (err){
            return callback(err);
        }
    },
    
    getDb: function() {
        return _db;
    },

    getBucket: function() {
        return _bucket;
    }
}