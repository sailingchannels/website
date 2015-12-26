import React from "react";
import ChannelList from "./ChannelList";

class Home extends React.Component {
	render() {
		return (
			<div className="container">
				<input type="text" className="form-control" placeholder="Search ..." />
				<ChannelList />
			</div>
		);
	}
}

export default Home;
