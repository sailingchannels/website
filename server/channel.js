var positions = require("./positions");
var moment = require("moment");
var async = require("async");
var me = require("./me");
var youtubeCustomLinks = require("youtube-custom-links");

module.exports = {

	// GET BY ID
	getById: function(req, res) {

		var id = req.params.id;

		async.parallel({
			// SUBSCRIPTIONS
			"subscriptions": function(done_subscriptions) {

				if(req.cookies.credentials) {
					me.readSubscriptions(req.cookies.credentials, done_subscriptions);
				}
				else {
					// no credentials available
					return done_subscriptions(null, null);
				}
			},

			// CHANNEL
			"channel": function(done_channel) {
				// find one video
				global.channels.find({"_id": id}).project({
					"lastCrawl": false,
					"language": false,
					"detectedLanguage": false
				}).limit(1).next(function(err, channel) {

					// oh no!
					if(err || !channel) {
						return res.status(500).send(err);
					}

					async.parallel({

						// fetch latest video from mongodb
						"video": function(done) {

							// fetch latest video
							global.videos.find({"channel": id}).sort({"publishedAt": -1}).limit(1).project({
								"videos.description": false
							}).next(done);
						},

						// fetch the subscriber history of last 7 days
						"subscribers": function(done) {

							global.subscribers.find({
								"_id.channel": id,
								"date": {
									"$gte": moment().subtract(7, "days").toDate()
								}
							})
							.sort({"date": 1})
							.project({
								"subscribers": true
							})
							.toArray(done);
						},

						"user": function(done) {

							global.users.find({
								"_id": id
							})
							.project({
								"profile": true
							})
							.limit(1)
							.next(done);
						}

					}, function(err, result) {

						// oh no!
						if(err) {
							return done_channel(err, null);
						}

						channel.videos = [];
						channel.videos.push(result.video);
						channel.subHist = result.subscribers;

						// does the user have a profile with MMSI number?
						if(result.user) {

							channel.boatcolor = result.user.profile.boatcolor;

							// read AIS position
							positions.readPosition(result.user.profile, function(pos, more, source) {
								channel.position = pos;
								channel.vesselinfo = more;
								channel.positionsource = source;
								return done_channel(null, channel);
							});
						}
						else {
							return done_channel(null, channel);
						}
					});
				});
			}
		}, function(err, results) {

			if(err) {
				return res.status(500).send(err);
			}

			// track the visit
			global.visits.insertOne({
				"channel": results.channel._id,
				"type": "channel",
				"time": moment.utc().toDate()
			});

			// check if user subscribed to this channel
			results.channel.subscribed = (results.subscriptions) ? (results.subscriptions.indexOf(results.channel._id) >= 0) : false;

			return res.send(results.channel);
		});
	},

	// GET CUSTOM LINK
	getCustomLinks: function(req, res) {

		global.CACHE_custom_links.findOne({
			"_id": req.params.id
		}, function(err, data) {

			if(!err && data) {
				return res.send(data.links);
			}
			else {
				// try to fetcht the links
				youtubeCustomLinks.customLinks(req.params.id, function(err, links) {
					if(err) {
						return res.status(500).send(err);
					}

					global.CACHE_custom_links.insertOne({
						"_id": req.params.id,
						"links": links,
						"stored": moment.utc().toDate()
					});

					return res.send(links);
				});
			}
		});
	},

	// GET VIDEOS
	getVideos: function(req, res) {

		var take = parseInt(req.query.take) || 10;
		var skip = parseInt(req.query.skip) || 0;

		// cound videos of channel
		global.videos.count({
			"channel": req.params.id
		}, function(err, videoCount) {

			// oh no!
			if(err) {
				return res.status(500).send({
					"data": [],
					"skip": skip,
					"take": take,
					"fin": false,
					"error": err
				});
			}

			global.videos.find({
				"channel": req.params.id
			})
			.skip(skip)
			.limit(take)
			.sort({
				"publishedAt": -1
			})
			.project({
				"channel": false,
				"comments": false
			})
			.toArray(function(err, videos) {

				// oh no!
				if(err || !videos) {
					return res.status(500).send({
						"data": [],
						"skip": skip,
						"take": take,
						"fin": false,
						"error": err
					});
				}

				// send data out
				return res.send({
					"data": videos,
					"skip": skip,
					"take": take,
					"fin": (skip + take >= videoCount)
				});
			});

		});
	},

	// FLAG
	flag: function(req, res) {

		// check if request is authenticated
		var me = req.cookies.me;
		if(!me) {
			return res.status(401).send({"error": "no permission to perform this operation"});
		}

		if(!("_id" in me)) {
			return res.status(400).send({"error": "no user id found"});
		}

		// insert the flag
		global.flags.insertOne({
			"_id": {
				"channel": req.body.channel,
				"user": me._id
			},
			"when": moment.utc().toDate()
		});

		return res.send({
			"error": null,
			"success": true
		});
	},

	// SUBSCRIBE
	subscribe: function(req, res) {

		var channel = req.body.channel;
		if(!channel) {
			return res.status(400).send({"error": "no channel id provided"});
		}

		// check if request is authenticated
		var credentials = req.cookies.credentials;
		if(!credentials) {
			return res.status(401).send({"error": "no permission to perform this operation"});
		}

		// authenticate next request
		oauth.setCredentials(req.cookies.credentials);

		// add the subscription
		youtube.subscriptions.insert({
			part: "snippet",
			resource: {
				snippet: {
					resourceId: {
						kind: "youtube#channel",
						channelId: channel
					}
				}
			}
		}, function (err, data) {

			// handle error like a grown up
			if(err) {
				return res.status(500).send({"error": err});
			}

			// clear cache
			global.CACHE_users_subscriptions.deleteOne({
				"_id": credentials.access_token
			});

			return res.send({"error": null, "success": true});
		});
	},

	// UNSUBSCRIBE
	unsubscribe: function(req, res) {

		var channel = req.body.channel;
		if(!channel) {
			return res.status(400).send({"error": "no channel id provided"});
		}

		// check if request is authenticated
		var credentials = req.cookies.credentials;
		if(!credentials) {
			return res.status(401).send({"error": "no permission to perform this operation"});
		}

		// authenticate next request
		oauth.setCredentials(req.cookies.credentials);

		// fetch subscription id
		youtube.subscriptions.list({
			"part": "id",
			"forChannelId": channel,
			"mine": true
		}, function(err, subs) {

			// handle error like a grown up
			if(err) {
				return res.status(500).send({"error": err});
			}

			// could not find enough results?
			if(subs.pageInfo.totalResults !== 1) {
				return res.status(500).send({"error": "could not find subscription result"});
			}

			// delete the subscription
			youtube.subscriptions.delete({
				"id": subs.items[0].id
			}, function (err, data) {

				// handle error like a grown up
				if(err) {
					return res.status(500).send({"error": err});
				}

				// clear cache
				global.CACHE_users_subscriptions.deleteOne({
					"_id": credentials.access_token
				});

				return res.send({"error": null, "success": true});
			});
		});
	}

};
