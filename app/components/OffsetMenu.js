import React from "react";
import {Link} from "react-router";
import LanguagePicker from "./LanguagePicker";
import cookie from "react-cookie";

class OffsetMenu extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			"me": cookie.load("me") ? JSON.parse(cookie.load("me").replace("j:", "")) : null
		};

		console.log(this.state);
	}

	// TOGGLE MENU
	toggleMenu() {

		if($(".offset-menu").find("ul").hasClass("hidden-xs")) {
			$(".offset-menu").find("ul").removeClass("hidden-xs");
			$(".logo, .search-row").css("opacity", 0);
		}
		else {
			$(".offset-menu").find("ul").addClass("hidden-xs");
			$(".logo, .search-row").css("opacity", 1);
		}
	}

	// RENDER
	render() {

		return (
			<div>
				<div className="offset-bars hidden-md hidden-lg hidden-sm">
					<div onClick={this.toggleMenu.bind(this)}>
						<i className="fa fa-bars"></i>
					</div>
				</div>
	            <div className="offset-menu">
	                <ul className="hidden-xs">
						<li><Link to="/">Home</Link></li>
	                    <li><Link to="/how-it-works">How does this work?</Link></li>
	                    <li><Link to="/channel-missing">My channel is missing</Link></li>
						<li><Link to="/contributions">Contributions</Link></li>
						{(!this.state.me) ?
							<li><Link to="/login" className="yt-login"><i className="fa fa-youtube"></i> Login</Link></li>
							:
							<li><a href="/logout"><i className="fa fa-power-off"></i> Logout</a></li>
						}
						<li>
							<div div className="little-space">Channel language</div>
							<LanguagePicker />
						</li>
	                </ul>
	            </div>
			</div>
		);
	}
}

export default OffsetMenu;
