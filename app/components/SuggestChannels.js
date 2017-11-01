import React, { Component } from "react";
import HTTP from "../helpers/http";
import SuggestChannelsList from "./SuggestChannelsList";

class SuggestChannels extends Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			sail: [],
			nonsail: []
		};
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		if (!nextProps.subscriptions) return;

		new HTTP().post(
			{
				url: "/api/channels/identify",
				data: JSON.stringify({
					hints: nextProps.subscriptions
				}),
				headers: {
					"Content-Type": "application/json"
				},
				type: "POST",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				this.setState({
					sail: data.filter(c => {
						return c.src == "yt" && c.sail === true;
					}),
					nonsail: data.filter(c => {
						return c.src == "yt" && c.sail === false;
					})
				});
			}
		);
	}

	// RENDER
	render() {
		if (this.state.sail.length === 0 && this.state.nonsail.length === 0)
			return null;

		return (
			<div>
				<hr />
				<center>
					<p>&nbsp;</p>
					<h3>
						<i className="fa fa-youtube" /> Channels you subscribed
						to
					</h3>
					<p>
						Some of your subscriptions are likely to be sailing
						channels and are <u>not</u> yet listed on
						sailing-channels.com. You can easliy suggest them to be
						listed:
					</p>
					<p>&nbsp;</p>
				</center>
				<SuggestChannelsList channels={this.state.sail} />
				<hr />
				<div className="alert alert-info" role="alert">
					Some of your subscriptions are probably not
					sailing-channels, but you can check and suggest them anyway:
				</div>
				<p>&nbsp;</p>
				<SuggestChannelsList channels={this.state.nonsail} />
			</div>
		);
	}
}

export default SuggestChannels;
