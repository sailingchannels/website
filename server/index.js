const fs = require("fs");
const express = require("express");
const compress = require("compression");
const path = require("path");
const jsonfile = require("jsonfile");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const youtube = require("youtube-api");
const minify = require("html-minifier").minify;
const cache = require("apicache").middleware;
const setup = require("./middlewares/frontendMiddleware");
const setGlobals = require("./globals");
const package = require("../package.json");

const argv = require("./argv");
const port = require("./port");
const logger = require("./logger");

const me = require("./handler/me");
const channel = require("./handler/channel");
const channels = require("./handler/channels");
const video = require("./handler/video");
const misc = require("./handler/misc");
const positions = require("./handler/positions");
const admin = require("./handler/admin");
const videos = require("./handler/videos");
const tags = require("./handler/tags");
const topics = require("./handler/topics");

const isDev = process.env.NODE_ENV !== "production";
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require("ngrok") : false;
const resolve = require("path").resolve;

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

(async () => {
	var app = express();

	app.use(bodyParser.json());
	app.use(cookieParser());
	app.use(compress());
	app.use(
		bodyParser.urlencoded({
			extended: false
		})
	);
	app.use(function(req, res, next) {
		// add tag to response
		res.set("X-Version", package.version);
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

	// API / TOPICS
	app.get("/api/topics", topics.getAll);
	app.get("/api/topic/:id", topics.getOne);

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
	app.get("/map", (req, res) => {
		fs.readFile("map.html", (err, content) => {
			return res.send(
				minify(content.toString("utf8"), {
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
	});

	var mongodbURL = "sailing-channels";
	var mongodbHost = process.env.MONGODB || "ecs.sailing-channels.com";
	if (tag === "dev") {
		//mongodbURL += "-dev";
		mongodbHost = "localhost";
	}

	// mongodb connect
	const db = await mongodb.connect("mongodb://" + mongodbHost + ":27017/" + mongodbURL);

	// set collection globals
	setGlobals(db);

	// In production we need to pass these values in instead of relying on webpack
	setup(app, {
		outputPath: resolve(process.cwd(), "docs/" + package.version),
		publicPath: "/"
	});

	// get the intended host and port number, use localhost and port 3000 if not provided
	const customHost = argv.host || process.env.HOST;
	const host = customHost || null; // Let http.Server use its default IPv6/4 host
	const prettyHost = customHost || "localhost";

	// Start your app.
	app.listen(port, host, (err) => {
		if (err) {
			return logger.error(err.message);
		}

		// Connect to ngrok in dev mode
		if (ngrok) {
			ngrok.connect(
				port,
				(innerErr, url) => {
					if (innerErr) {
						return logger.error(innerErr);
					}

					logger.appStarted(port, prettyHost, url);
				}
			);
		} else {
			logger.appStarted(port, prettyHost);
		}
	});
})();
