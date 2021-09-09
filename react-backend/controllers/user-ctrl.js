const User = require("../models/user-model");

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
	User.updateOne(
		{ email: req.params.email },
		{ $set: 
			{
				preferred_name: req.params.preferred_name, 
				mobile: req.params.mobile 
			}
		},
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

module.exports = {
	createUser,
	getUsers,
	getUserByEmail,
	updateUser
}