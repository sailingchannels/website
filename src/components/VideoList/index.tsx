import React from "react";
import { VIDEOS_QUERY } from "./gql";
import { useQuery } from "@apollo/react-hooks";
import Video from "../../entities/Video";
import LoadingIndicator from "../LoadingIndicator";
import Paging from "../Paging";
import moment from "moment";
import { VIDEOS_PER_PAGE } from "../../Constants";
import DescriptionText from "../DescriptionText";
import { format } from "d3-format";

interface VideoListProps {
	channelId: string;
	currentPage: string;
}

function VideoList(props: VideoListProps) {
	const currentPage: number = parseInt(props.currentPage) || 0;

	// load main menu items via graphql
	const { loading, error, data } = useQuery(VIDEOS_QUERY, {
		fetchPolicy: "network-only",
		variables: {
			channelId: props.channelId,
			skip: currentPage * VIDEOS_PER_PAGE,
			take: VIDEOS_PER_PAGE
		}
	});

	if (loading || !data) return <LoadingIndicator />;

	return (
		<>
			{data.videos.map((video: Video) => {
				return (
					<div key={video.iD} className="media">
						<figure className="media-left">
							<div className="image is-128x128">
								<img src={`https://img.youtube.com/vi/${video.iD}/default.jpg`} />
							</div>
						</figure>
						<div className="media-content">
							<div className="content">
								<a href={`https://www.youtube.com/watch?v=${video.iD}`} target="_blank">
									<strong>{video.title}</strong>
								</a>
								<br />
								<small>
									<ul className="is-unstyled is-inline channel-detail-stats">
										<li>
											<em>{moment.unix(video.publishedAt).format("ll")}</em>
										</li>
										<li>
											<span className="icon is-small">
												<i className="far fa-eye" />
											</span>{" "}
											{format(".2s")(video.views)}
										</li>
										<li>
											<span className="icon is-small">
												<i className="fas fa-thumbs-up" />
											</span>{" "}
											{format(".2s")(video.likes)}
										</li>
										<li>
											<span className="icon is-small">
												<i className="fas fa-thumbs-down" />
											</span>{" "}
											{format(".2s")(video.dislikes)}
										</li>
									</ul>
								</small>
								<p className="has-text-justified">
									<DescriptionText text={video.description} />
								</p>
							</div>
						</div>
					</div>
				);
			})}
			<Paging channelId={props.channelId} currentPage={currentPage.toString()} />
		</>
	);
}

export default VideoList;
