var ais = require("ais");
var moment = require("moment");
var async = require("async");
var validator = require("validator");
var inreach = require("inreach");
var predictwind = require("predictwind");

module.exports = {

	// READ AIS POSITION
	readAISPosition: function(userId, mmsi, callback) {

		if(!mmsi) return callback(null);

		if(!validator.isNumeric(mmsi) || mmsi.trim().length !== 9) {
			return callback(null);
		}

		mmsi = mmsi.trim();

		// try cache
		global.CACHE_ais_positions.find({"_id": mmsi}).next(function(err, data) {

			// not a cache hit
			if(err || !data) {

				try {
					ais.get(mmsi, function(pos, more) {

						// store value in cache
						global.CACHE_ais_positions.insert({
							"_id": mmsi,
							"pos": pos,
							"more": more,
							"stored": moment.utc().toDate()
						});

						// store value in positions history
						try {
							global.positions.insert({
								"_id": {
									"user": userId,
									"time": more.time
								},
								"pos": pos,
								"spd": more.speed,
								"crs": more.course,
								"src": {
									"type": "AIS",
									"mmsi": mmsi,
									"name": more.name
								}
							});
						} catch (e) {

						}

						return callback(pos, more);
					});
				}
				catch(e) {
					return callback(null, null);
				}
			}
			else {
				return callback(data.pos, data.more);
			}
		});
	},

	// READ INREACH POSITION
	readInReachPosition: function(userId, username, callback) {

		if(!username || username.trim().length < 2) return callback(null);

		username = username.trim();

		// try cache
		global.CACHE_inreach_positions.find({"_id": username}).next(function(err, data) {

			// not a cache hit
			if(err || !data) {

				try {
					inreach.get(username, function(pos, more) {

						// store value in cache
						global.CACHE_inreach_positions.insert({
							"_id": username,
							"pos": pos,
							"more": more,
							"stored": moment.utc().toDate()
						});

						// store position in history
						try {
							global.positions.insert({
								"_id": {
									"user": userId,
									"time": more.time
								},
								"pos": pos,
								"spd": more.speed,
								"crs": more.course,
								"src": {
									"type": "InReach",
									"username": username,
									"name": more.name
								}
							});
						}
						catch(e) {

						}

						return callback(pos, more);
					});
				}
				catch(e) {
					return callback(null, null);
				}
			}
			else {
				return callback(data.pos, data.more);
			}
		});
	},

	// READ PREDICTWIND POSITION
	readPredictWindPosition: function(userId, username, callback) {

		if(!username || username.trim().length < 2) return callback(null);

		username = username.trim();

		// try cache
		global.CACHE_predictwind_positions.find({"_id": username}).next(function(err, data) {

			// not a cache hit
			if(err || !data) {

				try {
					predictwind.get(username, function(pos, more) {

						// store value in cache
						global.CACHE_predictwind_positions.insert({
							"_id": username,
							"pos": pos,
							"more": more,
							"stored": moment.utc().toDate()
						});

						// store position in history
						try {
							global.positions.insert({
								"_id": {
									"user": userId,
									"time": more.time
								},
								"pos": pos,
								"spd": more.speed,
								"crs": more.course,
								"src": {
									"type": "PredictWind",
									"username": username,
									"name": more.name
								}
							});
						}
						catch(e) {}

						return callback(pos, more);
					});
				}
				catch(e) {
					return callback(null, null);
				}
			}
			else {
				return callback(data.pos, data.more);
			}
		});
	},

	// READ POSITION
	readPosition: function(user, callback) {

		var profile = user.profile;
		if(!profile) return callback(null, null, null);

		async.waterfall([

			// predict wind
		    function(done) {

				// check for predictwind
				if("predictwind" in profile && profile.predictwind.length > 0) {

					// read latest predict wind position
					module.exports.readPredictWindPosition(user._id, profile.inreach, function(pos, more) {

						return done(null, pos, more);
					});
				}
				else return done(null, null, null);
		    },

			// inreach
		    function(pos, more, done) {

				// previous position exists? pass through
				if(pos) return done(null, pos, more);

				// check for inreach
				if("inreach" in profile && profile.inreach.length > 0) {

					// read latest inreach position
					module.exports.readInReachPosition(user._id, profile.inreach, function(pos, more) {

						return done(null, pos, more);
					});
				}
		    },

			// ais
		    function(pos, more, done) {

				// previous position exists? pass through
				if(pos) return done(null, pos, more);

				// check for ais
				if(profile && "mmsi" in profile && profile.mmsi.length > 0) {

					// read latest ais position
					module.exports.readAISPosition(user._id, profile.mmsi, function(pos, more) {

						return done(null, pos, more);
					});
				}
		    }

		], callback);
	},

	// LAST
	// retriece the last n positions per channel
	last: function(req, res) {

		var n = (req.params.n) ? parseInt(req.params.n) : 100;

		// fetch positions
		global.positions.find({
			"_id.user": req.params.id
		}).sort({
			"_id.time": -1
		}).project({
			"time": false
		}).limit(n).toArray(function(err, positions) {

			// handle the error
			if(err || !positions) {
				return res.status(500).send(err || "unable to retrieve positions");
			}

			return res.send(positions);
		});
	}
};
