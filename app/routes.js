import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import ChannelDetail from "./components/ChannelDetail";
import VideoDetail from "./components/VideoDetail";
import DataCollection from "./components/DataCollection";
import ChannelMissing from "./components/ChannelMissing";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Imprint from "./components/Imprint";
import Contributions from "./components/Contributions";
import Login from "./components/Login";
import Me from "./components/Me";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="by-:sortBy" component={Home} />
		<Route path="channel/:id" component={ChannelDetail} />
		<Route path="video/:id" component={VideoDetail} />
		<Route path="search/:query" component={SearchResult} />
		<Route path="how-it-works" component={DataCollection} />
		<Route path="channel-missing" component={ChannelMissing} />
		<Route path="privacy" component={PrivacyPolicy} />
		<Route path="imprint" component={Imprint} />
		<Route path="contributions" component={Contributions} />
		<Route path="signin" component={Login} />
		<Route path="me" component={Me} />
	</Route>
);
