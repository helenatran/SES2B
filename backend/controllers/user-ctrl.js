const dbUtil = require("../db")
var db = dbUtil.getDb();
const bcrypt = require('bcrypt');
var session = require('express-session');

getUsers = (req, res) => {
	db.collection('users').find().toArray(function(err, results){
		if (err) {
			res.status(500).json(err)
		}
		else{
			res.json(results)
		}
	})
}

// Initialising the session for the user, if the session is stil active based on the cookie then the user will be automatically logged in
loginStatus = (req, res) => {
	var status = false;
  if(req.session.userid){
    status = true;
  }
  res.json(status);
}

handleLogin = (req, res) => {
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
					//console.log(req.session); // logging the session for development purposes
					res.json({loginStatus: true}); // responding with whether the user was able to login or not
				} else {
					res.json({loginStatus: false}); // responding with whether the user was able to login or not
				}
			});
		}
	});
}

handleLogout = (req, res) => {
	req.session.destroy(function(){ // Built in express session destroy function
    res.json({status: false}); // Setting the login status to false
  });
}


module.exports = {
    getUsers,
		handleLogout,
		handleLogin,
		loginStatus
}