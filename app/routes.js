import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import ChannelDetail from "./components/ChannelDetail";
import DataCollection from "./components/DataCollection";
import ChannelMissing from "./components/ChannelMissing";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Impressum from "./components/Impressum";
import Contributions from "./components/Contributions";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="by-:sortBy" component={Home} />
		<Route path="channel/:id" component={ChannelDetail} />
		<Route path="by-:sortBy/search/:query" component={Home} />
		<Route path="how-it-works" component={DataCollection} />
		<Route path="channel-missing" component={ChannelMissing} />
		<Route path="privacy" component={PrivacyPolicy} />
		<Route path="impressum" component={Impressum} />
		<Route path="contributions" component={Contributions} />
	</Route>
);
