var express = require("express");
var compress = require("compression");
var path = require("path");
var logger = require("morgan");
var jsonfile = require("jsonfile");
var bodyParser = require("body-parser");
var swig = require("swig");
var fs = require("fs");
var React = require("react");
var ReactDOM = require("react-dom/server");
var Router = require("react-router");
var RoutingContext = Router.RoutingContext;
var routes = require("./app/routes");
var cookieParser = require("cookie-parser");
var minify = require("html-minifier").minify;
var mongodb = require("mongodb");
var moment = require("moment");

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

// API / CHANNEL / GET / :ID
app.get("/api/channel/get/:id", function(req, res) {

	var id = req.params.id;
	var data = JSON.parse(JSON.stringify(global.dataIndexed[id]));

	// sort videos by date
	data.videos.sort(function(av, bv) {
		return bv.publishedAt - av.publishedAt;
	});

	data.videoCount = 0;

	if(data.videos && data.videos.length > 0) {

		data.videoCount = data.videos.length;
		data.lastUploadAt = Math.max.apply(null, data.videos.map(function(vid) {
			return vid.publishedAt;
		}));
		data.videos = data.videos.slice(0, 1);
	}

	// remove description from videos
	data.videos = data.videos.map(function(item) {
		delete item.description;
		return item;
	});

	return res.send(data);
});

// API / CHANNELS / GET
app.get("/api/channels/get", function(req, res) {

	var sortBy = req.query.sort || "subscribers";
	var take = parseInt(req.query.take) || 25;
	var skip = parseInt(req.query.skip) || 0;

	var ownData = JSON.parse(JSON.stringify(global.data));

	// apply sorting
	switch(sortBy) {

		// SUBSCRIBERS
		case "subscribers":

			// sort channels by subscribers
			ownData.sort(function(a, b) {
				return b.subscribers - a.subscribers;
			});
			break;

		// FOUNDED
		case "founded":

			// sort channels by age
			ownData.sort(function(a, b) {
				return b.publishedAt - a.publishedAt;
			});
			break;

		// UPLOAD
		case "upload":

			// who has the last video upload
			ownData.sort(function(a, b) {
				if(!b.videos || !a.videos) return 0;
				if(b.videos.length === 0 || a.videos.length === 0) return 0;

				a.videos.sort(function(av, bv) {
					return bv.publishedAt - av.publishedAt;
				});

				b.videos.sort(function(av, bv) {
					return bv.publishedAt - av.publishedAt;
				});

				return b.videos[0].publishedAt - a.videos[0].publishedAt;
			});
			break;
	}

	// remove unneeded properties
	var filtered = ownData.map(function(item) {

		// get the last timestamp a video was uploaded
		if(item.videos) {
			item.lastUploadAt = Math.max.apply(null, item.videos.map(function(vid) {
				return vid.publishedAt;
			}));
		}

		item.videos = (item.videos) ? item.videos.length : 0;
		return item;
	});

	// send data out
	return res.send({
		"data": filtered.slice(skip, skip + take),
		"skip": skip,
		"take": take
	});
});

// API / CHANNELS / SEARCH
app.get("/api/channels/search", function(req, res) {

	var sortBy = req.query.sort || "subscribers";
	var q = req.query.q || null;

	if(!q) return res.send({ "data": [] });
	q = q.toLowerCase();
	fs.appendFile("searches.log", q + "\n");

	// write query to mongodb
	global.searches.insertOne({
		"q": q,
		"time": moment.utc().toDate()
	});

	var ownData = JSON.parse(JSON.stringify(global.data));

	// apply sorting
	switch(sortBy) {

		// SUBSCRIBERS
		case "subscribers":

			// sort channels by subscribers
			ownData.sort(function(a, b) {
				return b.subscribers - a.subscribers;
			});

			break;

		// FOUNDED
		case "founded":

			// sort channels by age
			ownData.sort(function(a, b) {
				return b.publishedAt - a.publishedAt;
			});
			break;

		// UPLOAD
		case "upload":

			// who has the last video upload
			ownData.sort(function(a, b) {
				if(!b.videos || !a.videos) return 0;

				a.videos.sort(function(av, bv) {
					return bv.publishedAt - av.publishedAt;
				});

				b.videos.sort(function(av, bv) {
					return bv.publishedAt - av.publishedAt;
				});

				return b.videos[0].publishedAt - a.videos[0].publishedAt;
			});
			break;
	}

	// filter channels by query
	var filtered = ownData.filter(function(item) {
		return item.title.toLowerCase().indexOf(q) >= 0 || item.description.toLowerCase().indexOf(q) >= 0;
	});

	// remove unneeded properties
	filtered = filtered.map(function(item) {

		// get the last timestamp a video was uploaded
		if(item.videos) {
			item.lastUploadAt = Math.max.apply(null, item.videos.map(function(vid) {
				return vid.publishedAt;
			}));
		}

		item.videos = (item.videos) ? item.videos.length : 0;
		return item;
	});

	// send data out
	return res.send({
		"data": filtered
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

// LOAD DATA
function loadData() {

	console.log("loadData");

	// read data json
	jsonfile.readFile("data.json", function(err, obj) {

		// complete data
		global.data = obj;
		global.dataIndexed = {};

		// build index
		for(var i in obj) {
			global.dataIndexed[obj[i].id] = obj[i];
		}
	});
}

loadData();
setInterval(loadData, 1000*60*5);

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
