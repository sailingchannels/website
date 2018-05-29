import React from "react";
import Helmet from "react-helmet";
import OffsetMenu from "./OffsetMenu";
import VideoList from "./VideoList";
import VideoActions from "../actions/VideoActions";
import VideoStore from "../stores/VideoStore";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";
import { Navigation, Link } from "react-router";
import SubscribeButton from "./SubscribeButton";

class VideoDetail extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = VideoStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		VideoStore.listen(this.onChange);
		VideoActions.getVideo(this.props.params.id);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		if (nextProps.params.id !== this.props.params.id) {
			VideoActions.getVideo(nextProps.params.id);
		}
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		VideoStore.unlisten(this.onChange);
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
		// no video yet
		if (!this.state.video) {
			return null;
		}

		return (
			<div className="container">
				<Helmet title={this.state.video.title} />
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				<OffsetMenu />
				<div className="row">
					<div className="col-md-1" />
					<div className="col-md-10">
						<div className="row">
							<div className="col-md-12">
								<center>
									<h1 className="video-detail-title">{this.state.video.title}</h1>
								</center>
							</div>
						</div>
						<div className="row">
							<div className="col-md-2 col-sm-2">
								<img
									src={this.state.video.channel.thumbnail}
									className="channel-thumb"
								/>
							</div>
							<div className="col-md-7 col-sm-7">
								<iframe
									width="100%"
									height="315"
									src={
										"https://www.youtube.com/embed/" +
										this.state.video._id +
										"?origin=https://sailing-channels.com"
									}
									frameBorder="0"
									allowFullScreen
								/>
								<p
									className="channel-description"
									dangerouslySetInnerHTML={{
										__html: anchorme.js(
											this.state.video.description.replace("\n", "<br />"),
											{ target: "_blank" }
										)
									}}
								/>
								<p>&nbsp;</p>
								<p>
									<b>Other videos:</b>
								</p>
								<VideoList channel={this.state.video.channel} />
							</div>
							<div className="col-md-3 col-sm-3">
								<p>
									<b>Views:</b> {(this.state.video.views || 0).toLocaleString()}
								</p>
								<p>
									<b>Likes:</b> <i className="fa fa-thumbs-up fa-fw" />{" "}
									{(this.state.video.likes || 0).toLocaleString()}{" "}
									<i className="fa fa-thumbs-down fa-fw" />{" "}
									{(this.state.video.dislikes || 0).toLocaleString()}
								</p>
								<p>
									<b>Uploaded:</b> {this.formatDate(this.state.video.publishedAt)}
								</p>
								<p>&nbsp;</p>
								<p>
									<b>Channel:</b>{" "}
									<Link to={"/channel/" + this.state.video.channel._id}>
										{this.state.video.channel.title}
									</Link>
								</p>
								<SubscribeButton channel={this.state.video.channel} />
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

export default VideoDetail;
