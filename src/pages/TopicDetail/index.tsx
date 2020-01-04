import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TOPIC_DETAIL_QUERY } from "./gql";
import { useQuery } from "@apollo/react-hooks";
import LoadingIndicator from "../../components/LoadingIndicator";
import VisibleTab from "../../entities/VisibleTab";
import ChannelsVideosTabs from "../../components/VideosChannelTabs";
import VideoListItem from "../../components/VideoListItem";
import ChannelListItem from "../../components/ChannelListItem";
import Video from "../../entities/Video";
import Channel from "../../entities/Channel";
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero";

function TopicDetail(props: any) {
	const topicId: string = props.match.params.id;

	//#region Hooks

	const [visibleTab, setVisibleTab] = useState(VisibleTab.Channels);

	// load main menu items via graphql
	const { loading, error, data } = useQuery(TOPIC_DETAIL_QUERY, {
		fetchPolicy: "cache-and-network",
		variables: {
			topicId
		}
	});

	//#endregion

	if (loading || !data) return <LoadingIndicator />;

	const { topic, videos, channels } = data.topicDetail;

	let results = null;

	if (visibleTab == VisibleTab.Videos) {
		// add videos to renderable search results
		results = videos.map((video: Video) => {
			return <VideoListItem key={video.iD} video={video} />;
		});
	} else {
		// add channels to renderable search results
		results = channels.map((channel: Channel) => {
			return <ChannelListItem key={channel.iD} channel={channel} />;
		});
	}

	return (
		<>
			<Helmet>
				<title>Topic: {topic.title} | Sailing Channels</title>
			</Helmet>

			<nav className="breadcrumb" aria-label="breadcrumbs">
				<ul>
					<li>
						<Link to="/topics">Topics</Link>
					</li>
					<li className="is-active">
						<a href="#">{topic.title}</a>
					</li>
				</ul>
			</nav>

			<Hero title={topic.title} subtitle={topic.description} />

			{/*ChannelsVideosTabs visibleTab={visibleTab} setVisibleTab={setVisibleTab} />*/}

			{results}
		</>
	);
}

export default TopicDetail;
