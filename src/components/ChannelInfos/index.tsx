import React from "react";
import Channel from "../../entities/Channel";
import moment from "moment";
import { formatSI } from "../../Common";

interface ChannelInfosProps {
	channel: Channel;
	highlightInfo?: string;
}

function ChannelInfos(props: ChannelInfosProps) {
	const { channel } = props;

	const hightlightable = (infoName: string, title: string, value: number | string): JSX.Element => {
		const info = (
			<>
				<b>{title}:</b> {value}
			</>
		);

		if (infoName == props.highlightInfo) {
			return <mark>{info}</mark>;
		}

		return info;
	};

	return (
		<div>
			<p>{hightlightable("subscribers", "Subscribers", formatSI(channel.subscribers))}</p>
			<p>{hightlightable("views", "Views", formatSI(channel.views))}</p>
			<p>
				<b>Videos:</b> {formatSI(channel.videoCount)}
			</p>
			<p>
				{hightlightable(
					"upload",
					"Last upload",
					channel.lastUploadAt > 0 ? moment.unix(channel.lastUploadAt).fromNow() : "never"
				)}
			</p>
			<p>{hightlightable("founded", "Founded", moment.unix(channel.publishedAt).format("ll"))}</p>
		</div>
	);
}

export default ChannelInfos;
