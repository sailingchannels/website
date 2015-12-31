import React from "react";
import ChannelList from "./ChannelList";
import SearchBar from "./SearchBar";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";
import Banner from "./Banner";

class Home extends React.Component {

	// COMPONENT DID MOUNT
	componentDidMount() {
		$.material.init();

		window.setTimeout(function() {
			if(!($("#banner-dialog").data("bs.modal") || {}).isShown) {

				// open the dialog
				$("#banner-dialog").modal("show");
			}
		}, 5000);
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
				<Banner />
			</div>
		);
	}
}

export default Home;
