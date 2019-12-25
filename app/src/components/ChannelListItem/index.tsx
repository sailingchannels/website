import React from "react";
import Channel from "../../entities/Channel";
import ChannelInfos from "../ChannelInfos";
import SubscribeButton from "../SubscribeButton";

interface ChannelListItemProps {
	channel: Channel;
}

export default function ChannelListItem(props: ChannelListItemProps) {
	return (
		<div className="columns list-columns">
			<div className="column is-narrow">
				<p className="image is-128x128">
					<img className="is-rounded" src={props.channel.thumbnail} />
				</p>
			</div>
			<div className="column">
				<p>
					<a href="">
						<strong>{props.channel.title}</strong>
					</a>
					<br />
					{props.channel.description}
				</p>
			</div>
			<div className="column is-3">
				<ChannelInfos />
				<div style={{ marginTop: "10px" }}>
					<SubscribeButton />
				</div>
			</div>
		</div>
	);
}
