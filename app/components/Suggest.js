import React, { Component } from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import ChannelMissingTester from "./ChannelMissingTester";
import MeActions from "../actions/MeActions";
import MeStore from "../stores/MeStore";
import SuggestChannels from "./SuggestChannels";
import { Link } from "react-router";

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

		MeActions.getMe();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		MeStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);

		// should the subscriptions be fetched?
		if (
			this.state.subscriptions.length === 0 &&
			Object.keys(this.state.me).length > 0
		)
			MeActions.getSubscriptions();
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

						{Object.keys(this.state.me).length > 0 ? (
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
							<div>
								<p>
									Know of any sailing channels that are not
									listed here? Well, that's brilliant! Send an
									email with the link to the channel to{" "}
									<a
										href="mailto:ahoyx@sailingx-channels.com"
										onMouseOver={this.replaceX.bind(this)}
										className="reverse"
									>
										moc.slennahc-gnilias@yoha
									</a>
								</p>
								<p>
									If you login with your YouTube account, you
									can easily suggest channels from this page.
								</p>
								<center>
									<a
										href="/oauth2callback"
										className="btn btn-raised btn-sm btn-danger yt-login"
									>
										Sign In with{" "}
										<i className="fa fa-youtube" /> YouTube
									</a>
									<Link
										className="btn btn-link show btn-more-info"
										to={"/signin"}
									>
										More info
									</Link>
								</center>
								<p>
									<img
										src={
											prefix + "/img/features/suggest.png"
										}
									/>
								</p>
							</div>
						)}
					</div>
					<div className="col-md-3" />
				</div>
			</div>
		);
	}
}

export default Suggest;
