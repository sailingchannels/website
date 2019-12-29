import React from "react";
import Channel from "../../entities/Channel";
import moment from "moment";

interface ChannelInfosProps {
	channel: Channel;
}

function ChannelInfos(props: ChannelInfosProps) {
	const { channel } = props;

	const intl = new Intl.NumberFormat();

	return (
		<>
			<p>
				<b>Subscribers:</b> {intl.format(channel.subscribers)}
			</p>
			<p>
				<b>Views:</b> {intl.format(channel.views)}
			</p>
			<p>
				<b>Videos:</b> {intl.format(channel.videoCount)}
			</p>
			<p>
				<b>Last upload:</b> {moment.unix(channel.lastUploadAt).fromNow()}
			</p>
			<p>
				<b>Founded:</b> {moment.unix(channel.publishedAt).format("ll")}
			</p>
		</>
	);
}

export default ChannelInfos;
