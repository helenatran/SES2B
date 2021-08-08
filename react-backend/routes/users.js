var express = require('express');
var router = express.Router();

var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"; //Connection String
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'SES2B'; //MongoDB specified Library Cluster

//Database document retrieval. Retrieves all data from the specified collection 

router.get('/', function(req, res, next) {
	res.json([{
		id: 1,
		username: "samsepi0l"
	}, {
		id: 2,
		username: "D0loresH4ze"
	}]);
});

router.get('/get-users', function(req, res, next){

	var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
  
	MongoClient.connect(url, function(err, client){ //Connecting to Mongodb
  
	  assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
  
	  const db = client.db(dbName);
  
	  var cursor = db.collection('users').find();
  
	  //Looping through the documents in the database to store into local array
	  cursor.forEach(function(doc, err) {
		assert.equal(null, err);
		resultArray.push(doc); //storing to local array
	  }, function(){
		client.close(); //closing database
		res.json(resultArray);
	  });
  
	});
  
});

module.exports = router;