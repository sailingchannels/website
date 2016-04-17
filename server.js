var express = require("express");
var compress = require("compression");
var path = require("path");
var logger = require("morgan");
var jsonfile = require("jsonfile");
var bodyParser = require("body-parser");
var swig = require("swig");
var React = require("react");
var ReactDOM = require("react-dom/server");
var Router = require("react-router");
var RoutingContext = Router.RoutingContext;
var routes = require("./app/routes");
var cookieParser = require("cookie-parser");
var minify = require("html-minifier").minify;
var mongodb = require("mongodb");
var moment = require("moment");
var ISO6391 = require("iso-639-1");
var async = require("async");
var youtube = require("youtube-api");
var loggly  = require("express-loggly");
var ais = require("ais");
var validator = require("validator");

var tag = process.env.TAG || "dev";

// setup Loggly configuration
var loggly_config = {
    token: "9650f16d-a911-48c8-b64b-5caf03749a4d",
    subdomain: "sailchannels",
    tags: [tag]
};

var app = express();

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compress());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(loggly({ loggly: loggly_config }));

const CREDENTIALS = jsonfile.readFileSync("client_id.json");
var oauth = youtube.authenticate({
    "type": "oauth",
	"client_id": CREDENTIALS.web.client_id,
	"client_secret": CREDENTIALS.web.client_secret,
	"redirect_url": (tag === "dev") ? CREDENTIALS.web.redirect_uris[1] : CREDENTIALS.web.redirect_uris[0]
});

// ROBOTS.TXT
app.get("/robots.txt", function(req, res) {
	res.set("Content-Type", "text/plain");
	return res.send("User-agent: *\nAllow: /");
});

// OAUTH2CALLBACK
app.get("/oauth2callback", function(req, res) {

	// is code included?
	if(!req.query.code) {
		var redirect_to = oauth.generateAuthUrl({
		    "access_type": "offline",
			"scope": ["https://www.googleapis.com/auth/youtube.force-ssl"],
			"approval_prompt": "force"
		});

		return res.redirect(301, redirect_to);
	}
	else {

		// get a token
		oauth.getToken(req.query.code, function(err, credentials) {

			if (err) {
				return res.status(400).send(err);
			}

			// authenticate next request
			oauth.setCredentials(credentials);

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
						"secure": true,
						"expires": inAYear
					});

					info._id = data.items[0].id;
					delete info.credentials;

					// keep credentials
					res.cookie("me", info, {
						"secure": true,
						"expires": inAYear
					});
				}

				return res.redirect(301, "/");
			});
		});
	}
});

// LOGOUT
app.get("/logout", function(req, res) {
	res.clearCookie("credentials");
	res.clearCookie("me");

	return res.redirect(301, "/");
});

// API / LANGUAGES
app.get("/api/languages", function(req, res) {

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
});

// API / STATS
app.get("/api/stats", function(req, res) {

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
});

