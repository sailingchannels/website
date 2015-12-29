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

// API / CHANNELS / GET
app.get("/api/channels/get", function(req, res) {

	var sortBy = req.query.sort || "subscribers";
	var take = parseInt(req.query.take) || 10;
	var skip = parseInt(req.query.skip) || 0;

	// apply sorting
	switch(sortBy) {

		// SUBSCRIBERS
		case "subscribers":

			// sort channels by subscribers
			global.data.sort(function(a, b) {
				return b.subscribers - a.subscribers;
			});

			break;
	}

	// remove unneeded properties
	var data = global.data.map(function(item) {
		item.videos = item.videos.length;
		return item;
	});

	// send data out
	return res.send(data.slice(skip, skip + take));
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
