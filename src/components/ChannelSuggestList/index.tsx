import React from "react";
import ChannelIdentification from "../../entities/ChannelIdentification";
import SuggestButton from "../SuggestButton";
import { v4 as uuid } from "uuid";

interface ChannelSuggestListProps {
	channels: ChannelIdentification[];
}

function ChannelSuggestList(props: ChannelSuggestListProps) {
	return (
		<>
			{props.channels.map((channel: ChannelIdentification) => {
				return (
					<div key={uuid()} className="columns">
						<div className="column is-narrow">
							<img src={channel.channel.thumbnail} />
						</div>
						<div className="column has-text-justified">
							<a href="" target="_blank">
								{channel.channel.title}
							</a>
							<p>{channel.channel.description}</p>
						</div>
						<div className="column is-narrow">
							<SuggestButton channelId={channel.channelID}></SuggestButton>
						</div>
					</div>
				);
			})}
		</>
	);
}

export default ChannelSuggestList;
