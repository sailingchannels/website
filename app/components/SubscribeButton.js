import React from "react";
import ChannelActions from "../actions/ChannelActions";
import cookie from "react-cookie";

class SubscribeButton extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);

		this.state = {
			subscribed: props.channel.subscribed,
			loading: false
		};
	}

	// SUBSCRIBE
	subscribeChannel(e) {
		this.setState({
			subscribed: this.state.subscribed,
			loading: true
		});

		// perform the subscribe action
		ChannelActions.subscribe(this.props.channel.id, (err, data) => {
			if (!err && data.success === true) {
				this.setState({
					subscribed: true,
					loading: false
				});
			} else {
				this.setState({
					subscribed: this.state.subscribed,
					loading: false
				});
			}
		});
	}

	// UNSUBSCRIBE
	unsubscribeChannel(e) {
		this.setState({
			subscribed: this.state.subscribed,
			loading: true
		});

		// perform the unsubscribe action
		ChannelActions.unsubscribe(this.props.channel.id, (err, data) => {
			if (!err && data.success === true) {
				this.setState({
					subscribed: false,
					loading: false
				});
			} else {
				this.setState({
					subscribed: this.state.subscribed,
					loading: false
				});
			}
		});
	}

	// SHOW SIGN IN BANNER
	showSignInBanner() {
		if (!($("#signin-dialog").data("bs.modal") || {}).isShown) {
			// open the dialog
			$("#signin-dialog").modal("show");
		}
	}

	// RENDER
	render() {
		// user is not logged in
		if (!cookie.load("me")) {
			return (
				<button
					onClick={this.showSignInBanner.bind(this)}
					className="hidden-xs btn btn-danger btn-sidebar btn-raised"
				>
					<i className="fa fa-youtube-play" /> Subscribe
				</button>
			);
		}

		// a subscription state is known
		if (this.state.subscribed === false) {
			// render subscribe button
			if (this.state.loading === true) {
				return (
					<button
						className="hidden-xs btn btn-danger btn-sidebar btn-raised"
						disabled="disabled"
					>
						<i className="fa fa-spinner fa-pulse" />
					</button>
				);
			} else {
				return (
					<button
						onClick={this.subscribeChannel.bind(this)}
						className="hidden-xs btn btn-danger btn-sidebar btn-raised"
					>
						<span>
							<i className="fa fa-youtube-play" /> Subscribe
						</span>
					</button>
				);
			}
		} else {
			// render unsuscribe button
			if (this.state.loading === true) {
				return (
					<button className="hidden-xs btn btn-sidebar btn-raised" disabled="disabled">
						<i className="fa fa-spinner fa-pulse" />
					</button>
				);
			} else {
				return (
					<button
						onClick={this.unsubscribeChannel.bind(this)}
						className="hidden-xs btn btn-sidebar btn-raised"
					>
						<span>
							<i className="fa fa-youtube-play" /> Unsubscribe
						</span>
					</button>
				);
			}
		}
	}
}

export default SubscribeButton;
