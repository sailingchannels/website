import * as React from "react";
import { Switch, Route, HashRouter } from "react-router-dom";
import NavMenuMobile from "../NavMenuMobile";
import NavMenu from "../NavMenu";
import ChannelList from "../../pages/ChannelList";

export default function Layout() {
	return (
		<>
			<NavMenuMobile />

			<section className="section">
				<div className="container">
					<div className="columns">
						<div className="column is-one-quarter">
							<NavMenu />
						</div>
						<div className="column">
							<HashRouter>
								<Switch>
									<Route exact path="/">
										<ChannelList />
									</Route>
								</Switch>
							</HashRouter>
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
						<a className="has-text-grey-light" href="/privacy-policy">
							Privacy Policy
						</a>{" "}
						&middot;{" "}
						<a className="has-text-grey-light" href="https://github.com/sailingchannels">
							<i className="fas fa-code" /> on GitHub
						</a>
					</p>
					<p>
						<img
							width="80"
							className="greyscale"
							src="https://cdn.jsdelivr.net/gh/thomasbrueggemann/sailing-channels/public/img/logo.svg"
						/>
					</p>
				</div>
			</footer>
		</>
	);
}
