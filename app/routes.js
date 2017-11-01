import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/App";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import ChannelDetail from "./components/ChannelDetail";
import VideoDetail from "./components/VideoDetail";
import DataCollection from "./components/DataCollection";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Imprint from "./components/Imprint";
import Contributions from "./components/Contributions";
import Login from "./components/Login";
import Me from "./components/Me";
import SupportUs from "./components/SupportUs";
import Admin from "./components/Admin/Admin";
import AdminDashboard from "./components/Admin/Dashboard";
import AdminAdditional from "./components/Admin/Additional";
import AdminBlacklist from "./components/Admin/Blacklist";
import AdminFlags from "./components/Admin/Flags";
import AdminSuggestions from "./components/Admin/Suggestions";
import Suggest from "./components/Suggest";

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="by-:sortBy" component={Home} />
		<Route path="channel/:id" component={ChannelDetail} />
		<Route path="video/:id" component={VideoDetail} />
		<Route path="search/:query" component={SearchResult} />
		<Route path="how-it-works" component={DataCollection} />
		<Route path="suggest" component={Suggest} />
		<Route path="privacy" component={PrivacyPolicy} />
		<Route path="imprint" component={Imprint} />
		<Route path="contributions" component={Contributions} />
		<Route path="signin" component={Login} />
		<Route path="support" component={SupportUs} />
		<Route path="me" component={Me} />
		<Route path="admin/" component={Admin}>
			<IndexRoute component={AdminDashboard} />
			<Route path="dashboard" component={AdminDashboard} />
			<Route path="additional" component={AdminAdditional} />
			<Route path="blacklist" component={AdminBlacklist} />
			<Route path="flags" component={AdminFlags} />
			<Route path="suggestions" component={AdminSuggestions} />
		</Route>
	</Route>
);
