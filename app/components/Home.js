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
		return (
			<div className="container">
				<img src="/public/img/logo.svg" className="logo" />
				<SearchBar />
				<ChannelList />
			</div>
		);
	}
}

export default Home;
