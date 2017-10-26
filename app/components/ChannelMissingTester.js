import React, { Component } from "react";
import { Link } from "react-router";

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

		this.setState({ channelValue: v, checking: v.length > 0 });
		console.log(v);
	}

	// RENDER
	render() {
		return (
			<div>
				<center>
					<input
						type="text"
						placeholder="https://youtube.com/channel/..."
						style={{ width: "80%" }}
						className="form-control"
						value={this.state.channelValue}
						onChange={this.handleChange.bind(this)}
					/>

					{this.state.checking ? <p>Checking...</p> : null}
				</center>

				{this.state.checkChannelResult === false ? (
					<p>
						Send an email to{" "}
						<a
							href="mailto:ahoyx@sailingx-channels.com"
							onMouseOver={this.replaceX.bind(this)}
							className="reverse"
						>
							moc.slennahc-gnilias@yoha
						</a>
					</p>
				) : null}

				{this.state.checkChannelResult === true ? (
					<p>
						Congratulations, your channel is already listed:
						<Link to={""}>Channel name</Link>
					</p>
				) : null}
			</div>
		);
	}
}

export default ChannelMissingTester;
