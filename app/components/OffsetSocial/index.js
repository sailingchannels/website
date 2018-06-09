import React from "react";
import Footer from "components/Footer";
import cookie from "react-cookie";
import { Link } from "react-router";
import LazyLoad from "react-lazyload";
import $ from "jquery";

import "./OffsetSocial.css";

class SocialOffset extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			me: cookie.load("me") ? JSON.parse(cookie.load("me").replace("j:", "")) : null,
			bannerdialog: !!cookie.load("banner-dialog")
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		$("#banner-dialog").on("hidden.bs.modal", this.modalClosed.bind(this));
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		$("#banner-dialog").on("hidden.bs.modal");
	}

	// REPLACE X
	replaceX(e) {
		var $e = $(e.target);
		if (!$e.attr("href")) {
			$e = $e.parents("[href]");
		}

		$e.attr("href", $e.attr("href").replace(/x/g, ""));
	}

	// REVEAL GREY
	revealGrey(e) {
		$(e.target).removeClass("grey");
	}

	// ADD GREY
	addGrey(e) {
		$(e.target).addClass("grey");
	}

	// MODAL CLOSED
	modalClosed() {
		this.setState({
			bannerdialog: true
		});
	}

	// RENDER
	render() {
		var profile = null;

		if (this.state.me) {
			if (!this.state.me.title || this.state.me.title === "") {
				profile = (
					<p className="profile-link hidden-xs hidden-sm">
						<Link to="/me">Your profile</Link>
					</p>
				);
			} else {
				profile = (
					<p className="profile-link hidden-xs hidden-sm">
						Hi, <Link to="/me">{this.state.me.title}</Link>
					</p>
				);
			}
		}

		return (
			<div className="offset-social">
				{profile}
				<div className="hidden-sm hidden-xs">
					<p className="sc-text">
						CONTACT<br />sailing-channels.com:
					</p>
					<a
						title="Sailing Channels on Facebook"
						href="https://www.fb.com/sailingchannels"
						target="_blank"
						className="social social-fb"
					>
						<i className="fa fa-facebook-square fa-3x" />
					</a>
					<br />
					<a
						title="Sailing Channels on Twitter"
						href="https://twitter.com/sailchannels"
						target="_blank"
						className="social social-tw"
					>
						<i className="fa fa-twitter-square fa-3x" />
					</a>
					<br />
					<a
						title="E-Mail"
						href="mailto:ahxoy@sailing-chaxnnels.com?subject=Ahoy sailor!"
						onMouseOver={this.replaceX.bind(this)}
						className="social social-em"
					>
						<i className="fa fa-envelope-square fa-3x" />
					</a>
				</div>

				{this.state.bannerdialog === true ? (
					<div>
						<div className="support-row hidden-sm hidden-xs">
							<p className="sc-text">
								SUPPORT<br />sailing-channels.com:
							</p>
							<div>
								<a href="https://www.patreon.com/sailingchannels" target="_blank">
									<LazyLoad height="50">
										<img
											src="https://rawgit.com/sailingchannels/website/master/public/img/patreon.jpg"
											className="grey support-img"
											height="50"
											width="50"
											onMouseOver={this.revealGrey.bind(this)}
											onMouseOut={this.addGrey.bind(this)}
										/>
									</LazyLoad>
								</a>
							</div>
							<div style={{ marginTop: "10px" }}>
								<a href="https://www.paypal.me/sailingchannels" target="_blank">
									<LazyLoad height="50">
										<img
											src="https://rawgit.com/sailingchannels/website/master/public/img/paypal.png"
											className="grey support-img"
											height="50"
											width="50"
											onMouseOver={this.revealGrey.bind(this)}
											onMouseOut={this.addGrey.bind(this)}
										/>
									</LazyLoad>
								</a>
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}

export default SocialOffset;
