import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import ChannelDetail from "./components/ChannelDetail";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="channel" component={Home}>
			<Route path=":id" component={ChannelDetail} />
		</Route>
	</Route>
);
