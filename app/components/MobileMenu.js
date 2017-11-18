import React, { Component } from "react";

class MobileMenu extends Component {
	render() {
		return (
			<div className="navbar navbar-default mobile-navbar">
				<div className="container-fluid">
					<div className="">
						<ul className="nav navbar-nav">
							<li className="active">
								<a href="javascript:void(0)">
									<i className="fa fa-users" />Subs
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="fa fa-eye" />
									Views
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="fa fa-upload" />Upload
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="fa fa-flash" />Founded
								</a>
							</li>
							<li>
								<a href="javascript:void(0)">
									<i className="fa fa-line-chart" />Trends
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default MobileMenu;
