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

var app = express();
var tag = process.env.TAG || "dev";

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compress());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, "public")));

// API / LANGUAGES
app.get("/api/languages", function(req, res) {

	// fetch distinct countries
	global.channels.distinct("languages", function(err, languages) {

		// return some iso information
		return res.send(ISO6391.getLanguages(languages));
	});
});

// API / CHANNEL / GET / :ID
app.get("/api/channel/get/:id", function(req, res) {

	var id = req.params.id;

	// find one video
	global.channels.find({"_id": id}).limit(1).project({
		"videos.description": false
	}).next(function(err, video) {

		// oh no!
		if(err || !video) {
			return res.status(500).send(err);
		}

		if(video.videos) {

			// sort videos by published
			video.videos.sort(function(av, bv) {
				return bv.publishedAt - av.publishedAt;
			});

			video.videos = video.videos.slice(0, 1);
		}
		else {
			video.videos = [];
		}


		return res.send(video);
	});
});

// API / CHANNELS / GET
app.get("/api/channels/get", function(req, res) {

	var sortBy = req.query.sort || "subscribers";
	var take = parseInt(req.query.take) || 25;
	var skip = parseInt(req.query.skip) || 0;

	var sortKey = "subscribers";
	switch(sortBy) {
		case "subscribers": sortKey = "subscribers"; break;
		case "founded": sortKey = "publishedAt"; break;
		case "upload": sortKey = "lastUploadAt"; break;
	}

	var sorting = {};
	sorting[sortKey] = -1;

	// fetch channels from mongodb
	global.channels.find({}).skip(skip).limit(take).sort(sorting).project({
		"videos": false,
		"country": false
	}).toArray(function(err, channels) {

		// oh no!
		if(err) {
			return res.status(500).send({
				"data": [],
				"skip": skip,
				"take": take,
				"error": err
			});
		}

		// send data out
		return res.send({
			"data": channels,
			"skip": skip,
			"take": take
		});
	});
});

// API / CHANNELS / SEARCH
app.get("/api/channels/search", function(req, res) {

	var sortBy = req.query.sort || "subscribers";
	var q = req.query.q || null;

	if(!q) return res.send({ "data": [] });
	q = q.toLowerCase();

	// write query to mongodb
	global.searches.insertOne({
		"q": q,
		"time": moment.utc().toDate()
	});

	var sortKey = "subscribers";
	switch(sortBy) {
		case "subscribers": sortKey = "subscribers"; break;
		case "founded": sortKey = "publishedAt"; break;
		case "upload": sortKey = "lastUploadAt"; break;
	}

	var sorting = {};
	sorting[sortKey] = -1;

	// fetch channels from mongodb
	global.channels.find({"$text": {"$search": "\"" + q + "\"" }}).sort(sorting).project({
		"videos": false,
		"country": false
	}).toArray(function(err, channels) {

		// oh no!
		if(err) {
			return res.status(500).send({
				"data": [],
				"error": err
			});
		}

		// send data out
		return res.send({
			"data": channels
		});
	});
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

			var staticPath = "";
			if(tag !== "dev") {
				staticPath = "https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/" + tag + "/public";
			}

			var html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
			var page = swig.renderFile("views/index.html", {
				html: html,
				staticPath: staticPath
			});

			return res.status(200).send(minify(page, {
				removeComments: true,
				minifyJS: true
			}));
		}

		// not found
		else {
			return res.status(404).send("Page Not Found");
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

	// start server
	app.listen(app.get("port"), function() {
		console.log("Express server listening on port " + app.get("port"));
	});
});
