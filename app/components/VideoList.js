import React from "react";
import VideoListItem from "./VideoListItem";
import VideoActions from "../actions/VideoActions";
import VideoStore from "../stores/VideoStore";
import Description from "./Description";
import { Navigation, Link } from "react-router";

class VideoList extends React.Component {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = VideoStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		VideoStore.listen(this.onChange);
		VideoActions.getVideos(
			this.props.channel._id,
			this.state.skip,
			this.state.take
		);
	}

	// COMPONENT WILL RECEIVE PROPS
	componentWillReceiveProps(nextProps) {
		// if the channel changed, reload
		if (nextProps.channel._id !== this.props.channel._id) {
			var newState = {
				videos: [],
				skip: 0,
				take: this.state.take
			};

			this.setState(newState);

			VideoActions.getVideos(
				nextProps.channel._id,
				newState.skip,
				newState.take
			);
		}
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		VideoStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
		$(".channel-thumb").unveil();
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

	// NEXT
	next() {
		var newState = {
			videos: [],
			skip: this.state.skip + this.state.take,
			take: this.state.take
		};

		this.setState(newState);

		// load next videos
		VideoActions.getVideos(
			this.props.channel._id,
			newState.skip,
			newState.take
		);
	}

	// PREV
	prev() {
		var newState = {
			videos: [],
			skip: this.state.skip - this.state.take,
			take: this.state.take
		};

		this.setState(newState);

		// load next videos
		VideoActions.getVideos(
			this.props.channel._id,
			newState.skip,
			newState.take
		);
	}

	// RENDER
	render() {
		return (
			<div>
				{this.state.videos.map(v => (
					<div className="row channel-row" key={v._id}>
						<div className="col-md-3 col-xs-3">
							<center>
								<img
									src="https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/master/public/img/spacer.png"
									data-src={
										"https://img.youtube.com/vi/" +
										v._id +
										"/default.jpg"
									}
									className="channel-thumb"
								/>
							</center>
						</div>
						<div className="col-md-9 col-xs-9">
							<h3>
								<Link to={"/video/" + v._id}>{v.title}</Link>
							</h3>
							<p>
								{this.formatDate(v.publishedAt)} &middot;{" "}
								<i className="fa fa-eye" /> {v.views} &middot;{" "}
								<i className="fa fa-thumbs-up" /> {v.likes}{" "}
								&middot; <i className="fa fa-thumbs-down" />{" "}
								{v.dislikes}
							</p>
							<Description text={v.description} video={true} />
						</div>
					</div>
				))}

				<div className="row">
					<div className="col-md-6 col-xs-6 text-left">
						{this.state.skip > 0 ? (
							<a
								className="btn btn-raised"
								onClick={this.prev.bind(this)}
							>
								<i className="fa fa-arrow-left" /> Previous
							</a>
						) : null}
					</div>
					<div className="col-md-6 col-xs-6 text-right">
						{this.state.fin === false ? (
							<a
								className="btn btn-raised"
								onClick={this.next.bind(this)}
							>
								Next <i className="fa fa-arrow-right" />
							</a>
						) : null}
					</div>
				</div>
			</div>
		);
	}
}

export default VideoList;
