var url =
  "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/SES2B?retryWrites=true&w=majority"; //Connection String
var mongoose = require("mongoose");

var _db;
var _bucket;

module.exports = {
  connectToServer: function (callback) {
    //Set up default mongoose connection
    mongoose.connect(
      url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      function (err, client) {
        return callback(err);
      }
    );
    _db = mongoose.connection;
    _db.once("open", () => {
      console.log("MongoDB connection successful");
    });
  },

  createGridBucket: function (callback) {
    try {
      _bucket = new mongoose.mongo.GridFSBucket(_db.db, { bucketName: "videoStorageBucket" });
      return callback(null);
    } catch (err) {
      return callback(err);
    }
  },

  getDb: function() {
    return _db;
  },

  getBucket: function () {
    return _bucket;
  },
};
