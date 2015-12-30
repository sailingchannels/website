import React from "react";
import ChannelList from "./ChannelList";
import SearchBar from "./SearchBar";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";

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
				<Logo />
				<OffsetMenu />
				<SearchBar sortBy={sortBy} history={this.props.history} />
				<ChannelList sortBy={sortBy} history={this.props.history} query={this.props.params.query} />
				{this.props.children}
			</div>
		);
	}
}

export default Home;
