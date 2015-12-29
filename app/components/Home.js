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
				<div className="logo">
				  <div className="turnaround">
				    <div className="front"></div>
				    <div className="back"></div>
				  </div>
				</div>
				<SearchBar />
				<ChannelList />
			</div>
		);
	}
}

export default Home;
