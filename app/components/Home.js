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
			if(!($("#banner-dialog").data("bs.modal") || {}).isShown && !Cookies.get("banner-dialog")) {

				// open the dialog
				$("#banner-dialog").modal("show");
				Cookies.set("banner-dialog", "shown", { expires: 3 });
			}
		}, 15000);
	}

	// RENDER
	render() {

		var sortBy = this.props.params.sortBy || "subscribers";
		var query = this.props.params.query;

		return (
			<div className="container">
				<Logo />
				<OffsetMenu />
				<SearchBar sortBy={sortBy} history={this.props.history} />
				<ChannelList sortBy={sortBy} history={this.props.history} query={query} />
				{this.props.children}
				<Banner />
			</div>
		);
	}
}

export default Home;
