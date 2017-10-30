import React, { Component } from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import ChannelMissingTester from "./ChannelMissingTester";

class Suggest extends Component {
	render() {
		return (
			<div className="container">
				<OffsetSocial />
				<Logo />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-3" />
					<div className="col-md-6">
						<h1 className="content-h1">Suggest a channel</h1>

						<p>
							You were expecting to see a certain channel here?
							Well, that's easy. You can use the form below to
							suggest one to be added to the list:
						</p>

						<ChannelMissingTester />
					</div>
					<div className="col-md-3" />
				</div>
			</div>
		);
	}
}

export default Suggest;
