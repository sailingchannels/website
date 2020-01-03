import ChannelIdentificationStatus from "./ChannelIdentificationStatus";

export default class ChannelIdentification {
	channelID: string;
	channel: {
		title: string;
		description: string;
		thumbnail: string;
	};
	isSailingChannel: boolean;
	source: string;
	status: string;

	public GetStatus(): ChannelIdentificationStatus {
		return ChannelIdentificationStatus[status];
	}
}
