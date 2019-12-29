import React, { useContext } from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import useAxios, { configure } from "axios-hooks";
import LRU from "lru-cache";
import Axios from "axios";
import Identity from "../../Identity";

// pages
import ChannelList from "../../pages/ChannelList";
import ChannelDetail from "../../pages/ChannelDetail";
import SearchResults from "../../pages/SearchResults";
import Topics from "../../pages/Topics";
import TopicDetail from "../../pages/TopicDetail";
import Contributions from "../../pages/Contributions";
import SupportUs from "../../pages/SupportUs";
import Introduction from "../../pages/Introduction";
import Imprint from "../../pages/Imprint";
import PrivacyPolicy from "../../pages/PrivacyPolicy";
import SignIn from "../../pages/SignIn";

// components
import NavMenuMobile from "../NavMenuMobile";
import NavMenu from "../NavMenu";
import GlobalContext, { GlobalActions } from "../../contexts/GlobalContext";

// configure axios hook
const axios = Axios.create({ withCredentials: true });
const cache = new LRU({ max: 10 });
configure({ axios, cache });

export default function Layout() {
	//#region Hooks

	// fetch global subscription data
	const [{ data, loading, error }, refetch] = useAxios<string[]>(`${Identity()}/api/me/subscriptions`);

	// hook to access the global context
	const globalContext = useContext(GlobalContext.Context);

	//#endregion

	// subscription data is successfully loaded
	if (!loading && data && !error && globalContext.state.subscriptions.length === 0) {
		// store in global context
		globalContext.dispatch({
			...globalContext.state,
			type: GlobalActions.SET_SUBSCRIPTIONS,
			subscriptions: data
		});
	}

	return (
		<HashRouter>
			<NavMenuMobile />

			<section className="section main-section">
				<div className="container">
					<div className="columns">
						<div className="column is-one-quarter">
							<NavMenu />
						</div>
						<div className="column">
							<Switch>
								<Route exact path="/" component={ChannelList} />
								<Route exact path="/by-:sortBy" component={ChannelList} />
								<Route exact path="/channel/:id" component={ChannelDetail} />
								<Route exact path="/channel/:id/:currentPage" component={ChannelDetail} />
								<Route exact path="/search/:query" component={SearchResults} />
								<Route exact path="/topics" component={Topics} />
								<Route exact path="/topics/:id" component={TopicDetail} />
								<Route exact path="/contributions" component={Contributions} />
								<Route exact path="/support-us" component={SupportUs} />
								<Route exact path="/how-it-works" component={Introduction} />
								<Route exact path="/imprint" component={Imprint} />
								<Route exact path="/privacy" component={PrivacyPolicy} />
								<Route exact path="/signin" component={SignIn} />
							</Switch>
						</div>
					</div>
				</div>
			</section>

			<footer className="footer">
				<div className="content has-text-centered">
					<p>
						<a className="has-text-grey-light" href="/imprint">
							Imprint
						</a>{" "}
						&middot;{" "}
						<a className="has-text-grey-light" href="/privacy">
							Privacy Policy
						</a>{" "}
						&middot;{" "}
						<a className="has-text-grey-light" href="https://github.com/sailingchannels">
							<i className="fas fa-code" /> on GitHub
						</a>
					</p>
					<p>
						<img width="80" className="greyscale" src={require("../../static/img/logo.svg")} />
					</p>
				</div>
			</footer>
		</HashRouter>
	);
}
