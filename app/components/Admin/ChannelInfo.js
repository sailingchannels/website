import React from "react";

class ChannelInfo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		var that = this;

		$.get("/api/admin/channel/" + this.props.id, function(data) {
			this.setState(data);
		}.bind(this));
	}

	// RENDER
	render() {

		if(!this.state.title) {
			return (
				<a target="_blank" href={"https://youtube.com/channel/" + this.props.id}>{this.props.id}</a>
			);
		}
		else {

			return (
				<a target="_blank" href={"https://youtube.com/channel/" + this.props.id} title={this.state.description}>{this.state.title}</a>
			);
		}
	}
}

export default ChannelInfo;
