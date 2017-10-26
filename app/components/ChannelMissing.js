import React from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import ChannelMissingTester from "./ChannelMissingTester";

class ChannelMissing extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			stats: null
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "My channel is missing | Sailing Channels";

		var that = this;

		// read stats
		$.getJSON("/api/stats", function(result) {
			that.setState({
				stats: result
			});
		});
	}

	// REPLACE X
	replaceX(e) {
		e.target.href = e.target.href.replace(/x/g, "");
	}

	// RENDER
	render() {
		var stats = null;
		if (this.state.stats) {
			stats = (
				<p>
					This site currently lists {this.state.stats.channels}{" "}
					channels with {this.state.stats.videos} videos in total.
				</p>
			);
		}

		return (
			<div className="container">
				<OffsetSocial />
				<Logo />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-3" />
					<div className="col-md-6">
						<h1 className="content-h1">My channel is missing</h1>
						{stats}

						<p>
							You were expecting to see your channel here? Well,
							that's easy. You can test if your channel is already
							listed below:
						</p>

						<p>
							<b>Test if our channel is already listed</b> on
							sailing-channels.com by pasting your YouTube channel
							link:
						</p>

						<ChannelMissingTester />
					</div>
					<div className="col-md-3" />
				</div>
			</div>
		);
	}
}

export default ChannelMissing;
