import React from "react";
import $ from "jquery";

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.int = null;
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		this.int = window.setInterval(this.updateData, 10000);
		this.updateData();
	}

	updateData() {
		// stats
		$.get("/api/stats", function(data) {
			$("#channelsCount").html(data.channels);
			$("#videosCount").html(data.videos);
		});
	}

	componentWillUnmount() {
		window.clearInterval(this.int);
	}

	// RENDER
	render() {
		return (
			<div className="row">
				<div className="col-md-12">
					<div className="row">
						<div className="col-md-12">
							<h2>Dashboard</h2>
						</div>
					</div>

					<div className="row">
						<div className="col-md-3">
							<span id="channelsCount" /> Channels
						</div>
						<div className="col-md-3">
							<span id="videosCount" /> Videos
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Dashboard;
