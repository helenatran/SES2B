const User = require("../models/user-model");
const bcrypt = require('bcrypt');
var session = require('express-session');
const ChangeLog = require("../models/change_log-model");
const { createChangeLog } = require("./change_log-ctrl");
const { now } = require("mongoose");

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

//update user preferred name and/or mobile number and add to change log
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
		else {
			if ((users[0].mobile != updatedUser.mobile && updatedUser.mobile !=undefined) || (users[0].preferred_name != updatedUser.preferred_name && updatedUser.preferred_name != undefined )) {
				console.log("Updating User");
				User.updateOne(
				{ email: req.body.email },
				{ $set: updatedUser }, (err, result) => {
					if (err) {
						res.status(500).json(err);
					}
					else {
						//Name updated - mobile == undef on first change 
						console.log(users[0].mobile);
						console.log(updatedUser.mobile);
						console.log(users[0].preferred_name);
						console.log(updatedUser.preferred_name);
						if (updatedUser.mobile == undefined || (updatedUser.mobile != undefined && users[0].preferred_name != updatedUser.preferred_name && users[0].mobile == updatedUser.mobile)){
							console.log("Just Name Changed");
							changeLogName = new ChangeLog({
								user_id: users[0].id_number,
								date_time: now(),
								field_changed: "Preferred Name",
								original_value: users[0].preferred_name,
								new_value: updatedUser.preferred_name,
							});

							const req = {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: changeLogName
							};

							createChangeLog(req, res);

							res.status(200).json({
								success: true,
								message: "Change Log Has Been Updated",
								field_changed: "preferred_name",
							});
						}
						//if mobile changed on first go name is undefined
						else if (updatedUser.preferred_name == undefined || (updatedUser.preferred_name != undefined && users[0].preferred_name == updatedUser.preferred_name && users[0].mobile != updatedUser.mobile)){
							console.log("Just Mobile Changed");
							changeLogName = new ChangeLog({
								user_id: users[0].id_number,
								date_time: now(),
								field_changed: "mobile",
								original_value: users[0].mobile,
								new_value: updatedUser.mobile,
							});

							const req = {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: changeLogName
							};

							createChangeLog(req, res);

							res.status(200).json({
								success: true,
								message: "Change Log Has Been Updated",
								field_changed: "mobile",
							});
						} 
						//both updated - nothing undefined
						else if (users[0].mobile != updatedUser.mobile && users[0].preferred_name != updatedUser.preferred_name){
							console.log("Both");
							changeLogMobile = new ChangeLog({
								user_id: users[0].id_number,
								date_time: now(),
								field_changed: "mobile",
								original_value: users[0].mobile,
								new_value: updatedUser.mobile,
							});

							const reqMobile = {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: changeLogMobile
							};

							createChangeLog(reqMobile, res);

							changeLogName = new ChangeLog({
								user_id: users[0].id_number,
								date_time: now(),
								field_changed: "preferred_name",
								original_value: users[0].preferred_name,
								new_value: updatedUser.preferred_name,
							});

							const reqName = {
								method: "POST",
								headers: { "Content-Type": "application/json" },
								body: changeLogName
							};
							
							createChangeLog(reqName, res);
							
							res.status(200).json({
								success: true,
								message: "Change Log Has Been Updated",
								field_changed: "Both",
							});
						}
						else {
							console.log("Just Mobile Changed");
							res.status(200).json({
								success: true,
								message: "No change",
							});
						}
					}
				});
			}
			else {
				console.log("No Change");
				res.status(200).json({
					success: true,
					message: "No Change",
				});
			}
		}
	});
}

// Initializing the session for the user, if the session is still active based on the cookie then the user will be automatically logged in
loginStatus = (req, res) => {
	var status = false;
	if (req.session.userid) {
		status = true;
	}
	res.json(status);
}

// Get the currently logged-in user
getLoggedInUser = (req, res) => {
	const userEmail = req.session.userid;
	User.findOne({ email: userEmail }, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
}

// Get the email of the currently logged-in user
getLoggedInUserEmail = (req, res) => {
	res.json({user_id: req.session.userid});
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
		else {
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
  getLoggedInUser,
  getLoggedInUserEmail,
  getUserId
};
