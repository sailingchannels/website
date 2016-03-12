import React from "react";
import Footer from "./Footer";
import cookie from "react-cookie";
import {Link} from "react-router";

class SocialOffset extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			"me": cookie.load("me") ? JSON.parse(cookie.load("me").replace("j:", "")) : null
		};
	}

	// REPLACE X
	replaceX(e) {
		var $e = $(e.target);
		if(!$e.attr("href")) {
			$e = $e.parents("[href]");
		}

		$e.attr("href", $e.attr("href").replace(/x/g, ""));
	}

	// RENDER
	render() {

		return (
			<div className="offset-social">
				{(this.state.me) ? <p>Hi, <Link to="/me">{this.state.me.title}</Link></p> : null}
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
		    </div>
		);
	}
}

export default SocialOffset;
