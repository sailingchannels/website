import React from "react";
import Channel from "../../entities/Channel";
import ChannelInfos from "../../components/ChannelInfos";
import SubscribeButton from "../../components/SubscribeButton";
import LatestVideo from "../../components/LatestVideo";
import VideoList from "../../components/VideoList";
import CustomLinks from "../../components/CustomLinks";
import Tags from "../../components/Tags";
import { useQuery } from "@apollo/react-hooks";
import { CHANNEL_DETAIL_QUERY } from "./gql";
import LoadingIndicator from "../../components/LoadingIndicator";
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero";
import FlagButton from "../../components/FlagButton";
import SubscriberHistoryChart from "../../components/SubscriberHistoryChart";

function ChannelDetail(props: any) {
	//#region Hooks

	// load main menu items via graphql
	const { loading, error, data } = useQuery(CHANNEL_DETAIL_QUERY, {
		fetchPolicy: "cache-first",
		variables: {
			id: props.match.params.id
		}
	});

	if (error) console.error(error);

	//#endregion

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

			<div className="container is-fluid channel-details">
				<div className="columns">
					<div className="column is-three-quarters">
						<p className="image is-128x128 detail-image">
							<img src={channel.thumbnail} className="is-rounded" />
						</p>
						<p className="has-text-justified">{channel.description}</p>

						<h3>
							<strong>Latest video:</strong>
						</h3>

						<LatestVideo channelId={channel.iD} />

						<h3>
							<strong>All videos:</strong>
						</h3>

						<VideoList channelId={channel.iD} currentPage={props.match.params.currentPage} />
					</div>
					<div className="column">
						<SubscriberHistoryChart channelId={channel.iD} />

						<ChannelInfos channel={channel} />

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

						<CustomLinks links={channel.customLinks} />
						<Tags tags={channel.keywords} />
					</div>
				</div>
			</div>
		</>
	);
}

export default ChannelDetail;
