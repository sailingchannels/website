import React from "react";
import Router from "react-router";
import ReactDOM from "react-dom";
import createBrowserHistory from "history/lib/createBrowserHistory";
import routes from "./routes";

// Load CSS
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-material-design/dist/css/bootstrap-material-design.min.css";
import "./global-styles.css";

// Load the favicon, the manifest.json file
import "!file-loader?name=[name].[ext]!./images/icons/favicon.ico";
import "!file-loader?name=[name].[ext]!./images/icons/icon-72x72.png";
import "!file-loader?name=[name].[ext]!./images/icons/icon-96x96.png";
import "!file-loader?name=[name].[ext]!./images/icons/icon-128x128.png";
import "!file-loader?name=[name].[ext]!./images/icons/icon-144x144.png";
import "!file-loader?name=[name].[ext]!./images/icons/icon-152x152.png";
import "!file-loader?name=[name].[ext]!./images/icons/icon-192x192.png";
import "!file-loader?name=[name].[ext]!./images/icons/icon-384x384.png";
import "!file-loader?name=[name].[ext]!./images/icons/icon-512x512.png";
import "!file-loader?name=[name].[ext]!./images/patreon.jpg";
import "!file-loader?name=[name].[ext]!./images/paypal.png";
import "!file-loader?name=[name].[ext]!./images/twoaboardtuuli.jpg";
import "!file-loader?name=[name].[ext]!./manifest.json";

const MOUNT_NODE = document.getElementById("app");
let history = createBrowserHistory();

const render = (messages) => {
	ReactDOM.render(<Router history={history}>{routes}</Router>, MOUNT_NODE);
};

if (module.hot) {
	// Hot reloadable React components
	// modules.hot.accept does not accept dynamic dependencies,
	// have to be constants at compile-time
	module.hot.accept(["components/App"], () => {
		ReactDOM.unmountComponentAtNode(MOUNT_NODE);
		render();
	});
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === "production") {
	require("offline-plugin/runtime").install();
}
