const dbUtil = require("../db")
var db = dbUtil.getDb();

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

module.exports = {
    getUsers
}