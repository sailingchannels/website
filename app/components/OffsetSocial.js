import React from "react";
import Footer from "./Footer";
import cookie from "react-cookie";
import {Link} from "react-router";

class SocialOffset extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			"me": cookie.load("me") ? JSON.parse(cookie.load("me").replace("j:", "")) : null,
			"bannerdialog": !!cookie.load("banner-dialog")
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
		if(!$e.attr("href")) {
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
			"bannerdialog": true
		});

		//this.forceUpdate();
	}

	// RENDER
	render() {

		var profile = null;

		if(this.state.me) {
			if(!this.state.me.title || this.state.me.title === "") {
				profile = <p><Link to="/me">Your profile</Link></p>;
			}
			else {
				profile = <p>Hi, <Link to="/me">{this.state.me.title}</Link></p>;
			}
		}

		return (
			<div className="offset-social">
				{profile}
		        <a title="Sailing Channels on Facebook" href="https://www.fb.com/sailingchannels" target="_blank" className="social social-fb">
		            <i className="fa fa-facebook-square fa-3x"></i>
		        </a>
				<br />
		        <a title="Sailing Channels on Twitter" href="https://twitter.com/sailchannels" target="_blank" className="social social-tw">
		            <i className="fa fa-twitter-square fa-3x"></i>
		        </a>
				<br />
				<a title="E-Mail" href="mailto:ahxoy@sailing-chaxnnels.com?subject=Ahoy sailor!" onMouseOver={this.replaceX.bind(this)} className="social social-em">
		            <i className="fa fa-envelope-square fa-3x"></i>
		        </a>

				{(this.state.bannerdialog === true) ?
					<div>
						<div className="support-row hidden-sm hidden-xs">
							<p className="sc-text">Support us:</p>
							<p>
								<a href="https://www.patreon.com/sailingchannels" target="_blank">
									<img src="https://rawgit.com/sailingchannels/website/master/public/img/patreon.jpg" className="grey support-img" height="50" width="50" onMouseOver={this.revealGrey.bind(this)} onMouseOut={this.addGrey.bind(this)} />
								</a>
							</p>
							<p>
								<a href="https://www.paypal.me/sailingchannels" target="_blank">
									<img src="https://rawgit.com/sailingchannels/website/master/public/img/paypal.png" className="grey support-img" height="50" width="50" onMouseOver={this.revealGrey.bind(this)} onMouseOut={this.addGrey.bind(this)} />
								</a>
							</p>
						</div>
						<div className="support-row hidden-sm hidden-xs">
							<p className="sc-text">Special thanks to:</p>
							<p>
								<a href="http://isailor.us/" target="_blank">
									<img src="https://rawgit.com/sailingchannels/website/master/public/img/transas.png" className="grey support-img thanks-img" onMouseOver={this.revealGrey.bind(this)} onMouseOut={this.addGrey.bind(this)} />
								</a>
							</p>
							<p>
								<a href="http://www.inreachdelorme.com/" target="_blank">
									<img src="https://rawgit.com/sailingchannels/website/master/public/img/delorme.png" className="grey support-img thanks-img" onMouseOver={this.revealGrey.bind(this)} onMouseOut={this.addGrey.bind(this)} />
								</a>
							</p>
						</div>
					</div>
				: null}
		    </div>
		);
	}
}

export default SocialOffset;
