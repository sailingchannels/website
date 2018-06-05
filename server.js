const express = require("express");
const compress = require("compression");
const path = require("path");
const logger = require("morgan");
const jsonfile = require("jsonfile");
const bodyParser = require("body-parser");
const swig = require("swig");
const React = require("react");
const ReactDOM = require("react-dom/server");
const Router = require("react-router");
const RoutingContext = Router.RoutingContext;
const routes = require("./app/routes");
const cookieParser = require("cookie-parser");
const minify = require("html-minifier").minify;
const mongodb = require("mongodb");
const youtube = require("youtube-api");
const me = require("./server/me");
const channel = require("./server/channel");
const channels = require("./server/channels");
const video = require("./server/video");
const misc = require("./server/misc");
const positions = require("./server/positions");
const admin = require("./server/admin");
const videos = require("./server/videos");
const tags = require("./server/tags");
const cache = require("apicache").middleware;

const tag = process.env.TAG || "dev";
global.tag = tag;

var staticPath = "";
if (tag !== "dev") {
	staticPath = "https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/" + tag + "/public";
}

// chache setup
const onlyStatus200 = function(req) {
	return req.statusCode === 200;
};
const cache5 = cache("5 minutes", onlyStatus200);
const cache15 = cache("15 minutes", onlyStatus200);
const cache60 = cache("60 minutes", onlyStatus200);

var app = express();

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compress());
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
	// add tag to response
	res.set("X-Version", global.tag);
	next();
});

const CREDENTIALS = jsonfile.readFileSync("client_id.json");
global.oauth = youtube.authenticate({
	type: "oauth",
	client_id: CREDENTIALS.web.client_id,
	client_secret: CREDENTIALS.web.client_secret,
	redirect_url:
		tag === "dev" ? CREDENTIALS.web.redirect_uris[1] : CREDENTIALS.web.redirect_uris[0]
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
app.get("/api/me/subscriptions", me.subscriptions);

// API / CHANNEL
app.get("/api/channel/get/:id", cache15, channel.getById);
app.get("/api/channel/get/:id/customlinks", cache60, channel.getCustomLinks);
app.get("/api/channel/get/:id/videos", channel.getVideos);
app.post("/api/channel/flag", channel.flag);
app.post("/api/channel/subscribe", channel.subscribe);
app.post("/api/channel/unsubscribe", channel.unsubscribe);
app.post("/api/channel/suggest", channel.suggest);

// API / CHANNELS
app.get("/api/channels/get", cache15, channels.get);
app.get("/api/channels/search", channels.search);
app.post("/api/channels/identify", channels.identify);

// API / TAGS
app.get("/api/tags/:channel", tags.getByChannel);

// API / POSITIONS
app.get("/api/positions/:id/last/:n", positions.last);
app.get("/api/positions/geolocations", cache60, positions.geolocations);

// API / VIDEO
app.get("/api/video/get/:id", cache60, video.get);

// API / VIDEOS
app.get("/api/videos/geo/:lng/:lat", videos.geo);

// API / ADMIN
app.get("/api/admin/blacklisted", admin.getBlacklisted);
app.get("/api/admin/blacklisted/delete/:id", admin.deleteBlacklisted);
app.get("/api/admin/blacklisted/add/:id", admin.addBlacklisted);
app.get("/api/admin/additional", admin.getAdditional);
app.get("/api/admin/additional/delete/:id", admin.deleteAdditional);
app.get("/api/admin/additional/add/:id", admin.addAdditional);
app.get("/api/admin/flags", admin.getFlags);
app.get("/api/admin/flags/delete/:channel/:user", admin.deleteFlags);
app.get("/api/admin/channel/:id", admin.getChannelInfo);
app.get("/api/admin/suggestions", admin.getSuggestions);
app.get("/api/admin/suggestions/delete/:channel/:user", admin.deleteSuggestions);

// MAP
app.get("/map", cache15, function(req, res) {
	var page = swig.renderFile("views/map.html", {
		staticPath: staticPath
	});

	return res.status(404).send(
		minify(page, {
			removeComments: true,
			minifyJS: true,
			useShortDoctype: true,
			removeRedundantAttributes: true,
			removeOptionalTags: true,
			removeStyleLinkTypeAttributes: true,
			removeScriptTypeAttributes: true
		}).replace(/(\r\n|\n|\r|\t)/gm, "")
	);
});

// MAP
app.get("/world", function(req, res) {
	var page = swig.renderFile("views/world.html", {
		staticPath: staticPath
	});

	return res.status(404).send(
		minify(page, {
			removeComments: true,
			minifyJS: true,
			useShortDoctype: true,
			removeRedundantAttributes: true,
			removeOptionalTags: true,
			removeStyleLinkTypeAttributes: true,
			removeScriptTypeAttributes: true
		}).replace(/(\r\n|\n|\r|\t)/gm, "")
	);
});

// REACT MIDDLEWARE
app.use(function(req, res) {
	Router.match({ routes: routes, location: req.url }, function(
		err,
		redirectLocation,
		renderProps
	) {
		// error
		if (err) {
			return res.status(500).send(err.message);
		} else if (redirectLocation) {
			// redirect
			return res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			// render
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
				return res.status(200).send(
					minify(page, {
						removeComments: true,
						minifyJS: true,
						useShortDoctype: true,
						removeRedundantAttributes: true,
						removeOptionalTags: true,
						removeStyleLinkTypeAttributes: true,
						removeScriptTypeAttributes: true
					}).replace(/(\r\n|\n|\r|\t)/gm, "")
				);
			});
		} else {
			// not found
			var page = swig.renderFile("views/404.html", {
				staticPath: staticPath
			});

			return res.status(404).send(
				minify(page, {
					removeComments: true,
					minifyJS: true,
					useShortDoctype: true,
					removeRedundantAttributes: true,
					removeOptionalTags: true,
					removeStyleLinkTypeAttributes: true,
					removeScriptTypeAttributes: true
				}).replace(/(\r\n|\n|\r|\t)/gm, "")
			);
		}
	});
});

var mongodbURL = "sailing-channels";
var mongodbHost = "mongo";
if (tag === "dev") {
	//mongodbURL += "-dev";
	mongodbHost = "localhost";
}

// mongodb connect
mongodb.connect(
	"mongodb://" + mongodbHost + ":27017/" + mongodbURL,
	function(err, db) {
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
		global.sailingterms = db.collection("sailingterms");
		global.suggestions = db.collection("suggestions");
		global.tags = db.collection("tags");
		global.CACHE_users_subscriptions = db.collection("CACHE_users_subscriptions");
		global.CACHE_ais_positions = db.collection("CACHE_ais_positions");
		global.CACHE_inreach_positions = db.collection("CACHE_inreach_positions");
		global.CACHE_custom_links = db.collection("CACHE_custom_links");
		global.CACHE_languages = db.collection("CACHE_languages");

		// start server
		app.listen(app.get("port"), function() {
			console.log("Express server listening on port " + app.get("port"));
		});
	}
);
