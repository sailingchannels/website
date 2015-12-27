import React from "react";
import ChannelList from "./ChannelList";

class Home extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<input type="text" className="form-control" placeholder="Search ..." />
					</div>
				</div>
				<ChannelList />
			</div>
		);
	}
}

export default Home;
