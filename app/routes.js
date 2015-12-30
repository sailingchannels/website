import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import ChannelDetail from "./components/ChannelDetail";
import DataCollection from "./components/DataCollection";
import ChannelMissing from "./components/ChannelMissing";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="by-:sortBy" component={Home} />
		<Route path="channel" component={Home}>
			<Route path=":id" component={ChannelDetail} />
		</Route>
		<Route path="by-:sortBy/search/:query" component={Home} />
		<Route path="data-collection" component={DataCollection} />
		<Route path="channel-missing" component={ChannelMissing} />
	</Route>
);
