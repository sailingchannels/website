var express = require("express");
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

var app = express();

app.set("port", process.env.PORT || 3000);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(express.static(path.join(__dirname, "public")));

// API / CHANNEL / GET / :ID
app.get("/api/channel/get/:id", function(req, res) {

	var id = req.params.id;
	return res.send(global.dataIndexed[id]);
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

		// VIEWS
		case "views":

			// sort channels by subscribers
			ownData.sort(function(a, b) {
				return b.views - a.views;
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

		case "views":

			// sort channels by subscribers
			ownData.sort(function(a, b) {
				return b.views - a.views;
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
			var html = ReactDOM.renderToString(<RoutingContext {...renderProps} />);
			var page = swig.renderFile("views/index.html", { html: html });
			return res.status(200).send(page);
		}

		// not found
		else {
			return res.status(404).send("Page Not Found");
		}
	});
});

// read data json
jsonfile.readFile("data.json", function(err, obj) {

	// complete data
	global.data = obj;
	global.dataIndexed = {};

	// build index
	for(var i in obj) {
		global.dataIndexed[obj[i].id] = obj[i];
	}

	// start server
	app.listen(app.get("port"), function() {
		console.log("Express server listening on port " + app.get("port"));
	});
});
