import React from "react";
import { Link } from "react-router-dom";
import Channel from "../../entities/Channel";
import ChannelInfos from "../ChannelInfos";
import SubscribeButton from "../SubscribeButton";
import ApolloClient from "apollo-client";
import { CHANNEL_DETAIL_QUERY } from "../../pages/ChannelDetail/gql";

interface ChannelListItemProps {
	channel: Channel;
	client?: ApolloClient<any>;
	sortBy?: string;
}

export default function ChannelListItem(props: ChannelListItemProps) {
	const { channel, sortBy } = props;

	const prefetchChannelDetails = () => {
		if (props.client) {
			props.client.query({
				query: CHANNEL_DETAIL_QUERY,
				variables: {
					id: channel.iD
				}
			});
		}
	};

	return (
		<div className="columns list-columns">
			<div className="column is-three-quarters">
				<div className="columns">
					<div className="column is-narrow is-hidden-mobile">
						<Link to={`/channel/${channel.iD}`} onMouseOver={prefetchChannelDetails}>
							<p className="image is-128x128">
								<img className="is-rounded" src={channel.thumbnail} />
							</p>
						</Link>
					</div>
					<div className="column">
						<Link
							className="channel-list-item-title"
							to={`/channel/${channel.iD}`}
							onMouseOver={prefetchChannelDetails}
						>
							<strong>{channel.title}</strong>
						</Link>
						<div className="has-text-justified channel-list-item-description">
							<div className="image is-64x64 detail-image is-hidden-tablet">
								<Link to={`/channel/${channel.iD}`} onMouseOver={prefetchChannelDetails}>
									<img src={channel.thumbnail} className="is-rounded" />
								</Link>
							</div>
							{channel.description}
						</div>
					</div>
				</div>
			</div>

			<div className="column is-one-quarter is-hidden-mobile">
				<ChannelInfos channel={channel} highlightInfo={sortBy} />
				<div className="channel-list-item-subscribe">
					<SubscribeButton channelId={channel.iD} />
				</div>
			</div>
		</div>
	);
}
