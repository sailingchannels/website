import React from "react";

class FlagButton extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			pressed: Cookies.get("flagged." + this.props.channel.id) || false,
			loggedIn: !!Cookies.get("me")
		};
	}

	// FLAG
	flag() {
		// send flag request to server
		$.post("/api/channel/flag", {
			channel: this.props.channel.id
		});

		// store global state in cookie
		Cookies.set("flagged." + this.props.channel.id, "true");

		// store local state
		this.setState({
			pressed: true
		});
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		this.setState({
			pressed: Cookies.get("flagged." + nextProps.channel.id) || false,
			loggedIn: !!Cookies.get("me")
		});
	}

	// RENDER
	render() {
		// not logged in, so function not available
		if (!this.state.loggedIn) {
			return null;
		}

		if (this.state.pressed === true || this.state.pressed === "true") {
			return (
				<span className="text-muted">
					<i className="fa fa-check fa-fw" /> Flagged as not sailing-related
				</span>
			);
		} else {
			return (
				<a href="javascript:void();" onClick={this.flag.bind(this)}>
					<i className="fa fa-flag fa-fw" /> Flag as not sailing-related
				</a>
			);
		}
	}
}

export default FlagButton;
