var url =
  "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/SES2B?retryWrites=true&w=majority"; //Connection String
var mongoose = require("mongoose");

var _db;

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
    var db = mongoose.connection;
    db.once("open", () => {
      console.log("MongoDB connection successful");
    });
  },

  //TODO: To be removed when all database have converted to mongoose schemas
  getDb: function () {
    return _db;
  },
};
