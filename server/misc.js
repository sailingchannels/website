var moment = require("moment");
var async = require("async");
var youtube = require("youtube-api");
var ISO6391 = require("iso-639-1");

module.exports = {

	// FILL HEAD
	fillHead: function(renderProps, callback) {

		// extract head information
		var head = {
			"title": "Sailing Channels",
			"description": "A compiled list of YouTube channels that are related to sailing or living aboard a sailboat.",
			"banner": "https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/master/public/img/banner.png",
			"type": "website",
			"url": "https://sailing-channels.com"
		};

		// VIDEO
		if(renderProps.location.pathname.indexOf("/video/") === 0) {

			global.videos.find({
				"_id": renderProps.params.id
			}).project({
				"title": true,
				"description": true
			}).limit(1).next(function(err, video) {

				if(err || !video) return callback(head);

				head.title = video.title;
				head.description = video.description;
				head.banner = "https://img.youtube.com/vi/" + video._id + "/hqdefault.jpg";
				head.type = "article";
				head.url = "https://sailing-channels.com/video/" + video._id;

				return callback(head);
			});
		}

		// CHANNEL
		else if(renderProps.location.pathname.indexOf("/channel/") === 0) {

			global.channels.find({
				"_id": renderProps.params.id
			}).project({
				"title": true,
				"description": true,
				"thumbnail": true
			}).limit(1).next(function(err, channel) {

				if(err || !channel) return callback(head);

				head.title = channel.title;
				head.description = channel.description;
				head.banner = channel.thumbnail;
				head.type = "profile";
				head.url = "https://sailing-channels.com/channel/" + renderProps.params.id;

				return callback(head);
			});
		}
		else {
			return callback(head);
		}
	},

	// LANGUAGES
	languages: function(req, res) {

		// fetch distinct countries
		global.channels.distinct("language", function(err, languages) {

			// return some iso information
			return res.send({
				"languages": ISO6391.getLanguages(languages).sort(function(a, b) {
					return a.name.charCodeAt(0) - b.name.charCodeAt(0);
				}).map(function(lang) {
					return {
						"code": lang.code,
						"name": lang.name
					};
				}),
				"selected": req.cookies["channel-language"] || "en"
			});
		});
	},

	// STATS
	stats: function(req, res) {

		async.parallel({
			// count videos
			"videos": function(callback) {

				global.videos.count({}, callback);
			},

			// count channels
			"channels": function(callback) {

				global.channels.count({}, callback);
			}
		}, function(err, counts) {

			// oh no!
			if(err) {
				return res.status(500).send(err);
			}

			// return the number of stats
			return res.send(counts);
		});
	},

	// LOGOUT
	logout: function(req, res) {
		res.clearCookie("credentials");
		res.clearCookie("me");

		return res.redirect(301, "/");
	},

	//OAUTH2CALLBACK
	oauth2callback: function(req, res) {

		// is code included?
		if(!req.query.code) {
			var redirect_to = global.oauth.generateAuthUrl({
			    "access_type": "offline",
				"scope": ["https://www.googleapis.com/auth/youtube.force-ssl"],
				"approval_prompt": "force"
			});

			return res.redirect(301, redirect_to);
		}
		else {

			// get a token
			global.oauth.getToken(req.query.code, function(err, credentials) {

				if (err) {
					return res.status(400).send(err);
				}

				// authenticate next request
				global.oauth.setCredentials(credentials);

				youtube.channels.list({
				    "part": "id,snippet",
				    "mine": true,
				}, function (err, data) {

					// store user information
					if(!err && data && data.items.length > 0) {

						var info = {
							"lastLogin": moment.utc().toDate(),
							"title": data.items[0].snippet.title,
							"thumbnail": data.items[0].snippet.thumbnails.default.url,
							"country": ("country" in data.items[0].snippet) ? data.items[0].snippet.country.toLowerCase() : null,
							"credentials": credentials
						};

						global.users.updateOne({
							"_id": data.items[0].id
						}, {
							"$set": info
						}, {
							"upsert": true
						});

						var inAYear = moment().add(1, "year").toDate();

						// keep credentials
						res.cookie("credentials", credentials, {
							"secure": tag !== "dev",
							"expires": inAYear
						});

						info._id = data.items[0].id;
						delete info.credentials;

						// keep credentials
						res.cookie("me", info, {
							"secure": tag !== "dev",
							"expires": inAYear
						});
					}

					return res.redirect(301, "/");
				});
			});
		}
	}
};
