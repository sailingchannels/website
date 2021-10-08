import React from "react";
import Video from "../../entities/Video";
import { Link } from "react-router-dom";
import { formatSI } from "../../Common";
import DescriptionText from "../DescriptionText";
import moment from "moment";
import { decode } from "html-entities";

interface VideoListItemProps {
	video: Video;
}

function VideoListItem(props: VideoListItemProps) {
	const { video } = props;

	return (
		<div className="columns list-columns">
			<div className="column is-narrow">
				<p className="image is-128x128">
					<img src={`https://img.youtube.com/vi/${video.iD}/default.jpg`} />
				</p>
			</div>
			<div className="column">
				<p>
					<a href={`https://www.youtube.com/watch?v=${video.iD}`} target="_blank">
						<strong>{decode(video.title)}</strong>
					</a>
					<p className="has-text-justified">
						<DescriptionText text={video.description} />
					</p>
				</p>
			</div>
			<div className="column is-3">
				<p>
					<b>Channel:</b> <Link to={`/channel/${video.channel.iD}`}>{video.channel.title}</Link>
				</p>
				<p>
					<b>Views:</b> {formatSI(video.views)}
				</p>
				<p>
					<b>Likes:</b>
					<span className="icon is-small">
						<i className="fas fa-thumbs-up" />
					</span>{" "}
					{formatSI(video.likes)}
					<span style={{ marginLeft: "10px" }} className="icon is-small">
						<i className="fas fa-thumbs-down" />
					</span>{" "}
					{formatSI(video.dislikes)}
				</p>
				<p>
					<b>Uploaded:</b> {moment.unix(video.publishedAt).format("ll")}
				</p>

				<div style={{ marginTop: "10px" }}>
					<a
						href={`https://www.youtube.com/watch?v=${video.iD}`}
						className="button is-light"
						target="_blank"
					>
						<i className="fab fa-youtube icon-spacer" /> Watch video
					</a>
				</div>
			</div>
		</div>
	);
}

export default VideoListItem;
