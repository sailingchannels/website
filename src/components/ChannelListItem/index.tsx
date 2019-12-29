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
}

export default function ChannelListItem(props: ChannelListItemProps) {
	const { channel } = props;

	return (
		<div className="columns list-columns">
			<div className="column is-narrow">
				<p className="image is-128x128">
					<img className="is-rounded" src={channel.thumbnail} />
				</p>
			</div>
			<div className="column">
				<Link
					to={`/channel/${channel.iD}`}
					onMouseOver={() => {
						if (props.client) {
							props.client.query({
								query: CHANNEL_DETAIL_QUERY,
								variables: {
									id: channel.iD
								}
							});
						}
					}}
				>
					<strong>{channel.title}</strong>
				</Link>
				<p className="has-text-justified">{channel.description}</p>
			</div>
			<div className="column is-3">
				<ChannelInfos channel={channel} />
				<div style={{ marginTop: "10px" }}>
					<SubscribeButton channelId={channel.iD} />
				</div>
			</div>
		</div>
	);
}
