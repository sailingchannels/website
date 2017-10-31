import React, { Component } from "react";
import HTTP from "../helpers/http";

class SuggestButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: null
		};
	}

	// ON CLICK
	onClick() {
		this.setState({
			status: "suggested"
		});

		new HTTP().post(
			{
				url: "/api/channel/suggest",
				data: JSON.stringify({
					channel: this.props.channel
				}),
				headers: {
					"Content-Type": "application/json"
				},
				type: "POST",
				dataType: "json",
				cache: false
			},
			(err, data) => {}
		);
	}

	// RENDER
	render() {
		if (this.state.status === null) {
			return (
				<button
					className="btn btn-default btn-raised"
					style={{ padding: "8px 20px" }}
					onClick={this.onClick.bind(this)}
				>
					Suggest
				</button>
			);
		} else if (this.state.status == "suggested") {
			return (
				<a className="btn btn-default">
					<i className="fa fa-check" /> Done
				</a>
			);
		}
	}
}

export default SuggestButton;
