var moment = require("moment");
var async = require("async");
var me = require("./me");

module.exports = {
	// GET
	get: function(req, res) {
		global.videos
			.find({
				_id: req.params.id
			})
			.limit(1)
			.next(function(err, video) {
				// oh no!
				if (err || !video) {
					return res.status(500).send(err);
				}

				// track the visit
				global.visits.insertOne({
					video: req.params.id,
					channel: video.channel,
					type: "video",
					time: moment.utc().toDate()
				});

				async.parallel(
					{
						// SUBSCRIPTIONS
						subscriptions: function(done_subscriptions) {
							if (req.cookies.credentials) {
								me.readSubscriptions(req.cookies.credentials, done_subscriptions);
							} else {
								// no credentials available
								return done_subscriptions(null, null);
							}
						},

						// CHANNEL
						channel: function(done_channel) {
							// find matching channel
							global.channels
								.find({
									_id: video.channel
								})
								.project({
									title: true,
									thumbnail: true,
									videos: true
								})
								.limit(1)
								.next(done_channel);
						}
					},
					function(err, results) {
						// oh no!
						if (err || !results.channel) {
							return res.status(500).send(err);
						}

						results.channel.subscribed = results.subscriptions
							? results.subscriptions.indexOf(results.channel._id) >= 0
							: false;
						video.channel = results.channel;

						return res.send(video);
					}
				);
			});
	}
};
