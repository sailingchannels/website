var moment = require("moment");
var async = require("async");

// IS ADMIN?
var isAdmin = function(userId, callback) {

	// check if a user that is admin exists under this user id
	global.users.count({"_id": userId, "admin": true}, function(err, count) {
		return callback(!err && count === 1);
	});
};

module.exports = {

	// GET BLACKLIST CHANNELS
	blacklisted: function(req, res) {

		// check if request is authenticated
		var me = req.cookies.me;
		if(!me) {
			return res.status(401).send({"error": "no permission to perform this operation"});
		}

		if(!("_id" in me)) {
			return res.status(400).send({"error": "no user id found"});
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {

			// user is not admin
			if(admin === false) {
				return res.status(401).send({"error": "no permission to perform this operation"});
			}

			// all blacklisted channels
			global.blacklist.find({}).toArray(function(err, data) {

				if(err) {
					return res.status(500).send({"error": err});
				}

				return res.send(data);
			});
		});
	}
};
