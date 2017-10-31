import React from "react";
import { Link } from "react-router";
import LanguagePicker from "./LanguagePicker";

class OffsetMenu extends React.Component {
	// TOGGLE MENU
	toggleMenu() {
		if (
			$(".offset-menu")
				.find("ul")
				.hasClass("hidden-xs")
		) {
			$(".offset-menu")
				.find("ul")
				.removeClass("hidden-xs");
			$(".offset-menu").addClass("cover-up");
			$(".logo, .search-row").css("opacity", 0);
		} else {
			$(".offset-menu")
				.find("ul")
				.addClass("hidden-xs");
			$(".offset-menu").removeClass("cover-up");
			$(".logo, .search-row").css("opacity", 1);
		}
	}

	// RENDER
	render() {
		return (
			<div>
				<div className="offset-bars hidden-md hidden-lg hidden-sm">
					<div onClick={this.toggleMenu.bind(this)}>
						<i className="fa fa-bars" />
					</div>
				</div>
				<div className="offset-menu">
					<ul className="hidden-xs">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/how-it-works">How does this work?</Link>
						</li>
						<li>
							<Link to="/suggest">
								<span className="label label-success">
									New
								</span>{" "}
								Suggest a channel
							</Link>
						</li>
						<li>
							<Link to="/contributions">Contributions</Link>
						</li>
						<li>
							<Link to="/support">Support us</Link>
						</li>
						<li>
							<div className="little-space">Channel language</div>
							<LanguagePicker />
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default OffsetMenu;
