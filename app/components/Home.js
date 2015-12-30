import React from "react";
import ChannelList from "./ChannelList";
import SearchBar from "./SearchBar";

class Home extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		$.material.init();
	}

	// RENDER
	render() {

		var sortBy = this.props.params.sortBy || "subscribers";

		return (
			<div className="container">
				<div className="logo">
				  <div className="turnaround">
				    <div className="front"></div>
				    <div className="back"></div>
				  </div>
				</div>
				<SearchBar sortBy={sortBy} />
				<ChannelList sortBy={sortBy} history={this.props.history} />
				{this.props.children}
			</div>
		);
	}
}

export default Home;
