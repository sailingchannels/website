import React from "react";
import Helmet from "react-helmet";
import anchorme from "anchorme";
import $ from "jquery";

import ChannelActions from "actions/ChannelActions";
import ChannelStore from "stores/ChannelStore";
import OffsetMenu from "components/OffsetMenu";
import OffsetSocial from "components/OffsetSocial";
import VideoList from "components/VideoList";
import Logo from "components/Logo";
import HistoryChart from "components/HistoryChart";
import SubscribeButton from "components/SubscribeButton";
import PositionMap from "components/PositionMap";
import FlagButton from "components/FlagButton";
import Tags from "components/Tags";

import "./ChannelDetail.css";

class ChannelDetail extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = ChannelStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		ChannelStore.listen(this.onChange);
		ChannelActions.getChannel(this.props.match.params.id);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.match.params.id) {
			ChannelActions.getChannel(nextProps.params.id);
		}
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		ChannelStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// FORMAT DATE
	formatDate(unix) {
		var m = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec"
		];
		var d = new Date(unix * 1000);
		return m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
	}

	// RENDER
	render() {
		// no channel yet
		if (!this.state.channel) {
			return null;
		}

		// create custom links list
		var customLinks = [];
		if (
			"customLinks" in this.state.channel &&
			this.state.channel.customLinks !== null &&
			this.state.channel.customLinks.length > 0
		) {
			for (var l in this.state.channel.customLinks) {
				customLinks.push(
					<li key={"customlink_" + l}>
						<a target="_blank" href={this.state.channel.customLinks[l].url}>
							<img src={this.state.channel.customLinks[l].icon} />{" "}
							{this.state.channel.customLinks[l].title}
						</a>
					</li>
				);
			}
		}

		return (
			<div className="container">
				<Helmet title={this.state.channel.title + " | Sailing Channels"} />
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				<OffsetMenu />
				<div className="row">
					<div className="col-md-1" />
					<div className="col-md-10">
						<div className="row">
							<div className="col-md-12">
								<center>
									<h1>{this.state.channel.title}</h1>
								</center>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2 col-sm-2">
								<img src={this.state.channel.thumbnail} className="channel-thumb" />

								<Tags id={this.state.channel.id} />
							</div>
							<div className="col-md-7 col-sm-7">
								<p
									className="channel-description"
									dangerouslySetInnerHTML={{
										__html: anchorme(
											this.state.channel.description.replace("\n", "<br />"),
											{ target: "_blank" }
										)
									}}
								/>
								<p>&nbsp;</p>
								{this.state.channel.position ? (
									<div>
										<p>
											<b>Latest position:</b> <sup>(beta)</sup>
										</p>
										<PositionMap channel={this.state.channel.id} />
										<p>&nbsp;</p>
									</div>
								) : null}
								<p>
									<b>Latest video:</b>
								</p>
								<iframe
									width="100%"
									height="315"
									src={
										"https://www.youtube.com/embed/" +
										this.state.channel.videos[0]["_id"] +
										"?origin=https://sailing-channels.com"
									}
									frameBorder="0"
									allowFullScreen
								/>
								<p>&nbsp;</p>
								<p>
									<b>All videos:</b>
								</p>
								<VideoList channel={this.state.channel} />
							</div>
							<div className="col-md-3 col-sm-3">
								<p>
									<b>Subscribers in last 7 days:</b>
								</p>
								<HistoryChart
									name="subscribers"
									data={this.state.channel.subHist}
								/>
								<p>&nbsp;</p>
								{this.state.channel.subscribersHidden === true ? (
									<p className="text-warning">
										<b>
											Subscriber info hidden by channel{" "}
											<i className="fa fa-frown-o" />
										</b>
									</p>
								) : null}
								{this.state.channel.subscribersHidden === false ? (
									<p>
										<b>Subscribers:</b>{" "}
										{this.state.channel.subscribers.toLocaleString()}
									</p>
								) : null}
								{this.state.channel.subscribersHidden === false ? (
									<p>
										<b>Videos:</b> {this.state.channel.videoCount}
									</p>
								) : null}
								<p>
									<b>Views:</b> {this.state.channel.views.toLocaleString()}
								</p>
								{this.state.channel.lastUploadAt ? (
									<p>
										<b>Last upload:</b>{" "}
										{$.timeago(
											new Date(this.state.channel.lastUploadAt * 1000)
										)}
									</p>
								) : (
									""
								)}
								<p>
									<b>Founded:</b>{" "}
									{this.formatDate(this.state.channel.publishedAt)}
								</p>
								<p>&nbsp;</p>
								<SubscribeButton channel={this.state.channel} />
								<p>&nbsp;</p>
								<p>
									<a
										target="_blank"
										href={
											"https://youtube.com/channel/" + this.state.channel.id
										}
									>
										<i className="fa fa-external-link fa-fw" /> Open YouTube
										channel
									</a>
								</p>
								<p>
									<FlagButton channel={this.state.channel} />
								</p>
								<p>&nbsp;</p>
								{customLinks.length > 0 ? (
									<ul className="hidden-sm hidden-xs list-unstyled websites-list">
										<li>
											<b>Links:</b>
										</li>
										{customLinks}
									</ul>
								) : null}
							</div>
						</div>
					</div>
					<div className="col-md-1" />
				</div>
				<p>&nbsp;</p>
			</div>
		);
	}
}

export default ChannelDetail;
