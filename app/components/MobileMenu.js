import React, { Component } from "react";
import { Link } from "react-router";
import Logo from "./Logo";

class MobileMenu extends Component {
	render() {
		return (
			<div className="mobile-menu-container hidden-lg hidden-md">
				<div className="row mobile-menu-row">
					<div className="col-xs-2">
						<Logo className="mobile-logo" />
					</div>
					<div className="col-xs-8 mobile-title">Newly uploaded</div>
				</div>
				<div className="mobile-nav-row">
					<ul className="nav nav-justified mobile-nav">
						<li>
							<Link to={"/by-subscribers"} className="active">
								<i className="fa fa-users" />
							</Link>
						</li>
						<li>
							<Link to={"/by-views"}>
								<i className="fa fa-eye" />
							</Link>
						</li>
						<li>
							<Link to={"/by-upload"}>
								<i className="fa fa-clock-o" />
							</Link>
						</li>
						<li>
							<Link to={"/by-founded"}>
								<i className="fa fa-graduation-cap" />
							</Link>
						</li>
						<li>
							<Link to={"/by-trending"}>
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
