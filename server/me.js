var positions = require("./positions");
var moment = require("moment");
var async = require("async");
var ISO6391 = require("iso-639-1");
var youtube = require("youtube-api");

module.exports = {
	// ME
	// return as many data about the user as we can find, including channel
	// information, if the user is listed
	me: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res.status(401).send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		async.parallel(
			{
				// read the users information
				user: function(done) {
					global.users.findOne(
						{
							_id: me._id
						},
						{ fields: { credentials: false } },
						function(err, user) {
							if (err) return done(err);

							// does the user have a profile with mmsi number?
							if (user.profile && user.profile.mmsi) {
								// fetch latest ais position
								positions.readPosition(user, function(pos, more, source) {
									user.position = pos;
									user.vesselinfo = more;
									user.positionsource = source;

									return done(null, user);
								});
							} else {
								return done(null, user);
							}
						}
					);
				},

				// try to fetch information on the channel of the user
				channel: function(done) {
					global.channels
						.find({
							_id: me._id
						})
						.limit(1)
						.project({
							videos: false
						})
						.next(done);
				},

				// fetch the subscriber history of last 7 days
				subscribers: function(done) {
					global.subscribers
						.find({
							"_id.channel": me._id,
							date: {
								$gte: moment()
									.subtract(7, "days")
									.toDate()
							}
						})
						.sort({ date: 1 })
						.project({
							subscribers: true
						})
						.toArray(done);
				},

				// fetch the view history of last 7 days
				views: function(done) {
					global.views
						.find({
							"_id.channel": me._id,
							date: {
								$gte: moment()
									.subtract(7, "days")
									.toDate()
							}
						})
						.sort({ date: 1 })
						.project({
							views: true
						})
						.toArray(done);
				},

				// VISITS TO CHANNEL
				visits_channel: function(done) {
					global.visits.count(
						{
							channel: me._id,
							type: "channel",
							time: {
								$gte: moment
									.utc()
									.startOf("day")
									.toDate(),
								$lt: moment
									.utc()
									.endOf("day")
									.toDate()
							}
						},
						done
					);
				},

				// VISITS TO VIDEOS
				visits_videos: function(done) {
					global.visits.count(
						{
							channel: me._id,
							type: "video",
							time: {
								$gte: moment
									.utc()
									.startOf("day")
									.toDate(),
								$lt: moment
									.utc()
									.endOf("day")
									.toDate()
							}
						},
						done
					);
				}
			},
			function(err, results) {
				if (err) return res.status(500).send({ error: err });

				if (results.channel) {
					// try to append subscriber history
					if (results.subscribers) {
						results.channel.subHist = results.subscribers;
						delete results.subscribers;
					}

					// try to append view history
					if (results.views) {
						results.channel.viewHist = results.views;
						delete results.views;
					}
				}

				return res.send(results);
			}
		);
	},

	// PROFILE
	// stores profile information of a user that he/she
	// stores on the profile page
	profile: function(req, res) {
		// check if request is authenticated
		var me = req.cookies.me;
		if (!me) {
			return res.status(401).send({ error: "no permission to perform this operation" });
		}

		if (!("_id" in me)) {
			return res.status(400).send({ error: "no user id found" });
		}

		// some datatype fixes
		if ("trailnumber" in req.body) {
			req.body.trailnumber = parseInt(req.body.trailnumber);
		}

		global.users.updateOne(
			{
				_id: me._id
			},
			{
				$set: {
					profile: req.body
				}
			},
			function(err, updt) {
				// an error occured
				if (err) return res.status(500).send({ error: err, success: false });

				// clear mmsi cache
				if (req.body.mmsi) {
					global.CACHE_ais_positions.remove({ _id: req.body.mmsi });
				}

				// success
				return res.send({ error: null, success: true });
			}
		);
	},

	// SUBSCRIPTIONS
	// reads all subscriptions of the currently authenticated user
	subscriptions: function(req, res) {
		// check if request is authenticated
		var credentials = req.cookies.credentials;
		if (!credentials) {
			return res.status(401).send({ error: "no permission to perform this operation" });
		}

		// read subscriptions
		module.exports.readSubscriptions(credentials, function(err, subs) {
			if (err) {
				return res.status(500).send({ error: err });
			}

			return res.send(subs || []);
		});
	},

	// READ SUBSCRIPTIONS
	readSubscriptions: function(credentials, done) {
		// authenticate next request
		global.oauth.setCredentials(credentials);

		var lastResult = null;
		var subscriptions = [];

		// check if cache is available
		global.CACHE_users_subscriptions.findOne(
			{
				_id: credentials.access_token
			},
			function(err, cached_subs) {
				// found cached subscriptions
				if (!err && cached_subs) {
					return done(null, cached_subs.subscriptions);
				}

				// loop multiple pages
				async.doWhilst(
					function(callback) {
						var query = {
							part: "id,snippet",
							mine: true,
							maxResults: 50
						};

						// add next page token if available
						if (lastResult && lastResult.nextPageToken) {
							query.pageToken = lastResult.nextPageToken;
						}

						// read own subscriptions
						youtube.subscriptions.list(query, function(err, data) {
							if (err) {
								return callback(err);
							}

							// store last result
							if (data) {
								lastResult = data;

								var items = data.items.map(function(item) {
									// only take channel ids
									if (item.snippet.resourceId.kind === "youtube#channel") {
										return item.snippet.resourceId.channelId;
									}
								});

								subscriptions = subscriptions.concat(items);
								return callback(null, true);
							}
						});
					},
					function() {
						return lastResult.nextPageToken;
					},
					function(err, results) {
						// cache subscriptions
						global.CACHE_users_subscriptions.updateOne(
							{
								_id: credentials.access_token
							},
							{
								$set: {
									subscriptions: subscriptions,
									stored: moment.utc().toDate()
								}
							},
							{
								upsert: true
							}
						);

						// all processed subscription ids
						return done(err, subscriptions);
					}
				);
			}
		);
	}
};
