import Channel from "./Channel";

export default class Video {
	iD: string;
	title: string;
	description: string;
	views: number;
	publishedAt: number;
	channel?: Channel;
}
