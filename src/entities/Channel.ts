import CustomLink from "./CustomLink";

export default class Channel {
	iD: string;
	title: string;
	description: string;
	videoCount: number;
	thumbnail: string;
	lastUploadAt: number;
	subscribers: number;
	views: number;
	publishedAt: number;
	customLinks?: CustomLink[];
	keywords?: string[];
}
