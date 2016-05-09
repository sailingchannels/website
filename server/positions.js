var ais = require("ais");
var moment = require("moment");
var async = require("async");
var validator = require("validator");
var inreach = require("inreach");

module.exports = {

	// READ AIS POSITION
	readAISPosition: function(mmsi, callback) {

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
	readInReachPosition: function(username, callback) {

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
	readPosition: function(profile, callback) {

		// check for inreach
		if(profile && "inreach" in profile && profile.inreach.length > 0) {
			module.exports.readInReachPosition(profile.inreach, function(pos, more) {

				// no position? fallback to mmsi / ais positioning
				if(pos === null) {

					if(profile && "mmsi" in profile && profile.mmsi.length > 0) {
						module.exports.readAISPosition(profile.mmsi, function(pos, more) {
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
			module.exports.readAISPosition(profile.mmsi, function(pos, more) {
				return callback(pos, more, "mmsi");
			});
		}

		// nothing here to see
		else {
			return callback(null, null, null);
		}
	}
};
