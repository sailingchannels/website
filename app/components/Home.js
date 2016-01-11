import React from "react";
import ChannelList from "./ChannelList";
import SearchBar from "./SearchBar";
import OffsetMenu from "./OffsetMenu";
import Logo from "./Logo";
import Banner from "./Banner";

class Home extends React.Component {

	// RENDER
	render() {

		var sortBy = this.props.params.sortBy || "subscribers";

		return (
			<div className="container">
				<Logo />
				<OffsetMenu />
				<SearchBar sortBy={sortBy} history={this.props.history} />
				<ChannelList sortBy={sortBy} history={this.props.history} />
				{this.props.children}
				<Banner />
			</div>
		);
	}
}

export default Home;
