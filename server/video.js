var moment = require("moment");
var async = require("async");

module.exports = {

	// GET
	get: function(req, res) {

		global.videos.find({
			"_id": req.params.id
		}).limit(1).next(function(err, video) {

			// oh no!
			if(err || !video) {
				return res.status(500).send(err);
			}

			// track the visit
			global.visits.insertOne({
				"video": req.params.id,
				"channel": video.channel,
				"type": "video",
				"time": moment.utc().toDate()
			});

			// find matching channel
			global.channels.find({
				"_id": video.channel
			}).project({
				"title": true,
				"thumbnail": true,
				"videos": true
			}).limit(1).next(function(err, channel) {

				// oh no!
				if(err && !channel) {
					return res.status(500).send(err);
				}

				video.channel = channel;
				return res.send(video);
			});
		});
	}
};
