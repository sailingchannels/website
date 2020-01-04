import Channel from "./Channel";

export default class Video {
	iD: string;
	title: string;
	description: string;
	likes: number;
	dislikes: number;
	views: number;
	publishedAt: number;
	channel?: Channel;
}
