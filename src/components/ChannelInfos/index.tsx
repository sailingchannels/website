import React from "react";
import Channel from "../../entities/Channel";
import moment from "moment";
import { formatSI } from "../../Common";

interface ChannelInfosProps {
	channel: Channel;
}

function ChannelInfos(props: ChannelInfosProps) {
	const { channel } = props;

	return (
		<div className="bottom-spacer">
			<p>
				<b>Subscribers:</b> {formatSI(channel.subscribers)}
			</p>
			<p>
				<b>Views:</b> {formatSI(channel.views)}
			</p>
			<p>
				<b>Videos:</b> {formatSI(channel.videoCount)}
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
