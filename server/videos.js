var moment = require("moment");
var async = require("async");

module.exports = {

	// GEO
	"geo": function(req, res) {

		console.log(req.params.lng, req.params.lat);

		// query videos that are near this position
		global.videos.geoNear(parseFloat(req.params.lng), parseFloat(req.params.lat), {
			"maxDistance": 0.1,
			"spherical": true
		}, function(err, docs) {

			if(err) {
				console.log(err);
				return res.status(500).send(err);
			}

			// prepare the results to be returned to the client
			async.map(docs.results, function(item, done) {

				// fetch channel title
				global.channels.findOne({"_id": item.obj.channel}, {
					"fields": {
						"title": 1
					}
				}, function(err, channel) {

					if(err || !channel) {
						return done(err || "no channel available", null);
					}

					return done(null, {
						"t": item.obj.title,
						"i": item.obj._id,
						"d": item.obj.description,
						"c": channel.title,
						"ci": item.obj.channel
					});
				});

			}, function(err, results) {
				return res.send(results);
			});
		});
	}
};
