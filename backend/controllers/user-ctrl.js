const User = require("../models/user-model");
const bcrypt = require('bcrypt');
var session = require('express-session');
//create new user -> really only for developer use at the moment
createUser = (req, res) => {
	const newUser = new User(req.body);

	User.find({ email: newUser.email }).exec(function (err, users) {
		if (users.length) {
			return res.status(400).json({
				success: false,
				error: 'User email already in use',
			});
		}
		else {
			newUser.save((err, result) => {
				if (err) {
					res.status(500).json(err);
				}
				else {
					res.status(201).json({
						success: true,
						email: newUser.email,
						message: 'User Added',
					});    
				}
			});
		}
	});
}

//Get all users
getUsers = (req, res) => {
    User.find((err, results) => {
		if (err) {
			res.status(500).json(err)
		}
		else{
			res.json(results)
		}
	});
}

//Get specific user by email
getUserByEmail = (req, res) => {
	User.findOne({ email: req.params.email }, (err, result) => {
		if (err) {
			res.status(500).json(err);
		} 
		else {
			res.json(result);
		}
	});	
}

//update user preferred name and/or mobile number
updateUser = (req, res) => {
	const updatedUser = {
		preferred_name: req.body.preferred_name,
		mobile: req.body.mobile,
	};

	User.find({email: req.body.email}).exec(function (err, users) {
		if (!users.length) {
			return res.status(400).json({
				success: false,
				error: 'User with that email does not exist',
			});
		}
		else{
			User.updateOne(
				{ email: req.body.email },
				{ $set: updatedUser },
				(err, result) => {
					if (err) {
						res.status(500).json(err);
					}
					else {
						return res.status(200).json({
							success: true,
							message: "User updated",
						});
					}
				}
			);
		}
	});
}

// Initialising the session for the user, if the session is stil active based on the cookie then the user will be automatically logged in
loginStatus = (req, res) => {
	var status = false;
	if (req.session.userid) {
		status = true;
	}
	res.json(status);
}

getUserId = (req, res) => {
	res.json({user_id: req.session.userid, id: req.session.id_number});
}

handleLogin = (req, res) => {
	User.find({email: req.body.email}).exec(function (err, users) {
		if (!users.length) {
			return res.status(400).json({
				loginStatus: false,
			});
		}
		else{
			user = users[0]
			bcrypt.compare(req.body.password, user.password, function (err, response) { // Checking the hash stored in the database with the entered value
				// if (err) throw err; //Built in error handler
				if (response && user.email == req.body.email) { // Check if the email is the same as the one stored in the database
					req.session.userid = user.email; // Sets the session to the user and assigns a cookie
					req.session.id_number = user.id_number
					//console.log(req.session); // logging the session for development purposes
					res.json({ loginStatus: true }); // responding with whether the user was able to login or not
				} else {
					res.json({ loginStatus: false }); // responding with whether the user was able to login or not
				}
			});
		}
	})
}

handleLogout = (req, res) => {
	req.session.destroy(function () { // Built in express session destroy function
		res.json({ status: false }); // Setting the login status to false
	});
}

module.exports = {
	createUser,
	getUsers,
	getUserByEmail,
	updateUser,
	handleLogout,
	handleLogin,
	loginStatus,
	getUserId
}
