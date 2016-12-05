var ais = require("ais");
var moment = require("moment");
var async = require("async");
var validator = require("validator");
var inreach = require("inreach");

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

	// READ POSITION
	readPosition: function(user, callback) {

		var profile = user.profile;

		// check for inreach
		if(profile && "inreach" in profile && profile.inreach.length > 0) {
			module.exports.readInReachPosition(user._id, profile.inreach, function(pos, more) {

				// no position? fallback to mmsi / ais positioning
				if(pos === null) {

					if(profile && "mmsi" in profile && profile.mmsi.length > 0) {
						module.exports.readAISPosition(user._id, profile.mmsi, function(pos, more) {
							return callback(pos, more, "mmsi");
						});
					}
					else {
						return callback(null, null, null);
					}
				}
				else {
					return callback(pos, more, "inreach");
				}
			});
		}

		// check for mmsi
		else if(profile && "mmsi" in profile && profile.mmsi.length > 0) {
			module.exports.readAISPosition(user._id, profile.mmsi, function(pos, more) {
				return callback(pos, more, "mmsi");
			});
		}

		// nothing here to see
		else {
			return callback(null, null, null);
		}
	},

	// LAST
	// retriece the last n positions per channel
	last: function(req, res) {

		var n = parseInt(req.params.n);

		if(n > 0) {

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

				// remap properties of array
				positions = positions.map((p) => {

					// remap time
					p["time"] = p["_id"]["time"];
					delete p["_id"];

					return p;
				});

				return res.send(positions);
			});
		}
		else {
			return res.send([]);
		}
	},

	// GEOLOCATIONS
	geolocations: function(req, res) {

		global.videos.find({
			"geo": {
				"$exists": true
			}
		}).project({
			"_id": true,
			"geo": true
		}).toArray(function(err, locations) {

			// handle the error
			if(err || !locations) {
				return res.status(500).send(err || "unable to retrieve geolocations");
			}

			var geojson = {
				"type": "FeatureCollection",
				"features": []
			};

			var unique = [];

			// iterate over locations and build geojson
			for(var l in locations) {

				if(unique.indexOf(locations[l].geo.geometries[g]) === -1) {

					// iterate over the geometries of the locations
					for(var g in locations[l].geo.geometries) {
						var feature = {
							"type": "Feature",
							"geometry": locations[l].geo.geometries[g]
						}

						geojson.features.push(feature);
						unique.push(locations[l].geo.geometries[g]);
					}
				}
			}

			return res.send(geojson);
		});
	}
};
