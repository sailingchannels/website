import React, { Component } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

class MobileMenu extends Component {
	onSearchClicked() {
		if ($(".search-row").hasClass("hidden-xs")) {
			$(".search-row").removeClass("hidden-xs hidden-sm");
		} else {
			$(".search-row").addClass("hidden-xs hidden-sm");
		}
	}

	render() {
		const urlSplitted = window.location.href.split("/");
		const route = urlSplitted[3];

		var title;
		switch (route) {
			case "by-subscribers":
				title = "Most subscribers";
				break;
			case "by-views":
				title = "Most views";
				break;
			case "by-upload":
			case "":
				title = "Latest upload";
				break;
			case "by-founded":
				title = "Newest channel";
				break;
			case "by-trending":
				title = "Trending";
				break;
			case "search":
				title = "Search";
				break;
			case "imprint":
				title = "Imprint";
				break;
		}

		return (
			<div className="mobile-menu-container hidden-lg hidden-md">
				<div className="offset-search" onClick={this.onSearchClicked.bind(this)}>
					<i className="fa fa-search" />
				</div>

				<div className="row mobile-menu-row">
					<div className="col-xs-2">
						<Logo className="mobile-logo" />
					</div>
					<div className="col-xs-8 mobile-title">{title}</div>
				</div>
				<div className="mobile-nav-row">
					<ul className="nav nav-justified mobile-nav">
						<li>
							<Link
								to={"/by-subscribers"}
								className={route === "by-subscribers" ? "active" : null}
							>
								<i className="fa fa-users" />
							</Link>
						</li>
						<li>
							<Link
								to={"/by-views"}
								className={route === "by-views" ? "active" : null}
							>
								<i className="fa fa-eye" />
							</Link>
						</li>
						<li>
							<Link
								to={"/by-upload"}
								className={route === "by-upload" || route === "" ? "active" : null}
							>
								<i className="fa fa-clock-o" />
							</Link>
						</li>
						<li>
							<Link
								to={"/by-founded"}
								className={route === "by-founded" ? "active" : null}
							>
								<i className="fa fa-graduation-cap" />
							</Link>
						</li>
						<li>
							<Link
								to={"/by-trending"}
								className={route === "by-trending" ? "active" : null}
							>
								<i className="fa fa-line-chart" />
							</Link>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default MobileMenu;