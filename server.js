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
var youtube = require("youtube-api");
var loggly  = require("express-loggly");
var positions = require("./server/positions");
var me = require("./server/me");
var channel = require("./server/channel");
var channels = require("./server/channels");
var video = require("./server/video");
var misc = require("./server/misc");
var positions = require("./server/positions");
var admin = require("./server/admin");
var videos = require("./server/videos");
var cache = require("apicache").middleware;

var tag = process.env.TAG || "dev";
global.tag = tag;

var staticPath = "";
if(tag !== "dev") {
	staticPath = "https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/" + tag + "/public";
}

// setup Loggly configuration
var loggly_config = {
    token: "9650f16d-a911-48c8-b64b-5caf03749a4d",
    subdomain: "sailchannels",
    tags: [tag]
};

// chache setup
var onlyStatus200 = function(req) { return req.statusCode === 200; };
var cache5 = cache("5 minutes", onlyStatus200);
var cache15 = cache("15 minutes", onlyStatus200);
var cache60 = cache("60 minutes", onlyStatus200);

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
global.oauth = youtube.authenticate({
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
app.get("/oauth2callback", misc.oauth2callback);

// LOGOUT
app.get("/logout", misc.logout);

// API / LANGUAGES
app.get("/api/languages", misc.languages);

// API / STATS
app.get("/api/stats", misc.stats);

// API / ME
app.get("/api/me", me.me);
app.post("/api/me/profile", me.profile);

// API / CHANNEL
app.get("/api/channel/get/:id", cache15, channel.getById);
app.get("/api/channel/get/:id/customlinks", cache60, channel.getCustomLinks);
app.get("/api/channel/get/:id/videos", channel.getVideos);
app.post("/api/channel/flag", channel.flag);
app.post("/api/channel/subscribe", channel.subscribe);
app.post("/api/channel/unsubscribe", channel.unsubscribe);

// API / CHANNELS
app.get("/api/channels/get", cache15, channels.get);
app.get("/api/channels/search", channels.search);

// API / POSITIONS
app.get("/api/positions/:id/last/:n", positions.last);
app.get("/api/positions/geolocations", positions.geolocations);

// API / VIDEO
app.get("/api/video/get/:id", cache60, video.get);

// API / VIDEOS
app.get("/api/videos/geo/:lng/:lat", videos.geo);

// API / ADMIN / BLACKLISTED
app.get("/api/admin/blacklisted", admin.getBlacklisted);
app.get("/api/admin/blacklisted/delete/:id", admin.deleteBlacklisted);
app.get("/api/admin/blacklisted/add/:id", admin.addBlacklisted);
app.get("/api/admin/additional", admin.getAdditional);
app.get("/api/admin/additional/delete/:id", admin.deleteAdditional);
app.get("/api/admin/additional/add/:id", admin.addAdditional);
app.get("/api/admin/flags", admin.getFlags);
app.get("/api/admin/flags/delete/:channel/:user", admin.deleteFlags);
app.get("/api/admin/channel/:id", admin.getChannelInfo);

// MAP
app.get("/map", cache15, function(req, res) {
	var page = swig.renderFile("views/map.html", {
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
});

// MAP
app.get("/world", function(req, res) {
	var page = swig.renderFile("views/world.html", {
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
});

// REACT MIDDLEWARE
app.use(function(req, res) {

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
			misc.fillHead(renderProps, function(head) {

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
	global.flags = db.collection("flags");
	global.positions = db.collection("positions");
	global.blacklist = db.collection("blacklist");
	global.additional = db.collection("additional");
	global.CACHE_users_subscriptions = db.collection("CACHE_users_subscriptions");
	global.CACHE_ais_positions = db.collection("CACHE_ais_positions");
	global.CACHE_inreach_positions = db.collection("CACHE_inreach_positions");
	global.CACHE_custom_links = db.collection("CACHE_custom_links");
	global.CACHE_geolocations = db.collection("CACHE_geolocations");
	global.CACHE_languages = db.collection("CACHE_languages");

	// start server
	app.listen(app.get("port"), function() {
		console.log("Express server listening on port " + app.get("port"));
	});
});