// READ AIS POSITION
var readAISPosition = function(mmsi, callback) {

	if(!mmsi) return callback(null);

	if(!validator.isNumeric(mmsi) || mmsi.trim().length !== 9) {
		return callback(null);
	}

	mmsi = mmsi.trim();

	// try cache
	global.CACHE_ais_positions.find({"_id": mmsi}).next(function(err, data) {

		// not a cache hit
		if(err || !data) {
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
		else {
			return callback(data.pos, data.more);
		}
	});
};

// API / ME
app.get("/api/me", function(req, res) {

	// check if request is authenticated
	var me = req.cookies.me;
	if(!me) {
		return res.status(401).send({"error": "no permission to perform this operation"});
	}

	if(!("_id" in me)) {
		return res.status(400).send({"error": "no user id found"});
	}

	async.parallel({

		// read the users information
		"user": function(done) {
			global.users.find({
				"_id": me._id
			})
			.limit(1)
			.next(function(err, user) {

				if(err) return done(err);

				// does the user have a profile with mmsi number?
				if(user.profile && user.profile.mmsi) {

					// fetch latest ais position
					readAISPosition(user.profile.mmsi, function(pos, more) {
						user.position = pos;
						user.vesselinfo = more;
						return done(null, user);
					});
				}
				else {
					return done(null, user);
				}
			});
		},

		// try to fetch information on the channel of the user
		"channel": function(done) {
			global.channels.find({
				"_id": me._id
			})
			.limit(1)
			.project({
				"videos": false
			})
			.next(done);
		},

		// fetch the subscriber history of last 7 days
		"subscribers": function(done) {

			global.subscribers.find({
				"_id.channel": me._id,
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

		// fetch the view history of last 7 days
		"views": function(done) {

			global.views.find({
				"_id.channel": me._id,
				"date": {
					"$gte": moment().subtract(7, "days").toDate()
				}
			})
			.sort({"date": 1})
			.project({
				"views": true
			})
			.toArray(done);
		},

		// VISITS TO CHANNEL
		"visits_channel": function(done) {

			global.visits.count({
				"channel": me._id,
				"type": "channel",
				"time": {
					"$gte": moment.utc().startOf("day").toDate(),
					"$lt": moment.utc().endOf("day").toDate()
				}
			}, done);
		},

		// VISITS TO VIDEOS
		"visits_videos": function(done) {

			global.visits.count({
				"channel": me._id,
				"type": "video",
				"time": {
					"$gte": moment.utc().startOf("day").toDate(),
					"$lt": moment.utc().endOf("day").toDate()
				}
			}, done);
		}

	}, function(err, results) {

		if(err) return res.status(500).send({"error": err});

		if(results.channel) {

			// try to append subscriber history
			if(results.subscribers) {
				results.channel.subHist = results.subscribers;
				delete results.subscribers;
			}

			// try to append view history
			if(results.views) {
				results.channel.viewHist = results.views;
				delete results.views;
			}
		}

		return res.send(results);
	});
});

// API / ME / SETTINGS
app.post("/api/me/profile", function(req, res) {

	// check if request is authenticated
	var me = req.cookies.me;
	if(!me) {
		return res.status(401).send({"error": "no permission to perform this operation"});
	}

	if(!("_id" in me)) {
		return res.status(400).send({"error": "no user id found"});
	}

	global.users.updateOne({
		"_id": me._id
	}, {
		"$set": {
			"profile": req.body
		}
	}, function(err, updt) {

		// an error occured
		if(err) return res.status(500).send({"error": err, "success": false});

		// clear mmsi cache
		if(req.body.mmsi) {
			global.CACHE_ais_positions.remove({"_id": req.body.mmsi});
		}

		// success
		return res.send({"error": null, "success": true});
	});
});

// API / CHANNEL / GET / :ID
app.get("/api/channel/get/:id", function(req, res) {

	var id = req.params.id;

	async.parallel({
		// SUBSCRIPTIONS
		"subscriptions": function(done_subscriptions) {

			if(req.cookies.credentials) {
				readSubscriptions(req.cookies.credentials, done_subscriptions);
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
					if(result.user && result.user.profile && result.user.profile.mmsi) {

						// read AIS position
						readAISPosition(result.user.profile.mmsi, function(pos, more) {
							channel.position = pos;
							channel.vesselinfo = more;
							return done_channel(null, channel);
						});

						channel.boatcolor = result.user.profile.boatcolor;
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
});

// API / CHANNEL / GET / :ID / VIDEOS
app.get("/api/channel/get/:id/videos", function(req, res) {

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
});

// READ SUBSCRIPTIONS
var readSubscriptions = function(credentials, done) {

	// authenticate next request
	oauth.setCredentials(credentials);

	var lastResult = null;
	var subscriptions = [];

	// check if cache is available
	global.CACHE_users_subscriptions.findOne({
		"_id": credentials.access_token
	}, function(err, cached_subs) {

		// found cached subscriptions
		if(!err && cached_subs) {
			return done(null, cached_subs.subscriptions);
		}

		// loop multiple pages
		async.doWhilst(
			function (callback) {

				var query = {
					"part": "id,snippet",
					"mine": true,
					"maxResults": 50
				};

				// add next page token if available
				if(lastResult && lastResult.nextPageToken) {
					query.pageToken = lastResult.nextPageToken;
				}

				// read own subscriptions
				youtube.subscriptions.list(query, function (err, data) {

					if(err) {
						return callback(err);
					}

					// store last result
					if(data) {
						lastResult = data;

						var items = data.items.map(function(item) {

							// only take channel ids
							if(item.snippet.resourceId.kind === "youtube#channel") {
								return item.snippet.resourceId.channelId;
							}
						});

						subscriptions = subscriptions.concat(items);
						return callback(null, true);
					}
				});
			},
			function () { return lastResult.nextPageToken; },
			function (err, results) {

				// cache subscriptions
				global.CACHE_users_subscriptions.updateOne({
					"_id": credentials.access_token
				}, {
					"$set": {
						"subscriptions": subscriptions,
						"stored": moment.utc().toDate()
					}
				}, {
					"upsert": true
				});

				// all processed subscription ids
				return done(err, subscriptions);
			}
		);
	});
};

// API / CHANNELS / GET
app.get("/api/channels/get", function(req, res) {

	var sortBy = req.query.sort || "subscribers";
	var take = parseInt(req.query.take) || 25;
	var skip = parseInt(req.query.skip) || 0;
	var mobile = false;

	// check if mobile is a parameter to this call
	if("mobile" in req.query) {
		mobile = (req.query.mobile === "true");
	}

	var sortKey = "subscribers";
	switch(sortBy) {
		case "subscribers": sortKey = "subscribers"; break;
		case "founded": sortKey = "publishedAt"; break;
		case "upload": sortKey = "lastUploadAt"; break;
		case "views": sortKey = "views"; break;
		case "trending": sortKey = "popularity.total"; break;
	}

	var sorting = {};
	sorting[sortKey] = -1;

	async.parallel({
		"subscriptions": function(done) {

			if(req.cookies.credentials) {
				readSubscriptions(req.cookies.credentials, done);
			}
			else {
				// no credentials available
				return done(null, null);
			}
		},

		"channels": function(done) {

			// fetch channels from mongodb
			global.channels.find({
				"language": req.cookies["channel-language"] || "en"
			}).skip(skip).limit(take).sort(sorting).project({
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
});

// API / CHANNEL / SUBSCRIBE
app.post("/api/channel/subscribe", function(req, res) {

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
});

// API / CHANNEL / UNSUBSCRIBE
app.post("/api/channel/unsubscribe", function(req, res) {

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
});

// API / CHANNELS / SEARCH
app.get("/api/channels/search", function(req, res) {

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
});

// API / VIDEO / GET / :ID
app.get("/api/video/get/:id", function(req, res) {

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
});

// FILL HEAD
var fillHead = function(renderProps, callback) {

	// extract head information
	var head = {
		"title": "Sailing Channels",
		"description": "A compiled list of YouTube channels that are related to sailing or living aboard a sailboat.",
		"banner": "https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/master/public/img/banner.png"
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

			return callback(head);
		});
	}
	else {
		return callback(head);
	}
};

// REACT MIDDLEWARE
app.use(function(req, res) {

	var staticPath = "";
	if(tag !== "dev") {
		staticPath = "https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/" + tag + "/public";
	}

	Router.match({ routes: routes, location: req.url }, function(err, redirectLocation, renderProps) {

		// error
		if(err) {
			return res.status(500).send(err.message);
		}

		// redirect
		else if(redirectLocation) {
			return res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
		}

		// render
		else if(renderProps) {

			var html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);

			// try to fill head info
			fillHead(renderProps, function(head) {

				// render the page
				var page = swig.renderFile("views/index.html", {
					head: head,
					html: html,
					staticPath: staticPath
				});

				// send rendered page
				return res.status(200).send(minify(page, {
					removeComments: true,
					minifyJS: true,
					useShortDoctype: true,
					removeRedundantAttributes: true,
					removeOptionalTags: true,
					removeStyleLinkTypeAttributes: true,
					removeScriptTypeAttributes: true
				}).replace(/(\r\n|\n|\r|\t)/gm,""));
			});
		}

		// not found
		else {
			var page = swig.renderFile("views/404.html", {
				staticPath: staticPath
			});

			return res.status(404).send(minify(page, {
				removeComments: true,
				minifyJS: true,
				useShortDoctype: true,
				removeRedundantAttributes: true,
				removeOptionalTags: true,
				removeStyleLinkTypeAttributes: true,
				removeScriptTypeAttributes: true
			}).replace(/(\r\n|\n|\r|\t)/gm,""));
		}
	});
});

var mongodbURL = "sailing-channels";
if(tag === "dev") {
	mongodbURL += "-dev";
}

// mongodb connect
mongodb.connect("mongodb://localhost:27017/" + mongodbURL, function(err, db) {

	if (err) throw err;

	// collections
	global.channels = db.collection("channels");
	global.searches = db.collection("searches");
	global.videos = db.collection("videos");
	global.subscribers = db.collection("subscribers");
	global.views = db.collection("views");
	global.users = db.collection("users");
	global.visits = db.collection("visits");
	global.CACHE_users_subscriptions = db.collection("CACHE_users_subscriptions");
	global.CACHE_ais_positions = db.collection("CACHE_ais_positions");

	// start server
	app.listen(app.get("port"), function() {
		console.log("Express server listening on port " + app.get("port"));
	});
});
