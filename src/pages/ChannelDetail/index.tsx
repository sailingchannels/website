import React from "react";
import Channel from "../../entities/Channel";
import ChannelInfos from "../../components/ChannelInfos";
import SubscribeButton from "../../components/SubscribeButton";
import VideoList from "../../components/VideoList";
import Tags from "../../components/Tags";
import { useQuery } from "@apollo/react-hooks";
import { CHANNEL_DETAIL_QUERY } from "./gql";
import LoadingIndicator from "../../components/LoadingIndicator";
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero";
import FlagButton from "../../components/FlagButton";
import SubscriberHistoryChart from "../../components/SubscriberHistoryChart";
import UploadPrediction from "../../components/UploadPrediction";

function ChannelDetail(props: any) {
	const { loading, error, data } = useQuery(CHANNEL_DETAIL_QUERY, {
		fetchPolicy: "cache-first",
		variables: {
			id: props.match.params.id
		}
	});

	if (error) console.error(error);

	if (loading && !data) return <LoadingIndicator />;

	const channel: Channel = data.channel;

	return (
		<>
			<Helmet>
				<title>{channel.title} | Sailing Channels</title>
			</Helmet>

			<Hero
				title={channel.title}
				subtitle={`${channel.videoCount} videos · ${channel.subscribers} subscribers`}
			/>

			<div className="columns">
				<div className="column is-three-quarters">
					<div>
						<p className="image is-128x128 detail-image">
							<img src={channel.thumbnail} className="is-rounded" />
						</p>
						<p className="has-text-justified">{channel.description}</p>
					</div>
					<h3 className="top-spacer">
						<strong>All videos:</strong>
					</h3>

					<VideoList channelId={channel.iD} currentPage={props.match.params.currentPage} />
				</div>
				<div className="column is-one-quarter">
					<SubscriberHistoryChart channelId={channel.iD} />

					<ChannelInfos channel={channel} />

					<UploadPrediction channelId={channel.iD} />

					<div className="subscribe-button">
						<SubscribeButton channelId={channel.iD} />
					</div>

					<p>
						<a href={"https://youtube.com/channel/" + channel.iD} target="_blank">
							<i className="fas fa-external-link-alt" /> Open YouTube channel
						</a>
					</p>
					<p>
						<FlagButton channelId={channel.iD}></FlagButton>
					</p>

					<Tags tags={channel.keywords} />
				</div>
			</div>
		</>
	);
}

export default ChannelDetail;
