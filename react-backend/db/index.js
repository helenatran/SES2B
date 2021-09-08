var url =
  "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/SES2B?retryWrites=true&w=majority"; //Connection String
var mongoose = require("mongoose");

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
};
