import React, { Component } from "react";
import { Link } from "react-router";
import HTTP from "helpers/http";
import SuggestChannelsList from "components/SuggestChannelsList";

class ChannelMissingTester extends Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			channelValue: "",
			checkChannelResult: null,
			checking: false
		};
	}

	// HANDLE CHANGE
	handleChange(event) {
		const v = event.target.value;

		this.setState({
			channelValue: v,
			checking: v.length > 0,
			checkChannelResult: null
		});

		new HTTP().post(
			{
				url: "/api/channels/identify",
				data: JSON.stringify({
					hints: [v]
				}),
				headers: {
					"Content-Type": "application/json"
				},
				type: "POST",
				dataType: "json",
				cache: false
			},
			(err, data) => {
				if (err || !data) {
					this.setState({
						checkChannelResult: null,
						channel: null,
						checking: false
					});
				} else {
					if (data[0].src === null) {
						this.setState({
							checkChannelResult: false,
							channel: null,
							checking: false
						});
					} else {
						this.setState({
							checkChannelResult: data[0].src === "db",
							channel: data[0],
							checking: false
						});
					}
				}
			}
		);
	}

	// RENDER
	render() {
		return (
			<div>
				<center>
					<input
						type="text"
						placeholder="https://youtube.com/channel/..."
						style={{ width: "80%", marginBottom: "20px" }}
						className="form-control"
						value={this.state.channelValue}
						onChange={this.handleChange.bind(this)}
					/>

					{this.state.checking ? <p>Checking...</p> : null}
				</center>

				{/* CHANNEL NOT LISTED YET */}
				{this.state.checkChannelResult === false &&
				this.state.channel !== null &&
				this.state.channelValue.length > 0 ? (
					<SuggestChannelsList channels={[this.state.channel]} />
				) : null}

				{/* CHANNEL ALREADY LISTED */}
				{this.state.checkChannelResult === true && this.state.channelValue.length > 0 ? (
					<center>
						<p className="text text-success">
							Well, this channel is already listed, check it out:{" "}
							<Link to={"/channel/" + this.state.channel._id}>
								{this.state.channel.data.title}
							</Link>
						</p>
					</center>
				) : null}

				{/* NOT A REAL CHANNEL */}
				{this.state.checkChannelResult === false &&
				this.state.channel === null &&
				this.state.channelValue.length > 0 ? (
					<center>
						<p className="text text-warning">This is not a valid YouTube channel!</p>
					</center>
				) : null}
			</div>
		);
	}
}

export default ChannelMissingTester;
