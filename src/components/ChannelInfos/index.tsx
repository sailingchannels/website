import React from "react";
import Channel from "../../entities/Channel";
import moment from "moment";
import { format } from "d3-format";

interface ChannelInfosProps {
	channel: Channel;
}

function ChannelInfos(props: ChannelInfosProps) {
	const { channel } = props;

	return (
		<div className="bottom-spacer">
			<p>
				<b>Subscribers:</b> {format(".2s")(channel.subscribers)}
			</p>
			<p>
				<b>Views:</b> {format(".2s")(channel.views)}
			</p>
			<p>
				<b>Videos:</b> {format(".2s")(channel.videoCount)}
			</p>
			<p>
				<b>Last upload:</b>{" "}
				{channel.lastUploadAt > 0 ? moment.unix(channel.lastUploadAt).fromNow() : "never"}
			</p>
			<p>
				<b>Founded:</b> {moment.unix(channel.publishedAt).format("ll")}
			</p>
		</div>
	);
}

export default ChannelInfos;
