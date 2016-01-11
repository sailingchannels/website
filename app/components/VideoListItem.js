import React from "react";
import Description from "./Description";
import {Link} from "react-router";

class VideoListItem extends React.Component {

	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = {
			"showVideo": false
		};
	}

	toggleShowVideo() {

		// toggle video
		this.setState({
			"showVideo": !this.state.showVideo
		});
	}

    // RENDER
	render() {

		if(!this.props.video.channel) return null;

		return (
			<div className="row channel-row">
                <div className="col-md-2 col-xs-2">
					<center>
                    	<img src={"http://img.youtube.com/vi/" + this.props.video._id + "/default.jpg"} className="channel-thumb" />
					</center>
                </div>
                <div className="col-md-7 col-xs-10">
                    <h3>
                        <a href="javascript:void(0);" onClick={this.toggleShowVideo.bind(this)}>
                            {this.props.video.title}
                        </a>
                    </h3>
					<Description text={this.props.video.description} video={true} />
					{(this.state.showVideo === true) ? <iframe className="inline-video" width="100%" height="315" src={"https://www.youtube.com/embed/" + this.props.video._id} frameBorder="0" allowFullScreen></iframe> : null}
                </div>
                <div className="col-md-3 col-xs-10 col-xs-offset-2 col-md-offset-0">
					<p><b>Channel:</b> <Link to={"/channel/" + this.props.video.channel._id}>{this.props.video.channel.title}</Link></p>
					<p><b>Views:</b> {(this.props.video.views || 0).toLocaleString()}</p>
					<p><b>Likes:</b> <i className="fa fa-thumbs-up fa-fw"></i> {(this.props.video.likes || 0).toLocaleString()} <i className="fa fa-thumbs-down fa-fw"></i> {(this.props.video.dislikes || 0).toLocaleString()}</p>
					<p><b>Uploaded:</b> {moment.unix(this.props.video.publishedAt).format("ll")}</p>

					<a href="javascript:void(0);" onClick={this.toggleShowVideo.bind(this)} className="btn btn-default btn-sidebar btn-raised">
						<i className="fa fa-youtube-play"></i> Watch video
					</a>
                </div>
			</div>
		);
	}
}

export default VideoListItem;
