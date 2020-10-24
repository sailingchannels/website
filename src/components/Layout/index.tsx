import React, { useContext, useEffect } from "react";
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import useAxios, { configure } from "axios-hooks";
import Axios from "axios";
import { IdentityService } from "../../ServiceUrls";
import pckg from "../../../package.json";

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

// components
import NavMenuMobile from "../NavMenuMobile";
import NavMenu from "../NavMenu";
import GlobalContext, { GlobalActions } from "../../contexts/GlobalContext";
import SuggestChannel from "../../pages/SuggestChannel";
import UserMenu from "../UserMenu";
import SignInModal from "../SignInModal";

// configure axios hook
const axios = Axios.create({ withCredentials: true });
configure({ axios });

export default function Layout() {
	//#region Hooks

	// fetch global subscription data
	const [{ data, loading, error }] = useAxios<string[]>(`${IdentityService()}/api/me/subscriptions`, {
		useCache: false
	});

	// hook to access the global context
	const globalContext = useContext(GlobalContext.Context);

	useEffect(() => {
		// subscription data is successfully loaded
		if (!loading && data && !error && globalContext.state.subscriptions.length === 0) {
			// store in global context
			globalContext.dispatch({
				...globalContext.state,
				type: GlobalActions.SET_SUBSCRIPTIONS,
				subscriptions: data
			});
		}
	}, [data]);

	useEffect(() => {
		// data is not null, but error is, we are logged in
		if (data && !error) {
			globalContext.dispatch({
				...globalContext.state,
				type: GlobalActions.SET_LOGGED_IN,
				loggedIn: true
			});
		}

		// a 401 error returned, we are def. logged out!
		if (error?.response?.status === 401) {
			globalContext.dispatch({
				...globalContext.state,
				type: GlobalActions.SET_LOGGED_IN,
				loggedIn: false
			});
		}
	}, [error, data]);

	//#endregion

	return (
		<HashRouter>
			<NavMenuMobile />

			<SignInModal />

			<UserMenu />

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
								<Route exact path="/suggest" component={SuggestChannel} />
							</Switch>
						</div>
					</div>
				</div>
			</section>

			<footer className="footer">
				<div className="content has-text-centered">
					<p>
						<Link className="has-text-grey-light" to="/imprint">
							Imprint
						</Link>{" "}
						&middot;{" "}
						<Link className="has-text-grey-light" to="/privacy">
							Privacy Policy
						</Link>{" "}
						&middot;{" "}
						<a
							className="has-text-grey-light"
							target="_blank"
							href="https://github.com/sailingchannels"
						>
							<i className="fas fa-code" /> on GitHub
						</a>
					</p>
					<p className="has-text-grey-light">
						<small>v{pckg.version} &middot; made with ❤ in Germany &amp; Sweden</small>
					</p>
					<p>
						<img width="80" className="greyscale" src={require("../../static/img/logo.svg")} />
					</p>
				</div>
			</footer>
		</HashRouter>
	);
}
