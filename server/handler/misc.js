const moment = require("moment");
const async = require("async");
const youtube = require("youtube-api");
const ISO6391 = require("iso-639-1");
const parseYouTubeUser = require("parse-youtube-user");
const request = require("request");

module.exports = {
	// LANGUAGES
	languages: function(req, res) {
		// check if languages are in cache
		global.CACHE_languages.findOne({ _id: "languages" }, function(err, data) {
			// not in cache
			if (err || !data) {
				// fetch distinct countries
				global.channels.distinct("language", function(err, languages) {
					// return some iso information
					var languages = {
						languages: ISO6391.getLanguages(languages)
							.sort(function(a, b) {
								return a.name.charCodeAt(0) - b.name.charCodeAt(0);
							})
							.map(function(lang) {
								return {
									code: lang.code,
									name: lang.name
								};
							})
					};

					// add cache entry
					global.CACHE_languages.insert({
						_id: "languages",
						time: moment().toDate(),
						data: languages
					});

					// add user based selection magic
					languages["selected"] = req.cookies["channel-language"] || "en";

					return res.send(languages);
				});
			} else {
				// found a cache entry
				// add user based selection magic
				data.data["selected"] = req.cookies["channel-language"] || "en";
				return res.send(data.data);
			}
		});
	},

	// STATS
	stats: function(req, res) {
		async.parallel(
			{
				// count videos
				videos: function(callback) {
					global.videos.count({}, callback);
				},

				// count channels
				channels: function(callback) {
					global.channels.count({}, callback);
				}
			},
			function(err, counts) {
				// oh no!
				if (err) {
					return res.status(500).send(err);
				}

				// return the number of stats
				return res.send(counts);
			}
		);
	},

	// LOGOUT
	logout: function(req, res) {
		res.clearCookie("credentials");
		res.clearCookie("me");

		return res.redirect(301, "/");
	},

	// GET YOUTUBE CHANNEL ID
	getYouTubeChannelId: function(url, callback) {
		// parse the youtube user or channel out of there
		// if it is a user, we have to find the matching channel id
		const ytUserOrChannel = parseYouTubeUser(url);

		// fetch source code of url
		request.get("https://youtube.com/user/" + ytUserOrChannel, function(err, response, body) {
			// match the ucid
			var ucidMatcher = /&quot;ucid&quot;:&quot;(.{24})/;
			var m = ucidMatcher.exec(body);

			// channel was found?
			var channelid = m ? m[1] : ytUserOrChannel;
			if (channelid.length !== 24) {
				return callback(null);
			} else {
				return callback(channelid);
			}
		});
	},

	//OAUTH2CALLBACK
	oauth2callback: function(req, res) {
		// is code included?
		if (!req.query.code) {
			var redirect_to = global.oauth.generateAuthUrl({
				access_type: "offline",
				scope: ["https://www.googleapis.com/auth/youtube.force-ssl"],
				approval_prompt: "force"
			});

			return res.redirect(301, redirect_to);
		} else {
			// get a token
			global.oauth.getToken(req.query.code, function(err, credentials) {
				if (err) {
					return res.status(400).send(err);
				}

				// authenticate next request
				global.oauth.setCredentials(credentials);

				youtube.channels.list(
					{
						part: "id,snippet",
						mine: true
					},
					function(err, data) {
						// store user information
						if (!err && data && data.items.length > 0) {
							var info = {
								lastLogin: moment.utc().toDate(),
								title: data.items[0].snippet.title,
								thumbnail: data.items[0].snippet.thumbnails.default.url,
								country:
									"country" in data.items[0].snippet
										? data.items[0].snippet.country.toLowerCase()
										: null,
								credentials: credentials
							};

							global.users.updateOne(
								{
									_id: data.items[0].id
								},
								{
									$set: info
								},
								{
									upsert: true
								}
							);

							var inAYear = moment()
								.add(1, "year")
								.toDate();

							// keep credentials
							res.cookie("credentials", credentials, {
								secure: global.tag !== "dev",
								expires: inAYear
							});

							info._id = data.items[0].id;
							delete info.credentials;

							// keep credentials
							res.cookie("me", info, {
								secure: global.tag !== "dev",
								expires: inAYear
							});
						}

						return res.redirect(301, "/");
					}
				);
			});
		}
	}
};
