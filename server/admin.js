var moment = require("moment");
var async = require("async");
var youtube = require("youtube-api");

// IS ADMIN?
var isAdmin = function(userId, callback) {
	// check if a user that is admin exists under this user id
	global.users.count({ _id: userId, admin: true }, function(err, count) {
		return callback(!err && count === 1);
	});
};

module.exports = {
	// GET BLACKLIST CHANNELS
	getBlacklisted: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// all blacklisted channels
			global.blacklist.find({}).toArray(function(err, data) {
				if (err) {
					return res.status(500).send({ error: err });
				}

				return res.send(data);
			});
		});
	},

	// DELETE BLACKLISTED
	deleteBlacklisted: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// actually delete item from mongodb
			global.blacklist.remove({ _id: req.params.id }, function(
				err,
				result
			) {
				if (err) {
					return res.status(500).send({ error: err });
				}

				return res.send({
					_id: req.params.id
				});
			});
		});
	},

	// ADD BLACKLISTED
	addBlacklisted: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// add an id to the blacklisted list
			global.blacklist.insert(
				{
					_id: req.params.id
				},
				function(err, result) {
					if (err) {
						return res.status(500).send({ error: err });
					}

					// remove the existance of this channel from all collections
					global.channels.remove({ _id: req.params.id });
					global.positions.remove({ "_id.user": req.params.id });
					global.subscribers.remove({ "_id.channel": req.params.id });
					global.videos.remove({ channel: req.params.id });
					global.views.remove({ "_id.channel": req.params.id });
					global.visits.remove({ "_id.channel": req.params.id });

					return res.send({
						_id: req.params.id
					});
				}
			);
		});
	},

	// ADDITIONAL
	getAdditional: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// all blacklisted channels
			global.additional.find({}).toArray(function(err, data) {
				if (err) {
					return res.status(500).send({ error: err });
				}

				return res.send(data);
			});
		});
	},

	// DELETE ADDITIONAL
	deleteAdditional: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// actually delete item from mongodb
			global.additional.remove({ _id: req.params.id }, function(
				err,
				result
			) {
				if (err) {
					return res.status(500).send({ error: err });
				}

				return res.send({
					_id: req.params.id
				});
			});
		});
	},

	// ADD ADDITIONAL
	addAdditional: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// add an id to the blacklisted list
			global.additional.insert(
				{
					_id: req.params.id
				},
				function(err, result) {
					if (err) {
						return res.status(500).send({ error: err });
					}

					return res.send({
						_id: req.params.id
					});
				}
			);
		});
	},

	// GET FLAGS
	getFlags: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// all blacklisted channels
			global.flags
				.find({})
				.sort({
					when: -1
				})
				.toArray(function(err, data) {
					if (err) {
						return res.status(500).send({ error: err });
					}

					return res.send(data);
				});
		});
	},

	// DELETE BLACKLISTED
	deleteFlags: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// actually delete item from mongodb
			global.flags.remove(
				{
					"_id.channel": req.params.channel,
					"_id.user": req.params.user
				},
				function(err, result) {
					if (err) {
						return res.status(500).send({ error: err });
					}

					return res.send({
						_id: {
							channel: req.params.channel,
							user: req.params.user
						}
					});
				}
			);
		});
	},

	// GET CHANNEL INFO
	getChannelInfo: function(req, res) {
		// check if request is authenticated
		var credentials = req.cookies.credentials;
		if (!credentials) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		// authenticate next request
		global.oauth.setCredentials(credentials);

		youtube.channels.list(
			{
				part: "snippet",
				id: req.params.id
			},
			function(err, data) {
				try {
					// create response
					return res.send({
						title: data.items[0].snippet.title,
						description: data.items[0].snippet.description,
						thumbnail: data.items[0].snippet.thumbnails.default.url
					});
				} catch (e) {
					return res.status(500).send({ err: e });
				}
			}
		);
	},

	// GET SUGESTED CHANNELS
	getSuggestions: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// all blacklisted channels
			global.suggestions.find({}).toArray(function(err, data) {
				if (err) {
					return res.status(500).send({ error: err });
				}

				return res.send(data);
			});
		});
	},

	// DELETE SUGGESTIONS
	deleteSuggestions: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res
				.status(401)
				.send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// check if user is admin
		isAdmin(me._id, function(admin) {
			// user is not admin
			if (admin === false) {
				return res
					.status(401)
					.send({ error: "no permission to perform this operation" });
			}

			// actually delete item from mongodb
			global.suggestions.remove(
				{
					"_id.channel": req.params.channel,
					"_id.user": req.params.user
				},
				function(err, result) {
					if (err) {
						return res.status(500).send({ error: err });
					}

					return res.send({
						_id: {
							channel: req.params.channel,
							user: req.params.user
						}
					});
				}
			);
		});
	}
};
