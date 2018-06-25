import React, { Fragment as _ } from "react";
import Footer from "components/Footer";
import MobileMenu from "components/MobileMenu";

import { Switch, Route } from "react-router-dom";

import Home from "components/Home";
import SearchResult from "components/SearchResult/Loadable";
import ChannelDetail from "components/ChannelDetail/Loadable";
import VideoDetail from "components/VideoDetail/Loadable";
import DataCollection from "components/DataCollection/Loadable";
import PrivacyPolicy from "components/PrivacyPolicy/Loadable";
import Imprint from "components/Imprint/Loadable";
import Contributions from "components/Contributions/Loadable";
import Login from "components/Login/Loadable";
import Me from "components/Me/Loadable";
import SupportUs from "components/SupportUs/Loadable";
import Suggest from "components/Suggest/Loadable";
import Topics from "components/Topics/Loadable";
import Topic from "components/Topic/Loadable";

// admin
import Admin from "components/Admin/Admin";
import AdminDashboard from "components/Admin/Dashboard";
import AdminAdditional from "components/Admin/Additional";
import AdminBlacklist from "components/Admin/Blacklist";
import AdminFlags from "components/Admin/Flags";
import AdminSuggestions from "components/Admin/Suggestions";

class App extends React.Component {
	render() {
		return (
			<_>
				<MobileMenu />
				<Switch>
					<Route path="/by-:sortBy" component={Home} />
					<Route path="/channel/:id" component={ChannelDetail} />
					<Route path="/video/:id" component={VideoDetail} />
					<Route path="/search/:query" component={SearchResult} />
					<Route path="/how-it-works" component={DataCollection} />
					<Route path="/suggest" component={Suggest} />
					<Route path="/privacy" component={PrivacyPolicy} />
					<Route path="/imprint" component={Imprint} />
					<Route path="/contributions" component={Contributions} />
					<Route path="/signin" component={Login} />
					<Route path="/support" component={SupportUs} />
					<Route path="/me" component={Me} />
					<Route path="/topics" component={Topics} />
					<Route path="/topic/:id" component={Topic} />
					<Route path="/admin" component={Admin}>
						<Route path="/dashboard" component={AdminDashboard} />
						<Route path="/additional" component={AdminAdditional} />
						<Route path="/blacklist" component={AdminBlacklist} />
						<Route path="/flags" component={AdminFlags} />
						<Route path="/suggestions" component={AdminSuggestions} />
						<Route component={AdminDashboard} />
					</Route>
					<Route component={Home} />
				</Switch>
				<Footer />
			</_>
		);
	}
}

export default App;
