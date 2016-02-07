import React from "react";
import VideoListItem from "./VideoListItem";
import VideoActions from "../actions/VideoActions";
import VideoStore from "../stores/VideoStore";
import Description from "./Description";
import {Navigation,Link} from "react-router";

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
		VideoActions.getVideos(this.props.channel._id, this.state.skip, this.state.take);
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

	// RENDER
	render() {

		return (
			<div>
				{this.state.videos.map(v => (
					<div className="row channel-row" key={v._id}>
						<div className="col-md-3 col-xs-3">
							<center>
								<img src="https://cdn.rawgit.com/thomasbrueggemann/sailing-channels/master/public/img/spacer.png" data-src={"http://img.youtube.com/vi/" + v._id + "/default.jpg"} className="channel-thumb" />
							</center>
						</div>
						<div className="col-md-9 col-xs-9">
							<h3>
								<Link to={"/video/" + v._id}>
									{v.title}
								</Link>
							</h3>
							<Description text={v.description} video={true} />
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default VideoList;
