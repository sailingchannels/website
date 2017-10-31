import React, { Component } from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import ChannelMissingTester from "./ChannelMissingTester";
import MeActions from "../actions/MeActions";
import MeStore from "../stores/MeStore";
import SuggestChannels from "./SuggestChannels";

class Suggest extends Component {
	constructor(props) {
		super(props);

		this.state = MeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "Suggest a channel | Sailing Channels";
		MeStore.listen(this.onChange);
		if (this.state.subscriptions.length === 0) MeActions.getSubscriptions();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		MeStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// REPLACE X
	replaceX(e) {
		e.target.href = e.target.href.replace(/x/g, "");
	}

	// RENDER
	render() {
		return (
			<div className="container">
				<OffsetSocial />
				<Logo />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-3" />
					<div className="col-md-6">
						<h1 className="content-h1">Suggest a channel</h1>

						{this.state.me !== null ? (
							<div>
								<p>
									Know of any sailing channels that are not
									listed here? Well, that's brilliant! You can
									use the form below to check and suggest a
									channel for the list:
								</p>

								<ChannelMissingTester />

								<SuggestChannels
									subscriptions={this.state.subscriptions}
								/>
							</div>
						) : (
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
						)}
					</div>
					<div className="col-md-3" />
				</div>
			</div>
		);
	}
}

export default Suggest;
