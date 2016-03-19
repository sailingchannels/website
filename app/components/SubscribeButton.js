import React from "react";
import ChannelActions from "../actions/ChannelActions";

class SubscribeButton extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);

		this.state = {
			"subscribed": false,
			"loading": false
		};
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		this.state.subscribed = this.props.channel.subscribed;
	}

	// SUBSCRIBE
	subscribeChannel(e) {

		this.setState({
			"subscribed": this.state.subscribed,
			"loading": true
		});

		// perform the subscribe action
		ChannelActions.subscribe(this.props.channel.id, (err, data) => {

			if(!err && data.success === true) {
				this.setState({
					"subscribed": true,
					"loading": false
				});
			}
		});
	}

	// UNSUBSCRIBE
	unsubscribeChannel(e) {

		this.setState({
			"subscribed": this.state.subscribed,
			"loading": true
		});

		// perform the unsubscribe action
		ChannelActions.unsubscribe(this.props.channel.id, (err, data) => {

			if(!err && data.success === true) {
				this.setState({
					"subscribed": false,
					"loading": false
				});
			}
		});
	}

	// RENDER
	render() {

		if(this.state.subscribed === false) {

			// render subscribe button
			if(this.state.loading === true) {
				return (
					<button className="hidden-xs btn btn-danger btn-sidebar btn-raised" disabled="disabled">
						<i className="fa fa-spinner fa-pulse"></i>
					</button>
				);
			}
			else {
				return (
					<button onClick={this.subscribeChannel.bind(this)} className="hidden-xs btn btn-danger btn-sidebar btn-raised">
						<span><i className="fa fa-youtube-play"></i> Subscribe</span>
					</button>
				);
			}
		}
		else {

			// render unsuscribe button
			if(this.state.loading === true) {
				return (
					<button className="hidden-xs btn btn-sidebar btn-raised" disabled="disabled">
						<i className="fa fa-spinner fa-pulse"></i>
					</button>
				);
			}
			else {
				return (
					<button onClick={this.unsubscribeChannel.bind(this)} className="hidden-xs btn btn-sidebar btn-raised">
						<span><i className="fa fa-youtube-play"></i> Unsubscribe</span>
					</button>
				);
			}
		}
	}
}

export default SubscribeButton;
