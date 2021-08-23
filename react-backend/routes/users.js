var express = require('express');
var router = express.Router();

//Session Management
var session = require('express-session');

var url = "mongmongodb+srv://Rheshav:SBgxypqdhUv859Q@sesg3.8gnmg.azure.mongodb.net/<dbname>?retryWrites=true&w=majority"; //Connection String
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'SES2B'; //MongoDB specified Library Cluster
const bcrypt = require('bcrypt');

// Initialising the session for the user, if the session is stil active based on the cookie then the user will be automatically logged in
router.get('/login-status', function (req, res, next) {
	var status = false;
  if(req.session.userid){
    status = true;
  }
  res.json(status);
});

router.get('/get-users', function (req, res, next) {
	
	var resultArray = []; //Used to store all the data into a local array to then be mapped in Home.js
	
	MongoClient.connect(url, function (err, client) { //Connecting to Mongodb
		
		assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
		
		const db = client.db(dbName);
		
		var cursor = db.collection('users').find();
		
		//Looping through the documents in the database to store into local array
		cursor.forEach(function (doc, err) {
			assert.equal(null, err);
			resultArray.push(doc); //storing to local array
		}, function () {
			client.close(); //closing database
			res.json(resultArray);
		});
		
	});
	
});

//Database insert function via router. Allows data updates on page loads
router.post('/insert-user', function (req, res, next) {
	var item = {
		username: req.body.username,
		
	}
	resultArray = [];
	//Access the database
	MongoClient.connect(url, function (err, client) {
		assert.equal(null, err); //Used to compare data and throw exceptions if data does not match. Used for development purposes only
		
		const db = client.db(dbName);
		
		db.collection('users').insertOne(item, function (err, result) { // Inserts the new item into the database
			console.log("account added");
			assert.equal(null, err);
		});
		
		var cursor = db.collection('users').find();
		//Looping through the documents in the database to store into local array
		cursor.forEach(function (doc, err) {
			assert.equal(null, err);
			resultArray.push(doc); //storing to local array
		}, function () {
			client.close(); //closing database
			res.json(resultArray);
		});
	})
});

router.post('/handle-login', function (req, res, next) {
	
	var user;

	MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
		if (err) throw err; // Built in error handler
		const db = client.db(dbName); // Setting db name from top variable
		db.collection("users").findOne({ // Finding the desired record within the database
			email: req.body.email
		},
		function (err, result) {
			if (err) throw err; // Built in error handler
			user = result; // For readability, classifying the result of the mongodb connection as a user
			if (user === undefined){
				res.json({loginStatus: false});
			}
			else {
				bcrypt.compare(req.body.password, user.password, function (err, response) { // Checking the hash stored in the database with the entered value
					// if (err) throw err; //Built in error handler
					if (response && user.email == req.body.email) { // Check if the email is the same as the one stored in the database

						req.session.userid = user.email; // Sets the session to the user and assigns a cookie
						// console.log(req.session); // logging the session for development purposes
						res.json({loginStatus: true}); // responding with whether the user was able to login or not
						
					} else {
						
						res.json({loginStatus: false}); // responding with whether the user was able to login or not
						
					}
				});
			}
			client.close();
		});
		
	});
	
});

router.post('/logout', function(req, res){
  req.session.destroy(function(){ // Built in express session destroy function
    res.json({status: false}); // Setting the login status to false
  });
});

module.exports = router;