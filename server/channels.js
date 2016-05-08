var positions = require("./positions");
var me = require("./me");
var moment = require("moment");
var async = require("async");

module.exports = {

	// GET
	get: function(req, res) {

		var sortBy = req.query.sort || "subscribers";
		var take = parseInt(req.query.take) || 25;
		var skip = parseInt(req.query.skip) || 0;
		var mobile = false;

		// check if mobile is a parameter to this call
		if("mobile" in req.query) {
			mobile = (req.query.mobile === "true");
		}

		// first determine async the sort key and
		// query for the channel mongodb query...
		async.waterfall([
			function(callback) {

				var query = {
					"language": req.cookies["channel-language"] || "en"
				};
				var sortKey = "subscribers";
				switch(sortBy) {
					case "subscribers":
						sortKey = "subscribers";
						return callback(null, {
							"query": query,
							"sortKey": sortKey
						});

					case "founded":
						sortKey = "publishedAt";
						return callback(null, {
							"query": query,
							"sortKey": sortKey
						});

					case "upload":
						sortKey = "lastUploadAt";
						return callback(null, {
							"query": query,
							"sortKey": sortKey
						});

					case "views":
						sortKey = "views";
						return callback(null, {
							"query": query,
							"sortKey": sortKey
						});

					case "trending":
						sortKey = "popularity.total";

						// how many channels are currently listed?
						global.channels.count(function(err, channel_count) {
							if(err) {
								return callback(err);
							}

							// fetch the median values
							global.channels.find({}).skip(channel_count / 2).limit(1).sort({
								"subscribers": 1
							}).project({
								"subscribers": true
							}).next(function(err, median_channel) {
								if(err) {
									return callback(err);
								}

								console.log("Subscriber Median:", median_channel.subscribers);

								query.subscribers = {
									"$gte": median_channel.subscribers
								};

								return callback(null, {
									"query": query,
									"sortKey": sortKey
								});
							});
						});
				}
			}],

			// ... then apply these query and sorting values to
			// the actual query
			function(err, step1) {

				if(err) {
					return res.status(500).send({
						"data": [],
						"skip": skip,
						"take": take,
						"error": err
					});
				}

				var sorting = {};
				sorting[step1.sortKey] = -1;

				async.parallel({
					"subscriptions": function(done) {

						if(req.cookies.credentials) {
							me.readSubscriptions(req.cookies.credentials, done);
						}
						else {
							// no credentials available
							return done(null, null);
						}
					},

					"channels": function(done) {

						// fetch channels from mongodb
						global.channels.find(step1.query).skip(skip).limit(take).sort(sorting).project({
							"videos": false,
							"country": false,
							"lastCrawl": false,
							"detectedLanguage": false,
							"language": false
						}).toArray(done);
					}

				}, function(err, results) {

					// oh no!
					if(err || !results.channels) {
						return res.status(500).send({
							"data": [],
							"skip": skip,
							"take": take,
							"error": err
						});
					}

					// TEXT CUTTER
					var textCutter = function(i, text) {

						if(text.length < i) return text;

						var shorter = text.substr(0, i);
						if (/^\S/.test(text.substr(i))) {
							return shorter.replace(/\s+\S*$/, "") + " ...";
						}

						return shorter;
					};

					// if we have subscriptions, enhance the
					var channels = results.channels.map(function(channel) {

						channel.subscribed = (results.subscriptions) ? (results.subscriptions.indexOf(channel._id) >= 0) : false;
						channel.description = (mobile === false) ? textCutter(300, channel.description) : null;

						return channel;
					});

					// send data out
					return res.send({
						"data": channels,
						"skip": skip,
						"take": take
					});
				});
			}
		);
	},

	// SEARCH
	search: function(req, res) {

		var q = req.query.q || null;

		if(!q) return res.send({ "data": [] });
		q = q.toLowerCase();

		// write query to mongodb
		global.searches.insertOne({
			"q": q,
			"time": moment.utc().toDate()
		});

		var sorting = {};

		async.parallel({

			// search for channels
			"channels": function(callback) {

				global.channels.find({
					"$text": {"$search": "\"" + q + "\"" },
					//"$text": {"$search": q },
					"language": req.cookies["channel-language"] || "en"
				}).sort(sorting).project({
					"videos": false,
					"country": false,
					"score": { "$meta": "textScore" }
				}).limit(25).toArray(callback);
			},

			// search for videos
			"videos": function(callback) {

				global.videos.find({
					"$text": {"$search": "\"" + q + "\"" }
				}).project({
					"score": { "$meta": "textScore" }
				}).limit(25).toArray(function(err, videos) {

					// find channel names to video
					async.map(videos, function(item, done) {

						global.channels.find({"_id": item.channel}).project({
							"title": true
						}).limit(1).next(function(err, channel) {

							if(err || !channel) return done(err);

							// set new channel information
							item.channel = {
								"_id": channel._id,
								"title": channel.title
							};

							return done(null, item);
						});

					}, callback);
				});
			}

		}, function(err, results) {

			// oh no!
			if(err || !results.videos || !results.channels) {
				return res.status(500).send(err);
			}

			// filter out empty videos
			var videos = results.videos.filter(function(item) {
				return !!item;
			});

			// add type to videos
			videos = videos.map(function(item) {
				item.type = "video";
				return item;
			});

			// filter out empty channels
			var channels = results.channels.filter(function(item) {
				return !!item;
			});

			// add type to channels
			channels = results.channels.map(function(item) {
				item.type = "channel";
				return item;
			});

			// merge arrays
			var result = channels.concat(videos);

			// sort by score
			result.sort(function(a, b) {
				return b.score - a.score;
			});

			return res.send(result);
		});
	}
};
