import React from "react";
import Description from "components/Description";
import { Link } from "react-router";
import LazyLoad from "react-lazyload";

class VideoListItem extends React.Component {
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
		if (!this.props.video.channel) return null;

		return (
			<div className="row channel-row">
				<div className="col-md-2 col-xs-2">
					<center>
						<LazyLoad once>
							<img
								src={
									"https://img.youtube.com/vi/" +
									this.props.video._id +
									"/default.jpg"
								}
								className="channel-thumb"
							/>
						</LazyLoad>
					</center>
				</div>
				<div className="col-md-7 col-xs-10">
					<h3>
						<Link to={"/video/" + this.props.video._id}>{this.props.video.title}</Link>
					</h3>
					<Description text={this.props.video.description} video={true} />
				</div>
				<div className="col-md-3 col-xs-10 col-xs-offset-2 col-md-offset-0">
					<p>
						<b>Channel:</b>{" "}
						<Link to={"/channel/" + this.props.video.channel._id}>
							{this.props.video.channel.title}
						</Link>
					</p>
					<p>
						<b>Views:</b> {(this.props.video.views || 0).toLocaleString()}
					</p>
					<p>
						<b>Likes:</b> <i className="fa fa-thumbs-up fa-fw" />{" "}
						{(this.props.video.likes || 0).toLocaleString()}{" "}
						<i className="fa fa-thumbs-down fa-fw" />{" "}
						{(this.props.video.dislikes || 0).toLocaleString()}
					</p>
					<p>
						<b>Uploaded:</b> {this.formatDate(this.props.video.publishedAt)}
					</p>

					<Link
						to={"/video/" + this.props.video._id}
						className="btn btn-default btn-sidebar btn-raised"
					>
						<i className="fa fa-youtube-play" /> Watch video
					</Link>
				</div>
			</div>
		);
	}
}

export default VideoListItem;
